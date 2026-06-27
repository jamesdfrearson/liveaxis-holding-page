// Packages
import mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";

declare global {
  // eslint-disable-next-line no-var
  var __mongoPromise: Promise<typeof mongoose> | undefined;
  // eslint-disable-next-line no-var
  var __mongoPemPath: string | undefined;
}

/**
 * Determines the method used for authenticating with the database.
 */
function isX509(): boolean {
  // Has the auth mode been set to x509?
  return (process.env.MONGODB_AUTH_MODE || "").toLowerCase() === "x509";
}

/**
 * Ensures the X509 PEM file exists.
 */
function ensureX509PemFile(): string {
  const explicitPath = process.env.MONGODB_X509_PEM_PATH;
  const base64 = process.env.MONGODB_X509_PEM_BASE64;

  // Explicit path provided - Has a path been provided?
  if (explicitPath) {
    // Does the path exist?
    if (fs.existsSync(explicitPath))
      // Return the existing path.
      return explicitPath;

    // Do we have access to the Base 64 version?
    if (!base64)
      // Thrown an error.
      throw new Error(
        `MONGODB_X509_PEM_PATH is set but file does not exist and no MONGODB_X509_PEM_BASE64 provided.`,
      );

    // Write the Base 64 version to the filesystem.
    fs.mkdirSync(path.dirname(explicitPath), { recursive: true });
    const buffer = Buffer.from(base64, "base64");
    fs.writeFileSync(explicitPath, buffer, { mode: 0o400 });

    // Return the file path.
    return explicitPath;
  }

  // No explicit path defined - default to /tmp
  const pemPath = path.join("/tmp", "mongo-x509.pem");

  // Does this path exist?
  if (fs.existsSync(pemPath)) return pemPath;

  // If we don't have access to the Base 64 version or the path, throw an error.
  if (!base64)
    throw new Error(
      "x509 auth enabled but neither MONGODB_X509_PEM_PATH nor MONGODB_X509_PEM_BASE64 is set.",
    );

  // Write the file to the path.
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync(pemPath, buffer, { mode: 0o400 });

  // Return the path.
  return pemPath;
}

/**
 * Ensures connection to MongoDB.
 */
export default async function connectToMongoDb(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) return mongoose;

  if (!global.__mongoPromise) {
    const db = process.env.MONGODB_DATABASE_NAME;
    const host = process.env.MONGODB_URI;

    if (!db || !host) {
      throw new Error("Missing Mongo env vars (db/host).");
    }

    if (isX509()) {
      const pemPath = ensureX509PemFile();

      const uri = `mongodb+srv://${host}/${encodeURIComponent(
        db,
      )}?authSource=%24external`;

      global.__mongoPromise = mongoose.connect(uri, {
        tls: true,
        tlsCertificateKeyFile: pemPath,
        authMechanism: "MONGODB-X509",
        retryWrites: true,
        w: "majority",
        appName: "Cluster0",
        dbName: db,
      });
    } else {
      const user = process.env.MONGODB_ATLAS_USERNAME;
      const pass = process.env.MONGODB_ATLAS_PASSWORD;

      if (!user || !pass) {
        throw new Error("Missing Mongo env vars (user/pass).");
      }

      const uri = `mongodb+srv://${encodeURIComponent(
        user,
      )}:${encodeURIComponent(pass)}@${host}/${encodeURIComponent(
        db,
      )}?authSource=admin`;

      global.__mongoPromise = mongoose.connect(uri, {
        retryWrites: true,
        w: "majority",
        appName: "Cluster0",
        dbName: db,
      });
    }
  }

  try {
    await global.__mongoPromise;
    return mongoose;
  } catch (err) {
    global.__mongoPromise = undefined;
    throw err;
  }
}

import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'none'",

  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
  ].join(" "),

  // Prevent HTML attributes such as onclick="..." from executing.
  "script-src-attr 'none'",

  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",

  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Origin-Agent-Cluster",
    value: "?1",
  },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=(self)",
      "screen-wake-lock=()",
      "usb=()",
      "web-share=(self)",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    key: "X-Powered-By",
    value: "LiveAxis",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  typedRoutes: true,

  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  experimental: {
    serverActions: {
      // Keep request parsing bounded. Do not add allowedOrigins unless required.
      bodySizeLimit: "1mb",
    },
  },

  images: {
    qualities: [75],

    // Protect the image optimiser from SSRF and oversized responses.
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    maximumRedirects: 0,
    maximumResponseBody: 5_000_000,

    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'none'; sandbox;",
  },

  ...(isDevelopment
    ? {
        allowedDevOrigins: ["10.17.1.21"],
      }
    : {}),

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders.filter(
          ({ key }) => isProduction || key !== "Strict-Transport-Security",
        ),
      },
    ];
  },
};

export default nextConfig;

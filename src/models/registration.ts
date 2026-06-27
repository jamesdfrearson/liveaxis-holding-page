// Packages
import {
  Schema,
  InferSchemaType,
  models,
  model,
  Model,
  HydratedDocument,
} from "mongoose";

const RegistrationSchema = new Schema(
  {
    token: {
      type: String,
      trim: true,
      required: true,
    },

    name: {
      type: String,
      min: 2,
      max: 100,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    ipAddress: {
      type: String,
      trim: true,
    },

    acceptedTermsAndConditions: {
      type: Date,
      default: Date.now(),
    },

    receiveMarketingEmails: {
      type: Boolean,
      default: false,
    },

    screens: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type IRegistration = HydratedDocument<
  InferSchemaType<typeof RegistrationSchema>
>;

const Registration: Model<IRegistration> =
  (models?.Registrations as Model<IRegistration>) ??
  model<IRegistration>("Registrations", RegistrationSchema, "Registrations");

export default Registration;

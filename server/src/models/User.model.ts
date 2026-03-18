import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash?: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
  authProviders: Array<{
    provider: "local" | "google" | "facebook";
    providerId?: string;
  }>;
  isEmailVerified: boolean;
  refreshTokens: string[];
  loginAttempts: number;
  lockUntil?: Date;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    authProviders: [
      {
        provider: { type: String, enum: ["local", "google", "facebook"], required: true },
        providerId: { type: String },
      },
    ],
    isEmailVerified: { type: Boolean, default: false },
    refreshTokens: [{ type: String }],
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    lastLoginAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for performance and security
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>("User", UserSchema);

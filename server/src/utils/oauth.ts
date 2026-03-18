import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User.model";

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "placeholder",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails?.[0].value });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails?.[0].value,
              avatar: profile.photos?.[0].value,
              isEmailVerified: true,
              authProviders: [{ provider: "google", providerId: profile.id }],
            });
          } else if (!user.authProviders.find(p => p.provider === "google")) {
            user.authProviders.push({ provider: "google", providerId: profile.id });
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID || "placeholder",
        clientSecret: process.env.FACEBOOK_APP_SECRET || "placeholder",
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:5000/api/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails?.[0].value });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails?.[0].value || `${profile.id}@facebook.placeholder`,
              avatar: profile.photos?.[0].value,
              isEmailVerified: true,
              authProviders: [{ provider: "facebook", providerId: profile.id }],
            });
          } else if (!user.authProviders.find(p => p.provider === "facebook")) {
            user.authProviders.push({ provider: "facebook", providerId: profile.id });
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );
};

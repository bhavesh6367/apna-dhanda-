"use client";

import React, { useState } from "react";
import { BrandPanel } from "./brand-panel";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { SocialButtons } from "./social-buttons";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useRedirectAfterLogin } from "@/hooks/use-redirect-after-login";
import { useEffect } from "react";

export function LoginPage() {
  const [view, setView] = useState<"login" | "register">("login");
  const { isAuthenticated, user } = useAuth();
  const { redirectAfterLogin } = useRedirectAfterLogin();

  useEffect(() => {
    if (isAuthenticated && user) {
      redirectAfterLogin(user.role);
    }
  }, [isAuthenticated, user, redirectAfterLogin]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0A0A0A]">
      {/* Static Left Brand Panel */}
      <BrandPanel />

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#111111] min-h-[500px]">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {view === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm />
                
                <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#2A2A2A]"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#111111] px-4 font-space tracking-widest text-[#F5F0E8]/30">
                      OR
                    </span>
                  </div>
                </div>

                <SocialButtons />

                <div className="mt-10 text-center">
                  <p className="text-[#F5F0E8]/60 font-dmsans text-sm">
                    New to Offgrids?{" "}
                    <button
                      onClick={() => setView("register")}
                      className="text-primary font-bold hover:underline hover:underline-offset-4 decoration-2"
                    >
                      CREATE ACCOUNT
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-[#F5F0E8] font-bebas text-5xl leading-tight">
                    Join the grid.
                  </h2>
                  <p className="text-[#F5F0E8]/50 font-dmsans text-sm mt-2">
                    Create an account to get early access and faster checkouts.
                  </p>
                  <div className="w-10 h-0.5 bg-[#E8FF00] mt-6" />
                </div>
                
                <RegisterForm onBackToLogin={() => setView("login")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

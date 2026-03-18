"use client";

import React, { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    try {
      await login({ email, password, rememberMe });
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.status === 423) {
        setError("Account locked. Try again in 15 minutes.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-[#F5F0E8] font-bebas text-5xl leading-tight">
          Welcome back.
        </h2>
        <p className="text-[#F5F0E8]/50 font-dmsans text-sm mt-2">
          Login to access your orders, wishlist & exclusive drops.
        </p>
        <div className="w-10 h-0.5 bg-[#E8FF00] mt-6" />
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1.5">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setError("");
            }}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-none px-4 py-3.5 text-[#F5F0E8] font-dmsans text-base placeholder:text-[#F5F0E8]/20 focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <PasswordInput
            value={password}
            onChange={(val) => {
                setPassword(val);
                setError("");
            }}
            error={!!error && !password ? error : undefined}
          />
          <div className="flex justify-end">
            <button type="button" className="text-primary font-space text-[10px] tracking-widest uppercase hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 accent-primary rounded-none"
          />
          <label htmlFor="remember" className="text-[#F5F0E8]/60 font-dmsans text-xs cursor-pointer">
            Remember me
          </label>
        </div>

        {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-dmsans text-center">
                {error}
            </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-none bg-primary text-primary-foreground font-bebas text-lg tracking-widest hover:translate-y-[-2px] hover:shadow-[4px_4px_0_rgba(232,255,0,0.2)] transition-all"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "LOGIN"}
        </Button>
      </form>
    </div>
  );
}

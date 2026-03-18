"use client";

import React, { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrength } from "@/components/ui/password-strength";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

interface RegisterFormProps {
  onBackToLogin: () => void;
}

export function RegisterForm({ onBackToLogin }: RegisterFormProps) {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "Enter your full name";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (formData.password.length < 8) newErrors.password = "Min 8 characters required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrors({ form: "Email already registered. Login instead?" });
      } else {
        setErrors({ form: "Registration failed. Try again." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-none px-4 py-3.5 text-[#F5F0E8] font-dmsans text-base placeholder:text-[#F5F0E8]/20 focus:border-primary focus:outline-none"
          />
          {errors.name && <p className="text-destructive text-[11px] font-dmsans pl-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-none px-4 py-3.5 text-[#F5F0E8] font-dmsans text-base placeholder:text-[#F5F0E8]/20 focus:border-primary focus:outline-none"
          />
          {errors.email && <p className="text-destructive text-[11px] font-dmsans pl-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <PasswordInput
            value={formData.password}
            onChange={(val) => setFormData({ ...formData, password: val })}
            error={errors.password}
          />
          <PasswordStrength password={formData.password} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <PasswordInput
            value={formData.confirmPassword}
            onChange={(val) => setFormData({ ...formData, confirmPassword: val })}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      {errors.form && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-dmsans text-center">
              {errors.form}
          </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 rounded-none bg-[#F5F0E8] text-black font-bebas text-lg tracking-widest hover:bg-white transition-all shadow-brutal"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "CREATE MY ACCOUNT"}
      </Button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full text-center text-[#F5F0E8] font-space text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-colors"
      >
        Already have an account? <span className="underline underline-offset-4">LOGIN</span>
      </button>
    </form>
  );
}

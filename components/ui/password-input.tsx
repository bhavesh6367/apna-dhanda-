"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "Password", 
  error, 
  className 
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div 
        className={cn(
          "flex items-center bg-[#0D0D0D] border border-[#2A2A2A] transition-all duration-200",
          isFocused && "border-primary ring-1 ring-primary/20",
          error && "border-destructive ring-1 ring-destructive/20"
        )}
      >
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-[#F5F0E8] font-dmsans text-base placeholder:text-[#F5F0E8]/20"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="pr-4 text-[#F5F0E8]/40 hover:text-primary transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-destructive text-[11px] font-dmsans pl-1">{error}</p>
      )}
    </div>
  );
}

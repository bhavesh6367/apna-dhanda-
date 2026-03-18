"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export function PhoneInput({ value, onChange, error, className }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(val);
  };

  const isValid = value.length === 10;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div 
        className={cn(
          "flex items-center bg-[#0D0D0D] border border-[#2A2A2A] transition-all duration-200",
          isFocused && "border-primary ring-1 ring-primary/20",
          error && "border-destructive ring-1 ring-destructive/20",
          !error && isValid && "border-[#00C48C]"
        )}
      >
        <div className="px-4 py-3.5 border-r border-[#2A2A2A] text-[#F5F0E8] opacity-50 font-space text-sm">
          🇮🇳 +91
        </div>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter Mobile Number"
          className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-[#F5F0E8] font-dmsans text-base placeholder:text-[#F5F0E8]/20"
        />
        {isValid && !error && (
          <div className="pr-4 text-[#00C48C]">
            <Check size={18} />
          </div>
        )}
      </div>
      {error && (
        <p className="text-destructive text-[11px] font-dmsans pl-1">{error}</p>
      )}
    </div>
  );
}

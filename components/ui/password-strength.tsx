"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "bg-[#2A2A2A]" };
    
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score, label: "Weak", color: "bg-destructive" };
    if (score === 2) return { score, label: "Medium", color: "bg-yellow-500" };
    return { score, label: "Strong", color: "bg-[#00C48C]" };
  };

  const strength = getStrength(password);

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1 h-1">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={cn(
              "flex-1 transition-all duration-300",
              step <= (strength.score > 2 ? 3 : strength.score) ? strength.color : "bg-[#2A2A2A]"
            )}
          />
        ))}
      </div>
      {strength.label && (
        <p className={cn("text-[10px] font-space tracking-widest uppercase", strength.label === "Weak" ? "text-destructive" : strength.label === "Medium" ? "text-yellow-500" : "text-[#00C48C]")}>
          {strength.label}
        </p>
      )}
    </div>
  );
}

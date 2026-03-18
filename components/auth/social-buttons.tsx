"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SocialButtonsProps {
  isLoading?: boolean;
}

export function SocialButtons({ isLoading }: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        disabled={isLoading}
        className="h-14 rounded-none bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F0E8] hover:border-primary hover:bg-[#1A1A1A] transition-all font-space text-[10px] tracking-widest gap-3"
      >
        <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full">
            <span className="text-black font-bold text-xs">G</span>
        </div>
        GOOGLE
      </Button>
      <Button
        variant="outline"
        disabled={isLoading}
        className="h-14 rounded-none bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F0E8] hover:border-primary hover:bg-[#1A1A1A] transition-all font-space text-[10px] tracking-widest gap-3"
      >
        <div className="w-5 h-5 flex items-center justify-center bg-[#1877F2]">
            <span className="text-white font-bold text-xs">f</span>
        </div>
        FACEBOOK
      </Button>
    </div>
  );
}

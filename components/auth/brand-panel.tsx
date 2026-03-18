"use client";

import React from "react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import Image from "next/image";

export function BrandPanel() {
  return (
    <div className="hidden lg:flex relative w-1/2 bg-[#0A0A0A] overflow-hidden">
      <HeroHighlight containerClassName="h-full">
        <div className="flex flex-col items-center justify-center text-center p-12">
          <h1 className="text-[#E8FF00] font-bebas text-8xl tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-1000">
            OFFGRIDS
          </h1>
          <p className="text-[#F5F0E8]/60 font-space text-sm tracking-[0.3em] uppercase mt-2">
            BREAK THE GRID
          </p>
          
          <div className="w-20 h-px bg-[#E8FF00]/40 my-8" />
          
          <p className="text-[#F5F0E8]/30 font-dmsans text-[11px] tracking-[0.2em] uppercase">
            EST. 2024 · STREETWEAR
          </p>
        </div>
      </HeroHighlight>

      {/* Model Image Branding */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"
          alt="Streetwear Model"
          fill
          className="object-cover object-top grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>
    </div>
  );
}

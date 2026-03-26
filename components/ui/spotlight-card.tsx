"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  customSize?: boolean;
  onClick?: () => void;
}

export const GlowCard = ({
  children,
  className,
  glowColor = "#E8FF00",
  customSize = false,
  onClick,
}: GlowCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Map named colors to brand hex if needed
  const resolvedColor = glowColor === "green" ? "#E8FF00" : glowColor;

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] transition-colors duration-300",
        !customSize && "w-full",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${resolvedColor}15,
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              ${resolvedColor}25,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

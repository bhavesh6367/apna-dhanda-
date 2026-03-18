"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";

export function LoginTransition() {
  const { isTransitioning } = useAuth();
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setShowTagline(true), 1200); // 400ms overlay + 500ms slam + buffer
      return () => clearTimeout(timer);
    } else {
      setShowTagline(false);
    }
  }, [isTransitioning]);

  const tagline = "BREAK THE GRID";

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex items-center justify-center">
            {/* OFF */}
            <motion.span
              initial={{ x: "-200px", opacity: 0 }}
              animate={{ x: -10, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "circOut" }}
              className="text-[#E8FF00] font-bebas text-[clamp(80px,15vw,160px)] leading-none"
            >
              OFF
            </motion.span>
            
            {/* GRIDS */}
            <motion.span
              initial={{ x: "200px", opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "circOut" }}
              className="text-[#E8FF00] font-bebas text-[clamp(80px,15vw,160px)] leading-none"
            >
              GRIDS
            </motion.span>
          </div>

          {/* Tagline Animation */}
          <div className="mt-4 h-8 flex">
            {showTagline && tagline.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="text-[#F5F0E8] font-space text-lg tracking-[0.4em] inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Scale out effect before dissolve */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            className="absolute inset-0 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

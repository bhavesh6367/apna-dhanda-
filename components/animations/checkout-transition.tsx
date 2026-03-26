"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import AnimatedAnimals from "./AnimatedAnimals";

interface CheckoutTransitionProps {
  isVisible: boolean;
  variant?: "checkout" | "success";
}

export const CheckoutTransition = ({ isVisible, variant = "checkout" }: CheckoutTransitionProps) => {
  const isSuccess = variant === "success";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center pointer-events-none"
        >
          <AnimatedGradientBackground
            startingGap={isSuccess ? 100 : 120}
            breathing={true}
            breathingRange={isSuccess ? 10 : 8}
            animationSpeed={isSuccess ? 0.04 : 0.03}
            gradientColors={isSuccess ? [
              '#0A0A0A', '#001A0A', '#003D1A',
              '#007A35', '#00C48C', '#00FF99', '#0A0A0A',
            ] : [
              '#0A0A0A', '#1A1A00', '#3D3D00',
              '#7A7A00', '#B8B800', '#E8FF00', '#0A0A0A',
            ]}
            gradientStops={[20, 35, 50, 62, 75, 88, 100]}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* 🐾 ANIMALS — appear ABOVE the brand text */}
            {!isSuccess && <AnimatedAnimals />}

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className={isSuccess ? "bg-[#00FF99] px-3 py-1" : "bg-[#E8FF00] px-3 py-1"}>
                <span className="font-black text-black text-2xl tracking-wider font-bebas">
                  OFF
                </span>
              </div>
              <span className="font-bebas text-white text-4xl tracking-[0.3em]">
                GRIDS
              </span>
            </motion.div>

            {/* Status text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className={`font-space text-[11px] ${isSuccess ? 'text-[#00FF99]/70' : 'text-[#E8FF00]/70'} tracking-[0.4em] uppercase mt-3`}
            >
              {isSuccess ? "Redirecting to Grid..." : "Securing your order..."}
            </motion.p>

            {/* Progress bar */}
            <motion.div className="w-48 h-[2px] bg-[#2A2A2A] mt-4">
              <motion.div
                className={`h-full ${isSuccess ? 'bg-[#00FF99]' : 'bg-[#E8FF00]'}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutTransition;

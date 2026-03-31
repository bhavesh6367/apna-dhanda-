"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Custom Minimalist SVG Mascot Components
const CatMascot = ({ color = "#FF69B4" }: { color?: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
    {/* Body */}
    <path d="M30 60C30 37.9086 47.9086 20 70 20C92.0914 20 110 37.9086 110 60V100H30V60Z" fill={color} />
    {/* Belly */}
    <ellipse cx="70" cy="70" rx="25" ry="35" fill="white" fillOpacity="0.9" />
    {/* Ears */}
    <path d="M40 25L30 5L20 25H40Z" fill={color} />
    <path d="M120 25L110 5L100 25H120Z" fill={color} />
    {/* Eyes */}
    <circle cx="60" cy="45" r="2" fill="black" />
    <circle cx="80" cy="45" r="2" fill="black" />
    {/* Tail */}
    <path d="M110 80C125 80 135 70 135 55C135 45 125 40 115 40" stroke={color} strokeWidth="12" strokeLinecap="round" />
  </svg>
);

const DogMascot = ({ color = "#4169E1" }: { color?: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
    {/* Body */}
    <rect x="25" y="40" width="70" height="60" rx="30" fill={color} />
    {/* Head */}
    <circle cx="60" cy="50" r="35" fill={color} />
    {/* Ears */}
    <rect x="15" y="30" width="15" height="40" rx="7.5" fill={color} />
    <rect x="90" y="30" width="15" height="40" rx="7.5" fill={color} />
    {/* Eyes */}
    <circle cx="50" cy="45" r="3" fill="black" />
    <circle cx="70" cy="45" r="3" fill="black" />
    {/* Nose */}
    <circle cx="60" cy="55" r="4" fill="black" />
  </svg>
);

const BearMascot = ({ color = "#FFA500" }: { color?: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
    {/* Body */}
    <circle cx="60" cy="70" r="45" fill={color} />
    {/* Ears */}
    <circle cx="25" cy="35" r="15" fill={color} />
    <circle cx="95" cy="35" r="15" fill={color} />
    {/* Muzzle */}
    <circle cx="60" cy="75" r="20" fill="white" fillOpacity="0.8" />
    {/* Eyes */}
    <circle cx="45" cy="55" r="3" fill="black" />
    <circle cx="75" cy="55" r="3" fill="black" />
    {/* Nose */}
    <rect x="55" y="65" width="10" height="6" rx="3" fill="black" />
  </svg>
);

const ANIMALS = [
  {
    id: 'cat',
    component: <CatMascot color="#FF2D85" />,
    style: "vibrant-pink",
    movement: { x: [-20, 20], scale: [1, 1.05, 0.95, 1], rotate: [-2, 2] },
    duration: 1.8,
  },
  {
    id: 'dog',
    component: <DogMascot color="#4169E1" />,
    style: "cool-blue",
    movement: { x: [-15, 15], scale: [1, 1.1, 0.9, 1], rotate: [-3, 3] },
    duration: 2.2,
  },
  {
    id: 'bear',
    component: <BearMascot color="#FFA500" />,
    style: "warm-orange",
    movement: { x: [-10, 10], scale: [1, 1.02, 0.98, 1], rotate: [-1, 1] },
    duration: 2.5,
  }
];

const DISPLAY_DURATION = 2000;

const AnimatedAnimals = ({ autoStopAfter }: { autoStopAfter?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * ANIMALS.length)
  );
  const [key, setKey] = useState(0);
  const [shouldDisplay, setShouldDisplay] = useState(true);

  useEffect(() => {
    if (!shouldDisplay) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (ANIMALS.length <= 1) return 0;
        let next;
        do { next = Math.floor(Math.random() * ANIMALS.length); }
        while (next === prev);
        return next;
      });
      setKey(k => k + 1);
    }, DISPLAY_DURATION);

    if (autoStopAfter) {
      setTimeout(() => setShouldDisplay(false), autoStopAfter);
    }

    return () => clearInterval(interval);
  }, [shouldDisplay, autoStopAfter]);

  if (!shouldDisplay) return null;

  const animal = ANIMALS[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center p-8 pointer-events-none select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.2, rotate: -20, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.5, rotate: 20, y: -50 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="relative"
        >
          {/* Main Animal Content */}
          <motion.div
            animate={{
              x: animal.movement.x,
              scale: animal.movement.scale,
              rotate: animal.movement.rotate,
            }}
            transition={{
              duration: animal.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            className="flex items-center justify-center"
          >
            {animal.component}
          </motion.div>

          {/* Dynamic Shadow */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/30 rounded-full blur-md"
            animate={{
              scaleX: [1, 1.4, 0.8, 1],
              opacity: [0.3, 0.1, 0.4, 0.3],
            }}
            transition={{
              duration: animal.duration * 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Optional: Add a subtle pulse glow effect behind the animal */}
      <div className="absolute inset-0 z-[-1] flex items-center justify-center overflow-hidden opacity-20 pointer-events-none">
         <div className="w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      </div>
    </div>
  );
};

export default AnimatedAnimals;

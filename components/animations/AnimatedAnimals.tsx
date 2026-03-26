"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Each animal = SVG child + unique movement personality
const ANIMALS = [
  {
    id: 'cat',
    emoji: '🐱',
    movement: { x: [-20, 20, -15, 15, 0], y: [0, -8, 0, -6, 0] },
    duration: 2.4,
    label: 'CAT',
  },
  {
    id: 'dog',
    emoji: '🐕',
    movement: { x: [-30, 30, -20, 20, 0], y: [0, -12, 0, -8, 0] },
    duration: 1.8,
    label: 'DOG',
  },
  {
    id: 'bull',
    emoji: '🐂',
    movement: { x: [-10, 10, -8, 8, 0], y: [0, -4, 0, -3, 0] },
    duration: 3.2,
    label: 'BULL',
  },
  {
    id: 'bear',
    emoji: '🐻',
    movement: { x: [-15, 15, -12, 12, 0], y: [0, -6, 2, -4, 0] },
    duration: 2.8,
    label: 'BEAR',
  },
  {
    id: 'leopard',
    emoji: '🐆',
    movement: { x: [-40, 40, -30, 30, 0], y: [0, -3, 0, -2, 0] },
    duration: 1.6,
    label: 'LEOPARD',
  },
  {
    id: 'wolf',
    emoji: '🐺',
    movement: { x: [-25, 25, -20, 20, 0], y: [0, -10, 0, -7, 0] },
    duration: 2.0,
    label: 'WOLF',
  },
  {
    id: 'fox',
    emoji: '🦊',
    movement: { x: [-35, 35, -25, 25, 0], y: [0, -14, 0, -10, 0] },
    duration: 1.9,
    label: 'FOX',
  },
  {
    id: 'tiger',
    emoji: '🐯',
    movement: { x: [-30, 30, -25, 25, 0], y: [0, -8, 0, -5, 0] },
    duration: 2.1,
    label: 'TIGER',
  },
];

const DISPLAY_DURATION = 1800;

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
    <div className="flex flex-col items-center mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 0.95, 1.05, 1],
            y: 0,
            x: animal.movement.x,
          }}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: {
              duration: animal.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            x: {
              duration: animal.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            y: { duration: 0.3 },
          }}
          className="relative"
        >
          <motion.span
            className="text-7xl select-none block"
            animate={{
              rotate: animal.id === 'bear' ? [-3, 3, -3] :
                      animal.id === 'bull' ? [0, -2, 0, 2, 0] :
                      [-1, 1, -1],
              y: animal.movement.y,
            }}
            transition={{
              rotate: {
                duration: animal.duration * 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
              y: {
                duration: animal.duration * 0.4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }
            }}
          >
            {animal.emoji}
          </motion.span>

          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/40 rounded-full blur-sm"
            animate={{
              scaleX: [1, 1.3, 0.8, 1.2, 1],
              opacity: [0.4, 0.2, 0.5, 0.3, 0.4],
            }}
            transition={{
              duration: animal.duration * 0.4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={`label-${key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-space text-[10px] text-primary tracking-[0.5em] mt-3 uppercase"
        >
          {animal.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedAnimals;

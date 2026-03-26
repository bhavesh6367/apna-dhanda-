"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface AnimatedGradientBackgroundProps {
  gradientColors?: string[];
  gradientStops?: number[];
  animationSpeed?: number;
  breathing?: boolean;
  breathingRange?: number;
  startingGap?: number;
  topOffset?: number;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

export default function AnimatedGradientBackground({
  gradientColors = ["#0A0A0A", "#1A1A00", "#3D3D00", "#7A7A00", "#B8B800", "#E8FF00", "#0A0A0A"],
  gradientStops = [20, 35, 50, 62, 75, 88, 100],
  animationSpeed = 0.03,
  breathing = true,
  breathingRange = 8,
  startingGap = 120,
  topOffset = 10,
  className = "",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const rgbColors = gradientColors.map(hexToRgb);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      timeRef.current += animationSpeed;

      const breathOffset = breathing
        ? Math.sin(timeRef.current) * breathingRange
        : 0;

      const centerX = width / 2;
      const centerY = height / 2 - (topOffset / 100) * height;
      const maxRadius = Math.max(width, height) * 0.8 + startingGap + breathOffset;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        maxRadius
      );

      rgbColors.forEach((color, i) => {
        const stop = (gradientStops[i] ?? (i / (rgbColors.length - 1)) * 100) / 100;
        gradient.addColorStop(
          Math.min(1, Math.max(0, stop)),
          `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        );
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    },
    [animationSpeed, breathing, breathingRange, startingGap, topOffset, rgbColors, gradientStops]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      draw(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}

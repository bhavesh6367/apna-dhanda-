"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/shop-context";
import { Check, Package, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lightweight Confetti Component
const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: any[] = [];
    const numberOfPieces = 150;
    const colors = ["#E8FF00", "#00C48C", "#F5F0E8", "#333333"];

    for (let i = 0; i < numberOfPieces; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        rotation: Math.random() * 360,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        oscillation: Math.random() * 2,
      });
    }

    let animationId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y / 30) * p.oscillation;
        p.rotation += 2;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000" style={{ opacity: 1 }} />;
};

export function OrderSuccessView() {
  const { lastOrderId, setCurrentScreen, clearCart, addNotification } = useShop();

  const hasMounted = React.useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    // Clear cart on successful order
    clearCart();
    window.scrollTo(0, 0);
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-background relative overflow-hidden">
      <Confetti />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4"
      >
        {/* Animated Checkmark Circle */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.4, 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(232,255,0,0.2)]"
        >
          <Check size={48} className="text-primary" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-bebas text-6xl md:text-8xl tracking-tighter text-foreground mb-4"
        >
          ORDER PLACED!
        </motion.h1>
        
        <p className="font-space text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase mb-12 max-w-md">
          YOUR GEAR IS BEING PREPARED. THE GRID HAS BEEN NOTIFIED.
        </p>

        {/* Order Details Card */}
        <div className="w-full bg-card border border-border p-8 mb-12 space-y-6 text-left shadow-2xl">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <span className="font-space text-[10px] tracking-widest text-muted-foreground uppercase">ORDER ID</span>
            <span className="font-space text-sm font-bold text-primary">{lastOrderId || "#OG-XXXXXX"}</span>
          </div>
          
          <div className="flex gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck size={14} className="text-primary" />
                <span className="font-space text-[10px] tracking-widest uppercase">ESTIMATED DELIVERY</span>
              </div>
              <p className="font-space text-sm text-foreground">5–7 WORKING DAYS</p>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package size={14} className="text-primary" />
                <span className="font-space text-[10px] tracking-widest uppercase">STATUS</span>
              </div>
              <p className="font-space text-sm text-primary font-bold uppercase tracking-widest">PROCESSED</p>
            </div>
          </div>
          
          <p className="text-[10px] font-space text-muted-foreground tracking-widest uppercase leading-relaxed text-center pt-2">
            A CONFIRMATION EMAIL HAS BEEN SENT TO YOUR INBOX.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            onClick={() => addNotification("Tracking feature coming soon!", "info")}
            className="flex-1 rounded-none border-primary text-primary hover:bg-primary hover:text-black h-16 font-space font-bold tracking-[0.2em] text-xs transition-all"
            variant="outline"
          >
            TRACK ORDER
          </Button>
          <Button
            onClick={() => setCurrentScreen("home")}
            className="flex-1 rounded-none bg-primary text-primary-foreground h-16 font-space font-bold tracking-[0.2em] text-xs shadow-brutal hover:bg-white transition-all group"
          >
            CONTINUE SHOPPING
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

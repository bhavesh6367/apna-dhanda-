"use client";

import { useShop } from "@/context/shop-context";
import { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ToastProvider() {
  const { notifications, removeNotification } = useShop();

  return (
    <div className="fixed bottom-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeNotification(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: any; onRemove: () => void }) {
  const [progress, setProgress] = useState(100);
  const duration = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - (100 / (duration / 100))));
    }, 100);

    const dismissTimer = setTimeout(onRemove, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(dismissTimer);
    };
  }, [onRemove]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    error: <AlertCircle className="w-4 h-4 text-destructive" />,
    info: <Info className="w-4 h-4 text-primary" />
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="pointer-events-auto w-80 bg-background border border-border shadow-brutal flex flex-col relative overflow-hidden"
    >
      <div className="flex gap-4 p-4 items-start">
        <div className="shrink-0 mt-0.5">
          {icons[toast.type as keyof typeof icons]}
        </div>
        
        <div className="flex-1 space-y-1">
          <p className="font-space text-[10px] font-bold tracking-widest uppercase text-foreground leading-tight">
            {toast.message}
          </p>
          {toast.undoAction && (
            <button 
              onClick={() => {
                toast.undoAction();
                onRemove();
              }}
              className="flex items-center gap-2 font-space text-[8px] tracking-widest uppercase text-primary hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> UNDO ACTION
            </button>
          )}
        </div>

        <button 
          onClick={onRemove}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-secondary w-full">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

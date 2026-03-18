import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-background border-b border-border overflow-hidden py-2" style={{ marginTop: '64px' }}>
      <div className="whitespace-nowrap animate-marquee flex items-center">
        <span className="font-space text-xs tracking-[0.2em] uppercase text-primary mx-4">
          FREE SHIPPING ABOVE ₹999 <span className="text-muted-foreground mx-4">·</span> 30-DAY EASY RETURNS <span className="text-muted-foreground mx-4">·</span> NEW DROP EVERY FRIDAY <span className="text-muted-foreground mx-4">·</span> BREAK THE GRID
        </span>
        <span className="font-space text-xs tracking-[0.2em] uppercase text-primary mx-4">
          FREE SHIPPING ABOVE ₹999 <span className="text-muted-foreground mx-4">·</span> 30-DAY EASY RETURNS <span className="text-muted-foreground mx-4">·</span> NEW DROP EVERY FRIDAY <span className="text-muted-foreground mx-4">·</span> BREAK THE GRID
        </span>
      </div>
    </div>
  );
}

import { Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";

export function TrustBar() {
  const features = [
    { icon: <Truck size={20} />, text: "FREE SHIPPING ABOVE ₹999" },
    { icon: <RotateCcw size={20} />, text: "30-DAY EASY RETURNS" },
    { icon: <ShieldCheck size={20} />, text: "SECURE PAYMENTS" },
    { icon: <Star size={20} />, text: "10K+ HAPPY CUSTOMERS" },
  ];

  return (
    <div className="bg-secondary border-y border-border py-4 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-primary whitespace-nowrap">
              {item.icon}
              <span className="font-space text-[10px] md:text-xs font-bold tracking-[0.2em]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

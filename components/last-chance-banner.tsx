import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LastChanceBanner() {
  return (
    <section className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden my-12">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
          alt="Last Chance Sale"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-sm md:text-lg font-bold tracking-[0.3em] text-white/90 uppercase mb-4">
          LAST CHANCE
        </h2>
        <h3 className="text-4xl md:text-7xl font-bold tracking-tighter text-white uppercase drop-shadow-lg mb-8">
          UP TO 30% OFF*
        </h3>
        <Link href="/sale">
          <Button 
            className="rounded-full px-10 py-6 text-sm md:text-base font-bold tracking-widest bg-white text-black hover:bg-black hover:text-white transition-all transform hover:scale-105"
          >
            SHOP SALE
          </Button>
        </Link>
      </div>
    </section>
  );
}

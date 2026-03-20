"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useShop } from "@/context/shop-context";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HERO_SLIDES } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
  const { setCurrentScreen } = useShop();

  return (
    <div className="w-full relative">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {HERO_SLIDES.map((slide) => (
            <CarouselItem key={slide.id} className="relative w-full h-[80vh] md:h-[95vh]">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-top filter brightness-75 grayscale-[20%]"
                  priority
                />
              </div>

              {/* Harsh Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl md:text-9xl font-bebas tracking-wider text-white leading-[0.8] mb-6 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-xl font-space tracking-[0.3em] text-primary uppercase mb-12">
                  {slide.subtitle}
                </p>
                <Button 
                  onClick={() => setCurrentScreen("category")}
                  className="rounded-none bg-primary text-primary-foreground font-space font-bold px-12 py-6 tracking-[0.3em] shadow-brutal hover:bg-white hover:text-black transition-all"
                >
                  {slide.cta}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-8 w-16 h-16 rounded-none bg-background/40 hover:bg-primary border-border text-white hover:text-primary-foreground backdrop-blur-md transition-all z-50 pointer-events-auto" />
          <CarouselNext className="right-8 w-16 h-16 rounded-none bg-background/40 hover:bg-primary border-border text-white hover:text-primary-foreground backdrop-blur-md transition-all z-50 pointer-events-auto" />
        </div>
      </Carousel>
    </div>
  );
}

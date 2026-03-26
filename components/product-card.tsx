"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { GlowCard } from "@/components/ui/spotlight-card";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    mrp: number;
    images: string[];
    colors: string[];
    badges: string[];
    fit: string;
    fabric: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { setCurrentScreen, setActiveProductId, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isProductInWishlist = isInWishlist(product.id);

  const handleProductClick = () => {
    setActiveProductId(product.id);
    setCurrentScreen("product");
  };

  return (
    <GlowCard
      customSize={true}
      glowColor="green"
      onClick={handleProductClick}
      className="group w-full cursor-pointer transition-transform duration-300 hover:-translate-y-1 p-2"
    >
      {/* Product Image Container */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A] w-full border border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] animate-pulse z-10" />
        )}
        
        <Image
          src={(isHovered && product.images[1]) ? product.images[1] : product.images[0]}
          alt={product.name}
          fill
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105 filter group-hover:brightness-110`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-background border border-border hover:border-primary transition-all z-20"
          aria-label="Add to wishlist"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isProductInWishlist ? 'fill-primary text-primary' : 'text-foreground'}`} 
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {product.badges.map((badge, idx) => (
            <div key={idx} className="bg-primary text-primary-foreground font-space font-bold px-2 py-0.5 text-[10px] tracking-widest uppercase shadow-brutal">
              {badge}
            </div>
          ))}
        </div>

        {/* Quick Add - Appears from bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="w-full bg-primary text-primary-foreground font-space font-bold py-3 text-xs tracking-[0.2em] shadow-brutal hover:bg-white transition-colors"
          >
            QUICK ADD
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-xs font-space text-muted-foreground tracking-widest uppercase truncate">{product.name}</h4>
          <span className="font-bebas text-xl tracking-wider text-primary">₹{product.price}</span>
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-space text-muted-foreground uppercase tracking-widest">
          <span>{product.fit}</span>
          <span className="line-through opacity-50">₹{product.mrp}</span>
        </div>

        {/* Options */}
        <div className="flex items-center gap-2 pt-2 border-t border-border mt-1">
          <div className="flex -space-x-1">
            {product.colors.map((color, index) => (
              <div 
                key={index}
                className="w-3 h-3 border border-background"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-[10px] font-space text-muted-foreground tracking-tighter uppercase">{product.fabric}</span>
        </div>
      </div>
    </GlowCard>
  );
}

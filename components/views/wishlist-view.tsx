"use client";

import { useShop } from "@/context/shop-context";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/dummy-data";

export function WishlistView() {
  const { wishlist, setCurrentScreen, toggleWishlist, addToCart } = useShop();

  const handleMoveToCart = (item: any) => {
    // Default to first size/color for quick move
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        size: product.sizes[0],
        color: product.colors[0],
        qty: 1
      });
      toggleWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 min-h-[60vh]">
      <div className="flex justify-between items-end mb-10 border-l-4 border-primary pl-6">
        <div>
          <h1 className="font-bebas text-5xl md:text-7xl tracking-widest uppercase">MY WISHLIST</h1>
          <p className="font-space text-muted-foreground text-xs md:text-sm tracking-[0.3em] mt-2 uppercase">
            {wishlist.length} ITEMS SAVED TO THE GRID
          </p>
        </div>
        <Button 
          variant="link" 
          onClick={() => setCurrentScreen("home")}
          className="font-space text-[10px] tracking-widest text-primary hover:text-white transition-colors p-0"
        >
          CONTINUE SHOPPING <ArrowRight className="w-3 h-3 ml-2" />
        </Button>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-24 flex flex-col items-center text-center gap-8 border border-dashed border-border/50">
          <Heart className="w-20 h-20 text-muted-foreground opacity-10" />
          <div className="space-y-3">
            <h2 className="font-bebas text-3xl tracking-widest uppercase">YOUR WISHLIST IS EMPTY</h2>
            <p className="font-space text-xs text-muted-foreground tracking-[0.2em] uppercase">DON'T LET THE GRID OVERTAKE YOU.</p>
          </div>
          <Button 
            onClick={() => setCurrentScreen("category")}
            className="rounded-none bg-primary text-primary-foreground font-space font-bold px-10 tracking-[0.2em] shadow-brutal hover:bg-white transition-all"
          >
            EXPLORE COLLECTIONS
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="group relative border border-border bg-card p-3 space-y-4">
              <button 
                onClick={() => toggleWishlist({ id: item.id })}
                className="absolute top-5 right-5 z-10 p-2 bg-background border border-border hover:border-primary transition-all shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div 
                className="relative aspect-[3/4] bg-muted overflow-hidden cursor-pointer"
                onClick={() => {
                  useShop().setActiveProductId(item.id);
                  setCurrentScreen("product");
                }}
              >
                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-space text-[10px] font-bold tracking-widest uppercase truncate">{item.name}</h4>
                  <span className="font-bebas text-xl tracking-wider text-primary">₹{item.price}</span>
                </div>
                <Button 
                  onClick={() => handleMoveToCart(item)}
                  className="w-full rounded-none h-11 bg-secondary hover:bg-primary hover:text-primary-foreground font-space font-bold tracking-widest text-[10px] transition-all"
                >
                  MOVE TO CART
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

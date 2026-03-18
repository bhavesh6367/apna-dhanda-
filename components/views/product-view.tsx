"use client";

import { useShop } from "@/context/shop-context";
import { PRODUCTS } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";

export function ProductView() {
  const { activeProductId, setCurrentScreen, toggleWishlist, isInWishlist, addToCart } = useShop();
  
  const product = useMemo(() => 
    PRODUCTS.find(p => p.id === activeProductId) || PRODUCTS[0], 
    [activeProductId]
  );

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [shake, setShake] = useState(false);

  const isProductInWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      qty: qty
    });
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-6 py-6 flex items-center gap-2 text-[10px] font-space tracking-widest uppercase text-muted-foreground overflow-hidden whitespace-nowrap">
        <button onClick={() => setCurrentScreen("home")} className="hover:text-primary transition-colors">HOME</button>
        <ChevronRight size={10} />
        <button onClick={() => setCurrentScreen("category")} className="hover:text-primary transition-colors">{product.category}</button>
        <ChevronRight size={10} />
        <span className="text-foreground truncate">{product.name}</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          
          {/* Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide md:w-24 shrink-0">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-[3/4] w-20 md:w-full border transition-all ${mainImage === img ? 'border-primary' : 'border-border hover:border-muted-foreground'}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-[3/4] flex-1 bg-muted group overflow-hidden border border-border">
              <Image 
                src={mainImage} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.map((badge, idx) => (
                  <div key={idx} className="bg-primary text-primary-foreground font-space font-bold px-3 py-1 text-[10px] tracking-widest uppercase shadow-brutal">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <h1 className="font-bebas text-4xl md:text-6xl tracking-wider leading-none">{product.name}</h1>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`shrink-0 p-3 border border-border hover:border-primary transition-all ${isProductInWishlist ? 'text-primary border-primary' : ''}`}
                >
                  <Heart className={`w-6 h-6 ${isProductInWishlist ? 'fill-primary' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#E8FF00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#E8FF00]' : 'opacity-30'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-space text-muted-foreground tracking-widest uppercase">
                  {product.rating} (156 REVIEWS)
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-bebas text-4xl tracking-widest text-primary">₹{product.price}</span>
                <span className="font-space text-sm text-muted-foreground line-through tracking-widest opacity-50">₹{product.mrp}</span>
                <span className="bg-destructive/10 text-destructive text-[10px] font-space font-bold px-2 py-1 tracking-widest uppercase">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-6 pt-4 border-t border-border">
              {/* Color Selector */}
              <div className="space-y-3">
                <h3 className="font-space text-xs font-bold tracking-widest uppercase flex justify-between">
                  Color <span>{selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 border-2 transition-all p-0.5 ${selectedColor === color ? 'border-primary' : 'border-background hover:border-muted-foreground'}`}
                    >
                      <div className="w-full h-full border border-border" style={{ backgroundColor: color.toLowerCase() }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className={`space-y-3 ${shake ? 'animate-shake' : ''}`}>
                <h3 className="font-space text-xs font-bold tracking-widest uppercase flex justify-between">
                  Size <span>{selectedSize || "SELECT ONE"}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "XXL"].map(size => {
                    const isOutOfStock = product.outOfStock.includes(size);
                    const isSelected = selectedSize === size;
                    return (
                      <button 
                        key={size}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border font-space text-xs transition-all relative ${
                          isSelected ? 'bg-primary text-black border-primary' : 
                          isOutOfStock ? 'opacity-30 cursor-not-allowed grayscale bg-secondary' : 'border-border hover:border-primary'
                        }`}
                      >
                        {size}
                        {isOutOfStock && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[1px] bg-foreground/50 rotate-45" /></div>}
                      </button>
                    );
                  })}
                </div>
                {shake && <p className="text-[10px] text-destructive font-bold tracking-widest uppercase">Please select a size first</p>}
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-space text-xs font-bold tracking-widest uppercase">Quantity</h3>
                <div className="flex items-center border border-border w-max bg-secondary/30">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus size={14} /></button>
                  <span className="w-12 text-center font-space font-bold">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(10, q + 1))} className="p-3 hover:bg-secondary transition-colors"><Plus size={14} /></button>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Button 
                  onClick={handleAddToCart}
                  className="rounded-none h-14 bg-primary text-primary-foreground font-space font-bold tracking-[0.2em] shadow-brutal hover:bg-white transition-all text-xs"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  ADD TO CART
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-none h-14 border-border font-space font-bold tracking-[0.2em] hover:bg-card transition-all text-xs"
                >
                  ORDER ON WHATSAPP
                </Button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-border">
              {[
                { icon: <Truck className="w-5 h-5" />, label: "Express Shipping" },
                { icon: <RotateCcw className="w-5 h-5" />, label: "30 Day Return" },
                { icon: <ShieldCheck className="w-5 h-5" />, label: "Premium Quality" },
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="text-primary">{f.icon}</div>
                  <span className="text-[8px] font-space tracking-widest uppercase text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Details Accordion */}
            <Accordion className="w-full font-space tracking-widest uppercase text-xs">
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">DETAILS</AccordionTrigger>
                <AccordionContent className="text-[10px] text-muted-foreground leading-relaxed py-4">
                  Fabric: {product.fabric}<br />
                  Fit: {product.fit}<br />
                  Model holds size L.<br />
                  Classic urban streetwear silhouette designed for ultimate comfort and durability.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care" className="border-border">
                <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">FABRIC & CARE</AccordionTrigger>
                <AccordionContent className="text-[10px] text-muted-foreground leading-relaxed py-4">
                  - Machine wash cold with similar colors.<br />
                  - Tumble dry low or hang dry in shade.<br />
                  - Do not iron directly on graphics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">SHIPPING & RETURNS</AccordionTrigger>
                <AccordionContent className="text-[10px] text-muted-foreground leading-relaxed py-4">
                  - Free shipping on orders above ₹999.<br />
                  - Delivered in 3-5 business days.<br />
                  - Easy 30-day returns and exchanges.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-24 space-y-10">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="font-bebas text-4xl md:text-5xl tracking-widest uppercase">YOU MAY ALSO LIKE</h2>
            <p className="font-space text-muted-foreground text-[10px] tracking-[0.3em] mt-2 uppercase">COMPLETE THE GRID VIBE.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 border-t border-border bg-background/80 backdrop-blur-md z-30 slide-up transform translate-y-0 shadow-2xl">
        <Button 
          onClick={handleAddToCart}
          className="w-full rounded-none h-14 bg-primary text-primary-foreground font-space font-bold tracking-[0.2em] shadow-brutal hover:bg-white transition-all text-xs"
        >
          {selectedSize ? `ADD ${selectedSize} TO CART` : "CHOOSE SIZE"}
        </Button>
      </div>
    </div>
  );
}

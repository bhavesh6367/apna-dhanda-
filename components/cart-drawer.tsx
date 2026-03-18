"use client";

import { useShop } from "@/context/shop-context";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, updateCartQty, removeFromCart } = useShop();
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryThreshold = 999;
  const deliveryFee = subtotal >= deliveryThreshold ? 0 : 79;
  const isCouponValid = coupon.toUpperCase() === "OFFGRIDS10";
  const discount = couponStatus === "success" ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  const handleApplyCoupon = () => {
    if (isCouponValid) {
      setCouponStatus("success");
    } else {
      setCouponStatus("error");
      setTimeout(() => setCouponStatus("idle"), 2000);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-card border-l border-border p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border flex flex-row items-center justify-between">
          <SheetTitle className="font-bebas text-2xl tracking-widest flex items-center gap-3">
            YOUR CART <span className="text-muted-foreground text-lg">({cart.length})</span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center gap-6">
            <ShoppingBag className="w-20 h-20 text-muted-foreground opacity-20" />
            <div className="space-y-2">
              <h3 className="font-bebas text-3xl tracking-wide">YOUR CART FEELS LIGHT.</h3>
              <p className="font-space text-xs text-muted-foreground tracking-widest uppercase">ADD SOME ENERGY TO THE GRID.</p>
            </div>
            <Button 
              onClick={() => setCartOpen(false)}
              className="rounded-none bg-primary text-primary-foreground font-space font-bold px-10 tracking-[0.2em] shadow-brutal hover:bg-white transition-all"
            >
              START SHOPPING
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Delivery Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-space tracking-widest uppercase mb-1">
                  <span>{subtotal >= deliveryThreshold ? "FREE DELIVERY UNLOCKED" : `ADD ₹${deliveryThreshold - subtotal} MORE FOR FREE DELIVERY`}</span>
                  <span>₹{deliveryThreshold}</span>
                </div>
                <div className="h-1 bg-secondary w-full relative">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${Math.min(100, (subtotal / deliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                    <div className="relative w-24 aspect-[3/4] bg-muted border border-border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-space text-[10px] font-bold tracking-widest uppercase leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground font-space tracking-widest uppercase">
                          <span>SIZE: {item.size}</span>
                          <span>|</span>
                          <div className="w-2 h-2" style={{ backgroundColor: item.color }} />
                          <span>{item.color}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-border">
                          <button 
                            onClick={() => updateCartQty(item.id, item.size, -1)}
                            className="p-1.5 hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-space font-bold">{item.qty}</span>
                          <button 
                            onClick={() => updateCartQty(item.id, item.size, 1)}
                            className="p-1.5 hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bebas text-xl tracking-wider text-primary">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="p-6 border-t border-border bg-card-glow space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="COUPON CODE" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className={`flex-1 bg-background border ${couponStatus === 'error' ? 'border-destructive' : 'border-border'} px-4 py-2 text-xs font-space tracking-widest focus:outline-none focus:border-primary uppercase`}
                />
                <Button 
                  onClick={handleApplyCoupon}
                  variant="outline"
                  className="rounded-none border-primary text-primary hover:bg-primary hover:text-black font-space font-bold text-xs tracking-widest px-6"
                >
                  APPLY
                </Button>
              </div>
              
              {couponStatus === 'success' && (
                <p className="text-[10px] text-success font-space tracking-widest uppercase">✓ ₹{discount} DISCOUNT APPLIED!</p>
              )}
              {couponStatus === 'error' && (
                <p className="text-[10px] text-destructive font-space tracking-widest uppercase">INVALID COUPON CODE</p>
              )}

              <div className="space-y-2 border-t border-border/50 pt-4">
                <div className="flex justify-between text-[10px] font-space text-muted-foreground tracking-widest uppercase">
                  <span>SUBTOTAL</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[10px] font-space text-muted-foreground tracking-widest uppercase">
                  <span>DELIVERY</span>
                  <span className={deliveryFee === 0 ? "text-success" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[10px] font-space text-success tracking-widest uppercase">
                    <span>DISCOUNT (10%)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between items-end pt-2">
                  <span className="font-bebas text-3xl tracking-widest uppercase text-foreground">TOTAL</span>
                  <span className="font-bebas text-4xl tracking-widest text-primary">₹{total}</span>
                </div>
              </div>

              <Button className="w-full rounded-none bg-primary text-primary-foreground font-space font-bold h-14 tracking-[0.3em] shadow-brutal hover:bg-white transition-all text-xs">
                PROCEED TO CHECKOUT
              </Button>
              <p className="text-center text-[8px] text-muted-foreground font-space tracking-[0.2em] uppercase">
                SECURE CHECKOUT BY GRID-PAY
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

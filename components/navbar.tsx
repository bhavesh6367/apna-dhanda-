"use client";

import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useShop } from "@/context/shop-context";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export function Navbar() {
  const { 
    cart, 
    wishlist, 
    setCurrentScreen, 
    setCartOpen, 
    setActiveCategory 
  } = useShop();
  const { triggerTransition, user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border bg-background/80 backdrop-blur-md h-16">
      <div className="container h-full mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger>
              <div role="button" tabIndex={0} className="inline-flex items-center justify-center p-2 hover:text-primary transition-colors md:hidden">
                <Menu size={24} />
                <span className="sr-only">Toggle Menu</span>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background border-r border-border p-6">
              <nav className="flex flex-col gap-6 mt-12 font-space uppercase tracking-widest text-lg">
                <button
                  onClick={() => {
                    setActiveCategory("t-shirts");
                    setCurrentScreen("category");
                  }}
                  className="text-left hover:text-primary transition-colors"
                >
                  T-Shirts
                </button>
                <button
                  onClick={() => {
                    setActiveCategory("vests");
                    setCurrentScreen("category");
                  }}
                  className="text-left hover:text-primary transition-colors"
                >
                  Vests
                </button>
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setCurrentScreen("category");
                  }}
                  className="text-left hover:text-primary transition-colors text-primary"
                >
                  New Drops
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          <button
            onClick={() => setCurrentScreen("home")}
            className="text-2xl md:text-3xl font-bebas tracking-[0.2em] flex items-center gap-2 group"
          >
            <span className="bg-primary text-primary-foreground px-2 py-0.5 group-hover:bg-white group-hover:text-black transition-colors">OFF</span>
            <span>GRIDS</span>
          </button>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-space text-[10px] tracking-[0.3em] uppercase font-bold">
          <button
            onClick={() => {
              setActiveCategory("t-shirts");
              setCurrentScreen("category");
            }}
            className="hover:text-primary transition-colors underline-offset-8 hover:underline"
          >
            MEN
          </button>
          <button
            onClick={() => {
              setActiveCategory("vests");
              setCurrentScreen("category");
            }}
            className="hover:text-primary transition-colors underline-offset-8 hover:underline"
          >
            WOMEN
          </button>
          <button
            onClick={() => {
              setActiveCategory(null);
              setCurrentScreen("category");
            }}
            className="text-primary hover:opacity-80 transition-opacity"
          >
            NEW DROPS
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH THE GRID..."
              className="bg-secondary/50 border border-border px-10 py-2 text-[10px] font-space tracking-widest focus:outline-none focus:border-primary w-40 md:w-64 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent group"
              onClick={() => setCurrentScreen("wishlist")}
            >
              <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlistCount > 0 ? 'fill-primary text-primary' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-none shadow-brutal">
                  {wishlistCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent group"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-none shadow-[2px_2px_0_#E8FF00]">
                  {cartCount}
                </span>
              )}
            </Button>

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex rounded-none font-space font-bold tracking-widest text-[10px] h-9 px-6 border border-[#2A2A2A] hover:bg-neutral-900 transition-all"
                onClick={logout}
              >
                LOGOUT ({user?.name.split(" ")[0]})
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="hidden lg:flex rounded-none bg-primary text-primary-foreground font-space font-bold tracking-widest text-[10px] h-9 px-6 shadow-brutal hover:bg-white hover:text-black transition-all"
                onClick={() => {
                  triggerTransition(() => router.push("/login"));
                }}
              >
                <User className="w-3.5 h-3.5 mr-2" />
                LOGIN
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

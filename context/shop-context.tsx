"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "@/lib/dummy-data";

export type Screen = "home" | "category" | "product" | "wishlist";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
}

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateCartQty: (id: string, size: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  
  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: any) => void;
  isInWishlist: (id: string) => boolean;
  
  // Navigation
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  
  // Filters
  filters: {
    sizes: string[];
    priceRange: [number, number];
    fits: string[];
    colors: string[];
    sort: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;

  // Notifications
  notifications: any[];
  addNotification: (message: string, type: "success" | "error" | "info", undoAction?: () => void) => void;
  removeNotification: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    sizes: [] as string[],
    priceRange: [299, 2999] as [number, number],
    fits: [] as string[],
    colors: [] as string[],
    sort: "newest"
  });

  const [notifications, setNotifications] = useState<any[]>([]);

  const addNotification = (message: string, type: "success" | "error" | "info" = "success", undoAction?: () => void) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications((prev) => [...prev, { id, message, type, undoAction }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("offgrids_cart");
    const savedWishlist = localStorage.getItem("offgrids_wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("offgrids_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("offgrids_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Actions
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
    addNotification(`${item.name} added to cart!`, "success");
  };

  const removeFromCart = (id: string, size: string) => {
    const itemToRemove = cart.find(i => i.id === id && i.size === size);
    if (!itemToRemove) return;

    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    
    addNotification(`Removed ${itemToRemove.name} from cart`, "info", () => {
      setCart((prev) => [...prev, itemToRemove]);
    });
  };

  const updateCartQty = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, qty: Math.max(1, Math.min(10, i.qty + delta)) } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist Actions
  const toggleWishlist = (product: any) => {
    const exists = wishlist.some((i) => i.id === product.id);
    if (exists) {
      const itemToRemove = wishlist.find(i => i.id === product.id);
      setWishlist((prev) => prev.filter((i) => i.id !== product.id));
      addNotification("Removed from wishlist", "info", () => {
        if (itemToRemove) setWishlist(prev => [...prev, itemToRemove]);
      });
    } else {
      const newItem = { id: product.id, name: product.name, image: product.images[0], price: product.price };
      setWishlist((prev) => [...prev, newItem]);
      addNotification("Added to wishlist!", "success");
    }
  };

  const isInWishlist = (id: string) => wishlist.some((i) => i.id === id);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isCartOpen,
        setCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentScreen,
        setCurrentScreen,
        activeProductId,
        setActiveProductId,
        activeCategory,
        setActiveCategory,
        filters,
        setFilters,
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
}

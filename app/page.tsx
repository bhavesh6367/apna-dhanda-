"use client";

import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { useShop } from "@/context/shop-context";

// Views
import { HomeView } from "@/components/views/home-view";
import { CategoryView } from "@/components/views/category-view";
import { ProductView } from "@/components/views/product-view";
import { WishlistView } from "@/components/views/wishlist-view";
import { CartDrawer } from "@/components/cart-drawer";
import { ToastProvider } from "@/components/toast-provider";
import { CheckoutView } from "@/components/views/checkout-view";
import { OrderSuccessView } from "@/components/views/order-success-view";
import CheckoutTransition from "@/components/animations/checkout-transition";
import ScrollToTop from "@/components/scroll-to-top";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { currentScreen, checkoutTransitioning } = useShop();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 w-full bg-background pt-0">
        <AnimatePresence mode="wait">
          {currentScreen === "home" && <HomeView key="home" />}
          {currentScreen === "category" && <CategoryView key="category" />}
          {currentScreen === "product" && <ProductView key="product" />}
          {currentScreen === "wishlist" && <WishlistView key="wishlist" />}
          {currentScreen === "checkout" && <CheckoutView key="checkout" />}
          {currentScreen === "orderSuccess" && <OrderSuccessView key="orderSuccess" />}
        </AnimatePresence>
      </main>

      <CheckoutTransition
        isVisible={checkoutTransitioning}
        variant={currentScreen === "orderSuccess" ? "success" : "checkout"}
      />

      <CartDrawer />
      <ToastProvider />
      <Footer />
    </div>
  );
}

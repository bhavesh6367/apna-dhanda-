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

export default function Home() {
  const { currentScreen } = useShop();

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1 w-full bg-background pt-0">
        {currentScreen === "home" && <HomeView />}
        {currentScreen === "category" && <CategoryView />}
        {currentScreen === "product" && <ProductView />}
        {currentScreen === "wishlist" && <WishlistView />}
      </main>

      <CartDrawer />
      <ToastProvider />
      <Footer />
    </div>
  );
}

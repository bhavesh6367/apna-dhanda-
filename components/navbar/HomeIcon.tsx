"use client";

import React from 'react';
import { Home } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useShop } from "@/context/shop-context";

const HomeIcon = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentScreen, setCurrentScreen } = useShop();
  const isHome = pathname === '/' && currentScreen === 'home';

  const handleHomeClick = () => {
    if (isHome) {
      // Already on home — just scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
      setCurrentScreen("home");
      // Scroll to top after navigation
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
    }
  };

  return (
    <button
      onClick={handleHomeClick}
      aria-label="Go to homepage"
      title="Home"
      className={`
        relative flex items-center justify-center
        w-9 h-9 rounded-sm
        border border-transparent
        transition-all duration-200 ease-in-out
        group focus-visible:outline-2 focus-visible:outline-[#E8FF00] focus-visible:outline-offset-2
        ${isHome
          ? 'border-[#E8FF00] text-[#E8FF00]'        // active state — on homepage
          : 'text-muted-foreground hover:text-[#E8FF00]'    // default + hover
        }
      `}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleHomeClick();
      }}
    >
      <Home
        size={18}
        strokeWidth={1.8}
        className="transition-transform duration-200 group-hover:scale-110"
      />
      {/* Active indicator dot — only shows when NOT on homepage */}
      {!isHome && (
        <span className="
          absolute -bottom-1 left-1/2 -translate-x-1/2
          w-1 h-1 rounded-full bg-[#E8FF00]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        " />
      )}
    </button>
  );
};

export default React.memo(HomeIcon);

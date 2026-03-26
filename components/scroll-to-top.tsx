"use client";

import { useEffect } from 'react';
import { useShop } from '@/context/shop-context';

const ScrollToTop = () => {
  const { currentScreen, activeProductId } = useShop();

  useEffect(() => {
    // Instant scroll on product detail view, smooth for others
    const isProductPage = currentScreen === 'product';

    window.scrollTo({
      top: 0,
      behavior: isProductPage ? 'instant' : 'smooth'
    });
  }, [currentScreen, activeProductId]);

  return null;
};

export default ScrollToTop;

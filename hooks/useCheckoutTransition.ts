import { useShop } from "@/context/shop-context";
import { useCallback } from "react";

export const useCheckoutTransition = () => {
  const { setCheckoutTransitioning, setCurrentScreen } = useShop();

  const proceedToCheckout = useCallback(() => {
    // 1. Show the full screen branded transition
    setCheckoutTransitioning(true);

    // 2. Wait for the transition to cover the screen (1.8s)
    setTimeout(() => {
      // 3. Switch to checkout view
      setCurrentScreen("checkout");
      
      // 4. Fade out transition after a small delay to ensure checkout is ready
      setTimeout(() => {
        setCheckoutTransitioning(false);
      }, 300);
    }, 1800);
  }, [setCheckoutTransitioning, setCurrentScreen]);

  const proceedToSuccess = useCallback(() => {
    setCheckoutTransitioning(true);
    setTimeout(() => {
      setCurrentScreen("orderSuccess");
      setTimeout(() => {
        setCheckoutTransitioning(false);
      }, 1500); // Keep green transition longer for success
    }, 2000);
  }, [setCheckoutTransitioning, setCurrentScreen]);

  return { proceedToCheckout, proceedToSuccess };
};

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useCheckoutTransition } from './useCheckoutTransition';

export const useCheckoutAuthGate = () => {
  const { isAuthenticated } = useAuth();
  const { proceedToCheckout } = useCheckoutTransition();
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleProceedClick = () => {
    if (isAuthenticated) {
      // ✅ Logged in — go straight to brand transition + checkout
      proceedToCheckout();
    } else {
      // ❌ Not logged in — show auth popup
      setShowAuthGate(true);
    }
  };

  const onAuthSuccess = () => {
    // Called after successful login/register
    setShowAuthGate(false);
    // Slight delay before transition for smoother feel
    setTimeout(() => proceedToCheckout(), 300);
  };

  return {
    showAuthGate,
    setShowAuthGate,
    authMode,
    setAuthMode,
    handleProceedClick,
    onAuthSuccess,
  };
};

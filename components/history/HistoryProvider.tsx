"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initHistoryGuard } from '@/utils/history-guard';

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    initHistoryGuard();

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      
      // If the state we're popping into has NO internal marker
      // → user is about to leave the app
      if (!state?.internal && !state?.offgrids) {
        // Prevent leaving — push home back
        event.preventDefault?.();
        router.replace('/');
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [router]);

  return <>{children}</>;
}

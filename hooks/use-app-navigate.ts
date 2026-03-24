"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { markHistoryEntry } from '../utils/history-guard';

/**
 * Smart back navigation hook. Next.js adapted.
 */
export const useAppNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  const appNavigate = useCallback((
    path: string,
    options?: { scroll?: boolean }
  ) => {
    // Mark current page as internal before leaving it
    markHistoryEntry(pathname);
    router.push(path, options);
  }, [router, pathname]);

  const goBack = useCallback(() => {
    // Check if the history state was marked as internal by our app
    const prevStateIsInternal = typeof window !== 'undefined' && window.history.state?.internal === true;
    
    // Check if there's actual history to go back to (history.length > 1)
    const hasHistory = typeof window !== 'undefined' && window.history.length > 1;

    if (hasHistory && prevStateIsInternal) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);

  return { appNavigate, goBack };
};

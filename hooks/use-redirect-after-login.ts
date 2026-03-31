"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useRedirectAfterLogin() {
  const router = useRouter();

  const redirectAfterLogin = useCallback((role: string) => {
    const intendedPath = sessionStorage.getItem("redirectAfterLogin");
    
    if (intendedPath) {
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(intendedPath);
      return;
    }

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }, [router]);

  return { redirectAfterLogin };
}

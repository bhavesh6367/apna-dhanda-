"use client";

import { useRouter } from "next/navigation";

export function useRedirectAfterLogin() {
  const router = useRouter();

  const redirectAfterLogin = (role: string) => {
    const intendedPath = sessionStorage.getItem("redirectAfterLogin");
    
    if (intendedPath) {
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(intendedPath);
      return;
    }

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return { redirectAfterLogin };
}

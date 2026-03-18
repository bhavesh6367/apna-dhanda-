"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance, { setAccessToken } from "@/lib/axiosInstance";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  triggerTransition: (callback: () => void) => void;
  isTransitioning: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check for session on boot
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await axiosInstance.post("/auth/refresh");
        setAccessToken(data.accessToken);
        const userRes = await axiosInstance.get("/auth/me");
        setUser(userRes.data.user);
      } catch (err) {
        // Not logged in or refresh failed
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (credentials: any) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (err) {
      throw err;
    }
  };

  const register = async (formData: any) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", formData);
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsTransitioning(false), 1000);
    }, 2400);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        triggerTransition,
        isTransitioning,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

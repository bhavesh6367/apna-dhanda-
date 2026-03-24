import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OFFGRIDS | Disrupt the Grid",
  description: "Raw, urban streetwear. Oversized fits and premium heavy gauge fabric.",
};

import { ShopProvider } from "@/context/shop-context";
import { AuthProvider } from "@/context/auth-context";
import { LoginTransition } from "@/components/animations/login-transition";
import { HistoryProvider } from "@/components/history/HistoryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bebas.variable} ${dmSans.variable} ${spaceMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ShopProvider>
          <AuthProvider>
            <HistoryProvider>
              <LoginTransition />
              {children}
            </HistoryProvider>
          </AuthProvider>
        </ShopProvider>
      </body>
    </html>
  );
}

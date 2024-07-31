import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/context/ThemeContext";
import TopBar from "@/components/TopBar";
import NextAuthSessionProvider from "@/context/AuthContext";

import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import LoadingHome from "@/components/LoadingHome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Expense tracker",
  description: "Application to track expenses",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <NextAuthSessionProvider>
              <TopBar />
              <Suspense fallback={<LoadingHome />}>{children}</Suspense>
              <Toaster />
              <Analytics />
              <SpeedInsights />
            </NextAuthSessionProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

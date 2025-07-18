import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "./components/lib/theme_provider/theme_provider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Footer from "./components/body/body/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@weight_mangement_app",
  description: "Weight Management App made by @cleveclayton",
};
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>{children} <Footer/></Providers>
            <Toaster />
          </ThemeProvider>
        </Suspense>
        
      </body>
    </html>
  );
}

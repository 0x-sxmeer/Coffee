import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import NoiseOverlay from "@/components/NoiseOverlay";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "HOMIE Coffee",
  description: "Pure Origin. Made for the Homies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-homie-green text-white/90 antialiased`}>
        <CartProvider>
          <CartDrawer />
          <SmoothScrolling>
            <NoiseOverlay />
            {children}
          </SmoothScrolling>
        </CartProvider>
      </body>
    </html>
  );
}

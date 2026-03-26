import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import FastrrInterceptor from "@/components/FastrrInterceptor";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LUVRA Studios | Architectural Luxury Denim Archive",
    template: "%s | LUVRA Studios"
  },
  description: "High-end cinematic denim atelier. Engineering high-fidelity selvedge for the modern vanguard. Worldwide shipping from Tokyo Ground Zero.",
  keywords: ["luxury denim", "selvedge jeans", "architectural clothing", "LUVRA studios", "french luxury denim", "LUVRA archive"],
  authors: [{ name: "LUVRA Studios" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luvra-studios.com",
    title: "LUVRA Studios | Architectural Denim",
    description: "The science of movement meets raw selvedge. Explore the LUVRA archive.",
    siteName: "LUVRA Studios",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUVRA Studios",
    description: "Engineering the future of luxury denim.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <CartProvider>
          <PageLoader />
          <CartDrawer />
          <SmoothScroll>
            <CustomCursor />
            <Navigation />
            {children}
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}


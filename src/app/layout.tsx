// MASTER_SYNC_DEPLOYMENT_ACTIVE: 2026-04-03
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}

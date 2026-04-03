"use client";
import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

import Script from "next/script";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script 
        src="https://sdk.cashfree.com/js/v3/cashfree.js" 
        strategy="afterInteractive" 
        onLoad={() => console.log("Cashfree SDK Loaded Ready.")}
      />
      <Navigation />
      <CartDrawer />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}

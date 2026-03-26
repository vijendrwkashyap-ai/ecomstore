"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="bg-background min-h-screen text-foreground py-40 md:py-60 px-6">
       <div className="max-w-[800px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-6">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/20">Legal Framework // 0.1</span>
             <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter">Privacy<br/>Protocol</h1>
          </div>

          <div className="flex flex-col gap-16 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-loose text-foreground/60">
             <section className="flex flex-col gap-6">
                <h3 className="text-foreground text-sm tracking-widest">1. DATA HARVESTING</h3>
                <p>WE ONLY COLLECT THE CORE BIOMETRIC DATA POINTS REQUIRED TO FACILITATE A SECURE ARCHITECTURAL TRANSACTION. THIS INCLUDES SHIPPING COORDINATES, DIGITAL IDENTIFIERS, AND TRANSACTIONAL PAYLOADS.</p>
             </section>

             <section className="flex flex-col gap-6">
                <h3 className="text-foreground text-sm tracking-widest">2. QUANTUM SECURITY</h3>
                <p>EVERY DATA PACKET TRANSMITTED THROUGH OUR E-COMMERCE ENGINE IS ENCRYPTED USING STAGE-4 PROTOCOLS. WE DO NOT STORE RAW PAYMENT DATA. TRANSACTIONS ARE ROUTED DIRECTLY THROUGH SHOPIFY'S GLOBAL SECURE NODES.</p>
             </section>

             <section className="flex flex-col gap-6 font-black text-foreground">
                <p>BY OPERATING WITHIN THE DENIMX SYSTEM, YOU ACKNOWLEDGE AND CONSENT TO OUR DATA ARCHITECTURE PROTOCOLS.</p>
             </section>
          </div>
       </div>
    </main>
  );
}

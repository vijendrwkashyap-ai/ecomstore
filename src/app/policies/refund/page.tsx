"use client";
import React from "react";

export default function RefundPolicy() {
  return (
    <main className="bg-background min-h-screen text-foreground py-40 md:py-60 px-6">
       <div className="max-w-[800px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-6">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/20">Quality Control // 0.1</span>
             <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter">Returns &<br/>Refunds</h1>
          </div>

          <div className="flex flex-col gap-16 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-loose text-foreground/60">
             <section className="flex flex-col gap-6">
                <h3 className="text-foreground text-sm tracking-widest">1. RETURN WINDOW</h3>
                <p>YOU HAVE 14 DAYS FROM THE DATE OF DELIVERY TO INITIATE A RETURN PROTOCOL. ITEMS MUST BE UNWORN, UNWASHED, AND IN ORIGINAL ARCHITECTURAL HOUSING (PACKAGING).</p>
             </section>

             <section className="flex flex-col gap-6">
                <h3 className="text-foreground text-sm tracking-widest">2. NON-RETURNABLE DATA</h3>
                <p>LIMITED EDITION 'VANGUARD' RELEASES AND CUSTOM SCULPTED ORDERS CANNOT BE RETURNED ONCE THE SEAL IS BROKEN.</p>
             </section>

             <section className="flex flex-col gap-6">
                <h3 className="text-foreground text-sm tracking-widest">3. CREDIT CYCLE</h3>
                <p>ONCE QUALITY CONTROL ACCEPTS THE RETURN, REFUNDS ARE PROCESSED THROUGH THE ORIGINAL TRANSACTION NODE WITHIN 5-10 BUSINESS DAYS.</p>
             </section>
          </div>
       </div>
    </main>
  );
}

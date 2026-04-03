"use client";
import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 font-sans text-black bg-white">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase block">Post-Acquisition</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter transition-all">Refund<br/>& Returns</h1>
        </header>

        <div className="space-y-10 text-[11px] text-zinc-500 font-medium leading-[2.2] uppercase tracking-widest">
            <section className="space-y-4">
                <h2 className="text-[11px] font-black text-black">01. 7-Day Window</h2>
                <p>Radha Enterprises offers a 7-day return protocol from the date of archive acquisition. Pieces must be in original condition with all tags and archival packaging intact.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">02. Exclusion Protocols</h2>
                <p>Certain limited-edition or high-fidelity custom archive pieces may be final sale. This will be indicated on the specific product module.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">03. Financial Logistics</h2>
                <p>Refunds are processed to the original payment node within 5-7 business days of piece verification at our New Delhi Archive Node facility.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">04. Contact Initialization</h2>
                <p>To initialize a return protocol, contact the support node: refund@luvra-studios.com.</p>
            </section>
        </div>
      </div>
    </div>
  );
}

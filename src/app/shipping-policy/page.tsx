"use client";
import React from "react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 font-sans text-black bg-white">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase block">Global Transit</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter transition-all">Shipping<br/>Protocol</h1>
        </header>

        <div className="space-y-10 text-[11px] text-zinc-500 font-medium leading-[2.2] uppercase tracking-widest">
            <section className="space-y-4">
                <h2 className="text-[11px] font-black text-black">01. Transit Velocity</h2>
                <p>Standard archive transit takes 3-5 business days for domestic sectors and 7-10 business days for international logistics nodes. All pieces are managed by Radha Enterprises.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">02. Node Verification</h2>
                <p>Tracking signatures are issued via email within 24-48 hours of archive acquisition. Real-time telemetry is available through our logistics partner nodes.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10 font-black text-black opacity-40">
                <h2 className="text-[11px]">03. Customs Protocol</h2>
                <p>International sectors may be subject to local import duties and Node taxes, which are the responsibility of the acquiring User.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">04. Lost Archive Protocol</h2>
                <p>Radha Enterprises provides 100% insurance for archives lost in transit velocity between the source and destination node.</p>
            </section>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 font-sans text-black bg-white">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase block">Archive Security</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Privacy<br/>Policy</h1>
        </header>

        <div className="space-y-10 text-[11px] text-zinc-500 font-medium leading-[2.2] uppercase tracking-widest">
            <section className="space-y-4">
                <h2 className="text-[11px] font-black text-black">01. Data Harvesting</h2>
                <p>We collect essential identity metrics including email, location nodes, and transaction signatures to process archive acquisitions. No data is shared with third-party sectors without direct authorization.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">02. Protocol Encryption</h2>
                <p>All transaction data is encrypted via SSL/TLS protocols to ensure secure transit (Verfied by Radha Enterprises).</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10 line-through opacity-40">
                <h2 className="text-[11px] font-black text-black">03. Telemetry Sharing</h2>
                <p>Third-party analytics are used strictly for user experience optimization within the LUVRA ecosystem.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">04. Contact Verification</h2>
                <p>Direct all data inquiries to the Archive Sector via contact@luvra-studios.com.</p>
            </section>
        </div>
      </div>
    </div>
  );
}

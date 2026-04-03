"use client";
import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 font-sans text-black bg-white">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase block">User Agreement</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter transition-all">Terms<br/>& Conditions</h1>
        </header>

        <div className="space-y-10 text-[11px] text-zinc-500 font-medium leading-[2.2] uppercase tracking-widest">
            <section className="space-y-4">
                <h2 className="text-[11px] font-black text-black">01. Identity Usage</h2>
                <p>Welcome to LUVRA Studios, operated under Radha Enterprises. By accessing this archive, users agree to the following protocols and user agreements.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">02. Acquisition Protocols</h2>
                <p>Archive pieces listed on this site are subject to availability. Radha Enterprises reserves the right to cancel transactions if identity or payment verification fails.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10">
                <h2 className="text-[11px] font-black text-black">03. IP Ownership</h2>
                <p>All designs, editorial photography, and kinematic architecture are the exclusive property of Radha Enterprises and LUVRA Studios archive.</p>
            </section>

            <section className="space-y-4 border-t border-black/5 pt-10 font-black text-black opacity-40">
                <h2 className="text-[11px]">04. Legal Jurisdiction</h2>
                <p>Any disputes arising from these protocols will be settled under the jurisdiction of New Delhi Node legal systems.</p>
            </section>
        </div>
      </div>
    </div>
  );
}

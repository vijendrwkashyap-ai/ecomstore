"use client";
import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 font-sans text-black bg-white">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-400 tracking-[0.4em] uppercase block">Global Reach</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter transition-all">Support<br/>Protocol</h1>
        </header>

        <div className="space-y-10">
            {/* Legal Entity */}
            <div className="space-y-3">
                <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black border-b border-black pb-3 w-fit">01. Legal Entity Identification</h2>
                <p className="text-[13px] font-bold uppercase tracking-tight text-black">Radha Enterprises</p>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Authorized Archive Piece Logistics Sector Headquarters.</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
                <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black border-b border-black pb-3 w-fit">02. Communication Node</h2>
                <p className="text-[13px] font-bold uppercase tracking-tight text-black leading-relaxed">Email Verification: contact@luvra-studios.com</p>
                <p className="text-[13px] font-bold uppercase tracking-tight text-black leading-relaxed">Direct Communication: +91 9123456789</p>
            </div>

            {/* Address */}
            <div className="space-y-3">
                <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black border-b border-black pb-3 w-fit">03. Physical Archive Node</h2>
                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest leading-loose">
                    Phase-1 Archive Facility<br/>Industrial Sector Node 12<br/>New Delhi, IN 110001
                </p>
            </div>

            <div className="pt-10 border-t border-black/10">
                <p className="text-[9px] text-zinc-400 font-bold text-center uppercase tracking-[0.2em]">Operating Identity: Radha Enterprises (HQ Tokyo - New Delhi Branch)</p>
            </div>
        </div>
      </div>
    </div>
  );
}

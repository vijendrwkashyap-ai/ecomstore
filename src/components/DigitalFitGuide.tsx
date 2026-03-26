"use client";
import React from "react";
import Link from "next/link";

export default function DigitalFitGuide() {
  return (
    <section className="w-full py-40 bg-foreground text-background border-y border-foreground px-6 overflow-hidden relative">
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <span className="text-[50vw] font-black leading-none">FIT</span>
       </div>
       
       <div className="max-w-[70vw] mx-auto flex flex-col gap-20 relative z-10 text-center items-center">
          <div className="flex flex-col gap-6">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-background/30">09 Sizing Engine</span>
             <h2 className="title-primary text-background" style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', lineHeight: 0.85 }}>Sculpt Your<br/>Silhouettes</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 w-full pt-20 border-t border-background/10">
             {[
               { label: "Ankle Opening", val: "14 CM" },
               { label: "Knee Tension", val: "ACTIVE" },
               { label: "Waist Lock", val: "REINFORCED" },
               { label: "Hip Taper", val: "3D MAPPED" }
             ].map((s, i) => (
                <div key={i} className="flex flex-col gap-4">
                   <span className="text-[8rem] font-black text-white/5 absolute -z-10 -translate-x-10 translate-y-10">{i+1}</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-background/40">{s.label}</span>
                   <span className="text-xl font-bold uppercase tracking-tighter">{s.val}</span>
                </div>
             ))}
          </div>

          <p className="text-[10px] font-bold text-background/50 max-w-xl uppercase tracking-[0.2em] leading-loose pt-10">Our digital fit guide uses your biometric coordinates to recommend the exact selvedge profile for your body geometry.</p>
          <Link href="/about" className="btn-luxury border-background text-background hover:bg-background hover:text-foreground block text-center">LAUNCH SIZER</Link>
       </div>
    </section>
  );
}

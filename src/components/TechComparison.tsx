"use client";
import React from "react";

export default function TechComparison() {
  const features = [
    { label: "Fabric Weight", vanguard: "14.5 OZ", standard: "10.0 OZ" },
    { label: "Stitch Density", vanguard: "18 SPI", standard: "10 SPI" },
    { label: "Hardware", vanguard: "Ti-Titanium", standard: "Basic Zinc" },
    { label: "Fiber Tech", vanguard: "Reactive Core", standard: "Static Cotton" },
    { label: "Longevity", vanguard: "98.8%", standard: "45.0%" },
  ];

  return (
    <section className="w-full py-40 bg-background text-foreground px-6 border-y border-accent overflow-hidden">
       <div className="max-w-[70vw] mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-4 text-center">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/30">04 Comparison Matrix</span>
             <h2 className="title-primary text-foreground" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.85 }}>The Vanguard<br/>Advantage</h2>
          </div>
          
          <div className="flex flex-col border-t border-accent">
             {features.map((f, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-10 border-b border-accent group hover:bg-accent transition-colors duration-500 px-6">
                   <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 group-hover:text-foreground transition-colors">{f.label}</span>
                   <span className="text-2xl font-bold uppercase tracking-tighter text-foreground text-center md:text-left pt-4 md:pt-0">VANGUARD: {f.vanguard}</span>
                   <span className="text-xs font-bold uppercase tracking-widest text-foreground/20 text-right self-center pt-2 md:pt-0">Standard: {f.standard}</span>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

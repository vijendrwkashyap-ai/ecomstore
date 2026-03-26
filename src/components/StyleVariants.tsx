"use client";
import React from "react";

export default function StyleVariants() {
  return (
    <section className="w-full bg-background border-t border-accent py-40 px-6 md:px-20">
      <div className="max-w-[90vw] mx-auto flex flex-col gap-24">
        <h2 className="title-primary" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>Fit Architecture</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-foreground pt-16 gap-x-10 gap-y-16">
           {['SLIM FIT', 'BAGGY UTILITY', 'CARGO TACTICAL', 'SUMMER SHORTS'].map((variant, i) => (
             <div key={i} className="flex flex-col gap-6 group">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/30 group-hover:text-foreground transition-colors duration-500">0{i+1}</span>
                <h3 className="title-primary" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}>{variant}</h3>
                <div className="w-full h-[1px] bg-accent mt-4 group-hover:bg-foreground transition-colors duration-500" />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

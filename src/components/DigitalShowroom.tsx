"use client";
import React from "react";
import Link from "next/link";

export default function DigitalShowroom() {
  return (
    <section className="w-full h-screen bg-background relative overflow-hidden flex items-center justify-center p-6 border-t border-accent">
       <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[40vw] font-black uppercase tracking-tighter leading-none select-none">DX-V6</h1>
       </div>
       
       <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 max-w-[90vw] items-center">
          <div className="flex flex-col gap-10">
             <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/30">08 Digital Showroom</span>
                <h2 className="title-primary" style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', lineHeight: 0.85 }}>3D Sculpted<br/>Fit Matrix</h2>
             </div>
             <p className="text-body max-w-sm font-bold text-foreground/50 uppercase text-[10px] tracking-[0.2em] leading-loose">We scan every denim pattern into a volumetric fit simulator to ensure zero interference with human kinetic movement. Every coordinate is mathematically perfect.</p>
             <Link href="/about" className="btn-luxury w-max mt-6 block text-center">Enter Virtual Studio</Link>
          </div>
          
          <div className="w-full aspect-square border border-foreground/10 p-10 bg-accent relative group overflow-hidden shadow-2xl">
             <div className="absolute top-10 right-10 flex flex-col gap-2 items-end z-20">
                <span className="text-[8px] font-black tracking-[0.5em] uppercase whitespace-nowrap">SCANNING COORDINATE X-09 //ACTIVE</span>
                <div className="w-20 h-[1px] bg-foreground/30 animate-pulse" />
             </div>
             <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773680237_9191473.jpg?w=1200" 
                  className="w-full h-full object-cover grayscale opacity-100 scale-110 group-hover:scale-100 transition-transform duration-[3s]" alt="Scan" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[1px] bg-foreground/10 absolute rotate-45" />
                <div className="w-[80%] h-[1px] bg-foreground/10 absolute -rotate-45" />
                <div className="w-32 h-32 border border-foreground/5 rounded-full animate-ping" />
             </div>
          </div>
       </div>
    </section>
  );
}

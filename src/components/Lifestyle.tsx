"use client";
import React from "react";
import Link from "next/link";

export default function Lifestyle() {
  return (
    <section className="w-full min-h-screen bg-background border-t border-accent flex flex-col items-center justify-center py-40 px-6">
      <div className="max-w-[95vw] mx-auto w-full flex flex-col gap-32">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-8">
             <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30">06 Lookbook</span>
             <h2 className="title-primary" style={{ fontSize: 'clamp(4rem, 10vw, 12rem)', lineHeight: 0.8 }}>Vibe Check</h2>
          </div>
          <p className="text-body max-w-xs md:text-right font-bold text-foreground/50 uppercase tracking-widest text-xs">Designed for the urban explorer. A seamless transition from the industrial studio to the dark city streets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
           <div className="md:col-span-8 w-full aspect-[16/10] bg-accent overflow-hidden shadow-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729844724_9155916.jpg?w=1200" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 object-top" alt="Lifestyle Hero" />
           </div>
           
           <div className="md:col-span-4 flex flex-col gap-8 h-full">
              <div className="w-full aspect-[4/5] bg-accent overflow-hidden shadow-sm group">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=1000" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 object-top" alt="Lifestyle Detail" />
              </div>
              <div className="bg-foreground text-background p-10 flex flex-col gap-6 shadow-2xl">
                 <h4 className="text-2xl font-bold uppercase tracking-tighter">Night Ops</h4>
                 <p className="text-[10px] leading-relaxed opacity-60 font-bold uppercase tracking-[0.2em]">Deep indigo tones designed to disappear into the night while providing reflective safety via our hidden selvedge threads.</p>
                 <Link href="/shop" className="btn-luxury border-background text-background hover:bg-background hover:text-foreground mt-4 block text-center">Shop The Look</Link>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

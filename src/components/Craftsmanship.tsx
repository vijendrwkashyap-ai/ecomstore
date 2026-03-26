"use client";
import React from "react";
import Link from "next/link";

export default function Craftsmanship() {
  return (
    <section className="w-full py-40 bg-[#fff] text-foreground border-y border-accent px-6 overflow-hidden">
      <div className="max-w-[95vw] mx-auto flex flex-col gap-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
           <h2 className="title-primary text-foreground" style={{ fontSize: 'clamp(4rem, 10vw, 12rem)', lineHeight: 0.8 }}>Hand<br/>Finished</h2>
           <p className="text-foreground/50 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold max-w-xs md:text-right">Every pair undergoes a 72-hour stress test and manual hardware mounting process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
           <div className="w-full aspect-video md:aspect-[4/3] bg-accent overflow-hidden grayscale transition-all duration-1000 shadow-lg border border-accent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764247008_6463231.jpg?w=1000" className="w-full h-full object-cover object-top" alt="Workshop" />
           </div>
           <div className="w-full flex flex-col gap-8 md:gap-4">
              <div className="w-full aspect-video bg-accent overflow-hidden grayscale transition-all duration-1000 shadow-lg border border-accent">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752583894_8452197.jpg?w=1000" className="w-full h-full object-cover object-top" alt="Detailing" />
              </div>
              <div className="flex flex-col gap-10 p-10 bg-accent text-foreground border border-accent">
                 <h3 className="text-4xl font-bold uppercase tracking-tighter">Zero Waste Protocol</h3>
                 <p className="text-[10px] leading-relaxed opacity-70 font-bold tracking-[0.2em] uppercase">We recycle 98.5% of water used in the dyeing process and utilize scrap denim to create our internal reinforcement panels. A circular system of engineering.</p>
                 <Link href="/about" className="btn-luxury w-max mt-4 block text-center">Learn More</Link>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

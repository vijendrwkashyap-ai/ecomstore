"use client";
import React from "react";
import Link from "next/link";
import { WOMEN_COLLECTION } from "@/lib/data";

export default function WomensCollection() {
  return (
    <section className="w-full min-h-screen bg-background py-20 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-accent overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-6">
        <h2 className="text-[3.5rem] leading-[0.8] sm:text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter sm:leading-[0.85]">Womens<br/>Archive</h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-foreground/70 max-w-sm lg:text-right font-medium uppercase tracking-[0.2em] leading-relaxed">Architectural lines meeting effortless grace. Discover our 20 premium cuts across all fits.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-12 sm:gap-x-4 md:gap-x-6 md:gap-y-16">
        {WOMEN_COLLECTION.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group cursor-none flex flex-col gap-4">
            <div className="w-full aspect-[3/4] bg-accent overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.src} alt={product.title} className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" loading="lazy" />
            </div>
            <div className="flex flex-col gap-1 px-1">
              <h3 className="text-foreground font-semibold text-[9px] sm:text-[10px] md:text-xs tracking-widest uppercase">{product.title}</h3>
              <p className="text-foreground/50 text-[9px] sm:text-[10px] md:text-xs tracking-widest font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

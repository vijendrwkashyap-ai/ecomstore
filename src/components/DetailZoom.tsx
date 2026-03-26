"use client";
import React from "react";
import Link from "next/link";

export default function DetailZoom() {
  return (
    <section className="w-full bg-background py-40 px-6 border-t border-accent overflow-hidden">
       <div className="max-w-[80vw] mx-auto text-center flex flex-col gap-20 items-center">
          
          <div className="flex flex-col gap-4">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/30">07 Microscopic View</span>
             <h3 className="title-primary" style={{ fontSize: 'clamp(3rem, 7vw, 9rem)', lineHeight: 0.85 }}>Absolute<br/>Precision</h3>
          </div>

          <div className="w-full h-[70vh] bg-accent overflow-hidden relative shadow-inner group">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752583894_8452197.jpg?w=1200" 
               className="w-full h-full object-cover grayscale scale-[1.3] group-hover:scale-[1.1] transition-all duration-[3s] ease-out object-top" 
               alt="Macro Detail" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/30 pointer-events-none" />
          </div>

          <div className="max-w-xl mx-auto">
             <p className="text-[10px] sm:text-xs md:text-sm font-black text-foreground/40 uppercase tracking-[0.4em] text-center">WE ZOOMED IN TO AN ATOMIC SCALE TO ENSURE THE REINFORCED STITCHING PATTERN HOLDS 300% MORE TENSION THAN THE INDUSTRY STANDARD.</p>
          </div>

       </div>
    </section>
  );
}

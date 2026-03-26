"use client";
import React from "react";

export default function MovementPerformance() {
  return (
    <section className="w-full min-h-screen bg-[#fff] text-foreground flex flex-col justify-center items-center py-40 px-6 overflow-hidden border-t border-accent relative">
        <div className="absolute inset-0 bg-[url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=1600')] bg-cover bg-center grayscale opacity-100 scale-110" />
        
        <div className="w-full max-w-[95vw] flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 relative z-10">
           <div className="flex flex-col gap-6 w-full md:w-1/2 md:mix-blend-difference">
               <h2 className="title-primary" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.85, color: '#fff' }}>Fluid<br/>Dynamics</h2>
               <div className="w-20 h-1 bg-white" />
           </div>
           <div className="w-full md:w-1/2 flex flex-col gap-8 md:text-right md:items-end md:mix-blend-difference">
               <p className="text-body max-w-sm font-bold tracking-wider uppercase text-xs text-white/70">Unlike traditional selvedge that restricts, our Vanguard Series utilizes reactive fiber tension to expand and contract with your kinetic motion.</p>
               <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.5em] uppercase font-bold text-white/30 text-shadow-sm">100% Mobile Ready</span>
           </div>
        </div>

        <div className="w-full max-w-[95vw] mt-20 aspect-video bg-accent overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=1600" className="w-full h-full object-cover grayscale object-top" alt="Performance" />
           <div className="absolute inset-0 flex items-center justify-center p-10">
               <h2 className="title-primary text-white/5 mix-blend-difference" style={{ fontSize: 'clamp(5rem, 15vw, 20rem)', letterSpacing: '-0.08em' }}>KINETIC</h2>
           </div>
        </div>
    </section>
  );
}

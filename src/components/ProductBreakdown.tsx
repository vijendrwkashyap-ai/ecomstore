"use client";
import React from "react";

export default function ProductBreakdown() {
  return (
    <section className="w-full py-40 bg-white border-t border-black/5 px-6 overflow-hidden">
      <div className="max-w-[95vw] mx-auto flex flex-col gap-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
           <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30">03 Specification</span>
              <h2 className="text-[4rem] sm:text-[10rem] font-bold leading-[0.8] tracking-tighter uppercase">LUVRA<br/>STRUCTURE</h2>
           </div>
           <p className="text-[10px] font-black uppercase text-black/50 tracking-[0.3em] mb-4">ENGINEERED FOR TOTAL KINETIC FREEDOM // REINFORCED STITCHING // 14.5OZ CORE</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0 border-t border-black/10 pt-20 divide-x-0 lg:divide-x divide-black/5">
          
          <div className="flex flex-col gap-10 lg:px-10 group border-b lg:border-b-0 border-black/5 pb-20 lg:pb-0">
             <div className="flex justify-between items-end">
                <span className="text-[10rem] font-black text-black/5 group-hover:text-black transition-colors duration-500 leading-none -ml-4 pb-4">01</span>
                <span className="text-[12px] font-black tracking-[0.5em] uppercase text-black/20 pb-10">THE BASE</span>
             </div>
             <div className="flex flex-col gap-6">
                <h3 className="text-black tracking-[0.2em] uppercase font-bold text-xl leading-none">Sculpt Patterning</h3>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 leading-loose pr-10">Exclusive 14.5oz women's selvedge denim. Engineered with a vertical stretch core to maintain the architectural fit profile.</p>
             </div>
             <div className="w-full aspect-square bg-zinc-100 overflow-hidden shadow-2xl rounded-[3rem]">
                <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415169_9929164.jpg?w=1000" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" alt="Breakdown 1" />
             </div>
          </div>

          <div className="flex flex-col gap-10 lg:px-10 group border-b lg:border-b-0 border-black/5 py-20 lg:py-0">
             <div className="flex justify-between items-end">
                <span className="text-[10rem] font-black text-black/5 group-hover:text-black transition-colors duration-500 leading-none -ml-4 pb-4">02</span>
                <span className="text-[12px] font-black tracking-[0.5em] uppercase text-black/20 pb-10">HARDWARE</span>
             </div>
             <div className="flex flex-col gap-6">
                <h3 className="text-black tracking-[0.2em] uppercase font-bold text-xl leading-none">Precision Mount</h3>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 leading-loose pr-10">Custom hardware specifically weighted for lighter fabric weights to prevent dragging and localized structural failure.</p>
             </div>
             <div className="w-full aspect-square bg-zinc-100 overflow-hidden shadow-2xl rounded-[3rem]">
                <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719414620_1882258.jpg?w=1000" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" alt="Breakdown 2" />
             </div>
          </div>

          <div className="flex flex-col gap-10 lg:px-10 group pt-20 lg:pt-0">
             <div className="flex justify-between items-end">
                <span className="text-[10rem] font-black text-black/5 group-hover:text-black transition-colors duration-500 leading-none -ml-4 pb-4">03</span>
                <span className="text-[12px] font-black tracking-[0.5em] uppercase text-black/20 pb-10">FIT LOGIC</span>
             </div>
             <div className="flex flex-col gap-6">
                <h3 className="text-black tracking-[0.2em] uppercase font-bold text-xl leading-none">Kinetic Seams</h3>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 leading-loose pr-10">3D mapped stitch patterns that follow the natural limb movement, ensuring zero restriction during daily locomotion.</p>
             </div>
             <div className="w-full aspect-square bg-zinc-100 overflow-hidden shadow-2xl rounded-[3rem]">
                <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718970026_9687167.jpg?w=1000" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" alt="Breakdown 3" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

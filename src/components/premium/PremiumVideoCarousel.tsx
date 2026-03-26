"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function PremiumVideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const videos = [
    { title: "THE ARCHIVE", url: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-dancing-in-blue-jeans-4033-large.mp4", tagline: "SCULPTED BY HAND" },
    { title: "THE PROCESS", url: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-her-blue-jeans-4032-large.mp4", tagline: "RAW MATERIAL FLOW" },
    { title: "THE STUDIO", url: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-blue-jeans-4031-large.mp4", tagline: "LEVEL ZERO LABORATORIES" }
  ];

  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-dancing-in-blue-jeans-4033-large.mp4";

  return (
    <section className="w-full bg-white py-20 md:py-40 overflow-hidden">
       <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-32">
             <div className="mb-10 md:mb-0">
                <span className="text-black/40 text-[10px] tracking-[1.5em] mb-4 block font-black uppercase">LUVRA // MOTION ARCHIVE // VOL .01</span>
                <h2 className="text-[12vw] md:text-[10rem] font-bold leading-[0.8] tracking-tighter uppercase mb-6 md:mb-0">THE VIDEO<br/>STUDIO</h2>
             </div>
             <p className="max-w-xs text-black/50 text-[10px] tracking-[0.5em] leading-relaxed uppercase font-black md:text-right">ENHANCING THE TACTILE EXPERIENCE THROUGH PHYSICAL MOTION.</p>
          </div>

          <div className="relative aspect-[3/4] md:aspect-[21/9] w-full bg-zinc-50 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl group cursor-none">
             <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105"
             >
                <source src={videoUrl} type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/5" />
             <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 z-10 text-white mix-blend-difference">
                <span className="text-[10px] tracking-[1.2em] font-black uppercase mb-4 block">ACTIVE SERIES // 001</span>
                <h3 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.8]">SCULPTING<br/>THE VOID</h3>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-10 md:mt-16">
             {videos.map((v, i) => (
                <div key={i} className="bg-zinc-50 p-10 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-black/5 hover:bg-zinc-100 transition-all duration-700 cursor-none group">
                   <div className="flex items-center justify-between mb-10">
                      <span className="text-[10px] font-black tracking-widest text-black/40 uppercase">Chapter 0{i + 1} // Archive</span>
                      <div className="w-2 h-2 rounded-full bg-black/20 group-hover:bg-black transition-colors" />
                   </div>
                   <h4 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">{v.title}</h4>
                   <p className="text-[8px] md:text-[10px] tracking-[1em] font-black text-black/30 uppercase">{v.tagline}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

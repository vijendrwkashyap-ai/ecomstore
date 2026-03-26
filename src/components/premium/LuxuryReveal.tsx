"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       const images = containerRef.current?.querySelectorAll(".reveal-image");
       images?.forEach((img) => {
          gsap.fromTo(img, 
             { clipPath: "inset(20% 10% 20% 10%)", scale: 1.2 },
             { 
                clipPath: "inset(0% 0% 0% 0%)", 
                scale: 1,
                scrollTrigger: {
                   trigger: img,
                   start: "top bottom",
                   end: "top 20%",
                   scrub: 1.5
                }
             }
          );
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const items = [
     { title: "THE ARCHITECTURAL CUT", src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719414620_1882258.jpg?w=1600" },
     { title: "SILK SELVEDGE FLOW", src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718970026_9687167.jpg?w=1600" }
  ];

  return (
    <section ref={containerRef} className="w-full bg-white py-40">
       <div className="max-w-7xl mx-auto flex flex-col gap-60 px-6">
          {items.map((item, i) => (
             <div key={i} className="flex flex-col items-center">
                <div className="reveal-image w-full aspect-[21/9] overflow-hidden rounded-[4rem] shadow-2xl relative">
                   <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="mt-20 text-center">
                   <span className="text-black/40 text-[10px] tracking-[1em] uppercase block mb-6 font-black">Archive Series // Details</span>
                   <h2 className="text-4xl sm:text-7xl font-bold uppercase tracking-tighter">{item.title}</h2>
                </div>
             </div>
          ))}
       </div>
    </section>
  );
}

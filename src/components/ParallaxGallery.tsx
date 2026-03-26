"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-img", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full section-padding bg-background overflow-hidden px-6">
      <div className="max-w-[1400px] mx-auto mb-32">
         <span className="text-accent text-[8px] font-black tracking-[1em] mb-8 block animate-pulse uppercase">Visual Archives // Fragmented Reality</span>
         <h3 className="title-premium text-[4rem] sm:text-[8rem]">FRAGMENTED<br/>VANGUARD</h3>
      </div>
      
      <div className="max-w-[95vw] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
         {[
           { seq: "01", title: "RAW FORCE", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773031840_4734611.jpg?w=1000" },
           { seq: "02", title: "KINETIC MOLD", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=1000", translate: true },
           { seq: "03", title: "URBAN ARMOR", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415169_9929164.jpg?w=1000" }
         ].map((item, i) => (
           <div key={i} className={`relative aspect-[3/5] overflow-hidden group glass-panel rounded-3xl ${item.translate ? "md:translate-y-32" : ""}`}>
              <img src={item.img} 
                   className="parallax-img absolute inset-0 w-full h-[140%] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 scale-100 group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute bottom-12 left-12 text-white z-10 transition-transform group-hover:translate-x-6">
                 <span className="text-[10px] font-black tracking-[0.6em] mb-4 block uppercase text-accent">Sequence {item.seq}</span>
                 <h4 className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter leading-none">{item.title}</h4>
              </div>
              <div className="absolute top-8 right-8 w-6 h-[1px] bg-accent/30 group-hover:w-12 transition-all duration-700" />
           </div>
         ))}
      </div>
    </section>
  );
}

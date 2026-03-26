"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FabricStory() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fabric-reveal', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        }
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={cardRef} className="w-full min-h-screen bg-background flex flex-col items-center justify-center py-40 px-6 md:px-20 border-t border-accent">
      <div className="w-full max-w-[95vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-stretch">
        
        <div className="lg:col-span-1 flex flex-col justify-between py-10">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr] text-foreground/20">CRAFTSMANSHIP</span>
        </div>

        <div className="lg:col-span-6 aspect-[4/5] bg-zinc-100 overflow-hidden shadow-2xl fabric-reveal rounded-[3rem]">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=1200" className="w-full h-full object-cover transition-all duration-[2s] object-top" alt="Fabric Detail" />
        </div>

        <div className="lg:col-span-1 flex flex-col justify-between py-10"></div>

        <div className="lg:col-span-4 flex flex-col gap-12 justify-center">
           <div className="flex flex-col gap-6 fabric-reveal">
              <h2 className="title-primary font-bold" style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', lineHeight: 0.85 }}>LUVRA<br/>Physics</h2>
              <div className="w-20 h-[1px] bg-black/10" />
           </div>
           
           <p className="text-body max-w-sm fabric-reveal font-bold text-black/40 uppercase text-[10px] tracking-[0.2em] leading-loose">LUVRA is a material system engineered for the professional vanguard. 14.5oz weave, reactive elastane, and a double-processed finish that ages with architectural precision.</p>
           
           <div className="grid grid-cols-2 gap-10 border-t border-accent pt-12 fabric-reveal">
              <div className="flex flex-col gap-2">
                 <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Woven in</span>
                 <span className="text-sm font-bold uppercase tracking-widest">Kojima, Japan</span>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Density</span>
                 <span className="text-sm font-bold uppercase tracking-widest">14.5 OZ / SQM</span>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

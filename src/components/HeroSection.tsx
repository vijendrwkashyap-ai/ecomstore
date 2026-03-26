"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        }
      });
      
      tl.to(bgRef.current, { scale: 1.1, y: -50, duration: 1 })
      tl.to(bgRef.current, { scale: 1.2, y: 100, duration: 1 }, 0) // Increased scale and added y for parallax
        .to(textRef.current, { y: -200, opacity: 0, duration: 0.5 }, 0); // Increased y for more dramatic text fade
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-black flex flex-col items-center justify-center overflow-hidden">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 will-change-transform"
          style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737709130_4495392.jpg?w=1600')" }}
        />
      
      {/* Natural Fidelity */}
      <div className="absolute inset-0 bg-white/5" />

      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center px-6 mix-blend-screen">
        <div className="flex items-center gap-6 mb-12 opacity-40">
           <div className="w-12 h-[1px] bg-accent" />
           <span className="text-[9px] font-black tracking-[1.2em] uppercase text-accent animate-pulse">EST. 2024 // GLOBAL SYSTEMS</span>
           <div className="w-12 h-[1px] bg-accent" />
        </div>

        <h1 className="text-white text-[18vw] md:text-[12vw] font-black uppercase leading-[0.75] tracking-tighter mb-12">
          LUVRA<span className="text-white/20">_</span><br/>
          <span className="pl-[5vw] text-white/40 font-light opacity-50">STUDIOS</span>
        </h1>

        <div className="flex flex-col items-center gap-10 mt-10">
           <p className="max-w-xl text-white/40 text-[10px] sm:text-xs tracking-[0.8em] uppercase font-black leading-loose">
             ENGINEERING KINETIC ARMOR FOR THE MODERN VANGUARD. ARCHITECTURAL SELVEDGE ORIGINS OVERLOAD.
           </p>
           <div className="flex gap-4 sm:flex-row flex-col w-full sm:w-auto px-10 sm:px-0">
              <button className="btn-luxury w-full sm:w-auto">Archive Selection //</button>
              <button className="btn-luxury border-none bg-white/5 backdrop-blur-md w-full sm:w-auto">Collection .01</button>
           </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-12 z-10 hidden md:flex flex-col gap-4">
         <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.5em]">SYSTEM STATUS // OPTIMIZED</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">NETWORK SECURE // TOKYO GROUND ZERO</span>
         </div>
      </div>

      <div className="absolute bottom-20 right-12 z-10 hidden md:flex flex-col items-end gap-2 text-right">
         <span className="text-[8px] font-black text-accent uppercase tracking-widest">SCROLL TO OPERATE</span>
         <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-accent w-1/3 animate-[shimmer_2s_infinite]" />
         </div>
      </div>
    </section>
  );
}

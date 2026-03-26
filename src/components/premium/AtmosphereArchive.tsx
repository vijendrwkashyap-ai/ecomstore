"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AtmosphereArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.to(".atmosphere-bg", {
          yPercent: 20,
          scale: 1.1,
          scrollTrigger: {
             trigger: containerRef.current,
             start: "top bottom",
             end: "bottom top",
             scrub: 1.5
          }
       });

       gsap.from(".atmosphere-text", {
          y: 150,
          opacity: 0,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
             trigger: containerRef.current,
             start: "top 70%",
             toggleActions: "play none none reverse"
          }
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-black overflow-hidden flex items-center justify-center">
       <div 
          className="atmosphere-bg absolute inset-0 bg-cover bg-center transition-transform duration-1000 opacity-80" 
          style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=1600')" }}
       />
       <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

       <div className="atmosphere-text relative z-10 text-center px-6">
          <span className="text-white/40 text-[10px] sm:text-xs tracking-[1.5em] font-black uppercase mb-12 block px-6 animate-pulse">LUVRA STUDIO // IMMERSION</span>
          <h2 className="text-[5rem] sm:text-[15rem] font-bold leading-[0.75] tracking-tighter uppercase text-white title-premium">BEYOND<br/><span className="text-white/20">MATERIAL</span></h2>
          <p className="max-w-2xl mx-auto mt-20 text-white/50 text-[10px] sm:text-xs tracking-[0.5em] leading-relaxed uppercase font-black">LUVRA IS A LEGACY OF TACTILE ARCHITECTURE. THE FABRIC WEAVES INTO THE ESSENCE OF HUMAN POTENTIAL.</p>
          <button className="btn-luxury bg-white text-black border-none py-6 px-16 text-[10px] mt-24">Explore Atmosphere //</button>
       </div>
    </section>
  );
}

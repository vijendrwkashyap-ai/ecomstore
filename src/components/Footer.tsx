"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.fromTo('.footer-reveal', 
         { y: 100, opacity: 0 }, 
         { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", 
           scrollTrigger: { trigger: containerRef.current, start: "top 80%" } 
         });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="w-full bg-[#111] text-[#F9F9F9] pt-40 pb-10 px-6 md:px-20 flex flex-col gap-20 overflow-hidden">
      
      {/* Newsletter & Links */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[95vw] mx-auto gap-20">
         
         <div className="w-full md:w-1/2 flex flex-col gap-10">
            <h2 className="title-primary text-background footer-reveal" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>Join The<br/>Vanguard</h2>
            <div className="flex w-full max-w-md border-b flex-grow-0 border-background/30 pb-4 footer-reveal">
              <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-transparent w-full text-sm font-bold tracking-widest uppercase outline-none placeholder:text-background/30 text-background" />
              <button className="text-xs font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">→</button>
            </div>
            <p className="text-xs text-background/50 font-medium tracking-widest uppercase footer-reveal max-w-sm">
              Subscribe to unlock early access to the 2026 architectural drops and exclusive events.
            </p>
         </div>

         <div className="w-full md:w-1/2 flex gap-10 md:gap-32 justify-start md:justify-end footer-reveal">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-background/50 mb-4">Explore</span>
              <Link href="/shop" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Shop Mens</Link>
              <Link href="/shop" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Shop Womens</Link>
              <Link href="/about" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">The Story</Link>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Journal</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-background/50 mb-4">Support</span>
              <Link href="#" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Shipping</Link>
              <Link href="#" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Returns</Link>
              <Link href="#" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Contact</Link>
              <Link href="#" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-white/50 transition-colors cursor-none">Size Guide</Link>
            </div>
         </div>

      </div>

      {/* Massive Base Identity */}
      <div className="w-full flex justify-center items-center mt-20 border-t border-background/10 pt-10 footer-reveal">
         <h1 className="text-[15vw] leading-[0.75] font-bold tracking-tighter uppercase text-center text-background opacity-[0.98]">
           DENIMX
         </h1>
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-between w-full mt-10 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-background/30 footer-reveal px-2">
         <span>© 2026 DenimX — The Universal Standard.</span>
         <span className="mt-4 md:mt-0">Privacy / Terms of Service</span>
      </div>

    </footer>
  );
}

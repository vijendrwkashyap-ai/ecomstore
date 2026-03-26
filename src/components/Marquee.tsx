"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });
    }, scrollRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-foreground text-background py-4 flex items-center border-y border-background/20 relative z-40">
       <div ref={scrollRef} className="flex whitespace-nowrap gap-10">
          {[...Array(10)].map((_, i) => (
             <span key={i} className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase opacity-80">
               DenimX Vanguard Series — Engineered Precision — Buy Now — 
             </span>
          ))}
       </div>
    </div>
  );
}

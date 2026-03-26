"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandHeritage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.fromTo(chars, 
          { opacity: 0.1, y: 50, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const text = "LUMARA IS A TACTILE ARCHIVE DEDICATED TO THE MODERN WOMAN. WE ENGINEER PREMIUM DENIM THAT MOVES WITH FLOW AND PRECISION, BORN FROM A LEGACY OF TEXTILE EXCELLENCE.";

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-white text-black flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-zinc-200 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-zinc-300 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full text-center z-10">
        <span className="text-black/40 text-[10px] tracking-[1.5em] mb-12 font-black uppercase block animate-pulse">Brand Heritage // Origins .01</span>
        <h2 ref={textRef} className="text-[2.5rem] sm:text-[4.5rem] md:text-[6rem] font-bold tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-6 gap-y-4 uppercase">
          {text.split(" ").map((word, i) => (
            <span key={i} className="char inline-block">{word}</span>
          ))}
        </h2>
        <div className="mt-24 flex flex-col items-center">
          <div className="w-[1px] h-32 bg-black/20 mb-10" />
          <button className="btn-luxury bg-black text-white border-none py-6 px-12 text-[10px]">Read the Full Archive //</button>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExclusiveVip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const box = containerRef.current?.querySelector(".vip-box");
      if (box) {
        gsap.fromTo(box, 
          { scale: 0.9, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full section-padding px-6 bg-[#F5F5F7] text-black">
       <div className="max-w-7xl mx-auto py-32">
          <div className="vip-box relative rounded-3xl p-10 md:p-32 overflow-hidden bg-white group text-center flex flex-col items-center border border-black/5 shadow-2xl">
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-2000 scale-100 group-hover:scale-110 opacity-10 pointer-events-none" 
                style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=1600')" }}
             />
             
             <div className="relative z-10 max-w-2xl w-full">
                <span className="text-black/40 text-xs font-black tracking-[1em] mb-12 block px-6 animate-pulse uppercase">VANGUARD ORDER // VIP ACCESS</span>
                <h2 className="text-[4rem] sm:text-[8rem] font-black lowercase tracking-tighter leading-[0.8] mb-12">join the<br/><span className="text-zinc-400">archives.</span></h2>
                <p className="text-black/60 text-xs tracking-[0.3em] font-medium leading-loose mb-20 px-6 uppercase">
                   SECURE EARLY ACCESS TO NEW DROPS, EXCLUSIVE ARCHIVE RELEASES, AND THE VANGUARD CIRCLE REWARDS PROGRAM.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                   <input 
                      type="email" 
                      placeholder="ENTER ACCESS CODE // EMAIL" 
                      className="bg-transparent border-b border-black/20 text-black p-6 outline-none text-[10px] tracking-[0.5em] w-full sm:max-w-md focus:border-black transition-colors"
                   />
                   <button className="btn-luxury bg-black text-white border-none">Join the Order //</button>
                </div>
                <div className="mt-16 flex items-center justify-center gap-10 opacity-10">
                   <div className="w-10 h-[1px] bg-black" />
                   <span className="text-[8px] font-black tracking-[0.5em] uppercase px-4">Secure Network Link Active</span>
                   <div className="w-10 h-[1px] bg-black" />
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".bento-item");
      if (items) {
        items.forEach((item, i) => {
           gsap.fromTo(item, 
              { opacity: 0, scale: 0.9, y: 50 },
              { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  end: "top 60%",
                  scrub: 1,
                }
              }
           );
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white text-black py-20 md:py-40 px-6">
       <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-40">
             <div className="max-w-4xl">
                <span className="text-black/40 text-[10px] tracking-[1.5em] uppercase mb-8 block font-black">LUVRA // SYSTEMS // ARCHITECTURE</span>
                <h2 className="text-[14vw] md:text-[8rem] font-bold leading-[0.8] tracking-tighter uppercase mb-10 md:mb-0">THE LUVRA<br/>ARCHIVE</h2>
             </div>
             <p className="max-w-md text-black/50 text-[10px] md:text-sm tracking-[0.4em] leading-relaxed mt-12 md:mt-0 font-black uppercase">
                DISCOVER THE HIGHEST FORM OF DENIM SCULPTING. WE ENGINEER PREMIUM WOMEN'S WEAR THAT ADAPTS TO YOUR EVERY MOVEMENT.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
             {/* 01 Main Innovation */}
             <div className="bento-item md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] min-h-[500px] md:h-[1000px] bg-zinc-950 shadow-2xl">
                <div 
                   className="absolute inset-0 bg-cover bg-center transition-all duration-[3s] scale-100 group-hover:scale-105 opacity-80" 
                   style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415169_9929164.jpg?w=1600')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-16">
                   <span className="text-white/40 text-[10px] tracking-[1em] mb-4 font-black uppercase">SCULPT SERIES .02</span>
                   <h3 className="text-4xl md:text-7xl text-white font-black tracking-tighter uppercase mb-8 leading-none">The Everyday Masterpiece</h3>
                   <button className="btn-luxury w-fit bg-white text-black border-none py-4 px-10 text-[8px] md:text-[10px]">Explore Detail //</button>
                </div>
             </div>

             {/* 02 Data Module */}
             <div className="bento-item md:col-span-4 md:row-span-1 relative bg-zinc-50 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col justify-center border border-black/5">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-3 h-3 rounded-full bg-black animate-pulse" />
                   <span className="text-[10px] tracking-widest text-black uppercase font-black opacity-40">Performance Metrics //</span>
                </div>
                <div className="text-[18vw] md:text-[7rem] font-bold tracking-tighter text-black leading-none mb-6">14.1OZ</div>
                <p className="text-black/40 text-[9px] md:text-[10px] tracking-[0.5em] leading-relaxed uppercase font-black">WEIGHT OPTIMIZED FOR STRUCTURAL INTEGRITY AND MOVEMENT EFFICIENCY.</p>
             </div>

             {/* 03 Small Detail */}
             <div className="bento-item md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] md:rounded-[3rem] p-8 min-h-[350px] border border-black/5 bg-zinc-50">
                <div 
                   className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity duration-1000 group-hover:opacity-100" 
                   style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=1600')" }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                   <h4 className="text-3xl text-white font-black uppercase tracking-tighter">Hand-Finished Raw</h4>
                </div>
             </div>

             {/* 04 Global Impact */}
             <div className="bento-item md:col-span-12 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 min-h-[400px] bg-zinc-950 shadow-2xl">
                <div 
                   className="absolute inset-x-0 bottom-0 top-0 bg-cover bg-[center_top] transition-transform duration-[4s] group-hover:scale-110 opacity-70" 
                   style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764247008_6463231.jpg?w=1600')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end h-full gap-10">
                   <div>
                      <h4 className="text-5xl md:text-8xl text-white font-black uppercase tracking-tighter leading-none">THE LUVRA ARCHIVE</h4>
                      <p className="text-white/40 text-[9px] md:text-[10px] tracking-[1.2em] font-black uppercase mt-8 hidden md:block">Worldwide access to our most exclusive female product drops.</p>
                   </div>
                   <button className="btn-luxury bg-white text-black border-none py-5 md:py-6 px-10 md:px-12 text-[8px] md:text-[10px] w-full md:w-auto">Shop Archive //</button>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}

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
              { opacity: 0, scale: 0.95, y: 30 },
              { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  end: "top 60%",
                  scrub: 0.5,
                }
              }
           );
         });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white text-black py-12 md:py-24 px-4 md:px-8">
       <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20">
             <div className="max-w-2xl">
                <span className="text-black/50 text-xs font-semibold tracking-widest uppercase mb-4 block">
                  Curation // Discovery
                </span>
                <h2 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight mb-6 md:mb-0">
                  THE EDITORIAL PORTFOLIO.
                </h2>
             </div>
             <p className="max-w-sm text-black/60 text-sm leading-relaxed mt-4 md:mt-0 font-medium">
                Experience luxury engineering tailored for the modern vanguard. Sharp aesthetics, seamless transitions.
             </p>
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
             
             {/* 01 Main Feature */}
             <div className="bento-item md:col-span-8 md:row-span-2 relative group overflow-hidden min-h-[450px] md:h-[800px] bg-zinc-100 shadow-sm border border-zinc-200">
                {/* PROMPT 1: A high-fashion editorial shot of a woman wearing premium black denim jeans, dynamic lighting, luxurious atmosphere, sharp focus. */}
                <div 
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105 opacity-90" 
                   style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415169_9929164.jpg?w=1600')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 md:p-12">
                   <span className="text-white/70 text-xs tracking-widest mb-3 font-medium uppercase">Capsule Release</span>
                   <h3 className="text-3xl md:text-5xl text-white font-bold tracking-tight mb-6 leading-tight">The Modern Masterpiece</h3>
                   <button className="btn-luxury w-fit bg-white text-black border-none py-3 px-8 text-xs font-semibold">Discover Collection</button>
                </div>
             </div>

             {/* 02 Data Module / Typography block */}
             <div className="bento-item md:col-span-4 md:row-span-1 relative bg-white border border-zinc-200 p-8 md:p-12 flex flex-col gap-6 justify-between select-none shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                   <span className="text-xs font-semibold tracking-widest text-black/50 uppercase">Architecture</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                   <div className="text-[25vw] md:text-[8rem] font-black tracking-tighter text-black leading-none opacity-5">01</div>
                </div>
                <div>
                   <h4 className="text-xl font-bold mb-2">Uncompromised Quality</h4>
                   <p className="text-black/60 text-sm leading-relaxed">
                      Every seam, every rivet meticulously crafted to ensure longevity and precise fit for the avant-garde aesthetic.
                   </p>
                </div>
             </div>

             {/* 03 Small Detail Image */}
             <div className="bento-item md:col-span-4 md:row-span-1 relative group overflow-hidden min-h-[300px] md:min-h-[auto] border border-zinc-200 bg-zinc-100 shadow-sm">
                {/* PROMPT 2: A close-up macro shot of premium denim fabric texture showing the weave, stitching, and a metallic luxury rivet, sharp cinematic lighting. */}
                <div 
                   className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-[2s] group-hover:scale-110" 
                   style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=1600')" }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                   <h4 className="text-2xl text-white font-bold tracking-tight">Hand-Finished Raw</h4>
                   <span className="text-white/80 text-xs mt-3 uppercase tracking-widest font-medium">Explore Details &rarr;</span>
                </div>
             </div>

             {/* 04 Horizontal Image / Video Block */}
             <div className="bento-item md:col-span-12 md:row-span-1 relative group overflow-hidden min-h-[350px] md:min-h-[500px] bg-zinc-950 shadow-sm border border-zinc-800">
                {/* PROMPT 3: A wider landscape fashion shot of a model walking in Tokyo streets, wearing dark luxurious denim clothing, neon lights softly blurring in background, app-like cinematic framing. */}
                <div 
                   className="absolute inset-x-0 bottom-0 top-0 bg-cover bg-[center_20%] transition-transform duration-[3s] group-hover:scale-105 opacity-80" 
                   style={{ backgroundImage: "url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764247008_6463231.jpg?w=1600')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between items-start md:items-end p-6 md:p-12 gap-8">
                   <div className="max-w-xl">
                      <span className="text-zinc-400 text-xs font-semibold tracking-widest uppercase block mb-3">Limited Access</span>
                      <h4 className="text-4xl md:text-6xl text-white font-bold tracking-tight leading-tight">EXPLORE THE ARCHIVE.</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed mt-4">
                        Worldwide access to our most exclusive releases. Sign up for early access to our seasonal drops before anyone else.
                      </p>
                   </div>
                   <button className="btn-luxury bg-white text-black border-none py-4 px-10 text-xs font-semibold w-full md:w-auto">Shop All</button>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
}

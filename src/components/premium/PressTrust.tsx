"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PressTrust() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       const quotes = containerRef.current?.querySelectorAll(".quote-item");
       if (quotes) {
          quotes.forEach((quote, i) => {
             gsap.fromTo(quote, 
                { opacity: 0, y: 50 },
                { 
                   opacity: 1, 
                   y: 0, 
                   duration: 1.5,
                   ease: "expo.out",
                   scrollTrigger: {
                      trigger: quote,
                      start: "top 85%",
                   }
                }
             );
          });
       }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const press = [
    { source: "VOGUE LUXURY", quote: "LUMARA RECOFINES THE ARCHITECTURE OF A WOMAN'S WARDROBE." },
    { source: "ELLE ARCHIVE", quote: "THE MOST ELEGANT SELVEDGE SCULPTING SEEN THIS DECADE." },
    { source: "HB LUXE", quote: "A SCIENTIFIC APPROACH TO PREMIUM DENIM THAT MOVES WITH FLOW." },
    { source: "MODERN ATELIER", quote: "LUMARA HAS CREATED THE NEW LANGUAGE OF EVERYDAY ELEGANCE." }
  ];

  return (
    <section ref={containerRef} className="w-full section-padding px-6 bg-white">
       <div className="max-w-7xl mx-auto py-32 border-t border-accent/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
             {press.map((item, index) => (
                <div key={index} className="quote-item flex flex-col items-center text-center px-12">
                   <span className="text-black/40 text-[10px] tracking-[1em] mb-12 font-black uppercase">{item.source} // RECENT REPORT</span>
                   <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-black mb-12 italic leading-relaxed px-6">"{item.quote}"</h3>
                   <div className="w-20 h-[1px] bg-black/10 mb-8 px-6 animate-pulse" />
                   <p className="text-black/20 text-[8px] tracking-[1em] font-black uppercase px-6">LUMARA ARCHIVE AUTHENTICATION: LX-P{index + 1}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

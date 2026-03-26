"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ModernInnovation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinItems = containerRef.current?.querySelectorAll(".innovation-card");
      if (pinItems && window.innerWidth > 768) {
        gsap.to(pinItems, {
           xPercent: -100 * (pinItems.length - 1),
           ease: "none",
           scrollTrigger: {
             trigger: triggerRef.current,
             pin: true,
             scrub: 1,
             start: "top top",
             end: () => "+=" + containerRef.current?.offsetWidth,
           }
        });
      }
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  const innovations = [
    { title: "SILK DENIM", text: "ARCHITECTURAL FABRICATION ENGINEERED FOR DYNAMIC FLOW.", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758868208_2224123.jpg?w=1600" },
    { title: "SCULPT WEAVE", text: "HIGH-FIDELITY DENIM THAT ADAPTS TO YOUR EVERY MOVEMENT.", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771651246_6736005.jpg?w=1600" },
    { title: "LUVRA SERIES", text: "LASER-PRECISION TAILORING FOR THE MODERN WOMAN.", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772708875_3771992.jpg?w=1600" },
    { title: "ARCHIVE CUTS", text: "TIMELESS SILHOUETTES REIMAGINED FOR THE VANGUARD.", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1748423000_3370588.jpg?w=1600" }
  ];

  return (
    <div ref={triggerRef} className="overflow-hidden bg-white">
       <div className="py-20 px-6 md:pt-40 md:pb-0 text-center">
          <span className="text-black/20 text-[10px] font-black tracking-[1.5em] uppercase mb-8 block font-black">LUVRA // INNOVATION LABS // SERIES 2.0</span>
          <h2 className="text-[12vw] md:text-[8rem] font-bold tracking-tighter uppercase text-black leading-[0.8]">LUVRA<br/><span className="text-black/10">SCULPT</span></h2>
       </div>

       <div ref={containerRef} className="flex flex-col md:flex-row md:w-[400vw] relative items-center gap-10 md:gap-0 p-6 md:p-0">
          {innovations.map((item, index) => (
             <div key={index} className="innovation-card relative w-full md:w-screen h-auto md:h-screen flex-shrink-0 flex items-center justify-center p-0 md:p-32 mb-10 md:mb-0">
                <div className="relative w-full max-w-[1800px] h-full rounded-[3rem] md:rounded-[4rem] overflow-hidden group flex flex-col md:flex-row shadow-2xl border border-black/5 bg-zinc-50 min-h-[600px] md:min-h-0">
                   <div className="w-full md:w-1/2 h-full overflow-hidden relative min-h-[300px] md:min-h-0">
                      <div 
                         className="innovation-img absolute inset-0 bg-cover bg-center transition-transform duration-[3s] scale-100 group-hover:scale-105" 
                         style={{ backgroundImage: `url('${item.img}')` }}
                      />
                      <div className="absolute inset-0 bg-black/5" />
                   </div>
                   <div className="innovation-content w-full md:w-1/2 h-full flex flex-col justify-center p-10 md:p-24 bg-white relative">
                      <span className="text-black/20 text-[10px] font-black tracking-[1em] mb-12 opacity-60 uppercase">SYSTEM ID: VGP-LAB.0{index + 1}</span>
                      <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-black mb-10 leading-[0.8]">{item.title}</h3>
                      <p className="text-black/40 text-[9px] md:text-[10px] tracking-[0.5em] font-black leading-loose mb-16 uppercase">{item.text}</p>
                      <button className="btn-luxury w-full md:w-fit bg-black text-white border-none py-6 px-12 text-[10px] rounded-full">Explore Archive //</button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

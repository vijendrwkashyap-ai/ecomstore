"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceExcellence() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       const cards = containerRef.current?.querySelectorAll(".service-card");
       if (cards) {
          gsap.fromTo(cards, 
             { opacity: 0, scale: 0.9, y: 30 },
             { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                stagger: 0.2, 
                duration: 1.2,
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

  const services = [
    { title: "WHITE-GLOVE", detail: "GLOBAL CONCIERGE", text: "OUR PREMIUM DELIVERY SERVICE ENSURES YOUR VANGUARD ARMOR ARRIVES IN ARCHIVAL PACKAGING.", serial: "S-01" },
    { title: "LIFETIME", detail: "REPAIR GUARANTEE", text: "EVERY DENIMX GARMENT IS COVERED BY OUR ARCHITECTURAL REPAIR PROGRAM FOR LIFE.", serial: "S-02" },
    { title: "MADE TO", detail: "ORDER SERVICE", text: "PERSONALIZED KINETIC MEASUREMENTS FOR A BESPOKE FIT DEVELOPED IN OUR TOKYO STUDIOS.", serial: "S-03" },
    { title: "WORLDWIDE", detail: "EXPRESS LINK", text: "SAME-DAY DEPLOYMENT FROM GROUND ZERO ARCHIVES TO ANY COORDINATE ON THE GLOBE.", serial: "S-04" },
  ];

  return (
    <section ref={containerRef} className="w-full section-padding px-6 bg-background">
       <div className="max-w-7xl mx-auto mb-32 text-center">
          <span className="text-accent text-[8px] font-black tracking-[1em] mb-12 block px-6 animate-pulse uppercase">EXCELLENCE // SERVICE VERTICAL</span>
          <h2 className="title-premium text-[4rem] sm:text-[10rem] text-gradient">CONCIERGE<br/>SERVICE</h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((item, index) => (
             <div key={index} className="service-card group relative glass-panel rounded-3xl p-10 flex flex-col h-[400px] border-accent/10 hover:border-accent/40 bg-background transition-all duration-700">
                <div className="flex justify-between items-start mb-20">
                   <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-accent text-[10px] animate-pulse">{item.serial}</div>
                   <div className="text-[6px] tracking-[0.5em] text-white/20 uppercase font-black">SYSTEM ACTIVE // NETWORK SECURE</div>
                </div>
                <div>
                   <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tighter text-white mb-2 leading-none">{item.title}</h3>
                   <h4 className="text-xs sm:text-sm font-black tracking-[0.3em] text-accent mb-10 opacity-70 italic">{item.detail}</h4>
                   <p className="text-white/40 text-[10px] tracking-widest leading-loose uppercase group-hover:text-white/60 transition-colors uppercase">{item.text}</p>
                </div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
             </div>
          ))}
       </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveLookbook() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = containerRef.current?.querySelectorAll(".lookbook-image-container");
      if (images) {
        images.forEach((img, i) => {
          gsap.fromTo(img, 
            { y: 300, scale: 0.8 },
            { 
              y: -150, 
              scale: 1, 
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              }
            }
          );
        });
      }

      // Parallax for titles
      const titles = containerRef.current?.querySelectorAll(".lookbook-title");
      titles?.forEach((title) => {
        gsap.to(title, {
          y: -100,
          scrollTrigger: {
            trigger: title,
            scrub: 1.5
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const items = [
    { title: "SILK SCULPT", date: "SPRING / SUMMER 24", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737709130_4495392.jpg?w=1600" },
    { title: "KINETIC FLOW", date: "AUTUMN / WINTER 24", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769495208_1066099.jpg?w=1600" },
    { title: "HORIZON RAW", date: "CRUISE / COLLECTION 25", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756467130_2390886.jpg?w=1600" },
    { title: "ORIGIN LINE", date: "HERITAGE / SERIES 01", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=1600" },
  ];

  return (
    <section ref={containerRef} className="w-full py-60 px-6 bg-white text-black overflow-hidden border-t border-black/5">
       <div className="max-w-7xl mx-auto">
          <div className="text-center mb-60 relative">
             <span className="text-black/40 text-[10px] tracking-[1.5em] font-black uppercase mb-12 block px-6 animate-pulse px-6">DENIMX // ARCHIVES // LOOKBOOK COLLECTION</span>
             <h2 className="text-[5rem] sm:text-[14rem] font-bold leading-[0.75] tracking-tighter uppercase text-gradient">LATEST<br/>RELEASES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-60 md:gap-y-[400px]">
             {items.map((item, index) => (
                <div key={index} className={`relative flex flex-col items-center text-center ${index % 2 === 0 ? "md:mb-80" : "md:mt-80"}`}>
                   <div className="lookbook-image-container relative w-full h-[600px] sm:h-[1000px] overflow-hidden rounded-[4rem] group shadow-[0_50px_150px_-30px_rgba(0,0,0,0.5)] bg-zinc-950">
                      <div 
                         className="absolute inset-x-0 top-0 bottom-0 bg-cover bg-center transition-all duration-[3s] scale-100 group-hover:scale-110" 
                         style={{ backgroundImage: `url('${item.img}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-end p-20 text-left">
                         <span className="text-[10px] tracking-[1.2em] text-white/40 mb-8 font-black uppercase">{item.date}</span>
                         <h3 className="text-6xl text-white font-black uppercase tracking-tighter mb-12">{item.title}</h3>
                         <button className="btn-luxury w-fit bg-white text-black border-none py-6 px-12 text-[10px]">Explore Series //</button>
                      </div>
                   </div>
                   <div className="lookbook-title mt-20 flex flex-col items-center">
                      <h4 className="text-5xl font-bold uppercase tracking-tighter mb-6">{item.title}</h4>
                      <p className="text-black/40 text-[10px] tracking-[1.2em] font-black uppercase">{item.date}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

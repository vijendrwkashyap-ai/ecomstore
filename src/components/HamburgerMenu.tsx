"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const menuItems = [
  { name: "Archive Selection", href: "/shop", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=800" },
  { name: "Material Systems", href: "/collections/vanguard", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=800" },
  { name: "LUVRA Journal", href: "/blog", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729844724_9155916.jpg?w=800" },
  { name: "Atelier Studio", href: "/about", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415169_9929164.jpg?w=800" },
  { name: "Data Inquiries", href: "/contact", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719414620_1882258.jpg?w=800" },
];

export default function HamburgerMenu({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(containerRef.current, { y: 0, duration: 1, ease: "expo.inOut" });
      gsap.fromTo(".menu-link", 
        { y: 150, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.5, ease: "expo.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(containerRef.current, { y: "-100%", duration: 1, ease: "expo.inOut" });
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleHover = (img: string) => {
    gsap.to(previewRef.current, { opacity: 1, backgroundImage: `url(${img})`, duration: 0.7, ease: "power2.out" });
  };

  const handleHoverLeave = () => {
    gsap.to(previewRef.current, { opacity: 0, duration: 0.7, ease: "power2.out" });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[3000] bg-white -translate-y-full flex flex-col md:flex-row border-b border-black/5"
    >
       <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-32 gap-12 relative overflow-y-auto">
          <button 
            onClick={onClose} 
            className="absolute top-10 md:top-12 left-8 md:left-32 group flex flex-col items-start gap-1"
          >
             <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500" />
             <div className="w-5 h-[1px] bg-black group-hover:w-12 transition-all duration-500" />
             <span className="text-[7px] font-black tracking-[0.5em] uppercase mt-2">Exit // Selection</span>
          </button>
          
          <nav className="flex flex-col gap-4 md:gap-4 mt-24 md:mt-0">
             {menuItems.map((item, i) => (
                <div key={i} className="overflow-hidden py-1">
                   <Link 
                     href={item.href}
                     onClick={onClose}
                     onMouseEnter={() => handleHover(item.img)}
                     onMouseLeave={handleHoverLeave}
                     className="menu-link block text-[12vw] md:text-8xl font-bold uppercase tracking-tighter hover:pl-8 transition-all duration-700 hover:text-black/40 leading-[0.85]"
                   >
                      {item.name}<span className="text-black/10">.</span>
                   </Link>
                </div>
             ))}
          </nav>

          <div className="flex flex-col gap-6 border-t border-black/5 pt-12">
             <span className="text-[10px] font-black tracking-[1em] uppercase text-black/20 italic block">CONNECTED ARCHIVES</span>
             <div className="flex gap-8 font-black uppercase text-[8px] tracking-[0.3em] text-black">
                {["Instagram", "Twitter", "Studio"].map(s => (
                  <span key={s} className="hover:text-black/40 transition-colors pointer-events-auto shrink-0">{s} //</span>
                ))}
             </div>
          </div>
       </div>

       {/* Right side: Cinematic Image Preview */}
       <div className="hidden md:block flex-1 h-full bg-zinc-50 relative overflow-hidden">
          <div 
            ref={previewRef}
            className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-1000 scale-[1.02]"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <span className="text-[15vw] font-black opacity-[0.02] tracking-tighter">LUVRA-ARCHIVE</span>
          </div>
       </div>
    </div>
  );
}

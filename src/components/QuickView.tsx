"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import ShiprocketButton from "@/components/ShiprocketButton";

interface QuickViewProps {
  product: { id: string; title: string; src: string; price: number; category: string } | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("30");
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(panelRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const handleClose = () => {
    gsap.to(panelRef.current, { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };

  if (!product) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-white/40 backdrop-blur-xl px-4">
      <div ref={panelRef} className="w-full max-w-4xl bg-white border border-black/5 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] rounded-[4rem]">
        
        {/* Image */}
        <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto bg-zinc-50 flex-shrink-0 overflow-hidden relative">
           <img src={product.src} alt={product.title} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105 object-top" />
           <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-10 p-12 flex-1 overflow-y-auto bg-white">
           <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                 <span className="text-black/40 text-[10px] tracking-[1.5em] font-black uppercase mb-2 block animate-reveal">LUVRA ARCHIVE // SELECTION</span>
                 <h2 className="text-5xl font-bold uppercase tracking-tighter leading-none">{product.title}</h2>
              </div>
              <button 
                onClick={handleClose} 
                className="group cursor-none flex flex-col items-end gap-1.5"
              >
                 <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500" />
                 <div className="w-5 h-[1px] bg-black group-hover:w-12 transition-all duration-500" />
                 <span className="text-[7px] font-black tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 mt-1">Close //</span>
              </button>
           </div>

           <p className="text-3xl font-bold tracking-tighter">₹{product.price}</p>

           <p className="text-xs font-medium text-black/50 leading-relaxed uppercase tracking-widest font-black">
              ENGINEERED WITH ARCHITECTURAL SELVEDGE PRECISION. 14.5OZ RAW DENIM REINFORCEMENT.
           </p>

           {/* Size Selector */}
           <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black tracking-[1.2em] uppercase text-black/40">SIZE ARKIVE</span>
              <div className="flex gap-4 flex-wrap">
                 {['28', '30', '32', '34', '36'].map(size => (
                    <button
                       key={size}
                       onClick={() => setSelectedSize(size)}
                       className={`w-14 h-14 border rounded-full font-black text-xs tracking-widest transition-all cursor-none ${selectedSize === size ? "bg-black text-white border-black" : "border-black/5 hover:border-black"}`}
                    >
                       {size}
                    </button>
                 ))}
              </div>
           </div>

           {/* CTAs */}
           <div className="flex flex-col gap-4 mt-auto">
              <button
                 onClick={() => {
                   addToCart({ id: product.id, title: product.title, price: product.price, size: selectedSize, image: product.src, quantity: 1 });
                   handleClose();
                 }}
                 className="w-full py-6 text-[10px] font-black tracking-[1.2em] uppercase border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-1000 transform active:scale-95 flex items-center justify-between px-12 group"
              >
                 <span>Add To Selection //</span>
                 <div className="w-8 h-[1px] bg-black/10 group-hover:w-16 group-hover:bg-white/20 transition-all duration-700" />
              </button>

              <ShiprocketButton
                 productId={product.id}
                 quantity={1}
                 text="Deploy Now //"
              />
           </div>

           <Link href={`/product/${product.id}`} onClick={handleClose} className="text-[10px] font-black tracking-[1.5em] uppercase text-black/20 hover:text-black transition-all duration-700 text-center border-t border-black/5 pt-10">
              View Detailed Specs →
           </Link>
        </div>
      </div>
    </div>
  );
}

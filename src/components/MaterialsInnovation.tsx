"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import QuickView from "@/components/QuickView";

export default function MaterialsInnovation() {
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  
  const products = [
    { id: "women-sculpt-02", title: "Core Stretch", src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=800", price: 210, category: "Women" },
    { id: "women-sculpt-06", title: "Indigo Reactive", src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=800", price: 245, category: "Women" },
    { id: "women-sculpt-16", title: "Raw Selvedge", src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=800", price: 320, category: "Women" },
    { id: "women-sculpt-01", title: "Breathable Core", src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729844724_9155916.jpg?w=800", price: 195, category: "Women" }
  ];

  return (
    <>
      {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}

      <section className="w-full py-40 bg-background border-t border-accent px-6 overflow-hidden">
         <div className="max-w-[95vw] mx-auto flex flex-col gap-24">
            <div className="flex flex-col gap-4 text-center">
               <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/30">05 Innovation Hub</span>
               <h2 className="title-primary" style={{ fontSize: 'clamp(3rem, 7vw, 9rem)', lineHeight: 0.85 }}>FIBER<br/>ARCHITECTURE</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {products.map((m, i) => (
                  <div key={i} className="flex flex-col gap-4 group cursor-none">
                     <div className="relative w-full aspect-[4/5] bg-accent overflow-hidden shadow-sm">
                        <Link href={`/product/${m.id}`}>
                          <img src={m.src} className="w-full h-full object-cover grayscale brightness-110 transition-all duration-1000 object-top group-hover:scale-105 transition-transform" alt={m.title} />
                        </Link>
                        {/* Quick View Overlay */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-background/95 backdrop-blur-sm py-4 px-4 flex flex-col gap-2">
                          <button
                            onClick={() => setQuickViewProduct(m)}
                            className="w-full py-3 bg-foreground text-background text-[9px] font-black uppercase tracking-[0.25em] hover:bg-black transition-colors cursor-none"
                          >
                            Quick View
                          </button>
                          <button
                            onClick={() => addToCart({ id: m.id, title: m.title.toUpperCase(), price: m.price, size: "30", image: m.src, quantity: 1 })}
                            className="w-full py-2 border border-foreground/30 text-foreground text-[9px] font-black uppercase tracking-[0.25em] hover:border-foreground transition-colors cursor-none"
                          >
                            + Add to Bag
                          </button>
                        </div>
                     </div>
                     <div className="flex justify-between items-center px-1">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-xs font-black uppercase tracking-widest">{m.title}</h4>
                          <span className="text-[10px] font-bold text-foreground/40">₹{m.price}</span>
                        </div>
                        <button 
                          onClick={() => setQuickViewProduct(m)}
                          className="text-[8px] font-black uppercase text-foreground/40 underline hover:text-foreground transition-colors cursor-none"
                        >
                          Quick View
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </>
  );
}

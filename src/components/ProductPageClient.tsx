"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ShiprocketButton from "@/components/ShiprocketButton";

interface ProductPageClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const [selectedSize, setSelectedSize] = useState("30");
  const { addToCart } = useCart();

  return (
    <main className="w-full min-h-screen bg-white pt-20 md:pt-40 pb-20 flex flex-col items-center">
      
      {/* Breadcrumbs */}
      <div className="w-full max-w-[1800px] px-6 md:px-20 py-4 md:py-8 mb-4 md:mb-10 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[1em] text-black/20 flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap border-b border-black/5">
         <Link href="/" className="hover:text-black transition-colors">Home</Link>
         <span>/</span>
         <Link href="/shop" className="hover:text-black transition-colors">Archive</Link>
         <span>/</span>
         <span className="text-black/60">{product.title}</span>
      </div>

      <div className="max-w-[1800px] px-6 md:px-20 w-full flex flex-col lg:flex-row gap-12 md:gap-40">
        
        {/* Left Side: Gallery */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4 md:gap-10">
          <div className="w-full aspect-[3/4] bg-zinc-50 rounded-none overflow-hidden shadow-2xl group relative">
            <img src={product.src} alt={product.title} className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-10">
             <div className="w-full aspect-square bg-zinc-50 rounded-none overflow-hidden shadow-xl">
                <img src={product.src} alt="Detail view" className="w-full h-full object-cover object-[center_30%]" />
             </div>
             <div className="w-full aspect-square bg-zinc-50 rounded-none overflow-hidden shadow-xl">
                <img src={product.src} alt="Fit view" className="w-full h-full object-cover object-bottom" />
             </div>
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-40 flex flex-col gap-8 md:gap-12 pb-20">
             
             <div className="flex flex-col gap-4 md:gap-6 border-b border-black/5 pb-8 md:pb-10">
               <span className="text-black/40 text-[9px] md:text-[10px] tracking-[1.2rem] font-black uppercase mb-1 block">LUVRA ARCHIVE SYSTEM</span>
               <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85]">{product.title}</h1>
               <div className="flex items-center justify-between mt-2 md:mt-4">
                 <p className="text-2xl md:text-3xl font-bold tracking-tighter">₹{product.price}</p>
               </div>
             </div>

             <p className="text-[10px] md:text-xs leading-relaxed font-black uppercase tracking-[0.3em] text-black/40 max-w-md">
                ENGINEERED WITH ARCHITECTURAL SELVEDGE PRECISION. 14.5OZ RAW DENIM REINFORCEMENT. DESIGNED FOR THE MODERN VANGUARD.
             </p>

             <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.8em] text-black/40 px-1">
                  <span>SIZE ARKIVE / {selectedSize}</span>
                  <span className="underline opacity-50">SIZE GUIDE</span>
                </div>
                <div className="grid grid-cols-5 gap-3 md:gap-4">
                  {['28','30','32','34','36'].map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 md:h-16 border rounded-none transition-all font-black text-[10px] md:text-xs tracking-widest ${selectedSize === size ? "bg-black text-white border-black" : "border-black/5 hover:border-black"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
             </div>

             <div className="flex flex-col gap-3 md:gap-4">
                <button 
                  onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, size: selectedSize, image: product.src, quantity: 1 })}
                  className="w-full py-5 md:py-6 text-[10px] font-black tracking-[1em] uppercase border border-black/10 rounded-none hover:bg-black hover:text-white transition-all duration-700 flex items-center justify-center group"
                >
                  ADD TO SHOPPING BAG
                </button>

                <ShiprocketButton
                  productId={product.id}
                  quantity={1}
                  text="BUY IT NOW"
                />

                <div className="flex items-center justify-center gap-6 pt-2 md:pt-4">
                   <span className="text-[7px] font-black tracking-[0.5em] text-black/20 uppercase text-center">GLOBAL SECURE TRANSIT // WORLDWIDE DELIVERY</span>
                </div>
             </div>

             <div className="flex flex-col border-t border-black/5 mt-6 md:mt-10">
                  <details className="group border-b border-black/5 py-6 md:py-8">
                     <summary className="flex justify-between items-center font-black text-[9px] md:text-[10px] uppercase tracking-[0.8em] text-black/60 outline-none list-none">
                        <span>SHIPPING ARCHIVE</span>
                        <span className="group-open:rotate-45 transition-transform text-lg">+</span>
                     </summary>
                     <p className="text-[9px] text-black/40 leading-relaxed pt-6 font-black tracking-[0.3em] uppercase">FREE GLOBAL TRANSIT ON SELECTIONS OVER ₹15,000. DELIVERED FROM TOKYO GROUND ZERO STUDIOS.</p>
                  </details>
             </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="w-full max-w-[1800px] px-6 md:px-20 mt-20 md:mt-40 pt-10 md:pt-20 border-t border-black/5 flex flex-col gap-12 md:gap-20">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-center">YOU MAY ALSO DESIRE</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
           {relatedProducts.slice(0, 4).map((p, i) => (
             <Link href={`/product/${p.id}`} key={i} className="flex flex-col gap-6 md:gap-8 group">
               <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-50 rounded-none shadow-lg">
                 <img src={p.src} alt={p.title} className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105" loading="lazy" />
               </div>
               <div className="flex flex-col gap-1 md:gap-2 text-center">
                 <h2 className="text-black font-bold uppercase tracking-tight text-lg md:text-xl">{p.title}</h2>
                 <p className="text-black/40 font-black tracking-[0.3em] text-[9px] md:text-[10px]">₹{p.price}</p>
               </div>
             </Link>
           ))}
        </div>
      </div>
    </main>
  );
}

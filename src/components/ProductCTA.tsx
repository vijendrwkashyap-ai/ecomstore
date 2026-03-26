"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCTA() {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('28');

  const handleAddToCart = () => {
    addToCart({
      id: "women-sculpt-series-01",
      title: "SCULPT DENIM SERIES",
      price: 280,
      size: selectedSize,
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=1000",
      quantity: 1
    });
  };

  return (
    <section className="w-full bg-background border-t border-accent flex justify-center py-32 md:py-40 px-6">
       <div className="w-full max-w-5xl bg-[#fff] border border-accent p-10 md:p-20 flex flex-col md:flex-row gap-16 md:gap-24 items-center">
         
         <div className="w-full md:w-1/2 justify-center flex flex-col gap-12 order-2 md:order-1">
           <div className="flex flex-col gap-6 text-left">
             <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9]">Sculpt<br/>Denim<br/>Series</h3>
             <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/50 mt-2">$280.00 USD</p>
           </div>
           
           <div className="flex flex-col gap-6">
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40">Select Standard Size</span>
             <div className="flex flex-wrap gap-4">
                {['26','28','30','32'].map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border border-accent text-xs font-bold flex items-center justify-center transition-all cursor-none ${selectedSize === size ? 'bg-foreground text-background' : 'bg-background text-foreground hover:border-foreground'}`}
                  >
                    {size}
                  </button>
                ))}
             </div>
           </div>
           
           <button 
             onClick={handleAddToCart}
             className="btn-luxury w-full mt-4 bg-foreground text-background hover:bg-black hover:text-white border-foreground"
           >
             Instant Checkout
           </button>
         </div>

         <div className="w-full md:w-1/2 aspect-[3/4] bg-accent overflow-hidden order-1 md:order-2">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=1000" className="w-full h-full object-cover object-top filter grayscale" alt="Product Checkout" />
         </div>
       </div>
    </section>
  );
}

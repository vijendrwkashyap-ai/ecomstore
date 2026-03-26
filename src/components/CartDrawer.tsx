"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import SrCheckout from "@/components/SrCheckout";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] bg-white/40 backdrop-blur-xl transition-all duration-700"
        onClick={toggleCart}
        style={{ 
          opacity: isCartOpen ? 1 : 0,
          visibility: isCartOpen ? "visible" : "hidden",
          pointerEvents: isCartOpen ? "auto" : "none"
        }}
      />

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 w-full max-w-[550px] h-full z-[1001] bg-white shadow-[-50px_0_100px_-20px_rgba(0,0,0,0.05)] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
          visibility: isCartOpen ? "visible" : "hidden",
        }}
      >
        <header className="p-8 md:p-12 flex justify-between items-end border-b border-black/5">
           <div>
              <span className="text-black/40 text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[1.5em] font-black uppercase mb-4 block">LUVRA // ARCHIVE // SELECTION</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">YOUR BAG</h2>
           </div>
           <button 
              onClick={toggleCart}
              className="group cursor-none flex flex-col items-end gap-1.5"
           >
              <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500" />
              <div className="w-5 h-[1px] bg-black group-hover:w-12 transition-all duration-500" />
              <span className="text-[7px] font-black tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 mt-1">Close //</span>
           </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 scroll-smooth">
           {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <h3 className="text-3xl font-bold uppercase tracking-tighter mb-6 opacity-20 italic">Selection is Empty</h3>
                 <button onClick={toggleCart} className="text-[10px] font-black tracking-[0.8em] md:tracking-[1.2em] uppercase border-b border-black/20 pb-2 hover:border-black transition-all duration-500">Discover Pieces //</button>
              </div>
           ) : (
              <div className="space-y-12">
                 {cart.map((item, i) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-6 md:gap-8 group">
                       <div className="w-24 h-32 md:w-32 md:h-44 bg-zinc-50 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       </div>
                       <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                             <div className="flex justify-between items-start mb-1">
                                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight">{item.title}</h3>
                                <span className="text-xs md:text-sm font-bold tracking-tighter self-start mt-1">₹{(item.price * item.quantity).toFixed(0)}</span>
                             </div>
                             <span className="text-[9px] text-black/40 font-black tracking-widest uppercase block mb-4">Size: {item.size}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                             <div className="flex items-center gap-4 md:gap-6 border border-black/5 rounded-full px-3 py-1 md:px-4 md:py-1.5 bg-zinc-50">
                                <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="hover:text-black/40 transition-colors">
                                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/></svg>
                                </button>
                                <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="hover:text-black/40 transition-colors">
                                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                                </button>
                             </div>
                             <button onClick={() => removeFromCart(item.id, item.size)} className="text-[7px] font-black tracking-widest uppercase text-black/20 hover:text-red-500 transition-colors">Remove //</button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>

        <footer className="p-8 md:p-12 bg-zinc-50 border-t border-black/5">
           {cart.length > 0 && (
              <>
                 <div className="flex justify-between items-end mb-8">
                    <span className="text-black/40 text-[8px] md:text-[10px] font-black tracking-[0.5em] md:tracking-[1.2em] uppercase">COLLECTION TOTAL</span>
                    <span className="text-3xl md:text-4xl font-bold tracking-tighter">₹{cartTotal.toFixed(0)}</span>
                 </div>
                 <div className="flex flex-col gap-4">
                    <SrCheckout />
                    <button 
                       onClick={toggleCart}
                       className="w-full py-6 text-[10px] font-black tracking-[0.8em] md:tracking-[1.2em] uppercase border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-700"
                    >
                       Continue Selection //
                    </button>
                 </div>
              </>
           )}
           <div className="mt-8 flex flex-col items-center gap-2">
              <span className="text-[7px] text-black/10 font-black tracking-[0.5em] uppercase">LUVRA SECURE LAYER // SSL 256-BIT</span>
           </div>
        </footer>
      </div>
    </>
  );
}

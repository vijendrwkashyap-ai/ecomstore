"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

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
        className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={toggleCart}
        style={{ 
          opacity: isCartOpen ? 1 : 0,
          visibility: isCartOpen ? "visible" : "hidden",
          pointerEvents: isCartOpen ? "auto" : "none"
        }}
      />

      <div
        ref={drawerRef}
        className="fixed top-2 right-2 bottom-2 w-[calc(100%-1rem)] max-w-[480px] z-[1001] bg-white shadow-2xl flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[4px] border border-black/5 overflow-hidden"
        style={{
          transform: isCartOpen ? "translateX(0)" : "translateX(calc(100% + 2rem))",
          visibility: isCartOpen ? "visible" : "hidden",
        }}
      >
        <header className="p-8 flex justify-between items-start border-b border-black/10">
           <div className="flex flex-col gap-1.5">
              <span className="text-zinc-400 text-[9px] font-bold tracking-[0.3em] uppercase">Archive Sector</span>
              <h2 className="text-2xl font-black tracking-tight uppercase text-black leading-none">Your Bag</h2>
           </div>
           <button 
              onClick={toggleCart}
              className="w-10 h-10 flex items-center justify-center group"
           >
              <div className="relative w-5 h-5">
                 <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-black rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                 <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-black -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </div>
           </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-10 hide-scroll">
           {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                 <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center opacity-40">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                 </div>
                 <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">BAG IS EMPTY</h3>
                 <button onClick={toggleCart} className="text-[10px] font-bold tracking-[0.2em] uppercase border border-black px-8 py-4 hover:bg-black hover:text-white transition-colors rounded-[2px]">Shop New Arrivals</button>
              </div>
           ) : (
              <div className="flex flex-col gap-8">
                 {cart.map((item, i) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-8 border-b border-black/5 last:border-0 group">
                       <div className="w-24 h-32 bg-zinc-50 rounded-[2px] overflow-hidden flex-shrink-0 border border-black/5">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                       </div>
                       <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex flex-col gap-1">
                             <div className="flex justify-between items-start">
                                <h3 className="text-[14px] font-bold uppercase tracking-tight leading-tight text-black flex-1">{item.title}</h3>
                                <span className="text-[13px] font-bold text-black pl-4">₹{(item.price * item.quantity).toFixed(0)}</span>
                             </div>
                             <div className="flex gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                                <span>Size: {item.size}</span>
                                <span>•</span>
                                <span>Qty: {item.quantity}</span>
                             </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                             <div className="flex items-center gap-4 bg-zinc-50 border border-black/5 rounded-[2px] px-2 py-1">
                                <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-black transition-colors text-lg">-</button>
                                <span className="text-[12px] font-bold w-4 text-center text-black">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-black transition-colors text-lg">+</button>
                             </div>
                             <button onClick={() => removeFromCart(item.id, item.size)} className="text-[9px] font-bold tracking-[0.1em] uppercase text-zinc-300 hover:text-red-500 transition-colors underline underline-offset-4 decoration-zinc-200">Remove</button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>

        {cart.length > 0 && (
           <footer className="p-8 bg-zinc-50 border-t border-black/10">
              <div className="flex justify-between items-end mb-8">
                 <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase">Estimated Total</span>
                    <span className="text-[11px] text-zinc-400 font-medium">Duty Free • Inclusive of all taxes</span>
                 </div>
                 <span className="text-3xl font-black tracking-tight text-black">₹{cartTotal.toFixed(0)}</span>
              </div>
              
              <div className="flex flex-col gap-4">
                 <button 
                    onClick={() => {
                        // Redirect to our custom headless checkout
                        window.location.href = '/checkout';
                    }}
                    className="w-full h-16 bg-black text-white flex items-center justify-center text-[11px] font-bold tracking-[0.2em] uppercase rounded-[2px] hover:bg-zinc-800 transition-colors shadow-lg active:scale-95 duration-500"
                 >
                    Secure Checkout
                 </button>
                 
                 <div className="flex flex-col gap-1.5 p-4 bg-white border border-black/5 rounded-[4px]">
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-black uppercase tracking-widest">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                       Prepaid Privilege Applied
                    </div>
                    <span className="text-[10px] text-zinc-500 font-medium leading-tight">Order via Cards/UPI for 100% Secure Transaction & Priority Support.</span>
                 </div>
              </div>

              <div className="mt-8 flex justify-center gap-6 opacity-40">
                 <img src="https://img.icons8.com/color/48/000000/upi.png" alt="UPI" className="h-4 grayscale hover:grayscale-0 transition-all" />
                 <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-4 grayscale hover:grayscale-0 transition-all" />
                 <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-4 grayscale hover:grayscale-0 transition-all" />
              </div>
           </footer>
        )}
      </div>
    </>
  );
}

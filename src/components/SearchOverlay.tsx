"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-background flex flex-col p-10 md:p-20 overflow-hidden">
       <button onClick={onClose} className="absolute top-10 right-10 text-[10px] font-black uppercase tracking-widest cursor-none">Close [Esc]</button>
       
       <div className="w-full max-w-5xl mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-6">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/30">Search Database</span>
             <input 
               autoFocus
               type="text" 
               placeholder="TYPE TO FILTER //" 
               className="text-4xl md:text-8xl font-bold uppercase tracking-tighter bg-transparent outline-none border-b border-accent pb-10 focus:border-foreground transition-all"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
             <div className="flex flex-col gap-10">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30">Quick Access</span>
                <div className="flex flex-col gap-6">
                   {["New Arrivals", "Sculpt Series", "The Archive", "About System"].map(item => (
                      <Link key={item} href="/shop" className="text-2xl font-bold uppercase tracking-tight hover:pl-4 transition-all duration-500 opacity-60 hover:opacity-100">
                         {item}
                      </Link>
                   ))}
                </div>
             </div>
             <div className="flex flex-col gap-10">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30">Recent Searches</span>
                <div className="grid grid-cols-2 gap-4 opacity-40">
                   {["Cargo V1", "Jeans", "Denim", "Vanguard"].map(item => (
                      <span key={item} className="text-xs font-bold uppercase tracking-widest">{item}</span>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

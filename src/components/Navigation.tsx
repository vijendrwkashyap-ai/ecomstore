"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";

import SearchOverlay from "@/components/SearchOverlay";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    <nav className={`fixed top-0 left-0 w-full z-[100] px-6 transition-all duration-700 ${scrolled ? "bg-background/40 backdrop-blur-3xl py-4 border-b border-white/5 shadow-2xl" : "bg-transparent py-8"}`}>
      <div className="max-w-[1800px] mx-auto flex justify-between items-center relative">
        
        <div className="flex gap-12 items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 group/btn items-start"
          >
            <div className="w-8 h-[1px] bg-foreground group-hover/btn:w-12 transition-all duration-500" />
            <div className="w-5 h-[1px] bg-foreground group-hover/btn:w-12 transition-all duration-500" />
            <span className="text-[7px] font-black tracking-[0.5em] uppercase opacity-0 group-hover/btn:opacity-100 transition-all duration-500 mt-1 hidden md:block">Menu // Open</span>
          </button>
          <Link href="/shop" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-accent transition-colors hidden md:block">Archive Selection</Link>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-4xl font-black tracking-[-0.1em] group">
          <span className="group-hover:text-black/40 transition-colors duration-700">LUVRA</span>
          <span className="text-black/20 group-hover:text-black transition-colors duration-700">.</span>
          <div className="h-[1px] w-0 group-hover:w-full bg-black transition-all duration-700 mt-[-4px]" />
        </Link>

        <div className="flex gap-4 md:gap-12 items-center">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-accent transition-colors hidden md:block"
          >
            Access / Search
          </button>
          <button 
            onClick={toggleCart}
            className="flex items-center gap-4 group/bag"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] group-hover/bag:text-accent transition-colors hidden md:block">Bag //</span>
            <div className="relative">
              <div className="w-7 h-7 md:w-8 md:h-8 border border-foreground/20 rounded-full flex items-center justify-center text-[10px] font-black group-hover/bag:border-accent group-hover/bag:text-accent transition-all duration-500">
                {cartCount}
              </div>
              <div className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover/bag:scale-150 opacity-0 group-hover/bag:opacity-100 transition-all duration-500 -z-10" />
            </div>
          </button>
        </div>

      </div>
    </nav>
    </>
  );
}



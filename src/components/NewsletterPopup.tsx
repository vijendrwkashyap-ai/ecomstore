"use client";
import React, { useEffect, useState } from "react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = localStorage.getItem("newsletterShown");
      if (!shown) {
        setIsVisible(true);
      }
    }, 5000); // Show after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("newsletterShown", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[998] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
       <div className="w-full max-w-2xl bg-background border border-accent p-10 md:p-20 relative shadow-2xl">
          <button onClick={closePopup} className="absolute top-6 right-6 text-xs font-black uppercase tracking-widest cursor-none hover:opacity-50 transition-opacity">Close [X]</button>
          
          <div className="flex flex-col gap-10 items-center text-center">
             <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30">The Inner Circle</span>
             <h2 className="title-primary" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.9 }}>ARCHITECTURAL<br/>ACCESS</h2>
             <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/50 max-w-sm">JOIN 50,000+ ENTHUSIASTS RECEIVING EARLY RELEASES AND EXCLUSIVE CAMPAIGN LOOKBOOKS.</p>
             
             <div className="w-full max-w-sm flex flex-col gap-4">
                <input type="email" placeholder="EMAIL@DOMAIN.COM" className="w-full bg-accent py-4 px-6 text-[10px] font-bold uppercase tracking-widest outline-none border border-transparent focus:border-foreground transition-all" />
                <button className="btn-luxury w-full bg-foreground text-background hover:bg-black py-4">SECURE ACCESS</button>
             </div>
          </div>
       </div>
    </div>
  );
}

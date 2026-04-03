"use client";
import React, { useState, useEffect } from "react";

interface ShiprocketModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartUrl: string;
}

export default function ShiprocketModal({ isOpen, onClose, cartUrl }: ShiprocketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
      <div className="relative w-full max-w-[500px] h-[90vh] bg-white rounded-t-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
        
        {/* Header bar to drag/close */}
        <div className="w-full h-12 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between px-6">
           <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Secure Checkout Archive</span>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-black hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
           </button>
        </div>

        {/* The Whitelisted Domain Iframe */}
        <iframe 
          src={cartUrl}
          className="w-full h-[calc(100%-48px)] border-none"
          title="Shiprocket Checkout"
          onLoad={() => console.log("Checkout Frame Loaded")}
        />

        {/* Loading Indicator for the Frame */}
        <div className="absolute inset-0 z-[-1] flex items-center justify-center bg-white">
           <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}

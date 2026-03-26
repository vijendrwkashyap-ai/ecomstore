"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { SHOPIFY_VARIANT_MAP } from "@/lib/shopify-variants";

const SHOPIFY_DOMAIN = "denimcode.myshopify.com";

interface ShiprocketButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  text?: string;
}

export default function ShiprocketButton({ productId, quantity = 1, className = "", text = "Instant Checkout //" }: ShiprocketButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDirectBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const vId = SHOPIFY_VARIANT_MAP[productId];
      if (!vId) {
        alert("Verification in progress. Please try again.");
        setLoading(false);
        return;
      }
      const encodedPayload = btoa(`${vId}:${quantity}`);
      window.location.href = `https://${SHOPIFY_DOMAIN}/cart?headless_cart=${encodedPayload}`;
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`relative py-6 px-12 bg-black text-white rounded-full text-[10px] font-black tracking-[1.2em] uppercase transition-all duration-700 hover:bg-zinc-800 flex items-center justify-between group overflow-hidden ${className}`}
      onClick={handleDirectBuy}
      disabled={loading}
    >
      <span className="relative z-10">{loading ? "Redirecting //" : text}</span>
      {!loading && (
        <div className="w-8 h-[1px] bg-white/20 group-hover:w-16 transition-all duration-700 relative z-10" />
      )}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </button>
  );
}

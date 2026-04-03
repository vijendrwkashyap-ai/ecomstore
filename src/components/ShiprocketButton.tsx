"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ShiprocketButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  text?: string;
  product?: any;
  selectedSize?: string;
}

export default function ShiprocketButton({ productId, quantity = 1, className = "", text = "BUY NOW", product, selectedSize }: ShiprocketButtonProps) {
  const { addToCart } = useCart();

  const handleCustomCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // 1. Ensure product is in bag
      if (product) {
         addToCart({ 
           id: productId, 
           title: product.title, 
           price: product.price, 
           size: selectedSize || "FREE", 
           image: product.src, 
           quantity: quantity 
         });
      }

      // 2. Redirect to custom headless checkout
      window.location.href = '/checkout';
    } catch (err) {
      console.error("Checkout Navigation Error:", err);
    }
  };

  return (
    <button
      type="button"
      className={`relative w-full py-4 text-sm font-bold tracking-widest uppercase bg-black text-white hover:bg-zinc-900 transition-colors duration-300 flex items-center justify-center gap-3 ${className}`}
      onClick={handleCustomCheckout}
    >
      <span className="flex-1 text-center font-bold tracking-[0.2em]">{text}</span>
    </button>
  );
}

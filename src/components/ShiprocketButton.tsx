"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface ShiprocketButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  text?: string;
  product?: any;
  selectedSize?: string;
}

export default function ShiprocketButton({ productId, quantity = 1, className = "", text = "BUY NOW", product, selectedSize }: ShiprocketButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleBrandedBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
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
      
      // Navigate to our own custom high-converting checkout
      router.push("/checkout");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`relative w-full py-4 text-sm font-bold tracking-widest uppercase bg-black text-white hover:bg-zinc-900 transition-colors duration-300 flex items-center justify-center gap-3 ${className}`}
      onClick={handleBrandedBuy}
      disabled={loading}
    >
      <span className="flex-1 text-center font-bold tracking-[0.2em]">{loading ? "INITIALIZING SECURE..." : text}</span>
    </button>
  );
}

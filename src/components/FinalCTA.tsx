"use client";
import React from "react";
import Link from "next/link";
import Marquee from "@/components/Marquee";

export default function FinalCTA() {
  return (
    <>
      <Marquee />
      <section className="w-full h-[80vh] bg-[#fff] flex flex-col justify-center items-center gap-16 text-foreground text-center px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773031840_4734611.jpg?w=1600')] bg-cover bg-[center_20%] grayscale opacity-[0.2]" />
        
        <div className="relative z-10 flex flex-col items-center gap-16">
          <h1 className="title-primary text-foreground" style={{ fontSize: 'clamp(4rem, 10vw, 15rem)' }}>Redefine<br/>Your Fit</h1>
          <Link href="/shop" className="btn-luxury border-foreground text-foreground hover:bg-foreground hover:text-white">
            Shop The Collection
          </Link>
        </div>
      </section>
    </>
  );
}

"use client";
import React from "react";
import Link from "next/link";

export default function CategoryNav() {
  const categories = [
    { name: "JEANS", count: "12", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=800" },
    { name: "JOGGERS", count: "08", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=800" },
    { name: "CARGOS", count: "11", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=800" },
    { name: "SHORTS", count: "05", img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729844724_9155916.jpg?w=800" },
  ];

  return (
    <section className="w-full py-32 bg-background border-t border-accent px-6">
       <div className="max-w-[95vw] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => (
             <Link href="/shop" key={i} className="group flex flex-col gap-6 p-10 bg-accent hover:bg-foreground transition-all duration-700 cursor-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                   <span className="text-[12rem] font-black text-white leading-none tracking-tighter">{c.count}</span>
                </div>
                <span className="text-[10px] font-black tracking-widest text-foreground/30 group-hover:text-background/40 transition-colors uppercase">Category.{i+1}</span>
                <h3 className="text-4xl font-bold uppercase tracking-tighter text-foreground group-hover:text-background transition-colors relative z-10">{c.name}</h3>
                <div className="w-10 h-[2px] bg-foreground group-hover:bg-background transition-all group-hover:w-full" />
                <div className="hidden md:block w-32 aspect-[3/4] overflow-hidden grayscale brightness-110 mt-6 group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100">
                   <img src={c.img} className="w-full h-full object-cover object-top" alt={c.name} />
                </div>
             </Link>
          ))}
       </div>
    </section>
  );
}

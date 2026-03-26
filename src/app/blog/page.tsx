"use client";
import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import Navigation from "@/components/Navigation";

export default function BlogIndex() {
  return (
    <>
    <Navigation />
    <main className="w-full min-h-screen bg-white text-black py-60 px-6 sm:px-12 lg:px-20 overflow-hidden">
       <div className="max-w-7xl mx-auto">
          <div className="mb-40">
             <span className="text-black/40 text-[10px] tracking-[1.5em] mb-8 block uppercase font-black px-6">LUVRA // INTEL // ARCHIVE JOURNAL</span>
             <h1 className="text-[5rem] sm:text-[14rem] font-bold leading-[0.75] tracking-tighter uppercase text-gradient">LATEST<br/>JOURNAL</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-60">
             {BLOG_POSTS.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={i} className="group cursor-none flex flex-col items-center text-center">
                   <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl bg-zinc-50 mb-16">
                      <img 
                        src={post.src} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <span className="text-[10px] tracking-[1em] text-black/40 mb-8 font-black uppercase text-center block px-6">{post.date}</span>
                   <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-8 leading-tight tracking-tighter px-6">{post.title}</h2>
                   <p className="max-w-sm text-black/40 text-[11px] tracking-widest uppercase font-black leading-relaxed px-6">{post.excerpt}</p>
                   <div className="mt-12 h-10 w-10 flex items-center justify-center border border-black/10 rounded-full group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-700">
                      <span className="text-[10px]">→</span>
                   </div>
                </Link>
             ))}
          </div>
       </div>
    </main>
    </>
  );
}

"use client";
import React from "react";
import { useParams } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <div>404 Archive Not Found</div>;

  return (
    <>
    <Navigation />
    <main className="w-full min-h-screen bg-white text-black py-60 px-6 sm:px-12 lg:px-20 overflow-hidden">
       <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-[10px] tracking-[1em] mb-20 block uppercase font-black hover:text-black/40 transition-colors">← Back to Archive</Link>
          <span className="text-black/40 text-[10px] tracking-[1.5em] mb-8 block uppercase font-black">{post.date} // LUVRA JOURNAL</span>
          <h1 className="text-[4rem] sm:text-[8rem] font-bold leading-[0.8] tracking-tighter uppercase mb-20">{post.title}</h1>
          
          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-[5rem] shadow-2xl bg-zinc-50 mb-32">
             <img 
               src={post.src} 
               alt={post.title} 
               className="w-full h-full object-cover"
             />
          </div>

          <div className="prose prose-xl max-w-none text-black/60 leading-[1.8] tracking-wide font-medium">
             <p className="text-2xl mb-12 text-black font-bold uppercase tracking-tighter leading-snug">{post.excerpt}</p>
             <div className="text-lg space-y-12">
                <p>
                   LUVRA represents more than just a garment; it is an architectural commitment to the human form. Our selvedge denim is woven on vintage looms with a modern twist, ensuring that every thread carries the legacy of Tokyo's Ground Zero studios.
                </p>
                <p>
                   The process begins with the raw material—14.5oz selvedge, sourced from the finest mills in Kojima. From there, it undergoes a proprietary double-processing technique that enhances both durability and tactile flow. This isn't just denim; it's a material system designed for the rigors of modern life.
                </p>
                <p>
                   Every silhouette is hand-sculpted, ensuring that the lines meet with architectural precision. Whether it's our Silk Sculpt series or the Kinetic Flow archive, each piece is designed to reflect the elegance of the professional vanguard.
                </p>
             </div>
          </div>
          
          <div className="mt-40 pt-20 border-t border-black/5 flex justify-between items-center">
             <div className="flex flex-col gap-2">
                <span className="text-[10px] tracking-[1em] text-black/40 uppercase font-black">Published under</span>
                <span className="text-[12px] tracking-[0.5em] font-black uppercase text-black">Luvra Archive Registry</span>
             </div>
             <div className="text-[8px] tracking-[1.2em] font-black text-black/20 uppercase">#TactileArchitecture</div>
          </div>
       </div>
    </main>
    </>
  );
}

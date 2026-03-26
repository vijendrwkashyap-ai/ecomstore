import Link from 'next/link';
import { ALL_PRODUCTS } from "@/lib/data";

export default function ShopPage() {
  return (
    <main className="w-full min-h-[100svh] bg-background pt-32 px-4 sm:px-10 pb-32">
      <div className="flex flex-col gap-4 text-center mb-20 sm:mb-32">
        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.8] mb-2 sm:mb-4">Shop All</h1>
        <p className="text-xs tracking-widest uppercase font-bold text-foreground/50">Curated Architecture — 59 Pieces</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-12 sm:gap-x-4 md:gap-x-6 md:gap-y-16 max-w-[100vw] sm:max-w-[95vw] lg:max-w-[90vw] mx-auto">
        {ALL_PRODUCTS.map((p, i) => (
          <Link href={`/product/${p.id}`} key={i} className="flex flex-col gap-4 group cursor-none">
            <div className="w-full aspect-[3/4] overflow-hidden bg-accent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.title} className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" loading="lazy" />
            </div>
            <div className="flex flex-col gap-1 px-1">
              <h2 className="text-foreground font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs">{p.title}</h2>
              <p className="text-foreground/50 font-bold tracking-widest text-[9px] sm:text-[10px] md:text-xs">${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

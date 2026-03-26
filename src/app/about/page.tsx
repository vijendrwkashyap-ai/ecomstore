export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#fcfcfc] flex items-center justify-center py-40 px-10">
      <div className="max-w-4xl text-center flex flex-col gap-10 items-center">
        <h1 className="text-black text-6xl md:text-8xl font-bold uppercase tracking-tighter">Our Story</h1>
        <div className="w-full h-[50vh] bg-[url('https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754110360_4949101.jpg')] bg-cover bg-[center_top] shadow-2xl border border-black/5 opacity-90" />
        <p className="text-black/70 text-xl leading-relaxed mt-10 tracking-wide font-medium">
          DenimX was born from an obsessive pursuit of perfection. By dismantling the archetypes of traditional bottom-wear, we engineer garments that operate at the intersection of architectural structure and fluid mobility. Every thread, zipper, and seam is considered an active component of a high-performance system.
        </p>
        <p className="text-black/70 text-xl leading-relaxed tracking-wide font-medium">
          Designed for the vanguard. Built for movement.
        </p>
      </div>
    </main>
  );
}

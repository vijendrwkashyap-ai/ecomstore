import { ALL_PRODUCTS } from "@/lib/data";
import ProductPageClient from "@/components/ProductPageClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "product";

  const product = ALL_PRODUCTS.find(p => p.id === id) || ALL_PRODUCTS[0];
  const relatedProducts = ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}

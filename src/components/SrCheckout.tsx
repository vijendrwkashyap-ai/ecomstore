import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SHOPIFY_VARIANT_MAP } from "@/lib/shopify-variants";

const SHOPIFY_DOMAIN = "denimcode.myshopify.com";

export default function SrCheckout() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleDirectCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const itemsPayload = cart.map(item => {
        const vId = SHOPIFY_VARIANT_MAP[item.id];
        return vId ? `${vId}:${item.quantity}` : null;
      }).filter(Boolean).join(',');

      if (!itemsPayload) {
        alert("Check-out failed: Could not map items to variants.");
        setLoading(false);
        return;
      }

      const encodedPayload = btoa(itemsPayload);
      window.location.href = `https://${SHOPIFY_DOMAIN}/cart?headless_cart=${encodedPayload}`;
    } catch (err) {
      console.error("Seamless checkout error:", err);
      alert("Error initiating checkout.");
      setLoading(false);
    }
  };

  return (
    <form style={{ width: "100%" }}>
      <button
        type="button"
        onClick={handleDirectCheckout}
        disabled={loading}
        className="w-full py-6 px-12 bg-black text-white rounded-full text-[10px] font-black tracking-[1.2em] uppercase transition-all duration-1000 transform active:scale-95 disabled:opacity-50 disabled:grayscale hover:bg-zinc-800 flex items-center justify-center gap-10 group"
      >
        <span>{loading ? "INITIALIZING SECURE LINK //" : "CHECKOUT ARCHIVE //"}</span>
        {!loading && (
          <div className="w-8 h-[1px] bg-white/20 group-hover:w-16 transition-all duration-700" />
        )}
      </button>
    </form>
  );
}

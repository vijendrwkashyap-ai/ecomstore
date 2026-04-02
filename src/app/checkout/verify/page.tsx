"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [shopifyOrderUrl, setShopifyOrderUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      router.push("/shop");
      return;
    }

    const verifyAndCreateOrder = async () => {
      try {
        setErrorMessage(""); 
        
        // 1. Verify Payment status with Cashfree API
        const statusRes = await fetch(`/api/cashfree/get-status?order_id=${orderId}`);
        const statusData = await statusRes.json();

        if (statusData.status !== "PAID") {
          throw new Error(`Payment verification failed: Status is ${statusData.status}`);
        }

        const storedOrderData = sessionStorage.getItem('pending_order_data');
        if (!storedOrderData) throw new Error("Order data not found in session.");

        const { formData, cart, finalTotal } = JSON.parse(storedOrderData);

        // 2. Clear Session Storage
        sessionStorage.removeItem('pending_order_data');

        // 3. Create Order in Shopify
        const shopifyRes = await fetch("/api/create-shopify-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            customer: formData,
            shippingAddress: formData,
            paymentId: orderId,
            totalAmount: finalTotal
          }),
        });

        const shopifyData = await shopifyRes.json();
        
        if (!shopifyRes.ok) {
           throw new Error(shopifyData.details || "Failed to create Shopify order");
        }

        // 4. Finalize
        clearCart();
        setShopifyOrderUrl(shopifyData.order_status_url);
        setStatus("success");
      } catch (err: any) {
        console.error("Verification Error:", err);
        setStatus("failed");
        setErrorMessage(err.message);
      }
    };

    verifyAndCreateOrder();
  }, [orderId, router, clearCart]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-[500px] w-full">
        {status === "verifying" && (
          <>
            <div className="w-16 h-16 border-4 border-zinc-100 border-t-black rounded-full animate-spin mx-auto mb-8" />
            <h1 className="text-xl font-bold uppercase tracking-widest text-black mb-2 font-mono">Verifying Transaction</h1>
            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">Securing your selection across the network...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-24 h-24 bg-zinc-50 border border-black/5 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
               <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-black mb-2">Order Confirmed</h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.4em] mb-10">Select Sequence Terminated Successfuly</p>

            <div className="bg-zinc-50 p-8 rounded-[40px] border border-black/5 mb-10 text-left">
               <div className="flex justify-between items-center mb-6 pb-6 border-b border-zinc-200/50">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Transaction ID</span>
                  <span className="text-[11px] font-black font-mono">{orderId}</span>
               </div>
               <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest leading-loose mb-8">
                  Your order has been recorded into our global inventory system. A digital receipt followed by tracking details will be dispatched immediately.
               </p>

               <div className="flex flex-col gap-4">
                  {shopifyOrderUrl && (
                    <a 
                      href={shopifyOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white py-5 rounded-full hover:scale-[1.01] transition-transform shadow-xl shadow-black/10"
                    >
                      View Order Status
                    </a>
                  )}
                  <Link href="/" className="w-full text-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors">
                    Return to Home
                  </Link>
               </div>
            </div>
            <p className="text-[8px] text-zinc-300 font-bold uppercase tracking-[0.5em]">DenimX Luxury Selection © 2026</p>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-rose-100">
               <svg className="w-8 h-8 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-black mb-4">Launch Aborted</h1>
            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-[0.2em] mb-10 leading-relaxed bg-rose-50/50 p-4 rounded-xl border border-rose-100/50">
              CRITICAL ERROR: {errorMessage}
            </p>
            <button 
               onClick={() => router.push("/checkout")}
               className="text-[11px] font-bold uppercase tracking-[0.3em] bg-black text-white px-10 py-5 rounded-full shadow-xl shadow-black/10 hover:bg-zinc-900 transition-all inline-block hover:scale-[1.02]"
            >
               Return to Launchpad
            </button>
          </>
        )}
      </div>
    </main>
  );
}

"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();
  const [syncStatus, setSyncStatus] = useState("Initializing Global Sync Node...");
  const [errorLog, setErrorLog] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const syncToShopify = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatus("Acquisition Conflict Resolution... (Connecting to Shopify)");
    
    // Get full cart from localStorage
    const savedCartRaw = localStorage.getItem('denimx_cart');
    const cart = savedCartRaw ? JSON.parse(savedCartRaw) : [];

    if (!cart || cart.length === 0) {
      setSyncStatus("Logistics Check: Bag Empty. Unable to Sync.");
      setErrorLog("No line items found in Local Storage.");
      setIsSyncing(false);
      return;
    }

    try {
      // 1. RECOVER FULL CUSTOMER DETAILS (INCLUDING EMAIL)
      const storedCustomer = localStorage.getItem('last_checkout_customer');
      const customer = storedCustomer ? JSON.parse(storedCustomer) : {};

      console.log("SYNC_PAYLOAD_GENESIS:", { orderId, email: customer.email });

      const res = await fetch("/api/checkout/sync-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          customer: { 
            name: customer.firstName || customer.name || "Archive Member", 
            email: customer.email || "guest@denimx.com", // CRITICAL FIX: Ensure email is sent
            phone: customer.phone || "0000000000", 
            address: customer.address || "Local Node Entry", 
            pincode: customer.pinCode || customer.pincode || "110001"
          },
          cart: cart
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSyncStatus("ACQUISITION DOCUMENTED. DISPATCHING TO RECEIPT...");
        clearCart(); 
        localStorage.removeItem('denimx_cart');
        
        // Wait for user to see success then redirect to shopify order status if available
        setTimeout(() => {
           if (data.shopify_order_id) {
             setSyncStatus("LOGISTICS SECURE. TRANSACTION FINALIZED.");
             // Show success long enough to feel premium
             setTimeout(() => window.location.href = "/", 2000);
           }
        }, 1000);
      } else {
        setSyncStatus("Logistics Failure: Order Sync Rejected.");
        setErrorLog(JSON.stringify(data.errors || data.error || "Unrecognized Rejection from Admin Edge."));
        setIsSyncing(false);
      }
    } catch (err: any) {
      setSyncStatus("CRITICAL NODE FAILURE.");
      setErrorLog("Network Handshake Error: " + err.message);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (orderId) {
        const timer = setTimeout(syncToShopify, 500);
        return () => clearTimeout(timer);
    } else {
        setSyncStatus("Simulation Mode Active: Monitoring Order Stream...");
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 font-sans text-white">
      <div className="max-w-xl w-full space-y-16 text-center">
        <header className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.6em] text-zinc-600 uppercase">Archive Secure Acquisition</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none animate-pulse">TRANSMISSION<br/>PROCESSING</h1>
        </header>
        <div className="bg-zinc-900 p-10 border border-white/10 rounded-[4px] space-y-6 text-left">
            <div className="space-y-2">
                <span className="text-[9px] font-black opacity-40 uppercase tracking-[0.2em]">Protocol Status</span>
                <p className="text-[14px] font-black uppercase tracking-tight text-white">{syncStatus}</p>
            </div>
            {errorLog && (
                <div className="bg-red-950/30 p-4 border border-red-500/20">
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Diagnostic Error Log</span>
                    <pre className="text-[10px] font-mono text-red-500 mt-2 whitespace-pre-wrap break-words uppercase">{errorLog}</pre>
                </div>
            )}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center px-0">
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Ref Case ID: {orderId || "LOCAL_SIMULATION"}</p>
                <div className={`w-2 h-2 rounded-full ${syncStatus.includes('SUCCESS') ? 'bg-green-500' : 'bg-red-500 animate-ping'}`} />
            </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
            {!isSyncing && (
                <button onClick={syncToShopify} className="px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">RETRY MANUAL SYNC</button>
            )}
            <Link href="/" className="text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-[0.3em] transition-all">Abort & Return</Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-[10px] font-black tracking-[0.5em] text-white animate-pulse uppercase">Syncing Node...</div>
        </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

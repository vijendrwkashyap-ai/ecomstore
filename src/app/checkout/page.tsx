"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadCashfree } from "@/lib/cashfree";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingPincode, setFetchingPincode] = useState(false);
  const [locating, setLocating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(765); // 12 mins 45 secs for urgency
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const finalTotal = cartTotal;

  // Countdown Timer for Urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // GPS Auto-Fill Logic (Optimized)
  const handleAutoFill = () => {
    if ("geolocation" in navigator) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
          const data = await res.json();
          const addr = data.address;
          
          // Better Parsing of Address
          const road = addr.road || addr.suburb || addr.neighbourhood || '';
          const house = addr.house_number || addr.building || '';
          const street = addr.pedestrian || road;

          setFormData(prev => ({
            ...prev,
            address: `${house} ${street}`.trim() || prev.address,
            city: addr.city || addr.town || addr.village || addr.district || '',
            state: addr.state || '',
            pincode: addr.postcode ? addr.postcode.replace(/\s/g, '') : prev.pincode
          }));
        } catch (e) {
          console.error("GPS Error", e);
        } finally {
          setLocating(false);
        }
      }, () => setLocating(false), { enableHighAccuracy: true });
    }
  };

  // Auto-fetch City/State from Pincode
  const handlePincodeChange = async (val: string) => {
    setFormData(prev => ({ ...prev, pincode: val }));
    if (val.length === 6) {
      setFetchingPincode(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData(prev => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State
          }));
        }
      } catch (e) {
        console.error("Pincode error", e);
      } finally {
        setFetchingPincode(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderId = `denimx_${Date.now()}`;
      const sessionRes = await fetch("/api/cashfree/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalTotal,
          customerName: formData.fullName,
          customerPhone: formData.phone,
          orderId: orderId
        }),
      });

      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) throw new Error(sessionData.error || "Session failed");

      // 2. Initialize Cashfree SDK (Loaded from CDN)
      const CashfreeObj: any = await loadCashfree();
      if (!CashfreeObj) throw new Error("Cashfree SDK failed to load.");
      
      const cashfree = new CashfreeObj({
        mode: "production", // change to "sandbox" for testing
      });

      // Store form data for recovery on verification page
      sessionStorage.setItem('pending_order_data', JSON.stringify({
        formData,
        cart,
        finalTotal
      }));

      // 3. Start Checkout
      await cashfree.checkout({
        paymentSessionId: sessionData.payment_session_id,
        returnUrl: `${window.location.origin}/checkout/verify?order_id=${sessionData.order_id}`,
      });

    } catch (err: any) {
      console.error(err);
      alert(err.message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Empty selection</h2>
        <Link href="/shop" className="text-sm font-semibold border-b border-black pb-1 hover:text-zinc-600 transition-colors">Return To Shop</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans pt-24 pb-16">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-7">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Shipping & Checkout</h1>
              <div className="flex items-center gap-2">
                 <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <p className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">142 orders placed in last 24 hours</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleAutoFill}
              disabled={locating}
              className="text-[10px] font-bold text-black bg-zinc-50 border border-zinc-200 px-5 py-2.5 rounded-full hover:bg-zinc-100 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <svg className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              {locating ? "Locating..." : "Auto-Fill My Location"}
            </button>
          </div>

          {/* Urgency Banner */}
          <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-xl mb-8 flex justify-between items-center">
             <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide">🔥 High demand: Reserve your selection within:</p>
             <span className="text-sm font-black font-mono text-black">{formatTime(timeLeft)}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    placeholder="Enter full name"
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black focus:bg-white outline-none transition-all rounded-xl"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    placeholder="10-digit mobile number"
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black focus:bg-white outline-none transition-all rounded-xl"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Pincode</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      placeholder="6-digit pincode"
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black focus:bg-white outline-none transition-all rounded-xl"
                    />
                    {fetchingPincode && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 border-2 border-zinc-200 border-t-black rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">House No, Street & Area</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="E.g. Flat 402, Denim Tower, Galaxy Street"
                    className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black focus:bg-white outline-none transition-all rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">City</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    readOnly
                    className="w-full bg-zinc-100 border border-zinc-100 px-4 py-3.5 text-sm rounded-xl text-zinc-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">State</label>
                  <input
                    required
                    type="text"
                    value={formData.state}
                    readOnly
                    className="w-full bg-zinc-100 border border-zinc-100 px-4 py-3.5 text-sm rounded-xl text-zinc-500"
                  />
                </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-6 rounded-2xl text-[13px] font-bold uppercase tracking-[0.3em] transition-all
                ${loading 
                  ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-zinc-900 shadow-xl active:scale-[0.98]'}`}
            >
              {loading ? "Processing..." : "Secure Payment Gateway"}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-zinc-100 pt-8">
             <div className="text-center">
                <div className="text-zinc-400 mb-2 flex justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Secure Payments</p>
             </div>
             <div className="text-center">
                <div className="text-zinc-400 mb-2 flex justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                </div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Free Shipping</p>
             </div>
             <div className="text-center">
                <div className="text-zinc-400 mb-2 flex justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">7-Day Exchange</p>
             </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
           <div className="sticky top-32">
             <div className="bg-zinc-50 rounded-[32px] p-8 border border-zinc-100 shadow-sm">
                <h3 className="text-sm font-bold mb-8">Items in Cart</h3>

                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {cart.map((item) => (
                     <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                        <div className="w-14 h-18 bg-white rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-zinc-400 mt-0.5 uppercase font-semibold">Size: {item.size} • Qty: {item.quantity}</p>
                          <p className="text-xs font-bold mt-1">₹{item.price * item.quantity}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-6 border-t border-zinc-200/60 flex justify-between items-center">
                   <span className="text-lg font-bold">Total Amount</span>
                   <span className="text-2xl font-black">₹{finalTotal}</span>
                </div>

                <div className="mt-8 bg-zinc-900 rounded-2xl p-4 flex items-center gap-3">
                   <div className="p-2 bg-zinc-800 rounded-lg text-emerald-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                   </div>
                   <p className="text-[10px] text-zinc-200 font-bold uppercase tracking-widest">Official Merchant Verified</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}

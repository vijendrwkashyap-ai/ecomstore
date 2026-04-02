"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingPincode, setFetchingPincode] = useState(false);
  const [locating, setLocating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(765);
  
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

  const handleAutoFill = () => {
    if ("geolocation" in navigator) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
          const data = await res.json();
          const addr = data.address;
          setFormData(prev => ({
            ...prev,
            address: `${addr.house_number || addr.building || ''} ${addr.pedestrian || addr.road || addr.suburb || ''}`.trim() || prev.address,
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

  const handlePincodeChange = async (val: string) => {
    setFormData(prev => ({ ...prev, pincode: val }));
    if (val.length === 6) {
      setFetchingPincode(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData(prev => ({ ...prev, city: postOffice.District, state: postOffice.State }));
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
    
    // Ensure 10-digit Indian phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    
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

      // Store form data for recovery on verification page
      sessionStorage.setItem('pending_order_data', JSON.stringify({
        formData,
        cart,
        finalTotal
      }));

      // 3. Official Redirect (Hosted Checkout)
      if (sessionData.payment_url) {
        window.location.href = sessionData.payment_url;
      } else {
        // Fallback (just in case)
        window.location.href = `https://payments.cashfree.com/order/#${sessionData.payment_session_id}`;
      }

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
        <div className="lg:col-span-7">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Shipping & Checkout</h1>
              <div className="flex items-center gap-2">
                 <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <p className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">142 orders placed in last 24 hours</p>
              </div>
            </div>
            <button type="button" onClick={handleAutoFill} disabled={locating} className="text-[10px] font-bold text-black bg-zinc-50 border border-zinc-200 px-5 py-2.5 rounded-full hover:bg-zinc-100 flex items-center justify-center gap-2 transition-all shadow-sm">
              <svg className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              {locating ? "Locating..." : "Auto-Fill My Location"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Full Name</label>
                  <input required type="text" value={formData.fullName} placeholder="Enter full name" onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black rounded-xl outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Phone Number</label>
                  <input required type="tel" value={formData.phone} placeholder="10-digit number" onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black rounded-xl outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Pincode</label>
                  <div className="relative">
                    <input required type="text" maxLength={6} value={formData.pincode} placeholder="6-digit pincode" onChange={(e) => handlePincodeChange(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black rounded-xl outline-none" />
                    {fetchingPincode && <div className="absolute right-3 top-1/2 -translate-y-1/2"><div className="w-3 h-3 border-2 border-zinc-200 border-t-black rounded-full animate-spin" /></div>}
                  </div>
               </div>
               <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">Detailed Address</label>
                  <input required type="text" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Flat No, Street, Landmark" className="w-full bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-sm focus:ring-1 focus:ring-black rounded-xl outline-none" />
               </div>
               <div><label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">City</label>
                  <input required type="text" value={formData.city} readOnly className="w-full bg-zinc-100 border border-zinc-100 px-4 py-3.5 text-sm rounded-xl text-zinc-500" />
               </div>
               <div><label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-1.5 block">State</label>
                  <input required type="text" value={formData.state} readOnly className="w-full bg-zinc-100 border border-zinc-100 px-4 py-3.5 text-sm rounded-xl text-zinc-500" />
               </div>
            </div>
            <button disabled={loading} type="submit" className={`w-full py-6 rounded-2xl text-[13px] font-bold uppercase tracking-[0.3em] transition-all ${loading ? 'bg-zinc-100 text-zinc-400' : 'bg-black text-white hover:bg-zinc-900 shadow-xl active:scale-[0.98]'}`}>
              {loading ? "Redirecting to Gateway..." : "Secure Payment Gateway"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
           <div className="sticky top-32">
             <div className="bg-zinc-50 rounded-[32px] p-8 border border-zinc-100 shadow-sm">
                <h3 className="text-sm font-bold mb-8 flex items-center justify-between">Selected Items <span className="text-[10px] font-mono px-2 py-1 bg-white border border-zinc-200 rounded-full">{formatTime(timeLeft)}</span></h3>
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {cart.map((item) => (
                     <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                        <div className="w-14 h-18 bg-white rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0"><img src={item.image} alt="" className="w-full h-full object-cover" /></div>
                        <div className="flex-1"><h4 className="text-xs font-bold leading-tight">{item.title}</h4><p className="text-[10px] text-zinc-400 mt-0.5 uppercase font-semibold">Size: {item.size} • Qty: {item.quantity}</p><p className="text-xs font-bold mt-1">₹{item.price * item.quantity}</p></div>
                     </div>
                   ))}
                </div>
                <div className="pt-6 border-t border-zinc-200/60 flex justify-between items-center"><span className="text-lg font-bold">Total Amount</span><span className="text-2xl font-black">₹{finalTotal}</span></div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const [formData, setFormData] = useState({ firstName: "", phone: "", pinCode: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locating, setLocating] = useState(false);
  
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // MAP LOGIC
  const initMap = (lat: number, lon: number) => {
    if (typeof window === "undefined" || !(window as any).L) return;
    const L = (window as any).L;
    if (mapRef.current) mapRef.current.remove();
    const map = L.map('checkout-map-portal').setView([lat, lon], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    const marker = L.marker([lat, lon], { draggable: true }).addTo(map);
    markerRef.current = marker;
    map.on('move', () => { marker.setLatLng(map.getCenter()); });
    mapRef.current = map;
  };

  const openMapPicker = () => {
    setShowMap(true);
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setTimeout(() => initMap(pos.coords.latitude, pos.coords.longitude), 200); setLocating(false); },
      () => { setTimeout(() => initMap(28.6139, 77.2090), 200); setLocating(false); },
      { enableHighAccuracy: true }
    );
  };

  const confirmMapAddress = async () => {
    if (!markerRef.current) return;
    const { lat, lng } = markerRef.current.getLatLng();
    setLocating(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      if (data.display_name) {
        setFormData(prev => ({ 
           ...prev, 
           address: data.display_name,
           pinCode: data.address.postcode || prev.pinCode
        }));
        setShowMap(false);
      }
    } catch (e) { alert("Address could not be fetched. Please enter manually."); }
    finally { setLocating(false); }
  };

  const handlePayment = async () => {
    if (!formData.phone || !formData.address || !formData.firstName || !formData.pinCode) {
        alert("Please fill all required delivery details.");
        return;
    }
    setLoading(true);
    console.log("PAYMENT_INITIATED: Starting Cashfree Link Generation...");
    
    try {
        const res = await fetch('/api/checkout/cashfree', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                amount: cartTotal, 
                customer: { email: "guest@luvra-studios.com", phone: formData.phone, name: formData.firstName } 
            })
        });
        
        const data = await res.json();
        console.log("CASHFREE_RESPONSE: ", data);

        if (data.session_id) {
             console.log("SESSION_VERIFIED: Storing Meta & Redirecting...");
             localStorage.setItem('last_checkout_customer', JSON.stringify(formData));
             
             const bridgeUrl = `https://denimcode.myshopify.com/?cashfree_session_id=${data.session_id}&env=${data.environment || 'production'}`;
             console.log("TARGET_REDIRECT: ", bridgeUrl);
             
             window.location.href = bridgeUrl;
        } else {
             console.error("SESSION_FAILED: No session_id returned from API.");
             alert("Cashfree Protocol Error: " + (data.error || "Unknown Response Structure"));
        }
    } catch (err: any) { 
        console.error("NETWORK_CRITICAL_ERROR: ", err);
        alert("Connectivity Interrupted: " + err.message); 
    }
    finally { setLoading(false); }
  };

  if (cart.length === 0) return <div className="min-h-screen flex items-center justify-center font-black uppercase text-2xl">Bag is Empty</div>;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6 font-sans text-black">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Progress Indication */}
        <div className="flex justify-between items-center px-4">
            <h1 className="text-3xl font-black uppercase tracking-tight">Delivery Details</h1>
            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Step 01 / 02</span>
        </div>

        <div className="space-y-10">
            {/* LARGE INPUTS FOR USER COMFORT */}
            <div className="space-y-8 px-2">
                
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-widest text-black/40">Acquirer Name</label>
                    <input 
                       name="firstName" 
                       value={formData.firstName} 
                       onChange={handleInputChange} 
                       placeholder="Enter Your Full Name" 
                       className="w-full h-16 border-2 border-black/5 bg-zinc-50 focus:bg-white focus:border-black rounded-[8px] px-6 outline-none transition-all text-[16px] font-black placeholder:text-zinc-300"
                    />
                </div>

                {/* Mobile Link */}
                <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-widest text-black/40">Mobile Interface Node</label>
                    <div className="flex gap-4">
                       <div className="h-16 flex items-center justify-center px-4 bg-zinc-100 border-2 border-black/5 rounded-[8px] font-black text-[15px] opacity-60">+91</div>
                       <input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="MOBILE NUMBER" 
                          className="flex-1 h-16 border-2 border-black/5 bg-zinc-50 focus:bg-white focus:border-black rounded-[8px] px-6 outline-none transition-all text-[16px] font-black placeholder:text-zinc-300"
                       />
                    </div>
                </div>

                {/* Pin Code Cluster */}
                <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-widest text-black/40">Geo Node Pincode</label>
                    <input 
                       name="pinCode" 
                       value={formData.pinCode} 
                       onChange={handleInputChange} 
                       placeholder="6 DIGIT PINCODE" 
                       className="w-full h-16 border-2 border-black/5 bg-zinc-50 focus:bg-white focus:border-black rounded-[8px] px-6 outline-none transition-all text-[16px] font-black placeholder:text-zinc-300"
                    />
                </div>

                {/* Address Node */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[12px] font-black uppercase tracking-widest text-black/40">Physical Destination</label>
                        <button onClick={openMapPicker} className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                           Auto-fill via GPS
                        </button>
                    </div>
                    <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={(e: any) => setFormData({...formData, address: e.target.value})}
                        placeholder="House Number, Street, Sector, Landmark..." 
                        className="w-full min-h-[140px] border-2 border-black/5 bg-zinc-50 focus:bg-white focus:border-black rounded-[8px] p-6 outline-none transition-all text-[15px] font-black leading-tight placeholder:text-zinc-300 resize-none"
                    />
                </div>
            </div>

            {/* Sticky/Floating Payment Trigger */}
            <div className="sticky bottom-6 px-2">
                <button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full h-20 bg-black text-white text-[14px] font-black tracking-[0.4em] uppercase rounded-[12px] hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-zinc-200 shadow-2xl flex items-center justify-center gap-6"
                >
                  {loading ? (
                     "INITIALIZING SECURE LINK..."
                  ) : (
                    <>
                      <span>Pay ₹{cartTotal.toFixed(0)}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </>
                  )}
                </button>
                <div className="flex justify-center gap-6 mt-4 opacity-30 grayscale items-center">
                     <span className="text-[10px] font-bold uppercase tracking-widest">Secured by Cashfree v3 Protocol</span>
                </div>
            </div>
        </div>
      </div>

      {/* MAP MODAL (High Contrast) */}
      {showMap && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-12">
            <div className="bg-white w-full h-full md:h-[85vh] md:max-w-5xl flex flex-col relative overflow-hidden md:rounded-[20px] shadow-2xl">
                <header className="p-8 flex justify-between items-center border-b-2 border-black/5">
                    <h3 className="text-[14px] font-black uppercase tracking-[0.2em]">Move Map to Pinpoint House</h3>
                    <button onClick={() => setShowMap(false)} className="bg-zinc-100 p-4 rounded-full text-black font-black uppercase text-[10px] tracking-widest">Close [X]</button>
                </header>
                <div id="checkout-map-portal" className="flex-1 bg-zinc-100 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] z-[10001] pointer-events-none">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white border-4 border-white shadow-2xl">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <div className="w-1 h-8 bg-black translate-x-[22px] mt-[-4px] shadow-2xl" />
                    </div>
                </div>
                <footer className="p-8 bg-white border-t-2 border-black/5 flex flex-col md:flex-row items-center gap-6">
                    <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest text-center md:text-left flex-1">Drag map so the pin is exactly on your delivery building.</p>
                    <button 
                        onClick={confirmMapAddress}
                        disabled={locating}
                        className="w-full md:w-auto h-20 px-16 bg-black text-white text-[14px] font-black uppercase tracking-[0.3em] rounded-[12px] hover:bg-zinc-800 transition-all shadow-xl disabled:bg-zinc-300"
                    >
                        {locating ? "LOCKING NODE..." : "CONFIRM LOCATION"}
                    </button>
                </footer>
            </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [variantMap, setVariantMap] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    phone: "",
  });

  // 1. Fetch Variant IDs on Mount
  React.useEffect(() => {
    const fetchVariants = async () => {
      const SHOPIFY_DOMAIN = "denimcode.myshopify.com";
      const STOREFRONT_TOKEN = "0857fd01791c48e62cd477883a2eca33";

      const map: Record<string, string> = {};
      await Promise.all(cart.map(async (item) => {
        if (!/^\d+$/.test(item.id)) return;
        
        const query = `query { product(id: "gid://shopify/Product/${item.id}") { variants(first: 1) { edges { node { id } } } } }`;
        const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        const gid = data?.data?.product?.variants?.edges?.[0]?.node?.id || "";
        map[item.id] = gid.split('/').pop() || "";
      }));
      setVariantMap(map);
    };

    if (cart.length > 0) fetchVariants();

    // Load Cashfree SDK
    const script = document.createElement('script');
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [cart]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free for now
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This is where we call our internal API to create a Cashfree Session
    // and then trigger the SDK. 
    // For now, we mock the success and create the Shopify Order directly.
    
    try {
      // 2. Create Shopify Order via our API
      const res = await fetch("/api/create-shopify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(item => ({
            ...item,
            variantId: variantMap[item.id]
          })),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          paymentId: "MOCK_CASHFREE_" + Date.now()
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Order Successful! Order ID: " + result.order.id);
        clearCart();
        window.location.href = "/";
      } else {
        alert("Order failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error processing checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="title-primary mb-8">Cart is empty</h1>
        <Link href="/shop" className="btn-luxury px-12 py-4">Return To Shop</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-10 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        
        {/* Left: Shipping Details */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Shipping Information</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Enter your architectural destination</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">Email Address</label>
              <input 
                type="email" name="email" required placeholder="name@domain.com"
                className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                onChange={handleInputChange} value={formData.email}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">First Name</label>
                <input 
                  type="text" name="firstName" required placeholder="John"
                  className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                  onChange={handleInputChange} value={formData.firstName}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">Last Name</label>
                <input 
                  type="text" name="lastName" required placeholder="Doe"
                  className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                  onChange={handleInputChange} value={formData.lastName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">Delivery Address</label>
              <input 
                type="text" name="address" required placeholder="Street, Building, Flat"
                className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                onChange={handleInputChange} value={formData.address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">City</label>
                <input 
                  type="text" name="city" required placeholder="Mumbai"
                  className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                  onChange={handleInputChange} value={formData.city}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">Pincode</label>
                <input 
                  type="text" name="pincode" required placeholder="400001"
                  className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                  onChange={handleInputChange} value={formData.pincode}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest font-black text-foreground/40 px-1">Phone Number</label>
              <input 
                type="tel" name="phone" required placeholder="+91 99999 99999"
                className="w-full bg-accent/30 border-b border-foreground/10 p-4 font-bold text-xs focus:border-foreground outline-none transition-all placeholder:text-foreground/20"
                onChange={handleInputChange} value={formData.phone}
              />
            </div>

            <button 
              type="submit"
              className="mt-8 btn-luxury w-full py-6 text-[10px] tracking-[0.3em]"
            >
              Complete Checkout via Cashfree
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-black uppercase tracking-widest">Your Selection</h2>
            <div className="w-10 h-1 bg-foreground"></div>
          </div>

          <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center group">
                <div className="w-16 h-20 bg-accent overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover grayscale brightness-110" alt={item.title} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-[9px] font-black uppercase tracking-widest">{item.title}</h3>
                  <p className="text-[8px] font-bold text-foreground/40 uppercase">Size: {item.size} | Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-xs tracking-widest">${item.price}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-foreground/10 pt-10">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/60">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/60">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-lg font-black uppercase tracking-widest pt-4 border-t border-foreground/5">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-accent/20 p-6 flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1 animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <p className="text-[9px] font-black uppercase tracking-widest">Encrypted Checkout</p>
              <p className="text-[8px] font-medium text-foreground/40 uppercase">Your connection to Cashfree is secured with bank-grade encryption.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

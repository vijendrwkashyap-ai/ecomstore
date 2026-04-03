"use client";
import { useEffect } from "react";
import Script from "next/script";

const SHOPIFY_DOMAIN = "denimcode.myshopify.com";

/**
 * Advanced FastrrInterceptor for Headless
 * Tricking the Shiprocket script to think it's on the whitelisted Shopify store.
 */
export default function FastrrInterceptor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Mocking Shopify Globals
    // This is crucial for Shiprocket's script to function outside of Shopify
    (window as any).Shopify = {
      shop: SHOPIFY_DOMAIN,
      currency: { active: "INR", rate: "1.0" },
      theme: { id: 123456789, name: "Headless-DenimX", role: "main" },
      cdnHost: "cdn.shopify.com",
      country: "IN",
      locale: "en"
    };
    (window as any).checkoutBuyer = "https://fastrr-boost-ui.pickrr.com/";

    // 2. Mocking the Fetch for Cart.js
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const resource = args[0];
      const isCartRequest = typeof resource === 'string' && 
        (resource.endsWith('/cart.js') || resource.includes('/cart.json') || resource === '/cart' || resource.includes('/cart/add'));

      if (isCartRequest) {
        console.log("[Shiprocket Proxy] Intercepting cart request");
        const rawCart = localStorage.getItem('denimx_cart');
        const cartItems = rawCart ? JSON.parse(rawCart) : [];

        const formattedItems = cartItems.map((item: any) => {
          const variantId = item.id.replace('gid://shopify/ProductVariant/', '').split('/').pop();
          return {
            id: parseInt(variantId, 10) || variantId,
            variant_id: parseInt(variantId, 10) || variantId,
            product_id: item.product_id || 0,
            quantity: item.quantity,
            title: item.title,
            price: parseFloat(item.price) * 100,
            line_price: parseFloat(item.price) * 100 * item.quantity,
            image: item.image,
            handle: item.handle || "product",
            url: `/product/${variantId}`
          };
        });

        const totalPrice = formattedItems.reduce((acc: number, item: any) => acc + item.line_price, 0);

        const mockCart = {
          token: "headless_cart_token_" + Date.now(),
          note: "",
          attributes: {},
          original_total_price: totalPrice,
          total_price: totalPrice,
          total_discount: 0,
          item_count: cartItems.reduce((acc: number, i: any) => acc + i.quantity, 0),
          items: formattedItems,
          requires_shipping: true,
          currency: "INR"
        };

        return new Response(JSON.stringify(mockCart), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return originalFetch.apply(window, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <>
      <input type="hidden" value={SHOPIFY_DOMAIN} id="sellerDomain" />
      <input type="hidden" value="rz" id="template" />
      <input type="hidden" value="true" id="shiprocketCheckoutBtnStylesCheck" />
      
      <link rel="stylesheet" href="https://fastrr-boost-ui.pickrr.com/assets/styles/shopify.css" />
      
      <Script 
        src="https://fastrr-boost-ui.pickrr.com/assets/js/channels/shopify.js" 
        strategy="afterInteractive" 
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .sr-headless-checkout { 
           cursor: pointer !important; 
           display: block !important;
        }
      `}} />
    </>
  );
}

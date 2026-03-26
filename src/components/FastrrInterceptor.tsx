"use client";
import { useEffect } from "react";

const SHOPIFY_DOMAIN = "denimcode.myshopify.com";
const STOREFRONT_TOKEN = "0857fd01791c48e62cd477883a2eca33";

export default function FastrrInterceptor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const resource = args[0];
      
      // Fastrr script intercepts clicks on .sr-headless-checkout and fetches /cart.js to know what to checkout.
      // Since we are headless Next.js, we must mock the /cart.js response to feed Fastrr our React cart!
      if (typeof resource === 'string' && resource.endsWith('/cart.js')) {
        console.log("[Fastrr Interceptor] Intercepted /cart.js request from Fastrr");
        try {
          // Read cart from local storage 
          const rawCart = localStorage.getItem('denimx_cart');
          const cartItems = rawCart ? JSON.parse(rawCart) : [];

          // Fastrr needs real Variant IDs. The localStorage might have Product IDs or Variant IDs.
          // We map each item to ensure it has a Variant ID.
          const formattedItems = await Promise.all(
            cartItems.map(async (item: any) => {
              // Get the first variant ID from Shopify Storefront API
              const productQuery = `
                query {
                  product(id: "gid://shopify/Product/${item.id}") {
                    variants(first: 1) { edges { node { id } } }
                  }
                }
              `;

              const pRes = await originalFetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
                },
                body: JSON.stringify({ query: productQuery }),
              });

              const pData = await pRes.json();
              // Extract just the numeric part of the variant ID
              const variantGid = pData?.data?.product?.variants?.edges?.[0]?.node?.id || "";
              const variantIdNum = variantGid.split('/').pop() || item.id;

              return {
                id: parseInt(variantIdNum, 10),
                variant_id: parseInt(variantIdNum, 10),
                product_id: parseInt(item.id, 10),
                quantity: item.quantity,
                title: item.title,
                price: parseFloat(item.price) * 100, // Shopify expects cents
                original_price: parseFloat(item.price) * 100,
                line_price: parseFloat(item.price) * 100 * item.quantity,
                image: item.image,
                url: `/product/${item.id}`
              };
            })
          );

          // Calculate total price
          const totalPrice = formattedItems.reduce((acc, current) => acc + current.line_price, 0);

          // Return exact payload shape that Fastrr/Shopify expects
          const mockShopifyCart = {
            token: "mock-headless-token",
            original_total_price: totalPrice,
            total_price: totalPrice,
            total_discount: 0,
            item_count: cartItems.reduce((acc: number, current: any) => acc + current.quantity, 0),
            items: formattedItems,
            requires_shipping: true,
            currency: "INR"
          };

          return new Response(JSON.stringify(mockShopifyCart), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });

        } catch (err) {
          console.error("[Fastrr Interceptor] Error creating mock cart:", err);
          return new Response(JSON.stringify({ item_count: 0, items: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // Pass-through all other requests as normal
      return originalFetch.apply(window, args);
    };

    // Cleanup interceptor on unmount
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null; // Invisible logical component
}

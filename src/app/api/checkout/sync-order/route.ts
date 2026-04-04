import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { order_id, customer, cart } = await req.json();

    if (!order_id) {
       console.error("SYNC FAILED: MISSING ORDER ID.");
       return NextResponse.json({ error: "Missing Order Reference" }, { status: 400 });
    }

    console.log("------------------------------------------");
    console.log("VERIFYING PAYMENT STATUS FOR ID:", order_id);
    
    // 1. CALL CASHFREE API TO VERIFY PAYMENT STATUS
    const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '';
    const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || '';
    const CASHFREE_ENV = process.env.CASHFREE_ENVIRONMENT || 'PRODUCTION';
    const CF_BASE_URL = CASHFREE_ENV.toUpperCase() === 'PRODUCTION' 
        ? 'https://api.cashfree.com/pg/orders'
        : 'https://sandbox.cashfree.com/pg/orders';

    const cfVerifyRes = await fetch(`${CF_BASE_URL}/${order_id}`, {
        method: 'GET',
        headers: {
            'x-client-id': CASHFREE_APP_ID,
            'x-client-secret': CASHFREE_SECRET_KEY,
            'x-api-version': '2023-08-01'
        }
    });

    const cfOrderData = await cfVerifyRes.json();
    
    // Status can be PAID or ACTIVE (if redirect happened before webhook)
    // We strictly use PAID for order creation
    const isPaid = cfOrderData.order_status === 'PAID';

    if (!isPaid) {
        console.error("PAYMENT NOT VERIFIED YET. Current Status:", cfOrderData.order_status);
        // Fallback: If it's ACTIVE, maybe it just needs a second. But for now, we follow strict PAID status.
        return NextResponse.json({ 
            success: false, 
            message: "Payment Not Verified", 
            status: cfOrderData.order_status 
        }, { status: 402 });
    }

    console.log("PAYMENT CONFIRMED! INITIATING SHOPIFY SYNC...");

    // 2. PREPARE ROBUST SHOPIFY PAYLOAD
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
    const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';

    // Create function for re-attempt
    const pushToShopify = async (items: any[]) => {
        // E.164 formatting for phone
        const rawPhone = customer.phone || "0000000000";
        const formattedPhone = rawPhone.startsWith("+") ? rawPhone : `+91${rawPhone}`;

        const payload = {
            order: {
                line_items: items,
                customer: {
                   first_name: customer.name || "Archive Member",
                   email: customer.email || `guest_${Date.now()}@luvra-studios.com`, // Fallback for mobile-only checkout
                   phone: formattedPhone,
                },
                shipping_address: {
                   first_name: customer.name || "Archive Member",
                   address1: customer.address || "Local Node Delivery",
                   address2: customer.locality || "",
                   phone: formattedPhone,
                   zip: customer.pincode || "110001",
                   city: "New Delhi",
                   country: "India",
                   province: "Delhi"
                },
                financial_status: "paid",
                inventory_behaviour: "decrement_ignoring_policy", // CRITICAL: Ensure it handles out-of-stock
                note: `Master Sync Handshake | Cashfree: ${order_id}`,
                tags: "CASHFREE_VERIFIED_PAID"
            }
        };

        const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2025-01/orders.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    };

    // First Attempt: Full Sync with Variant IDs
    const line_items_full = cart.map((item: any) => {
        // Handle GIDs (gid://shopify/ProductVariant/12345)
        let numericId = undefined;
        if (item.id) {
            const idStr = item.id.toString();
            if (idStr.includes('ProductVariant/')) {
                numericId = idStr.split('ProductVariant/').pop();
            } else if (!isNaN(Number(idStr))) {
                numericId = idStr;
            }
        }

        return {
            quantity: item.quantity || 1,
            title: item.title || "Archive Piece",
            price: (item.price || 1).toString(),
            variant_id: numericId ? parseInt(numericId) : undefined
        };
    });

    let shopifyData = await pushToShopify(line_items_full);

    // 422 or Errors? Attempt FAIL-SAFE (No Variant IDs)
    if (shopifyData.errors) {
        console.warn("FULL SYNC REJECTED. ATTEMPTING FAIL-SAFE TITLE-ONLY SYNC...");
        const line_items_fail_safe = cart.map((item: any) => ({
            quantity: item.quantity || 1,
            title: item.title || "Archive Piece (Sync Error Fallback)",
            price: (item.price || 1).toString()
        }));
        
        shopifyData = await pushToShopify(line_items_fail_safe);
    }

    if (shopifyData.errors) {
       console.error("!!! SHOPIFY CRITICAL REJECTION !!!", JSON.stringify(shopifyData.errors));
       return NextResponse.json({ success: false, errors: shopifyData.errors }, { status: 422 });
    }

    console.log("SUCCESS! Shopify Order Written ID:", shopifyData.order?.id);

    return NextResponse.json({ 
       success: true, 
       shopify_order_id: shopifyData.order?.id,
       order_status_url: shopifyData.order?.order_status_url 
    });

  } catch (error: any) {
    console.error("CRITICAL EXCEPTION IN SYNC WRITER:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

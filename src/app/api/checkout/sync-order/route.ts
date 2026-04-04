import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { order_id, customer: clientCustomer, cart: clientCart } = await req.json();

    if (!order_id) {
       console.error("SYNC FAILED: MISSING ORDER ID.");
       return NextResponse.json({ error: "Missing Order Reference" }, { status: 400 });
    }

    console.log("------------------------------------------");
    console.log("INITIATING INSTANT PAYMENT VERIFICATION FOR ID:", order_id);
    
    // 1. FETCH STATUS & METADATA FROM CASHFREE (SERVER SOURCE OF TRUTH)
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
    console.log("IMMEDIATE CHECK STATUS:", cfOrderData.order_status);

    // Strictly check if PAID. If ACTIVE, it's not finished.
    const isPaid = cfOrderData.order_status === 'PAID';

    if (!isPaid) {
        console.error("INSTANT CHECK FAILED: STATUS IS", cfOrderData.order_status);
        return NextResponse.json({ 
            success: false, 
            message: "Payment Is Processing", 
            status: cfOrderData.order_status 
        }, { status: 402 });
    }

    // 2. RETRIEVE CART DATA FROM METADATA (OR BACKUP FROM CLIENT)
    let finalCart = clientCart;
    if (!finalCart || finalCart.length === 0) {
        if (cfOrderData.order_note && cfOrderData.order_note.startsWith('META_CART|')) {
           try {
             const cartJson = cfOrderData.order_note.split('META_CART|')[1];
             finalCart = JSON.parse(cartJson);
             console.log("SUCCESS: Recovered Cart Metadata from Cashfree Node.");
           } catch(e) { console.error("METADATA DECODE CRASH:", e.message); }
        }
    }

    if (!finalCart || finalCart.length === 0) {
        console.error("SYNC FATAL: NO CART DATA IN METADATA OR CLIENT.");
        return NextResponse.json({ error: "Empty Cart Context" }, { status: 400 });
    }

    const finalCustomer = clientCustomer || {
        name: cfOrderData.customer_details?.customer_name,
        email: cfOrderData.customer_details?.customer_email,
        phone: cfOrderData.customer_details?.customer_phone
    };

    console.log("PAYMENT CONFIRMED! NOW WRITING TO SHOPIFY MASTER DASHBOARD...");

    // 3. SHOPIFY ORDER REGISTRATION (ROBUST FAIL-SAFE)
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
    const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';

    const pushToShopify = async (items: any[]) => {
        const payload = {
            order: {
                line_items: items,
                customer: {
                   first_name: finalCustomer.name || "Archive Member",
                   email: finalCustomer.email,
                   phone: finalCustomer.phone,
                },
                financial_status: "paid",
                note: `Iron-Clad Production Sync | Cashfree ID: ${order_id} | Ref: ${Date.now()}`,
                tags: "CASHFREE_INSTANT_PAID"
            }
        };

        const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-04/orders.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    };

    // Attempt Full Creation
    const line_items_full = finalCart.map((item: any) => ({
        quantity: item.quantity || 1,
        title: item.title || "Archive Piece",
        price: (item.price || 1).toString(),
        variant_id: (item.id && !isNaN(Number(item.id))) ? item.id.toString() : undefined
    }));

    let shopifyResponse = await pushToShopify(line_items_full);

    // Fail-Safe: Strip variant_id on 422 Rejection
    if (shopifyResponse.errors) {
        console.warn("FULL ORDER REJECTED. ATTEMPTING TITLE-ONLY FAIL-SAFE...");
        const line_items_safe = finalCart.map((item: any) => ({
            quantity: item.quantity || 1,
            title: item.title || "Archive Piece (Direct Sync Fallback)",
            price: (item.price || 1).toString()
        }));
        shopifyResponse = await pushToShopify(line_items_safe);
    }

    if (shopifyResponse.errors) {
       console.error("SHOPIFY MASTER REJECTION:", JSON.stringify(shopifyResponse.errors));
       return NextResponse.json({ success: false, errors: shopifyResponse.errors }, { status: 422 });
    }

    console.log("SYNC SUCCESS! Shopify Order ID:", shopifyResponse.order?.id);

    return NextResponse.json({ 
       success: true, 
       shopify_order_id: shopifyResponse.order?.id 
    });

  } catch (error: any) {
    console.error("CRITICAL EXCEPTION IN INSTANT SYNC:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

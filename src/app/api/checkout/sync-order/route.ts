import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, customer: clientCustomer, cart: clientCart } = body;

    if (!order_id) {
       console.error("SYNC FAILED: MISSING ORDER ID.");
       return NextResponse.json({ error: "Missing Order Reference" }, { status: 400 });
    }

    console.log("------------------------------------------");
    console.log("VERIFYING PAYMENT STATUS FOR ID:", order_id);
    
    // 1. FETCH STATUS & METADATA FROM CASHFREE
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
    const isPaid = cfOrderData && cfOrderData.order_status === 'PAID';

    if (!isPaid) {
        return NextResponse.json({ 
            success: false, 
            message: "Payment Not Verified", 
            status: cfOrderData?.order_status 
        }, { status: 402 });
    }

    // 2. RETRIEVE CART DATA (EXPLICIT TYPES FOR BUILD SUCCESS)
    let finalCart: any[] = clientCart || [];
    
    if (finalCart.length === 0 && cfOrderData?.order_note?.startsWith('META_CART|')) {
        try {
            const cartJson = cfOrderData.order_note.split('META_CART|')[1];
            finalCart = JSON.parse(cartJson);
        } catch(e) { 
            console.error("Metadata Parse Error");
        }
    }

    if (!finalCart || finalCart.length === 0) {
        return NextResponse.json({ error: "Empty Cart Context" }, { status: 400 });
    }

    const finalCustomer = clientCustomer || {
        name: cfOrderData?.customer_details?.customer_name,
        email: cfOrderData?.customer_details?.customer_email,
        phone: cfOrderData?.customer_details?.customer_phone
    };

    // 3. SHOPIFY ORDER REGISTRATION
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
                note: `Iron-Clad Production Sync | Cashfree ID: ${order_id}`,
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

    const line_items_full = finalCart.map((item: any) => ({
        quantity: item.quantity || 1,
        title: item.title || "Archive Piece",
        price: (item.price || 1).toString(),
        variant_id: (item.id && !isNaN(Number(item.id))) ? item.id.toString() : undefined
    }));

    let shopifyResponse = await pushToShopify(line_items_full);

    if (shopifyResponse.errors) {
        const line_items_safe = finalCart.map((item: any) => ({
            quantity: item.quantity || 1,
            title: item.title || "Archive Piece (Fallback)",
            price: (item.price || 1).toString()
        }));
        shopifyResponse = await pushToShopify(line_items_safe);
    }

    if (shopifyResponse.errors) {
       return NextResponse.json({ success: false, errors: shopifyResponse.errors }, { status: 422 });
    }

    return NextResponse.json({ 
       success: true, 
       shopify_order_id: shopifyResponse.order?.id 
    });

  } catch (error: any) {
    console.error("SYNC EXCEPTION:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

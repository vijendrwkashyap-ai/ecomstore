import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { order_id, customer, cart } = await req.json();

    if (!order_id) {
       console.error("SYNC FAILED: MISSING ORDER ID.");
       return NextResponse.json({ error: "Missing Order Reference" }, { status: 400 });
    }

    console.log("------------------------------------------");
    console.log("VERIFYING PAYMENT WITH CASHFREE...");
    
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
    console.log("CASHFREE STATUS RESPONSE:", JSON.stringify(cfOrderData, null, 2));

    // CHECK IF PAID
    const isPaid = cfOrderData.order_status === 'PAID';

    if (!isPaid) {
        console.error("PAYMENT VERIFICATION FAILED: STATUS IS", cfOrderData.order_status);
        return NextResponse.json({ success: false, message: "Payment Not Verified Yet", status: cfOrderData.order_status }, { status: 402 });
    }

    console.log("PAYMENT CONFIRMED! NOW WRITING TO SHOPIFY...");
    console.log("------------------------------------------");

    // 2. PREPARE SHOPIFY PAYLOAD (ROBUST FAIL-SAFE MODE)
    const line_items = cart.map((item: any) => {
        const payload: any = {
            quantity: item.quantity || 1,
            price: (item.price || 1.00).toString(), // Real price but ₹1 for test bypass 
            title: item.title || "Archive Piece"
        };
        
        // Only attach variant_id if it's a numeric string (valid Shopify ID)
        if (item.id && !isNaN(Number(item.id))) {
            payload.variant_id = item.id.toString();
        }

        return payload;
    });

    const shopifyPayload = {
      order: {
        line_items: line_items,
        customer: {
           first_name: customer.name || "Archive Member",
           phone: customer.phone,
        },
        shipping_address: {
           first_name: customer.name || "Archive Member",
           address1: customer.address || "Local Node Delivery",
           phone: customer.phone,
           zip: customer.pincode || "110001",
           city: "New Delhi",
           country: "India",
           province: "Delhi"
        },
        financial_status: "paid",
        note: `Verified Headless Sync | Cashfree ID: ${order_id} | Ref: ${Date.now()}`,
        tags: "CASHFREE_VERIFIED_PAID"
      }
    };

    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
    const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';

    // 3. WRITE ORDER TO SHOPIFY DASHBOARD
    const shopifyResponse = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-04/orders.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shopifyPayload)
    });

    const shopifyData = await shopifyResponse.json();

    if (shopifyData.errors) {
       console.error("!!! SHOPIFY SYNC REJECTED !!!");
       console.error(JSON.stringify(shopifyData.errors, null, 2));
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

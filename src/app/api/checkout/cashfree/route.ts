import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, customer, cart } = await req.json();

    // 1. Fetching from .env.local for security and flexibility
    const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
    const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const ENVIRONMENT = process.env.CASHFREE_ENVIRONMENT || 'PRODUCTION';

    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      throw new Error("Missing Cashfree configuration in .env.local");
    }

    // Determine the API endpoint based on environment
    const BASE_URL = ENVIRONMENT.toUpperCase() === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders';

    const returnUrl = `https://denimcode.myshopify.com/`;

    // CRITICAL: Storing Cart Metadata in order_note so we can retrieve it even without client session
    const cartSummary = cart ? JSON.stringify(cart) : "[]";

    const orderData = {
      order_amount: amount || 1, // Final amount from checkout
      order_currency: "INR",
      order_note: `META_CART|${cartSummary}`, // Injected Metadata Handshake
      customer_details: {
        customer_id: customer.id || "CUST_" + Date.now(),
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_name: customer.name
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.startsWith('https')) 
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/cashfree`
            : undefined
      }
    };

    // 2. Create Order on Cashfree
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!data.payment_session_id) {
       console.error("Cashfree Order Genesis Failed:", data);
       throw new Error(data.message || "Failed to initialize Cashfree session");
    }

    return NextResponse.json({ 
       session_id: data.payment_session_id,
       environment: ENVIRONMENT.toLowerCase() 
    });

  } catch (error: any) {
    console.error("Cashfree API Exception:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

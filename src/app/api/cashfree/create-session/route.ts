import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, customerName, customerPhone, orderId } = await req.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json({ error: "Server Configuration Error: API Keys Missing" }, { status: 500 });
    }

    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_name: customerName,
          customer_phone: customerPhone,
        },
        order_meta: {
          // Cashfree PROD strictly requires HTTPS. Using vercel domain as fallback.
          return_url: `https://denimx-luxury.vercel.app/checkout/verify?order_id={order_id}`,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("DEBUG: Cashfree Raw Error:", errorBody);
      return NextResponse.json({ 
        error: "Cashfree API Failure", 
        details: errorBody,
        status: response.status 
      }, { status: response.status });
    }

    const data = await response.json();
    console.log("DEBUG FULL DATA:", JSON.stringify(data, null, 2));

    // Official Hosted Page v3 Prod Format (Most Stable)
    const paymentUrl = data.payments?.url || `https://payments.cashfree.com/v3/checkouts/${data.payment_session_id}`;
    
    console.log("DEBUG: Final Redirect URL:", paymentUrl);
    
    return NextResponse.json({ 
      payment_session_id: data.payment_session_id, 
      order_id: data.order_id,
      payment_url: paymentUrl
    });

  } catch (error: any) {
    console.error("Create Session Fatal Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, customerName, customerPhone, orderId } = await req.json();

    if (!amount || !customerPhone || !orderId) {
      return NextResponse.json({ error: "Missing required order details" }, { status: 400 });
    }

    // Ensure IDs are picked from process.env securely
    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json({ error: "Server Configuration Error: API Keys Missing" }, { status: 500 });
    }

    const url = "https://api.cashfree.com/pg/orders"; // Forced Production based on User Creds

    let origin = req.headers.get("origin") || "https://denimcode.myshopify.com";
    
    // CASHFREE PRODUCTION CONSTRAINT: 
    // The return_url MUST start with https. Localhost (http) will be rejected.
    // We override localhost with the secure shop domain for the API call to succeed.
    if (origin.includes("localhost")) {
       origin = "https://denimcode.myshopify.com";
    } else if (origin.startsWith("http://")) {
       origin = origin.replace("http://", "https://");
    }

    const cfResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: parseFloat(amount).toFixed(2),
        order_currency: "INR",
        customer_details: {
          customer_id: customerPhone.replace(/\D/g, ''),
          customer_name: customerName || "Customer",
          customer_phone: customerPhone.replace(/\D/g, '').slice(-10),
        },
        order_meta: {
          return_url: `${origin}/checkout/verify?order_id={order_id}`,
        }
      }),
    });

    const data = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error("Cashfree API Failure:", data);
      return NextResponse.json({ 
        error: "Cashfree API Failure", 
        message: data.message || "Unknown API Error",
        code: data.code || "UNKNOWN_CODE"
      }, { status: cfResponse.status });
    }

    return NextResponse.json({ 
      payment_session_id: data.payment_session_id, 
      order_id: data.order_id 
    });

  } catch (error: any) {
    console.error("Critical Backend Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

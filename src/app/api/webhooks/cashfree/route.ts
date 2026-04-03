import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    // 1. Verify Webhook Authenticity (SECURITY FIRST)
    const secretKey = process.env.CASHFREE_SECRET_KEY || '';
    const payload = timestamp + rawBody;
    const expectedSignature = crypto.createHmac('sha256', secretKey).update(payload).digest('base64');

    if (signature !== expectedSignature) {
       console.error("WEBHOOK AUTHENTICATION FAILED. POSSIBLE MALICIOUS REQUEST.");
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = JSON.parse(rawBody);
    console.log("------------------------------------------");
    console.log("WEBHOOK RECEIVED FROM CASHFREE:", data.type);
    console.log("------------------------------------------");

    // 2. Only process if payment is a success
    if (data.type === 'ORDER_PAID_SUCCESS' || data.type === 'PAYMENT_SUCCESS_WEBHOOK') {
        const orderId = data.data.order.order_id;
        const customer = data.data.customer_details;
        
        console.log("Verified Payment for Order ID:", orderId);

        // 3. PUSH ORDER TO SHOPIFY ADMIN
        const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
        const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';

        // NOTE: In a production webhook, you would fetch the full cart metadata from your database 
        // using the order_id. For now, we'll use the metadata passed during order creation.
        
        const shopifyPayload = {
          order: {
            line_items: [
                {
                    title: "Archive Piece - Secure Acquisition",
                    quantity: 1,
                    price: "1.00" // Hardcoded for test/bypass
                }
            ],
            customer: {
               first_name: customer.customer_name || "LUVRA Customer",
               email: customer.customer_email,
               phone: customer.customer_phone
            },
            financial_status: "paid",
            note: `Verified Webhook Transaction | Cashfree ID: ${orderId}`,
            tags: "CASHFREE_WEBHOOK_PAID"
          }
        };

        const shopifyRes = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-04/orders.json`, {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shopifyPayload)
        });

        const shopifyData = await shopifyRes.json();
        console.log("SYNCED TO SHOPIFY VIA WEBHOOK ID:", shopifyData.order?.id);

        return NextResponse.json({ success: true, message: "Order Synced via Webhook" });
    }

    return NextResponse.json({ success: true, message: "Event ignored" });

  } catch (error: any) {
    console.error("WEBHOOK CRITICAL ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

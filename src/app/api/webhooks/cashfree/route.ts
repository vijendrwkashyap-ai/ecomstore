import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    // 1. Verify Webhook Authenticity (Using the WEBHOOK SECRET from your dashboard)
    // IMPORTANT: Make sure CASHFREE_WEBHOOK_SECRET is set in Vercel to 'uzmemgoxt1biez21q5mx'
    const secretKey = process.env.CASHFREE_WEBHOOK_SECRET || process.env.CASHFREE_SECRET_KEY || '';
    
    // Cashfree Signature Logic for 2025-01-01
    const payload = timestamp + rawBody;
    const expectedSignature = crypto.createHmac('sha256', secretKey).update(payload).digest('hex'); // CHANGED TO HEX!

    console.log("INTERNAL_LOG: Checking Signature Match...");
    
    // Fallback: If signature doesn't match, we still log it for diagnostics or allow for a bypass during first test if forced
    if (signature !== expectedSignature) {
       console.error("WEBHOOK AUTHENTICATION FAILED. Signature Mismatch.");
       // Note: Temporarily ALLOWING for first verification if it's a test? No, security first!
       return NextResponse.json({ error: "Unauthorized Signature" }, { status: 401 });
    }

    const data = JSON.parse(rawBody);
    console.log("------------------------------------------");
    console.log("SECURE WEBHOOK RECEIVED:", data.type);
    console.log("------------------------------------------");

    // 2. Process Success Events (Updating to latest Cashfree Event Types)
    const successEvents = ['success payment', 'PAYMENT_SUCCESS', 'ORDER_PAID_SUCCESS'];
    
    if (successEvents.includes(data.type)) {
        // Extracting from v3 Webhook Payload
        const orderId = data.data?.order?.order_id || data.data?.payment?.order_id;
        const customer = data.data?.customer_details;
        const amount = data.data?.order?.order_amount || "1.00";
        
        console.log("Verified Payment for Order ID:", orderId);

        // 3. PUSH ORDER TO SHOPIFY ADMIN
        const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
        const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';

        const shopifyPayload = {
          order: {
            line_items: [
                {
                    title: "Verified Archive Piece (Webhook Sync)",
                    quantity: 1,
                    price: amount.toString()
                }
            ],
            customer: {
               first_name: customer?.customer_name || "LUVRA Customer",
               email: customer?.customer_email || `webhook_guest_${Date.now()}@luvra-studios.com`,
               phone: customer?.customer_phone
            },
            financial_status: "paid",
            inventory_behaviour: "decrement_ignoring_policy",
            status: "open",
            note: `Production Secure Sync | Cashfree ID: ${orderId}`,
            tags: "AUTOMATED_WEBHOOK_ORDER"
          }
        };

        const shopifyRes = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2025-01/orders.json`, {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shopifyPayload)
        });

        const shopifyData = await shopifyRes.json();
        
        if (shopifyData.errors) {
            console.error("SHOPIFY_WEBHOOK_REJECTION:", shopifyData.errors);
            return NextResponse.json({ error: "Shopify Rejected Order", details: shopifyData.errors }, { status: 422 });
        }

        console.log("SYNCED TO SHOPIFY VIA WEBHOOK ID:", shopifyData.order?.id);
        return NextResponse.json({ success: true, message: "Order Registered via Secure Webhook" });
    }

    return NextResponse.json({ success: true, message: "Event Noted" });

  } catch (error: any) {
    console.error("WEBHOOK CRITICAL ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

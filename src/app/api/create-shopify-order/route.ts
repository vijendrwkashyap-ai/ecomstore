import { NextResponse } from "next/server";

const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "denimcode.myshopify.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer, shippingAddress, paymentId } = body;

    // 1. Prepare Shopify Order Payload
    // Note: We create a 'Paid' order directly
    const orderPayload = {
      order: {
        line_items: items.map((item: any) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          variant_id: item.variantId, // We'll need to pass variantId from frontend
        })),
        customer: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
        },
        shipping_address: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          address1: shippingAddress.address,
          city: shippingAddress.city,
          province: shippingAddress.state,
          zip: shippingAddress.pincode,
          country: "India",
          phone: customer.phone,
        },
        financial_status: "paid",
        gateway: "Cashfree",
        note: `Custom Headless Checkout - Payment ID: ${paymentId}`,
        tags: "Cashfree, Headless",
      },
    };

    // 2. Call Shopify Admin API
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN || "",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Shopify Order Error:", data);
      return NextResponse.json({ error: "Failed to create Shopify order", details: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data.order });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "denimcode.myshopify.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer, shippingAddress, paymentId, totalAmount } = body;

    // Create Detailed Line Items (Name + Size + Properties)
    const lineItems = items.map((item: any) => ({
      title: item.title, // Seedha product name
      price: item.price.toString(),
      quantity: item.quantity,
      requires_shipping: true,
      taxable: true,
      // Size ko alag se property mein bhi daal rahe hain
      properties: [
        { name: "Size", value: item.size || "Standard" }
      ]
    }));

    if (lineItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const formattedPhone = customer.phone.startsWith("+") ? customer.phone : `+91${customer.phone}`;

    // 1. Prepare Shopify Order Payload
    const orderPayload = {
      order: {
        line_items: lineItems,
        phone: formattedPhone, // Important for linking
        email: "", // User ne email nahi diya but mobile-only checkout ke liye phone kaafi hai
        shipping_address: {
          first_name: customer.fullName.split(' ')[0],
          last_name: customer.fullName.split(' ').slice(1).join(' ') || 'Customer',
          address1: shippingAddress.address,
          city: shippingAddress.city,
          province: shippingAddress.state,
          zip: shippingAddress.pincode,
          country: "India",
          phone: formattedPhone,
        },
        financial_status: "paid",
        inventory_behaviour: "decrement_ignoring_policy",
        gateway: "Cashfree",
        note: `Payment ID: ${paymentId}`,
        tags: `Paid, Size_Included, ₹${totalAmount}`,
      },
    };

    // 2. Call Shopify Admin API
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2025-01/orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN || "",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Shopify Order Sync Error:", data);
      return NextResponse.json({ 
        error: "Failed to create Shopify order", 
        details: data.errors || data 
      }, { status: response.status });
    }

    return NextResponse.json({ 
      success: true, 
      order: data.order, 
      order_status_url: data.order.order_status_url 
    });
  } catch (error: any) {
    console.error("Admin API Fatal Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

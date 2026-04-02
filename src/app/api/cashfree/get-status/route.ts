import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    const url = `https://api.cashfree.com/pg/orders/${orderId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": appId || "",
        "x-client-secret": secretKey || "",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 });
    }

    // Cashfree returns order_status. Best states: PAID, ACTIVE, EXPIRED
    return NextResponse.json({ 
      status: data.order_status, 
      amount: data.order_amount,
      payment_id: orderId 
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

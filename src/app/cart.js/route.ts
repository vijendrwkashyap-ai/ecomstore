import { NextResponse } from 'next/server';

export async function GET() {
  // Mocking the Shopify cart.js response that Shiprocket expects
  const mockCart = {
    token: "headless_" + Math.random().toString(36).substring(7),
    note: null,
    attributes: {},
    original_total_price: 25000,
    total_price: 25000,
    total_discount: 0,
    total_weight: 0,
    item_count: 1,
    items: [
      {
        id: 41055612600392,
        quantity: 1,
        variant_id: 41055612600392,
        key: "41055612600392:1",
        title: "Men's Caudray Pants",
        price: 25000,
        original_price: 25000,
        discounted_price: 25000,
        line_price: 25000,
        original_line_price: 25000,
        total_discount: 0,
        discounts: [],
        sku: "",
        grams: 0,
        vendor: "DenimCode",
        product_id: 7036421341256,
        product_title: "Men's Caudray Fabric Stylish Pants",
        product_description: "Premium Denim Archive",
        handle: "mens-caudray-pants",
        image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773031840_4734611.jpg",
        url: "/products/mens-caudray-pants"
      }
    ]
  };

  return NextResponse.json(mockCart);
}

export async function POST() {
  return NextResponse.json({ status: "success" });
}

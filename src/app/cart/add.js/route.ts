import { NextResponse } from 'next/server';

export async function POST() {
  // Return a success JSON that Shiprocket script expects when an item is added
  return NextResponse.json({
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
    handle: "mens-caudray-pants"
  });
}

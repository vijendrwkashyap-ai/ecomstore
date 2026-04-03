import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { items, seller_domain } = await req.json();
    console.log("Shiprocket API Initiation for:", seller_domain);

    // 1. Prepare Base Config
    const encodedDomain = Buffer.from(seller_domain).toString('base64');
    const uuid = Math.random().toString(36).substring(2, 11);

    // 2. Initial Step: Get the Seller Config
    const batchRequest = {
      "requests": [
        {
          "key": "seller_config",
          "input": {
            "method": "GET",
            "path": "/aggregator/api/v1/aggregator-service/seller/config",
            "headers": { "uId": encodedDomain }
          }
        }
      ]
    };

    const initialResponse = await fetch('https://edge.pickrr.com/batch/api/v1', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-device-id': 'fastrr',
        'x-fastrr-origin': seller_domain,
        'uuid': uuid
      },
      body: JSON.stringify(batchRequest)
    });

    const initData = await initialResponse.json();
    
    // Debugging the complex batch response
    // The batch API can return either an object with 'body' or an array
    let sellerData = null;
    if (initData?.body?.seller_config?.body?.data) {
       sellerData = initData.body.seller_config.body.data;
    } else if (Array.isArray(initData)) {
       const found = initData.find(r => r.key === 'seller_config');
       sellerData = found?.body?.data;
    }

    const sellerId = sellerData?.id;
    if (!sellerId) {
      console.error("Critical: Could not resolve Shiprocket Seller ID. Check domain whitelisting for backend communication.");
      throw new Error("Shiprocket Authentication Failed: Seller ID not found.");
    }

    // 3. Create the Payload for the Headless UI
    // We send this payload as a base64 string to the Fastrr UI 
    // it will then auto-initialize the headless session for the items.
    const cartData = {
      items: items.map((item: any) => ({
        itemId: item.id.replace('gid://shopify/ProductVariant/', '').split('/').pop(),
        quantity: item.quantity,
        price: parseFloat(item.price)
      })),
      sellerId: sellerId,
      domain: seller_domain,
      ts: Date.now()
    };

    const encodedCart = Buffer.from(JSON.stringify(cartData)).toString('base64');
    
    // This URL will launch the Shiprocket (Fastrr) Checkout directly prefilled
    const checkoutUrl = `https://fastrr-boost-ui.pickrr.com/?uuid=${uuid}&seller_id=${sellerId}&domain=${seller_domain}&cart_payload=${encodedCart}&source=headless_seamless`;

    return NextResponse.json({ url: checkoutUrl });

  } catch (error: any) {
    console.error("Headless Shiprocket API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

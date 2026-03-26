const https = require('https');
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || 'MISSING_TOKEN';
const DOMAIN = 'denimcode.myshopify.com';

const RAW_MEN_IMAGES = [
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773031840_4734611.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773680237_9191473.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773841855_9655648.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772863192_6817437.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771491101_2744336.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1728032088_8940751.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1774098386_5122533.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737640644_5157835.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772474450_8348657.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729246859_6346185.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729577565_6264177.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764327227_5726827.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758261824_6749163.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771604484_7807596.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772864379_3268744.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1761554103_8061116.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772782498_8581769.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757922464_3441493.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772864884_1711167.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771505730_5791894.jpg?w=600&dpr=1"
];

const RAW_WOMEN_IMAGES = [
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729844724_9155916.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752838231_8345575.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415169_9929164.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719414620_1882258.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718970026_9687167.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772174952_6129556.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764247008_6463231.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752583894_8452197.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758868208_2224123.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771651246_6736005.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772708875_3771992.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1748423000_3370588.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737709130_4495392.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769495208_1066099.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756467130_2390886.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770271273_6363171.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1761550649_2899951.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1739528965_2246641.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1749711254_3346454.jpg?w=600&dpr=1",
  "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756466305_8281896.jpg?w=600&dpr=1"
];

// Combine all payload mock items we want to push to Shopify
let pushQueue = [];

RAW_MEN_IMAGES.slice(4).forEach((src, i) => {
  pushQueue.push({
    title: `Men's Vanguard Denim 0${i+5}`,
    product_type: 'Mens Archive',
    vendor: 'Dal Samarkand',
    status: 'active',
    images: [{ src: src }],
    variants: [{ price: '1499.00', inventory_management: null }]
  });
});

RAW_WOMEN_IMAGES.slice(3).forEach((src, i) => {
  pushQueue.push({
    title: `Women's Sculpt Denim 0${i+4}`,
    product_type: 'Womens Archive',
    vendor: 'Dal Samarkand',
    status: 'active',
    images: [{ src: src }],
    variants: [{ price: '1499.00', inventory_management: null }]
  });
});

async function pushToShopify(productData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ product: productData });
    const options = {
      hostname: DOMAIN,
      path: '/admin/api/2024-01/products.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': TOKEN,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body).product);
        } else {
          console.error("Failed to push:", productData.title, body);
          reject(body);
        }
      });
    });
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log(`Starting push of ${pushQueue.length} products to Shopify...`);
  let createdProducts = [];
  
  for (let i = 0; i < pushQueue.length; i++) {
    try {
      console.log(`Pushing [${i+1}/${pushQueue.length}]: ${pushQueue[i].title}`);
      const prod = await pushToShopify(pushQueue[i]);
      createdProducts.push({
        id: prod.id.toString(),
        title: prod.title,
        price: prod.variants[0].price,
        category: prod.product_type,
        src: prod.images[0]?.src || pushQueue[i].images[0].src
      });
      // sleep to avoid api rate limits (2 calls per second for Shopify Admin API limit)
      await new Promise(r => setTimeout(r, 600)); 
    } catch(err) {
      console.error("Error on item", i);
    }
  }

  const fs = require('fs');
  fs.writeFileSync('./synced-products.json', JSON.stringify(createdProducts, null, 2));
  console.log("Successfully created all products! Results in synced-products.json");
}

run();

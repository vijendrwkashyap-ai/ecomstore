const https = require('https');

const data = JSON.stringify({
  query: `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            variants(first: 1) { edges { node { price { amount } } } }
            images(first: 1) { edges { node { url } } }
            productType
          }
        }
      }
    }
  `
});

const options = {
  hostname: 'denimcode.myshopify.com',
  path: '/api/2024-01/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': '0857fd01791c48e62cd477883a2eca33',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      const products = parsed.data.products.edges.map(e => ({
        id: e.node.id.split('/').pop(),
        title: e.node.title,
        price: e.node.variants.edges[0]?.node?.price?.amount || '0',
        src: e.node.images.edges[0]?.node?.url || '',
        category: e.node.productType || 'Uncategorized'
      }));
      console.log(JSON.stringify(products, null, 2));
    } catch(e) {
      console.log(body);
    }
  });
});
req.write(data);
req.end();

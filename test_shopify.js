const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '0857fd01791c48e62cd477883a2eca33';
const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'denimcode.myshopify.com';

const query = `
  query {
    product(id: "gid://shopify/Product/7036101361736") {
      id
      title
      variants(first: 5) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

fetch('https://' + domain + '/api/2024-01/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));

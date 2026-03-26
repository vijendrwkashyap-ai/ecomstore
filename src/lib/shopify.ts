export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN || "https://mock.myshopify.com/api/2024-01/graphql.json";
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "mock_token";

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error("Error connecting to Shopify:", error);
    return {
      status: 500,
      error: "Error receiving data"
    };
  }
}
export async function createCheckout(lineItems: { variantId: string; quantity: number }[]) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems
    }
  };

  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.checkoutCreate?.checkout?.webUrl || null;
}

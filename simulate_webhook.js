const crypto = require('crypto');

// THE SECRET FROM DASHBOARD AUDIT
const WEBHOOK_SECRET = "uzmemgoxt1biez21q5mx"; 
const TARGET_URL = "https://denimx-luxury.vercel.app/api/webhooks/cashfree";

// FAKE PAYMENT PAYLOAD (CASHFREE V3 FORMAT)
const rawBody = JSON.stringify({
    type: "success payment",
    event_time: "2026-04-03T20:54:20+05:30",
    data: {
        order: {
            order_id: "SIM_TEST_" + Date.now(),
            order_amount: 1.00,
            order_currency: "INR"
        },
        customer_details: {
            customer_name: "LUVRA_TEST_NODE",
            customer_email: "test@luvra.com",
            customer_phone: "919999999999"
        }
    }
});

const timestamp = Date.now().toString();

// GENERATE PRODUCTION SIGNATURE (HEX)
const payload = timestamp + rawBody;
const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('hex');

console.log("------------------------------------------");
console.log("🚀 INITIATING MASTER WEBHOOK SIMULATION...");
console.log("------------------------------------------");

async function fire() {
    try {
        const response = await fetch(TARGET_URL, {
            method: 'POST',
            headers: {
                'x-webhook-signature': signature,
                'x-webhook-timestamp': timestamp,
                'Content-Type': 'application/json'
            },
            body: rawBody
        });

        const status = response.status;
        const data = await response.json();

        console.log("STATUS CODE:", status);
        console.log("BACKEND RESPONSE:", JSON.stringify(data, null, 2));
        console.log("------------------------------------------");
        
        if (data.success) {
            console.log("✅ SUCCESS! ORDER SHOULD NOW BE IN SHOPIFY DASHBOARD.");
        } else {
            console.log("❌ REJECTED: " + (data.error || "Unknown Error"));
        }
    } catch (e) {
        console.error("🔥 CRASH:", e.message);
    }
}

fire();

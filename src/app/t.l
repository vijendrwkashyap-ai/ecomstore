<!doctype html>
<html class="no-js" lang="{{ shop.locale }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    {{ content_for_header }}
    <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
    <style>
      .bridge-lock { position: fixed; inset: 0; background: #000; z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; gap: 20px; color: #fff; text-align: center; }
      .loader-ring { width: 30px; height: 30px; border: 2px solid #333; border-top: 2px solid #fff; border-radius: 50%; animation: spin 0.6s linear infinite; }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
  </head>
  <body>
    <div id="bridge-ui" style="display:none" class="bridge-lock">
        <div class="loader-ring"></div>
        <div style="font-size: 10px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase;">Node Transmission Active</div>
    </div>
    <div id="main-store-content">{{ content_for_layout }}</div>

    <script>
    (function() {
        const url = window.location.href;
        const query = new URLSearchParams(window.location.search);
        const PROD_URL = "https://denimx-luxury.vercel.app";

        // MASTER DETECTION ARRAY (Every possible ID Cashfree might send)
        const possibleIDs = [
            query.get('order_id'),
            query.get('orderId'),
            query.get('cf_id'),
            query.get('txId'),
            query.get('transactionId')
        ];

        // Clean ID (picking the first non-null one)
        let finalID = possibleIDs.find(id => !!id);

        // FALLBACK: Regex scan of URL
        if (!finalID) {
            const match = url.match(/(order_id|orderId)=([^&]+)/);
            if (match) finalID = match[2];
        }

        console.log("BRIDGE_SCAN_NODE:", { finalID, url });

        // 1. INITIATE PAYMENT
        const sID = query.get('cashfree_session_id');
        if (sID) {
            document.getElementById('bridge-ui').style.display = 'flex';
            document.getElementById('main-store-content').style.display = 'none';
            setTimeout(function() {
                try {
                    const cf = new Cashfree({ mode: "production" });
                    cf.checkout({ paymentSessionId: sID, redirectTarget: "_self" });
                } catch(e) { alert("GENESIS_FAILURE: Session Node Invalid"); }
            }, 600);
            return;
        }

        // 2. UNIVERSAL REDIRECT HANDSHAKE (When returning with an ID)
        if (finalID) {
            console.log("SUCCESS_INTERCEPT: Bridging Node Return: " + finalID);
            document.getElementById('bridge-ui').style.display = 'flex';
            document.getElementById('main-store-content').style.display = 'none';
            
            // IMMEDIATE RELENTLESS REDIRECT
            window.location.replace(PROD_URL + "/order-success?order_id=" + finalID);
            return;
        }
        
        // 3. CHECKOUT BYPASS SCAN (If they came back to / checkout or /cart after payment)
        if (url.includes('checkout') || url.includes('cart')) {
             // Optional: If you want to check if they were in a payment session? 
             // For now we leave normal navigation alone.
        }
    })();
    </script>
  </body>
</html>
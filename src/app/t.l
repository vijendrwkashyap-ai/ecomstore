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
        
        // Detect ANY variation of Order ID from Cashfree
        const sID = query.get('cashfree_session_id');
        const oID = query.get('order_id') || query.get('orderId') || query.get('cf_id');

        console.log("BRIDGE_SCAN:", { sID, oID });

        // 1. INITIATE PAYMENT POPUP
        if (sID) {
            document.getElementById('bridge-ui').style.display = 'flex';
            document.getElementById('main-store-content').style.display = 'none';
            setTimeout(function() {
                try {
                    const cf = new Cashfree({ mode: "production" });
                    cf.checkout({ paymentSessionId: sID, redirectTarget: "_self" });
                } catch(e) { alert("Bridge Crash: ID Invalid"); }
            }, 500);
        }

        // 2. RETURN TO LOCALHOST (THE FIX)
        // If order_id exists, we MUST leave Shopify immediately
        if (oID || url.includes('order_id=') || url.includes('orderId=')) {
            document.getElementById('bridge-ui').style.display = 'flex';
            document.getElementById('main-store-content').style.display = 'none';
            
            const finalID = oID || url.split('order_id=')[1]?.split('&')[0];
            
            console.log("SUCCESS_DETECTED: Bridging back to Localhost with ID: " + finalID);
            
            // RELENTLESS REDIRECT
            window.location.replace("http://localhost:3000/order-success?order_id=" + finalID);
        }
    })();
    </script>
  </body>
</html>
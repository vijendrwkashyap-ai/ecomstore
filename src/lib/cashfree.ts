declare global {
    interface Window {
        Cashfree: any;
    }
}

export const loadCashfree = () => {
    return new Promise((resolve) => {
        if (typeof window === "undefined") return;
        
        if (window.Cashfree) {
            resolve(window.Cashfree);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;
        script.onload = () => {
            resolve(window.Cashfree);
        };
        document.body.appendChild(script);
    });
};

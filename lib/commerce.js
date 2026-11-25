// Purchase UI switch (FINAL-1, brought forward Nov 25, 2026). While false, price amounts, the cart, buy
// buttons, price sorting and the checkout are not shown, and purchase actions become "Contact Our Team".
// The pricing page stays, without prices. All cart, checkout and price code is kept: set to true to switch
// it back on.
export const PURCHASE_ENABLED = false;

// Descriptive "Free" tags stay; every other price is shown only while purchases are on.
export const priceShown = (price) => PURCHASE_ENABLED || price === "Free";

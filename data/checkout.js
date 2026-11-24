// Runtime text of the demo checkout, extracted verbatim from the Xvox Labs HTML prototype v5
// (index.html: PAGES.checkout and the order handler). The empty-cart state lives in the page blocks
// (data/pages/checkout.js); the filled state and the confirmation are built by the prototype's JavaScript.
// Demo mode (decision D3): the prototype's "Order placed (demo), {name}." heading, its "receipts go to"
// promise and "A person from our team will email you" sentence are not used, because nothing is placed,
// sent or saved. The confirmation uses the site's demo wording (data/site.js leadForm.done).
// This module and app/checkout/CheckoutDemo.jsx are the only purchase-flow pieces of the page, so the
// final Contact Us change (FINAL-1) can replace them in one step. No payment is taken.

export const checkoutText = {
  eyebrow: "Checkout · prototype",
  title: "Almost yours.",
  details: "Your details",
  labels: { name: "Name", email: "Work email", company: "Company" },
  payment: {
    title: "Payment",
    text: "Developers: the real checkout connects a payment provider here. This prototype collects no card details.",
  },
  install: "I would like help installing these",
  error: "Add your name, a valid work email and your company.",
  submit: "Place order (demo) →",
  summaryLabel: "Order summary",
  done: {
    downloads: "Your downloads",
    availability: "(available after payment in production)",
    next: "Next step",
    ask: "Want us to set these up for you?",
    asked: "You asked for help installing.",
    book: "Book an install call",
    bookAbout: "Order: {items}",
    bookPath: "We implement it",
  },
};

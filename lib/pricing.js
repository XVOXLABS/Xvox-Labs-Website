// Approved pricing rule (BUILD_PLAN.md): only published prices are shown. Same rule as the
// Price component, for places that need the price as plain text (e.g. "Buy … · $1,500").

export function isPublished(item) {
  return Boolean(item) && item.priceStatus === "published" && item.price !== null && item.price !== undefined;
}

// "$1,500" (or "$29 / month") for a published item; null otherwise, so callers fall back to
// pricingDisplay.placeholderLabel and the "Discuss Pricing" CTA.
export function priceLabel(item) {
  if (!isPublished(item)) return null;
  const amount = typeof item.price === "number" ? `$${item.price.toLocaleString("en-US")}` : item.price;
  return item.unit === "/month" ? `${amount} / month` : amount;
}

import { pricingDisplay } from "@/data/pricing";
import Button from "../Button/Button";
import styles from "./Price.module.css";

const UNIT = { "one-time": "one-time", "/month": "/ month", month: "/ month" };

function format(price) {
  if (typeof price === "number") return `$${price.toLocaleString("en-US")}`;
  return price;
}

// Applies the approved pricing rule (BUILD_PLAN.md): only published prices are shown.
// Anything else shows "Contact Us to Discuss Pricing" with a "Discuss Pricing" button to /book.
// The original values stay in data/ for internal reference only.
export default function Price({ price, unit, status, showCta = true, className = "" }) {
  if (status === "published" && price !== null && price !== undefined) {
    return (
      <span className={`${styles.price} ${className}`.trim()}>
        <span className={styles.amount}>{format(price)}</span>
        {unit && UNIT[unit] ? <span className={styles.unit}>{UNIT[unit]}</span> : null}
      </span>
    );
  }
  return (
    <span className={`${styles.discuss} ${className}`.trim()}>
      <span className={styles.label}>{pricingDisplay.placeholderLabel}</span>
      {showCta ? (
        <Button href={pricingDisplay.placeholderCta.href} variant="small" arrow>
          {pricingDisplay.placeholderCta.label}
        </Button>
      ) : null}
    </span>
  );
}

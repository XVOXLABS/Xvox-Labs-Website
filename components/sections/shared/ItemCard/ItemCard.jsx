"use client";

import Image from "next/image";
import Link from "next/link";
import { agents } from "@/data/agents";
import { itemTypes } from "@/data/marketplace";
import { pricingDisplay } from "@/data/pricing";
import { cartToggle } from "@/data/site";
import { addToCart, removeFromCart, useCart } from "@/lib/cart";
import { fill } from "@/lib/content";
import { savePreference } from "@/lib/preference";
import { priceLabel } from "@/lib/pricing";
import styles from "./ItemCard.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";

// Marketplace item card (prototype mCard). The title link is stretched over the card (decision D4);
// the price link and the cart toggle are separate controls beside it, so nothing is nested.
// Price (approved rule): published items show their price (only the $1,500 blueprints today);
// everything else shows "Contact Us to Discuss Pricing" as a link that saves the item as the topic
// (About = item name, Path = type) and opens /book (Q1, Q2). The + / ✓ toggle works for every item (Q3).
export default function ItemCard({ item, compact = false }) {
  const cart = useCart();
  const inCart = cart.includes(item.id);
  const type = itemTypes[item.type];
  const agent = agents.find((a) => a.id === item.agent);
  const price = priceLabel(item);

  const toggle = () => (inCart ? removeFromCart(item.id, { toast: true }) : addToCart(item.id));
  // Hover: the agent switches to its animated image (prototype playIn on .mcard), not with reduced motion.
  const swap = (e, animated) => {
    if (!agent || (animated && window.matchMedia(REDUCED).matches)) return;
    const img = e.currentTarget.querySelector("img");
    if (img) img.src = animated ? agent.animatedImage : agent.image;
  };

  return (
    <article className={compact ? `${styles.card} ${styles.compact}` : styles.card}
      onPointerEnter={(e) => swap(e, true)} onPointerLeave={(e) => swap(e, false)}>
      <span className={styles.tile} style={{ background: `var(--tint-${type.tint})` }}>
        <span className={styles.chip}>{type.name}</span>
        <span className={styles.glyph} aria-hidden="true">
          {type.glyph}
        </span>
        {agent ? (
          <span className={styles.mini}>
            <Image src={agent.image} alt="" fill sizes="56px" unoptimized draggable={false} />
          </span>
        ) : null}
      </span>
      <div className={styles.meta}>
        <h3 className={styles.name}>
          <Link href={`/marketplace/${item.id}`} className={styles.link}>
            {item.name}
          </Link>
        </h3>
        <p className={styles.desc}>{item.description}</p>
        <div className={styles.row}>
          {price ? (
            <span className={styles.price}>{price}</span>
          ) : (
            <Link href={pricingDisplay.placeholderCta.href} className={styles.discuss} onClick={() => savePreference(item.name, type.name)}>
              {pricingDisplay.placeholderLabel}
            </Link>
          )}
          <button
            type="button"
            className={`${styles.add} ${inCart ? styles.on : ""}`.trim()}
            aria-pressed={inCart}
            aria-label={fill(cartToggle.addLabel, { name: item.name })}
            onClick={toggle}
          >
            <span aria-hidden="true">{inCart ? "✓" : "+"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { addToCart, useCart } from "@/lib/cart";
import { savePreference } from "@/lib/preference";

// Item page main buttons (prototype data-add): "Add to cart" adds with the standard toast and
// becomes "In your cart ✓"; "Buy now" adds silently and goes to the planned /checkout route.
export function ItemBuyButtons({ id, addLabel, inCartLabel, buyLabel, checkoutHref }) {
  const cart = useCart();
  const router = useRouter();
  const inCart = cart.includes(id);
  return (
    <>
      <Button variant={inCart ? "secondary" : "primary"} aria-pressed={inCart} onClick={() => addToCart(id)}>
        {inCart ? inCartLabel : addLabel}
      </Button>
      <Button variant="secondary" onClick={() => {
        addToCart(id, { silent: true });
        router.push(checkoutHref);
      }}>{buyLabel}</Button>
    </>
  );
}

// Link to /book that saves the topic first (prototype data-pref "About|Path").
export function TopicLink({ href, about, path, children, ...props }) {
  return <Button href={href} onClick={() => savePreference(about, path)} {...props}>{children}</Button>;
}

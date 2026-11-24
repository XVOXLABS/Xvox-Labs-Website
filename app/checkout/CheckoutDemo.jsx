"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import Category from "@/components/ui/Category/Category";
import { checkoutText as T } from "@/data/checkout";
import { itemTypes, items } from "@/data/marketplace";
import { pricingDisplay } from "@/data/pricing";
import { cartFilled, leadForm } from "@/data/site";
import { removeFromCart, useCart } from "@/lib/cart";
import { fill } from "@/lib/content";
import { savePreference } from "@/lib/preference";
import styles from "./checkout.module.css";

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const money = (n) => `$${n.toLocaleString("en-US")}`;
const EMAIL = /^\S+@\S+\.\S+$/;
const FIELDS = ["name", "email", "company"];

// Demo checkout (prototype PAGES.checkout). It reads the visitor's cart, collects name, email and company,
// and ends in a demo confirmation. Nothing is sent or stored and no payment is taken. Prices follow the
// approved rule, like the cart drawer: only published prices, and a total only when every line is published.
export default function CheckoutDemo({ empty }) {
  const cart = useCart();
  const [invalid, setInvalid] = useState([]);
  const [done, setDone] = useState(null);
  const formRef = useRef(null);
  const doneRef = useRef(null);

  useEffect(() => {
    if (invalid.length) formRef.current?.elements.namedItem(invalid[0])?.focus();
  }, [invalid]);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const lines = cart.map((id) => byId[id]).filter(Boolean);
  const allPublished = lines.every((i) => i.priceStatus === "published");
  const oneTime = lines.filter((i) => i.unit !== "/month").reduce((s, i) => s + i.price, 0);
  const monthly = lines.filter((i) => i.unit === "/month").reduce((s, i) => s + i.price, 0);

  if (done) {
    const names = done.items.map((i) => i.name);
    return (
      <Section className={styles.following}>
        <div className={styles.confirm}>
          <h1 ref={doneRef} tabIndex={-1} className={styles.confirmTitle}>{fill(leadForm.done.heading, { name: done.name })}</h1>
          <p role="status">{leadForm.done.demoNote}</p>
          <div className={styles.confirmGrid}>
            <div className={styles.panel}>
              <h2>{T.done.downloads}</h2>
              <ul>{done.items.map((i) => <li key={i.id}>{i.name} <span className={styles.muted}>{T.done.availability}</span></li>)}</ul>
            </div>
            <div className={styles.panel}>
              <h2>{T.done.next}</h2>
              <p>{done.help ? T.done.asked : T.done.ask}</p>
              <Button href="/book" variant="small" onClick={() => savePreference(fill(T.done.bookAbout, { items: names.join(", ").slice(0, 120) }), T.done.bookPath)}>
                {T.done.book}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (!lines.length) {
    return (
      <Section>
        <SectionHeader level={1} eyebrow={<Category>{empty.eyebrow}</Category>} title={empty.title} lead={empty.lead}
          action={<Button href={empty.browse.href} className={styles.tall}>{empty.browse.text}</Button>} />
      </Section>
    );
  }

  return (
    <>
      <Section>
        <SectionHeader level={1} eyebrow={<Category>{T.eyebrow}</Category>} title={T.title} />
      </Section>
      <Section className={styles.following}>
        <div className={styles.layout}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{T.details}</h2>
            <form ref={formRef} noValidate className={styles.form} onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(FIELDS.map((f) => [f, e.currentTarget.elements.namedItem(f).value.trim()]));
              const bad = FIELDS.filter((f) => (f === "email" ? !EMAIL.test(data.email) : !data[f]));
              setInvalid(bad);
              if (bad.length) return;
              const placed = lines;
              setDone({ name: data.name, email: data.email, help: e.currentTarget.elements.namedItem("help").checked, items: placed });
              placed.forEach((i) => removeFromCart(i.id));
            }}>
              <div className={styles.two}>
                <div className={styles.field}>
                  <label htmlFor="checkout-name">{T.labels.name}</label>
                  <input id="checkout-name" name="name" autoComplete="name" aria-invalid={invalid.includes("name") || undefined} aria-describedby={invalid.length ? "checkout-error" : undefined} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="checkout-email">{T.labels.email}</label>
                  <input id="checkout-email" name="email" type="email" autoComplete="email" aria-invalid={invalid.includes("email") || undefined} aria-describedby={invalid.length ? "checkout-error" : undefined} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="checkout-company">{T.labels.company}</label>
                <input id="checkout-company" name="company" autoComplete="organization" aria-invalid={invalid.includes("company") || undefined} aria-describedby={invalid.length ? "checkout-error" : undefined} />
              </div>
              <div className={styles.payment}>
                <h3>{T.payment.title}</h3>
                <p>{T.payment.text}</p>
              </div>
              <label className={styles.check}>
                <input type="checkbox" name="help" /> {T.install}
              </label>
              {invalid.length ? <p id="checkout-error" role="alert" className={styles.error}>{T.error}</p> : null}
              <Button type="submit" full className={styles.tall}>{T.submit}</Button>
            </form>
          </div>
          <Frame className={styles.summary} aria-label={T.summaryLabel}>
            <ul className={styles.lines}>
              {lines.map((i) => (
                <li key={i.id}>
                  <span className={styles.thumb} style={{ background: `var(--tint-${itemTypes[i.type].tint})` }} aria-hidden="true">{itemTypes[i.type].glyph}</span>
                  <span className={styles.lineText}><b>{i.name}</b><small>{itemTypes[i.type].name}</small></span>
                  <span className={styles.price}>{i.priceStatus === "published" ? `${money(i.price)}${i.unit === "/month" ? "/mo" : ""}` : pricingDisplay.placeholderLabel}</span>
                </li>
              ))}
            </ul>
            <div className={styles.totals}>
              {allPublished ? (
                <>
                  {oneTime > 0 ? <div><span>{cartFilled.oneTime}</span><b>{money(oneTime)}</b></div> : null}
                  {monthly > 0 ? <div><span>{cartFilled.monthly}</span><b>{money(monthly)} {cartFilled.perMonth}</b></div> : null}
                </>
              ) : (
                <div className={styles.discuss}>
                  <span>{pricingDisplay.placeholderLabel}</span>
                  <Button href={pricingDisplay.placeholderCta.href} variant="small" arrow>{pricingDisplay.placeholderCta.label}</Button>
                </div>
              )}
            </div>
          </Frame>
        </div>
      </Section>
    </>
  );
}

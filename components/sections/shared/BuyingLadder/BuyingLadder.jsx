"use client";

import Appear from "@/components/motion/Appear/Appear";
import Button from "@/components/ui/Button/Button";
import Price from "@/components/ui/Price/Price";
import { ladder, pricingDisplay } from "@/data/pricing";
import { VOX_HREF } from "@/lib/actions";
import { savePreference } from "@/lib/preference";
import Link from "next/link";
import styles from "./BuyingLadder.module.css";
import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import { PURCHASE_ENABLED, priceShown } from "@/lib/commerce";

// Where each step's button goes (prototype ladderHTML): ask = open Vox, market = the marketplace,
// book = /book with the topic saved as "{about} | {step title}" (prototype data-pref).
const MARKETPLACE_HREF = "/marketplace";

// The six-step buying ladder (prototype LADDER, Framer tier cards without checklists, decision D6).
// Prices follow the approved rule: "Free" and the published $1,500 Download step are shown; every
// other step shows only "Contact Us to Discuss Pricing" (D2, D7): its own button already reaches /book.
// stepLabels: "Step 0" … "Step 5"; note: { text, link: { text, href } } (the footnote, optional).
export default function BuyingLadder({ about, stepLabels, note }) {
  return (
    <div className={styles.wrap}>
      <ol className={styles.ladder}>
        {ladder.map((step, i) => {
          const href = step.action === "ask" ? VOX_HREF : step.action === "market" ? MARKETPLACE_HREF : pricingDisplay.consultationCta.href;
          return (
            <Appear as="li" key={step.title} delay={i * 70} className={`${styles.step} ${step.highlight ? styles.hi : ""}`.trim()}>
              <div className={styles.top}>
                <span className={styles.ln}>{stepLabels[i]}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
                {priceShown(step.price) ? (
                  <div className={`${styles.lp} ${step.priceStatus === "published" ? "" : styles.lpLabel}`.trim()}>
                    <Price price={step.price} status={step.priceStatus} showCta={false} />
                  </div>
                ) : null}
              </div>
              <div className={styles.base}>
                {!PURCHASE_ENABLED && step.action === "book" ? (
                  <EnquiryButton about={about} path={step.title} variant={step.highlight ? "primary" : "secondary"} full arrow />
                ) : (
                  <Button
                    href={href}
                    variant={step.highlight ? "primary" : "secondary"}
                    full
                    arrow
                    onClick={step.action === "book" ? () => savePreference(about, step.title) : undefined}
                  >
                    {step.cta}
                  </Button>
                )}
              </div>
            </Appear>
          );
        })}
      </ol>
      {note ? (
        <p className={styles.note}>
          {note.sentences.map((s) => {
            const [first, ...rest] = s.split(" ");
            return (
              <span key={s}>
                <b>{first}</b> {rest.join(" ")}{" "}
              </span>
            );
          })}
          <Link href={note.link.href}>{note.link.text}</Link>
        </p>
      ) : null}
    </div>
  );
}

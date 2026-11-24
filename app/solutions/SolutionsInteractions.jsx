"use client";

import { useState } from "react";
import Orchestration from "@/components/sections/shared/Orchestration/Orchestration";
import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Tabs from "@/components/ui/Tabs/Tabs";
import { openCart } from "@/lib/actions";
import { addToCart } from "@/lib/cart";
import { savePreference } from "@/lib/preference";
import styles from "./solutions.module.css";

export function SolutionsBooking({ href, about, path, children, ...props }) {
  return <Button href={href} onClick={() => savePreference(about, path)} {...props}>{children}</Button>;
}

export function BlueprintButton({ id, children, ...props }) {
  return (
    <Button {...props} onClick={() => {
      addToCart(id, { silent: true });
      openCart();
    }}>{children}</Button>
  );
}

export function DepartmentFilter({ options, label, cards }) {
  const [active, setActive] = useState(options[0].id);
  return (
    <>
      <div role="group" aria-label={label} className={styles.filters}>
        {options.map((option) => (
          <button key={option.id} type="button" aria-pressed={active === option.id} onClick={() => setActive(option.id)}>
            {option.label}
          </button>
        ))}
      </div>
      <Frame className={styles.grid}>
        {cards.filter(({ department }) => active === options[0].id || department === active).map(({ content }) => content)}
      </Frame>
    </>
  );
}

export function DepartmentWork({ flows, label, seeSolution }) {
  const [active, setActive] = useState(flows[0].slug);
  const [signals, setSignals] = useState({});
  const entries = flows.map((flow) => ({
    id: flow.slug,
    label: flow.label,
    content: (
      <>
        <Orchestration slug={flow.slug} spec={flow.spec} active={active === flow.slug} runSignal={signals[flow.slug]} />
        <div className={styles.flowFooter}>
          <span className={styles.muted}>{flow.footer}</span>
          <Button href={flow.href} variant="small">{seeSolution}</Button>
        </div>
      </>
    ),
  }));
  return (
    <Frame>
      <Tabs label={label} items={entries} className={styles.workTabs} onChange={(id) => {
        setActive(id);
        setSignals((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
      }} />
    </Frame>
  );
}

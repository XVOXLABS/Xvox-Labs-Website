"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { agents } from "@/data/agents";
import { items, itemTypes } from "@/data/marketplace";
import { pricingDisplay } from "@/data/pricing";
import { solutions } from "@/data/solutions";
import { flow } from "@/data/vox";
import styles from "./VoxChat.module.css";
import { enquiry } from "@/data/enquiry";
import { PURCHASE_ENABLED } from "@/lib/commerce";

const bySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));
const agentById = Object.fromEntries(agents.map((a) => [a.id, a]));
const money = (n) => `$${n.toLocaleString("en-US")}`;
const EMAIL = /^\S+@\S+\.\S+$/;

// When the control that had focus was removed (a quick reply or slot), move focus to the
// first control of the newly added part so keyboard users are not dropped to the page.
function useFocusIfLost(ref) {
  useEffect(() => {
    const el = ref.current;
    const active = document.activeElement;
    if (!el || (active && active !== document.body && el.closest("dialog")?.contains(active))) return;
    el.querySelector("a, button:not(:disabled), input, select")?.focus();
  }, [ref]);
}

function nextWeekdays(count) {
  const days = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() % 6) days.push(new Date(d));
  }
  return days;
}

// Quick replies. multi = 0: one tap answers. multi = n: toggle up to n, then Continue.
// Like the prototype, going over the limit drops the first selected option in list order.
export function QuickReplies({ options, multi, onPick }) {
  const ref = useRef(null);
  const [selected, setSelected] = useState([]);
  useFocusIfLost(ref);

  const toggle = (i) =>
    setSelected((s) => {
      const next = s.includes(i) ? s.filter((x) => x !== i) : [...s, i].sort((a, b) => a - b);
      return next.length > multi ? next.slice(1) : next;
    });

  return (
    <div ref={ref} className={styles.part}>
      <div className={styles.options}>
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            className={styles.option}
            aria-pressed={multi ? selected.includes(i) : undefined}
            onClick={() => (multi ? toggle(i) : onPick(o))}
          >
            {o}
          </button>
        ))}
      </div>
      {multi ? (
        <button
          type="button"
          className={`${styles.btn} ${styles.accent}`}
          onClick={() => selected.length && onPick(selected.map((i) => options[i]).join(", "))}
        >
          {flow.continue}
        </button>
      ) : null}
    </div>
  );
}

// "Here is what I am seeing": the local first-look plan (prototype localReport + renderReport).
// Marketplace prices follow the approved rule: only published prices are shown.
export function Report({ report, booked, onBook, onNavigate }) {
  const ref = useRef(null);
  const r = flow.report;
  useFocusIfLost(ref);
  const ids = [];
  report.solutions.forEach((s) =>
    items.forEach((i) => {
      if (i.solutions.includes(s.slug) && !ids.includes(i.id)) ids.push(i.id);
    }),
  );
  const listed = ids.slice(0, r.maxItems).map((id) => items.find((i) => i.id === id));
  const agentIds = [];
  report.solutions.forEach((s) => bySlug[s.slug].agentIds.forEach((a) => !agentIds.includes(a) && agentIds.push(a)));
  const anyUnpublished = listed.some((i) => i.priceStatus !== "published");

  return (
    <div ref={ref} className={`${styles.part} ${styles.card}`}>
      <h2 className={styles.cardTitle}>{r.title}</h2>
      <div className={styles.rep}>
        <section>
          <h3>{r.situation}</h3>
          <p>{report.summary}</p>
        </section>
        {report.problems.length ? (
          <section>
            <h3>{r.problems}</h3>
            <ul>
              {report.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <section>
          <h3>{r.help}</h3>
          <ul>
            {report.solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} onClick={onNavigate}>
                  {bySlug[s.slug].pain}
                </Link>
                <br />
                <span className={styles.muted}>{s.why}</span>
              </li>
            ))}
          </ul>
        </section>
        {listed.length ? (
          <section>
            <h3>{r.marketplace}</h3>
            <ul>
              {listed.map((i) => (
                <li key={i.id}>
                  <Link href={`/marketplace/${i.id}`} onClick={onNavigate}>
                    {i.name}
                  </Link>{" "}
                  <span className={styles.small}>
                    {itemTypes[i.type].name}
                    {PURCHASE_ENABLED ? ` · ${i.priceStatus === "published" ? `${money(i.price)}${i.unit === "/month" ? r.perMonth : ""}` : pricingDisplay.placeholderLabel}` : null}
                  </span>
                </li>
              ))}
            </ul>
            {!PURCHASE_ENABLED || anyUnpublished ? (
              <Link href={pricingDisplay.placeholderCta.href} className={`${styles.btn} ${styles.ghost} ${styles.spaced}`} onClick={onNavigate}>
                {PURCHASE_ENABLED ? pricingDisplay.placeholderCta.label : enquiry.label}
              </Link>
            ) : null}
          </section>
        ) : null}
        <section>
          <h3>{r.agents}</h3>
          <p>
            {agentIds.map((a, k) => (
              <span key={a}>
                {k ? ", " : ""}
                <Link href={`/how-it-works/agents/${a}`} onClick={onNavigate}>
                  {agentById[a].name}
                </Link>
              </span>
            ))}
          </p>
        </section>
        {report.automationNote ? (
          <section>
            <h3>{r.automation}</h3>
            <p>{report.automationNote}</p>
          </section>
        ) : null}
        <section>
          <h3>{r.next}</h3>
          <p>{r.nextText}</p>
        </section>
      </div>
      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.accent}`} disabled={booked} onClick={onBook}>
          {r.book}
        </button>
      </div>
    </div>
  );
}

// "Who should our team reply to?" form; after a valid submit it collapses to a one-line summary.
export function DetailsForm({ who, onDone }) {
  const d = flow.details;
  const nameRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (who) return undefined;
    const id = window.setTimeout(() => nameRef.current?.focus(), 200);
    return () => window.clearTimeout(id);
  }, [who]);

  if (who) {
    return (
      <p className={`${styles.part} ${styles.card} ${styles.line}`}>
        <strong>{who.name}</strong> · {who.email} · {who.company}
        {who.budget !== d.noBudget ? ` · ${who.budget}` : ""}
      </p>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = (n) => e.currentTarget.elements.namedItem(n).value;
    const next = { name: f("name").trim(), email: f("email").trim(), company: f("company").trim(), budget: f("budget") };
    if (!next.name || !next.company || !EMAIL.test(next.email)) {
      setError(d.error);
      return;
    }
    onDone(next);
  };

  const invalid = error ? true : undefined;
  return (
    <form className={`${styles.part} ${styles.card} ${styles.fields}`} noValidate onSubmit={submit}>
      <div className={styles.field}>
        <label htmlFor="vox-name">{d.name}</label>
        <input ref={nameRef} id="vox-name" name="name" autoComplete="name" aria-describedby="vox-error" aria-invalid={invalid} />
      </div>
      <div className={styles.field}>
        <label htmlFor="vox-email">{d.email}</label>
        <input id="vox-email" name="email" type="email" autoComplete="email" aria-describedby="vox-error" aria-invalid={invalid} />
      </div>
      <div className={styles.field}>
        <label htmlFor="vox-company">{d.company}</label>
        <input id="vox-company" name="company" autoComplete="organization" aria-describedby="vox-error" aria-invalid={invalid} />
      </div>
      <div className={styles.field}>
        <label htmlFor="vox-budget">
          {d.budget} <i>{d.optional}</i>
        </label>
        <select id="vox-budget" name="budget">
          {d.budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <p id="vox-error" className={styles.error} role="alert">
        {error}
      </p>
      <button type="submit" className={`${styles.btn} ${styles.accent}`}>
        {d.submit}
      </button>
    </form>
  );
}

// 30-minute call slots: the next three weekdays, three times each, in the visitor's locale.
export function Slots({ picked, done, onPick }) {
  const ref = useRef(null);
  const [days] = useState(() => nextWeekdays(flow.slots.days));
  useFocusIfLost(ref);

  if (done) {
    return (
      <p className={`${styles.part} ${styles.card} ${styles.line}`}>
        <strong>{flow.slots.requested}</strong> {picked}
      </p>
    );
  }

  return (
    <div ref={ref} className={`${styles.part} ${styles.card} ${styles.slots}`}>
      {days.map((day) => {
        const long = day.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
        const short = day.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
        return (
          <div key={long} role="group" aria-label={long}>
            <p className={styles.day}>{long}</p>
            <div className={styles.times}>
              {flow.slots.times.map((time) => {
                const label = `${short}, ${time}`;
                return (
                  <button key={time} type="button" className={styles.slot} aria-pressed={picked === label} onClick={() => onPick(label)}>
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Confirmation. Frontend only: nothing is sent or stored, and the wording says so.
export function Confirm({ who, slot, onClose, onNavigate }) {
  const ref = useRef(null);
  const c = flow.done;
  useFocusIfLost(ref);

  return (
    <div ref={ref} className={`${styles.part} ${styles.card}`}>
      <div className={styles.ok}>
        <h2 className={styles.cardTitle}>
          {c.heading}
          {who.name}.
        </h2>
        <p>
          {c.youAsked} <strong>{slot}</strong>. {c.demoNote}
        </p>
      </div>
      <div className={styles.actions}>
        <Link href={c.browse.href} className={`${styles.btn} ${styles.dark}`} onClick={onNavigate}>
          {c.browse.label}
        </Link>
        <button type="button" className={`${styles.btn} ${styles.ghost}`} onClick={onClose}>
          {c.close}
        </button>
      </div>
    </div>
  );
}

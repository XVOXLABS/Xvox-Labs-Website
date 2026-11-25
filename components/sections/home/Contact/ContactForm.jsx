"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Button from "@/components/ui/Button/Button";
import { contactForm } from "@/data/contact";
import { leadForm } from "@/data/site";
import { CONTACT_ENDPOINT, FIELD_LIMITS, cleanContact, invalidFields } from "@/lib/contact";
import { fill } from "@/lib/content";
import { clearPreference, PREFERENCE_EVENT, readPreference } from "@/lib/preference";
import styles from "./Contact.module.css";
import { PURCHASE_ENABLED } from "@/lib/commerce";

const ERROR_ID = "home-contact-error";
const REQUEST_TIMEOUT_MS = 15000;

function subscribeToPreference(onChange) {
  window.addEventListener(PREFERENCE_EVENT, onChange);
  window.addEventListener("pageshow", onChange);
  return () => {
    window.removeEventListener(PREFERENCE_EVENT, onChange);
    window.removeEventListener("pageshow", onChange);
  };
}

// A serialized snapshot stays stable even though readPreference parses a fresh object.
function getPreferenceSnapshot() {
  return JSON.stringify(readPreference());
}

function getServerSnapshot() {
  return null;
}

function Field({ name, label, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={`home-contact-${name}`}>{label}</label>
      {children}
    </div>
  );
}

// The contact form (homepage and /book). It emails the team through the server when sending is switched
// on; otherwise it stays a demo that sends and stores nothing, and says so. Success is shown only after
// the server confirms that the email was accepted.
export default function ContactForm({
  labels, interestDefault, interestGroups, budgetOptions, startOptions, toolsPlaceholder, submitLabel, note,
}) {
  const snapshot = useSyncExternalStore(subscribeToPreference, getPreferenceSnapshot, getServerSnapshot);
  const preference = JSON.parse(snapshot);
  const about = typeof preference?.about === "string" ? preference.about : "";
  const path = typeof preference?.path === "string" ? preference.path : "";
  const [invalid, setInvalid] = useState([]);
  const [failed, setFailed] = useState(false);
  const [sending, setSending] = useState(false);
  const [live, setLive] = useState(null);
  // null until the visitor types: the subject then follows the saved topic.
  const [typedSubject, setTypedSubject] = useState(null);
  const [confirmedName, setConfirmedName] = useState("");
  const formRef = useRef(null);
  const confirmationRef = useRef(null);
  const sendingRef = useRef(false);
  const startedAt = useRef(0);
  const subject = typedSubject ?? about.slice(0, FIELD_LIMITS.subject);

  useEffect(() => {
    startedAt.current = performance.now();
    let current = true;
    // If the check itself fails, the form tries to send and reports a failure if it cannot.
    fetch(CONTACT_ENDPOINT, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("status"))))
      .then((result) => current && setLive(result.enabled === true))
      .catch(() => current && setLive(true));
    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (invalid.length) formRef.current?.elements.namedItem(invalid[0])?.focus();
  }, [invalid]);

  useEffect(() => {
    if (confirmedName) confirmationRef.current?.focus();
  }, [confirmedName]);

  async function submit(event) {
    event.preventDefault();
    if (sendingRef.current || live === null) return;
    const form = event.currentTarget;
    // Time on the form, from the submit event's page-relative timestamp.
    const elapsed = Math.round(event.timeStamp - startedAt.current);
    const entered = Object.fromEntries(new FormData(form));
    const values = cleanContact({ ...entered, about, path: path === leadForm.preference.notSure ? "" : path });
    const missing = invalidFields(values);

    setFailed(false);
    setInvalid(missing);
    if (missing.length) return;
    if (!live) {
      setConfirmedName(values.name);
      return;
    }

    sendingRef.current = true;
    setSending(true);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, reference: entered.reference, elapsed }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const result = await response.json();
      if (response.ok && result.ok === true) setConfirmedName(values.name);
      else if (response.status === 422 && result.invalid?.length) setInvalid(result.invalid);
      else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  function clearTopic() {
    formRef.current.elements.namedItem("name").focus();
    clearPreference();
  }

  function errorProps(name) {
    const hasError = invalid.includes(name);
    return { "aria-invalid": hasError || undefined, "aria-describedby": hasError ? ERROR_ID : undefined };
  }

  function requiredInput(name, autoComplete, type = "text", extra = {}) {
    return (
      <Field name={name} label={labels[name] ?? contactForm.labels[name]}>
        <input
          id={`home-contact-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          maxLength={FIELD_LIMITS[name]}
          required
          {...errorProps(name)}
          {...extra}
        />
      </Field>
    );
  }

  if (confirmedName) {
    return (
      <div
        className={styles.confirmation}
        role="group"
        aria-labelledby="home-contact-confirmation"
        aria-describedby="home-contact-confirmation-note"
        tabIndex={-1}
        ref={confirmationRef}
      >
        <strong id="home-contact-confirmation">{fill(contactForm.success.heading, { name: confirmedName })}</strong>
        <p id="home-contact-confirmation-note">{live ? contactForm.success.body : leadForm.done.demoNote}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} ref={formRef} onSubmit={submit} aria-busy={sending || undefined} noValidate>
      {about ? (
        <div className={styles.topic}>
          <span>{fill(leadForm.preference.about, { about })}</span>
          {path && path !== leadForm.preference.notSure ? <span>{fill(leadForm.preference.path, { path })}</span> : null}
          <button type="button" onClick={clearTopic}>{leadForm.preference.clear}</button>
        </div>
      ) : null}
      <div className={styles.pair}>
        {requiredInput("name", "name")}
        {requiredInput("email", "email", "email")}
      </div>
      <div className={styles.pair}>
        <Field name="phone" label={contactForm.labels.phone}>
          <input id="home-contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={FIELD_LIMITS.phone} />
        </Field>
        {requiredInput("subject", "off", "text", { value: subject, onChange: (event) => setTypedSubject(event.target.value) })}
      </div>
      <div className={styles.pair}>
        {requiredInput("company", "organization")}
        <Field name="interest" label={labels.interest}>
          <select id="home-contact-interest" name="interest">
            <option>{interestDefault}</option>
            {interestGroups.map(({ label, options }) => (
              <optgroup key={label} label={label}>
                {options.map((option) => <option key={option}>{option}</option>)}
              </optgroup>
            ))}
          </select>
        </Field>
      </div>
      <div className={styles.pair}>
        {PURCHASE_ENABLED ? (
          <Field name="budget" label={labels.budget}>
            <select id="home-contact-budget" name="budget">
              {budgetOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
        ) : null}
        <Field name="start" label={labels.start}>
          <select id="home-contact-start" name="start">
            {startOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
      </div>
      <Field name="tools" label={labels.tools}>
        <input id="home-contact-tools" name="tools" maxLength={FIELD_LIMITS.tools} placeholder={toolsPlaceholder} />
      </Field>
      <Field name="message" label={labels.message}>
        <textarea id="home-contact-message" name="message" rows={4} maxLength={FIELD_LIMITS.message} required {...errorProps("message")} />
      </Field>
      {/* Spam trap: people never see or reach this field. */}
      <div className={styles.trap} aria-hidden="true">
        <input name="reference" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={ERROR_ID} className={styles.error} role="alert">{invalid.length ? contactForm.invalid : failed ? contactForm.failed : ""}</p>
      {/* aria-disabled while sending keeps keyboard focus on the button */}
      <Button type="submit" variant="accent" full className={styles.submit} disabled={snapshot === null || live === null} aria-disabled={sending || undefined}>
        {sending ? contactForm.sending : submitLabel}
      </Button>
      {live === false ? <p className={styles.note}>{note}</p> : null}
    </form>
  );
}

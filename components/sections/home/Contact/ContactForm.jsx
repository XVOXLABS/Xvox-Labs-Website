"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Button from "@/components/ui/Button/Button";
import { leadForm } from "@/data/site";
import { fill } from "@/lib/content";
import { clearPreference, PREFERENCE_EVENT, readPreference } from "@/lib/preference";
import styles from "./Contact.module.css";
import { PURCHASE_ENABLED } from "@/lib/commerce";

const ERROR_ID = "home-contact-error";
const REQUIRED_FIELDS = ["name", "email", "company"];
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

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

export default function ContactForm({
  labels, interestDefault, interestGroups, budgetOptions, startOptions, toolsPlaceholder, submitLabel, note,
}) {
  const snapshot = useSyncExternalStore(subscribeToPreference, getPreferenceSnapshot, getServerSnapshot);
  const preference = JSON.parse(snapshot);
  const about = typeof preference?.about === "string" ? preference.about : "";
  const path = typeof preference?.path === "string" ? preference.path : "";
  const [invalid, setInvalid] = useState([]);
  const [confirmedName, setConfirmedName] = useState("");
  const formRef = useRef(null);
  const confirmationRef = useRef(null);

  useEffect(() => {
    if (invalid.length) formRef.current?.elements.namedItem(invalid[0])?.focus();
  }, [invalid]);

  useEffect(() => {
    if (confirmedName) confirmationRef.current?.focus();
  }, [confirmedName]);

  function submit(event) {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const invalidFields = REQUIRED_FIELDS.filter((field) => {
      const value = elements.namedItem(field).value.trim();
      return field === "email" ? !EMAIL_PATTERN.test(value) : !value;
    });

    setInvalid(invalidFields);
    if (!invalidFields.length) setConfirmedName(elements.namedItem("name").value.trim());
  }

  function clearTopic() {
    formRef.current.elements.namedItem("name").focus();
    clearPreference();
  }

  function requiredInput(name, autoComplete, type = "text") {
    const hasError = invalid.includes(name);
    return (
      <Field name={name} label={labels[name]}>
        <input
          id={`home-contact-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? ERROR_ID : undefined}
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
        <strong id="home-contact-confirmation">{fill(leadForm.done.heading, { name: confirmedName })}</strong>
        <p id="home-contact-confirmation-note">{leadForm.done.demoNote}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} ref={formRef} onSubmit={submit} noValidate>
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
        <input id="home-contact-tools" name="tools" placeholder={toolsPlaceholder} />
      </Field>
      <Field name="message" label={labels.message}>
        <textarea id="home-contact-message" name="message" rows={4} />
      </Field>
      <p id={ERROR_ID} className={styles.error} role="alert">{invalid.length ? leadForm.error : ""}</p>
      <Button type="submit" variant="accent" full className={styles.submit} disabled={snapshot === null}>
        {submitLabel}
      </Button>
      <p className={styles.note}>{note}</p>
    </form>
  );
}

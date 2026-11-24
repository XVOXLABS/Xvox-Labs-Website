"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { leadForm } from "@/data/site";
import { savePreference } from "@/lib/preference";
import styles from "./company.module.css";

// Link to /book that saves the topic first (prototype data-pref "About|Path").
export function TopicLink({ href, about, path, children, ...props }) {
  return <Button href={href} onClick={() => savePreference(about, path)} {...props}>{children}</Button>;
}

const EMAIL = /^\S+@\S+\.\S+$/;

// Talent waitlist (prototype waitf). Demo mode: nothing is sent or stored, and the confirmation says so.
export function WaitlistForm({ labels, options, submitLabel, invalidEmail, note }) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const emailRef = useRef(null);
  const doneRef = useRef(null);

  useEffect(() => {
    if (error) emailRef.current?.focus();
  }, [error]);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  if (done) {
    return <p ref={doneRef} tabIndex={-1} role="status" className={styles.done}>{leadForm.done.demoNote}</p>;
  }
  return (
    <form className={styles.form} noValidate onSubmit={(e) => {
      e.preventDefault();
      if (!EMAIL.test(e.currentTarget.elements.namedItem("email").value.trim())) {
        setError(invalidEmail);
        return;
      }
      setError("");
      setDone(true);
    }}>
      <div className={styles.field}>
        <label htmlFor="waitlist-email">{labels[0]}</label>
        <input ref={emailRef} id="waitlist-email" name="email" type="email" autoComplete="email" required
          aria-invalid={error ? "true" : undefined} aria-describedby={error ? "waitlist-error" : undefined} />
      </div>
      <div className={styles.field}>
        <label htmlFor="waitlist-interest">{labels[1]}</label>
        <select id="waitlist-interest" name="interest">{options.map((text) => <option key={text}>{text}</option>)}</select>
      </div>
      {error ? <p id="waitlist-error" role="alert" className={styles.error}>{error}</p> : null}
      <Button type="submit" full className={styles.tall}>{submitLabel}</Button>
      <p className={styles.note}>{note}</p>
    </form>
  );
}

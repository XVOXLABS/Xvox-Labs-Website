"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { selfCheckText as T } from "@/data/selfCheck";
import { leadForm } from "@/data/site";
import { fill } from "@/lib/content";
import { savePreference } from "@/lib/preference";
import styles from "./selfcheck.module.css";

const EMAIL = /^\S+@\S+\.\S+$/;

// Safe AI self-check (prototype SCQ / drawSC): ten questions, Yes 2 / Not sure 1 / No 0 per question,
// five areas of four points, a score out of 20, a verdict band and a recommended review package.
// Demo mode: nothing is sent or stored; the optional "email me this result" form only shows the demo note.
export default function SelfCheck({ checks, questions }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const headingRef = useRef(null);
  const emailRef = useRef(null);
  const moved = useRef(false);
  const done = index >= questions.length;

  // Keyboard and screen-reader users land on the new question or the result after each step.
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
    moved.current = true;
  }, [index]);
  useEffect(() => {
    if (error) emailRef.current?.focus();
  }, [error]);

  const answer = (value) => {
    setAnswers((prev) => [...prev.slice(0, index), value]);
    setIndex(index + 1);
  };
  const back = () => {
    setAnswers((prev) => prev.slice(0, index - 1));
    setIndex(index - 1);
  };
  const retake = () => {
    setAnswers([]);
    setIndex(0);
    setError("");
    setSent(false);
  };

  if (!done) {
    const q = questions[index];
    return (
      <div className={styles.question}>
        <div className={styles.progress}>
          <span>{fill(T.progress, { n: index + 1, total: questions.length, area: checks[q.check].name })}</span>
          <span className={styles.track} aria-hidden="true"><i style={{ width: `${(index / questions.length) * 100}%` }} /></span>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className={styles.title}>{q.question}</h2>
        <div role="group" aria-label={T.answerGroup} className={styles.answers}>
          {T.answers.map(({ label, value }) => <Button key={label} variant="secondary" onClick={() => answer(value)}>{label}</Button>)}
        </div>
        {index ? <button type="button" className={styles.link} onClick={back}>{T.back}</button> : null}
      </div>
    );
  }

  const byArea = checks.map(() => 0);
  answers.forEach((value, i) => { byArea[questions[i].check] += value; });
  const total = byArea.reduce((a, b) => a + b, 0);
  const verdict = T.verdicts.find(({ min }) => total >= min);
  return (
    <div className={styles.result}>
      <div>
        <span className={styles.chip}>{fill(T.result, { score: total })}</span>
        <h2 ref={headingRef} tabIndex={-1} className={styles.title}>
          {T.verdictLabel} <span className={styles.verdict} style={{ background: `var(--tint-${verdict.tint})` }}>{verdict.label}</span>
        </h2>
        <p className={styles.muted}>{verdict.text}</p>
        <ul className={styles.bars}>
          {checks.map(({ name }, i) => (
            <li key={name}>
              <span>{name}</span>
              <span className={styles.track} aria-hidden="true"><i style={{ width: `${(byArea[i] / T.maxPerArea) * 100}%` }} /></span>
              <b>{byArea[i]}/{T.maxPerArea}</b>
            </li>
          ))}
        </ul>
        <p className={styles.muted}>{T.note}</p>
      </div>
      <div className={styles.next}>
        <h3>{T.next}</h3>
        <div className={styles.package}>
          <h4>{verdict.package}</h4>
          <p>{verdict.packageText}</p>
          <Button href="/book" full onClick={() => savePreference(T.bookAbout, fill(T.bookPath, { package: verdict.package, score: total }))}>
            {fill(T.book, { package: verdict.package })}
          </Button>
        </div>
        {sent ? (
          <p role="status" className={styles.done}>{leadForm.done.demoNote}</p>
        ) : (
          <form noValidate className={styles.email} onSubmit={(e) => {
            e.preventDefault();
            if (!EMAIL.test(e.currentTarget.elements.namedItem("email").value.trim())) { setError(T.invalidEmail); return; }
            setError("");
            setSent(true);
          }}>
            <label htmlFor="selfcheck-email">{T.emailLabel}</label>
            <div className={styles.emailRow}>
              <input ref={emailRef} id="selfcheck-email" name="email" type="email" autoComplete="email" placeholder={T.emailPlaceholder}
                aria-invalid={error ? "true" : undefined} aria-describedby={error ? "selfcheck-error" : undefined} />
              <Button type="submit" variant="small">{T.emailSubmit}</Button>
            </div>
            {error ? <p id="selfcheck-error" role="alert" className={styles.error}>{error}</p> : null}
          </form>
        )}
        <button type="button" className={styles.link} onClick={retake}>{T.retake}</button>
      </div>
    </div>
  );
}

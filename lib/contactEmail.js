// Server only: builds the enquiry email and hands it to Resend. Imported by app/api/contact/route.js and
// never by browser code. The API key is read from the environment and never leaves the server.
import { createHash } from "node:crypto";
import { contactEmail as T } from "@/data/contact";
import { errorDetails, providerErrorDetails, safeMessageId } from "@/lib/contactLog";

const RESEND_URL = "https://api.resend.com/emails";
const TIMEOUT_MS = 10000;
const ORDER = ["name", "email", "phone", "company", "subject", "interest", "start", "budget", "tools", "about", "path"];

// The form sends only when both are set: the key, and an explicit switch the owner turns on after the
// sending domain is verified in Resend.
export function contactEnabled() {
  return Boolean(process.env.RESEND_API_KEY) && process.env.CONTACT_FORM_ENABLED === "true";
}

// For the logs: which settings exist (true or false only, never their values) and why sending is off.
export function contactSettings() {
  const present = (name) => Boolean(process.env[name]);
  const reasons = [];
  if (!present("RESEND_API_KEY")) reasons.push("RESEND_API_KEY is missing or empty");
  if (!present("CONTACT_FORM_ENABLED")) reasons.push("CONTACT_FORM_ENABLED is missing or empty");
  else if (process.env.CONTACT_FORM_ENABLED !== "true") reasons.push('CONTACT_FORM_ENABLED is set but is not exactly "true"');
  return {
    enabled: contactEnabled(),
    env: {
      RESEND_API_KEY: present("RESEND_API_KEY"),
      CONTACT_FORM_ENABLED: present("CONTACT_FORM_ENABLED"),
      CONTACT_FORM_FROM: present("CONTACT_FORM_FROM"),
      CONTACT_FORM_TO: present("CONTACT_FORM_TO"),
    },
    ...(reasons.length && { disabledReason: reasons.join("; ") }),
  };
}

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function buildEmail(values) {
  const rows = ORDER.filter((name) => values[name]).map((name) => [T.labels[name], values[name]]);
  const text = [T.heading, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", `${T.labels.message}:`, values.message].join("\n");
  const html = [
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#0f0f0f">`,
    `<h2 style="font-size:18px;margin:0 0 16px">${escape(T.heading)}</h2>`,
    `<table style="border-collapse:collapse">`,
    ...rows.map(([label, value]) => `<tr><th style="text-align:left;vertical-align:top;padding:4px 16px 4px 0;color:#555">${escape(label)}</th><td style="padding:4px 0">${escape(value)}</td></tr>`),
    `</table>`,
    `<h3 style="font-size:15px;margin:20px 0 6px">${escape(T.labels.message)}</h3>`,
    `<p style="margin:0;white-space:pre-wrap">${escape(values.message)}</p>`,
    `</div>`,
  ].join("");
  // CONTACT_FORM_FROM is a temporary test sender (onboarding@resend.dev) for use before the domain is verified.
  const from = process.env.CONTACT_FORM_FROM || T.from;
  // CONTACT_FORM_TO is TEMPORARY, for testing only: the final recipient is T.to. Never set it in production.
  const to = process.env.CONTACT_FORM_TO || T.to;
  return { from, to: [to], reply_to: values.email, subject: `${T.subjectPrefix}${values.subject}`, text, html };
}

// True only when Resend accepts the email. The same submission sent twice within a day reaches the inbox
// once, because Resend drops a repeat that carries the same idempotency key.
export async function sendEnquiry(values, log) {
  const body = JSON.stringify(buildEmail(values));
  log.info("CONTACT_EMAIL_SENDING_STARTED", {
    testSenderApplied: Boolean(process.env.CONTACT_FORM_FROM),
    testRecipientApplied: Boolean(process.env.CONTACT_FORM_TO),
  });
  const sentAt = Date.now();
  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${createHash("sha256").update(body).digest("hex")}`,
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const result = await response.json().catch(() => null);
    const accepted = Boolean(response.ok && result?.id);
    log.info("CONTACT_EMAIL_PROVIDER_RESPONSE", {
      providerStatus: response.status,
      hasMessageId: Boolean(result?.id),
      providerDurationMs: Date.now() - sentAt,
    });
    if (accepted) {
      // Accepted by the provider, which is not proof that the email reached an inbox.
      log.info("CONTACT_EMAIL_ACCEPTED", { messageId: safeMessageId(result.id) });
      return true;
    }
    log.error("CONTACT_EMAIL_FAILED", {
      reason: response.ok ? "provider_response_without_message_id" : "provider_rejected",
      providerStatus: response.status,
      ...providerErrorDetails(result),
    });
  } catch (error) {
    log.error("CONTACT_EMAIL_FAILED", {
      reason: error?.name === "TimeoutError" ? "provider_timeout" : "provider_request_failed",
      ...errorDetails(error),
      providerDurationMs: Date.now() - sentAt,
    });
  }
  return false;
}

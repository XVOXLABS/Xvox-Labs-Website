// Contact form endpoint. GET says whether sending is switched on; POST validates a submission and emails
// it to the team. Nothing is stored. Responses carry no provider details; each stage is logged on the server
// under one request ID, without visitor details.
import { randomUUID } from "node:crypto";
import { cleanContact, invalidFields } from "@/lib/contact";
import { contactEnabled, contactSettings, sendEnquiry } from "@/lib/contactEmail";
import { createContactLog, errorDetails } from "@/lib/contactLog";

export const dynamic = "force-dynamic";

const MAX_BYTES = 20000;
const MIN_FILL_MS = 2000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Basic rate limit, kept in this server instance's memory only; it is not shared between instances.
const recent = new Map();

function limited(key) {
  const now = Date.now();
  for (const [k, times] of recent) if (!times.some((t) => now - t < WINDOW_MS)) recent.delete(k);
  const times = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) return true;
  recent.set(key, [...times, now]);
  return false;
}

const reply = (status, body) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// A browser sends Origin with this request; another site's origin is refused.
function sameSite(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
  } catch {
    return false;
  }
}

// The form asks this when it loads. While sending is off it never posts, so this line is the only trace.
export function GET() {
  const settings = contactSettings();
  createContactLog(randomUUID())[settings.enabled ? "info" : "warn"]("CONTACT_STATUS_CHECK", { status: 200, ...settings });
  return reply(200, { enabled: settings.enabled });
}

export async function POST(request) {
  const log = createContactLog(randomUUID());
  // Every path ends here, so each request ID has a first and a last line.
  const finish = (status, outcome, body = { ok: false }, details) => {
    const level = status < 400 ? "info" : status < 500 ? "warn" : "error";
    log[level]("CONTACT_REQUEST_COMPLETED", { status, outcome, ...details });
    return reply(status, body);
  };
  try {
    return await handle(request, log, finish);
  } catch (error) {
    log.error("CONTACT_UNEXPECTED_ERROR", { lastStage: log.lastEvent(), ...errorDetails(error) });
    return finish(500, "unexpected_error");
  }
}

async function handle(request, log, finish) {
  const settings = contactSettings();
  log.info("CONTACT_REQUEST_RECEIVED", settings);
  if (!contactEnabled()) return finish(503, "sending_disabled", { ok: false }, { reason: settings.disabledReason });

  const originAllowed = sameSite(request);
  log[originAllowed ? "info" : "warn"]("CONTACT_ORIGIN_CHECK", {
    passed: originAllowed,
    ...(!originAllowed && { reason: request.headers.get("origin") ? "origin_does_not_match_host" : "origin_header_missing" }),
  });
  if (!originAllowed) return finish(403, "origin_rejected");

  const isJson = Boolean(request.headers.get("content-type")?.startsWith("application/json"));
  log[isJson ? "info" : "warn"]("CONTACT_CONTENT_TYPE_CHECK", { passed: isJson });
  if (!isJson) return finish(415, "content_type_rejected");

  log.info("CONTACT_VALIDATION_STARTED");
  const invalidBody = (status, reason) => {
    log.warn("CONTACT_VALIDATION_FAILED", { status, reason });
    return finish(status, reason);
  };
  let input;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES) return invalidBody(413, "body_too_large");
    input = JSON.parse(raw);
  } catch {
    return invalidBody(400, "body_unreadable_or_not_json");
  }
  if (!input || typeof input !== "object") return invalidBody(400, "body_not_an_object");

  // Spam checks: the hidden field stays empty and a person needs a moment to fill in the form.
  const trapFilled = Boolean(input.reference);
  const tooFast = !(Number(input.elapsed) >= MIN_FILL_MS);
  const isSpam = trapFilled || tooFast;
  log.info("CONTACT_SPAM_CHECK", { passed: !isSpam, hiddenFieldFilled: trapFilled, fillTimeTooShortOrMissing: tooFast });
  if (isSpam) {
    log.warn("CONTACT_SPAM_REJECTED", { status: 400, reason: trapFilled ? "hidden_field_filled" : "fill_time_too_short_or_missing" });
    return finish(400, "spam_rejected");
  }

  const values = cleanContact(input);
  const invalid = invalidFields(values);
  if (invalid.length) {
    // Field names only, never what was typed.
    log.warn("CONTACT_VALIDATION_FAILED", { status: 422, reason: "invalid_fields", invalidFields: invalid });
    return finish(422, "invalid_fields", { ok: false, invalid });
  }
  log.info("CONTACT_VALIDATION_PASSED");

  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(address)) {
    log.warn("CONTACT_RATE_LIMITED", { status: 429, limit: MAX_PER_WINDOW, windowMinutes: WINDOW_MS / 60000 });
    return finish(429, "rate_limited");
  }

  return (await sendEnquiry(values, log)) ? finish(200, "accepted_by_provider", { ok: true }) : finish(502, "email_failed");
}

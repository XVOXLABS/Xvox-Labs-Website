// Server only: one JSON line for each processing stage of the contact form, read in the Vercel Runtime Logs.
// Callers pass metadata only (checks, statuses, field names, booleans), never visitor details, form
// contents, request headers, addresses or secrets. Error messages and stack traces are never written,
// because they can quote any of those: errors are reduced to the codes listed here.

// Resend's documented error codes.
const PROVIDER_CODES = new Set([
  "application_error", "concurrent_idempotent_requests", "daily_quota_exceeded", "internal_server_error",
  "invalid_access", "invalid_api_key", "invalid_attachment", "invalid_from_address", "invalid_idempotency_key",
  "invalid_idempotent_request", "invalid_parameter", "invalid_region", "method_not_allowed", "missing_api_key",
  "missing_required_field", "monthly_quota_exceeded", "not_found", "rate_limit_exceeded", "restricted_api_key",
  "security_error", "validation_error",
]);
// Two setup faults share one provider code. The message only picks a fixed label and is not written.
const PROVIDER_HINTS = [
  ["sender_domain_not_verified", /domain is not verified/i],
  ["test_sender_reaches_account_owner_only", /only send testing emails/i],
];
const ERROR_NAMES = new Set(["AbortError", "AggregateError", "Error", "RangeError", "ReferenceError", "SyntaxError", "TimeoutError", "TypeError", "URIError"]);
const ERROR_CODES = new Set([
  "CERT_HAS_EXPIRED", "EAI_AGAIN", "ECONNREFUSED", "ECONNRESET", "EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND", "EPIPE",
  "ETIMEDOUT", "UNABLE_TO_VERIFY_LEAF_SIGNATURE", "UND_ERR_BODY_TIMEOUT", "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT", "UND_ERR_SOCKET",
]);
const MESSAGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// A value that is not on the list is reported as "unlisted", never copied.
const listed = (list, value) => (value === undefined || value === null ? undefined : list.has(value) ? value : "unlisted");

export function providerErrorDetails(result) {
  const message = typeof result?.message === "string" ? result.message : "";
  return {
    providerError: listed(PROVIDER_CODES, result?.name),
    providerHint: PROVIDER_HINTS.find(([, pattern]) => pattern.test(message))?.[0],
  };
}

export function errorDetails(error) {
  return { errorName: listed(ERROR_NAMES, error?.name), errorCode: listed(ERROR_CODES, error?.cause?.code ?? error?.code) };
}

// The provider's message ID, only in its expected form.
export const safeMessageId = (id) => (typeof id === "string" && MESSAGE_ID.test(id) ? id : undefined);

export function createContactLog(requestId) {
  const started = Date.now();
  let lastEvent;
  const write = (level) => (event, details) => {
    lastEvent = event;
    console[level](JSON.stringify({ time: new Date().toISOString(), requestId, event, durationMs: Date.now() - started, ...details }));
  };
  return { info: write("info"), warn: write("warn"), error: write("error"), lastEvent: () => lastEvent };
}

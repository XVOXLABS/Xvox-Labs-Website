// Checks that the contact form logs cannot carry secrets or anything a visitor typed.
// Run: node --test tests/*.test.mjs
// The email provider is simulated and the key is fake, so nothing is sent. No env file is read.
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { beforeEach, test } from "node:test";

const ROOT = new URL("../", import.meta.url);
// The application imports through the "@/..." alias.
registerHooks({
  resolve: (specifier, context, next) =>
    specifier.startsWith("@/") ? next(new URL(`${specifier.slice(2)}.js`, ROOT).href, context) : next(specifier, context),
});

const KEY = "re_TestKeyNotReal_123456789";
Object.assign(process.env, { RESEND_API_KEY: KEY, CONTACT_FORM_ENABLED: "true" });
delete process.env.CONTACT_FORM_FROM;
delete process.env.CONTACT_FORM_TO;

const { GET, POST } = await import("../app/api/contact/route.js");
const { errorDetails, providerErrorDetails, safeMessageId } = await import("../lib/contactLog.js");

// Short and unusual values included: cleaning free text could miss these.
const VISITOR = {
  name: "Zq", email: "zq.private@customer-example.com", phone: "+91 98765 43210", company: "Marmalade (Holdings)",
  subject: "Confidential walrus plan", message: "Secret pineapple message\nsecond line", tools: "HiddenTool",
};
const ORIGIN = "http://localhost:3100";
const MESSAGE_ID = "01a212de-d941-7020-9916-4e8333daa139";
// Everything that must never appear, including altered and partial copies of what was typed.
const FORBIDDEN = [
  ...Object.values(VISITOR).filter((value) => value.length > 2), "zq", "customer-example", "98765", "pineapple",
  "walrus", "marmalade", KEY, "TestKeyNotReal", "Bearer", "hello@xvoxlabs.com", "203.0.113", "SECRET",
];
// Text a provider or runtime error could quote back.
const LEAKY = `SECRET ${Object.values(VISITOR).join(" | ").toUpperCase()} ${VISITOR.message.slice(0, 12)} ${KEY} Bearer ${KEY}`;

let lines;
let provider;
for (const level of ["info", "warn", "error"]) console[level] = (line) => lines.push(line);
globalThis.fetch = async (url) => {
  assert.equal(url, "https://api.resend.com/emails", "only the simulated provider may be called");
  return provider();
};
beforeEach(() => {
  lines = [];
  provider = () => Response.json({ id: MESSAGE_ID });
});

let address = 0;
function request(body = { ...VISITOR, elapsed: 5000 }, headers = {}) {
  return new Request(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: ORIGIN, Host: "localhost:3100", "X-Forwarded-For": `203.0.113.${++address}`, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
const entries = () => lines.map((line) => JSON.parse(line));
const find = (event) => entries().find((entry) => entry.event === event);
function assertSafe() {
  assert.ok(lines.length, "something was logged");
  const all = lines.join("\n").toLowerCase();
  for (const value of FORBIDDEN) {
    // "zq" is short enough to occur inside a random request ID, so it is checked without the IDs.
    const text = value === "zq" ? all.replace(/"requestid":"[^"]+",?|"messageid":"[^"]+",?/g, "") : all;
    assert.ok(!text.includes(value.toLowerCase()), `log contains forbidden value: ${value}`);
  }
}

test("an accepted email logs the message ID and no visitor data", async () => {
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(find("CONTACT_EMAIL_ACCEPTED").messageId, MESSAGE_ID);
  assertSafe();
});

test("a message ID in an unexpected form is not written", async () => {
  provider = () => Response.json({ id: LEAKY });
  assert.equal((await POST(request())).status, 200);
  assert.equal(find("CONTACT_EMAIL_ACCEPTED").messageId, undefined);
  assertSafe();
});

test("a rejection that quotes every submitted value logs only the code and status", async () => {
  provider = () => Response.json({ name: "validation_error", message: LEAKY, extra: LEAKY }, { status: 422 });
  const response = await POST(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false });
  const failed = find("CONTACT_EMAIL_FAILED");
  assert.equal(failed.providerStatus, 422);
  assert.equal(failed.providerError, "validation_error");
  assert.equal("providerMessage" in failed, false);
  assertSafe();
});

test("an unknown provider code is reported as unlisted", async () => {
  for (const name of [LEAKY, "zq_private", { value: LEAKY }, 42]) {
    lines = [];
    provider = () => Response.json({ name, message: LEAKY }, { status: 400 });
    await POST(request());
    assert.equal(find("CONTACT_EMAIL_FAILED").providerError, "unlisted");
    assertSafe();
  }
});

test("known setup faults become fixed hints", async () => {
  for (const [message, hint] of [
    [`The xvoxlabs.com domain is not verified. ${LEAKY}`, "sender_domain_not_verified"],
    [`You can only send testing emails to your own address. ${LEAKY}`, "test_sender_reaches_account_owner_only"],
  ]) {
    lines = [];
    provider = () => Response.json({ name: "validation_error", message }, { status: 403 });
    await POST(request());
    assert.equal(find("CONTACT_EMAIL_FAILED").providerHint, hint);
    assertSafe();
  }
});

test("unreadable provider replies are safe", async () => {
  for (const [body, status] of [[LEAKY, 500], ["{}", 200], ["null", 200]]) {
    lines = [];
    provider = () => new Response(body, { status });
    assert.equal((await POST(request())).status, 502);
    assertSafe();
  }
});

test("network errors and timeouts log listed names and codes only", async () => {
  const cases = [
    [Object.assign(new TypeError(LEAKY), { cause: { code: "ECONNRESET", message: LEAKY } }), "TypeError", "ECONNRESET", "provider_request_failed"],
    [new DOMException(LEAKY, "TimeoutError"), "TimeoutError", "unlisted", "provider_timeout"],
    [Object.assign(new Error(LEAKY), { name: LEAKY, code: LEAKY }), "unlisted", "unlisted", "provider_request_failed"],
    [LEAKY, undefined, undefined, "provider_request_failed"],
  ];
  for (const [error, errorName, errorCode, reason] of cases) {
    lines = [];
    provider = () => { throw error; };
    assert.equal((await POST(request())).status, 502);
    const failed = find("CONTACT_EMAIL_FAILED");
    assert.deepEqual([failed.errorName, failed.errorCode, failed.reason], [errorName, errorCode, reason]);
    assertSafe();
  }
});

// A stand-in request that throws while the route reads it: nothing inside the route expects this.
const crashingRequest = (error) => ({ headers: { get: () => { throw error; } } });

test("an unexpected crash is logged with its stage, without message or stack, and answered generically", async () => {
  for (const error of [new RangeError(LEAKY), Object.assign(new Error(LEAKY), { name: LEAKY, stack: LEAKY }), LEAKY, null]) {
    lines = [];
    const response = await POST(crashingRequest(error));
    assert.equal(response.status, 500);
    assert.equal(await response.text(), '{"ok":false}');
    assert.deepEqual(entries().map((entry) => entry.event), ["CONTACT_REQUEST_RECEIVED", "CONTACT_UNEXPECTED_ERROR", "CONTACT_REQUEST_COMPLETED"]);
    const crash = find("CONTACT_UNEXPECTED_ERROR");
    assert.equal(crash.lastStage, "CONTACT_REQUEST_RECEIVED");
    assert.equal(crash.errorName, error instanceof RangeError ? "RangeError" : error?.name ? "unlisted" : undefined);
    assert.equal("errorMessage" in crash, false);
    assert.equal("stack" in crash, false);
    assert.equal(new Set(entries().map((entry) => entry.requestId)).size, 1);
    assertSafe();
  }
});

test("a crash while the email is being built is caught and logged safely", async (t) => {
  const replace = String.prototype.replace;
  t.mock.method(String.prototype, "replace", function (pattern, ...rest) {
    if (pattern?.source === "&") throw new TypeError(LEAKY);
    return replace.call(this, pattern, ...rest);
  });
  const response = await POST(request());
  t.mock.restoreAll();
  assert.equal(response.status, 500);
  assert.equal(find("CONTACT_UNEXPECTED_ERROR").lastStage, "CONTACT_VALIDATION_PASSED");
  assert.equal(find("CONTACT_REQUEST_COMPLETED").outcome, "unexpected_error");
  assertSafe();
});

test("rejected submissions and broken bodies log no content", async () => {
  const cases = [
    [request(`{broken ${LEAKY}`), 400],
    [request({ ...VISITOR, message: LEAKY.repeat(200), elapsed: 5000 }), 413],
    [request({ ...VISITOR, elapsed: 5000, reference: LEAKY }), 400],
    [request({ ...VISITOR, elapsed: LEAKY }), 400],
    [request({ ...VISITOR, email: "SECRET not an address", elapsed: 5000 }), 422],
    [request(undefined, { Origin: "https://SECRET.example" }), 403],
    [request(undefined, { "Content-Type": "text/SECRET" }), 415],
  ];
  for (const [input, status] of cases) {
    lines = [];
    assert.equal((await POST(input)).status, status);
    assertSafe();
  }
});

test("settings are logged as true or false, and a wrong switch value is not copied", async () => {
  process.env.CONTACT_FORM_ENABLED = "SECRET";
  process.env.CONTACT_FORM_TO = VISITOR.email;
  GET();
  await POST(request());
  Object.assign(process.env, { CONTACT_FORM_ENABLED: "true" });
  delete process.env.CONTACT_FORM_TO;
  for (const entry of entries().filter((item) => item.env)) assert.ok(Object.values(entry.env).every((value) => typeof value === "boolean"));
  assert.match(find("CONTACT_STATUS_CHECK").disabledReason, /not exactly/);
  assertSafe();
});

test("the detail helpers never copy unknown input", () => {
  for (const input of [undefined, null, LEAKY, { name: LEAKY, message: LEAKY, code: LEAKY, cause: { code: LEAKY } }]) {
    const output = JSON.stringify([errorDetails(input), providerErrorDetails(input), safeMessageId(input)]);
    assert.ok(!/secret|re_|customer-example/i.test(output), output);
  }
});

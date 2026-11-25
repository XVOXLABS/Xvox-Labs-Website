// Contact form endpoint. GET says whether sending is switched on; POST validates a submission and emails
// it to the team. Nothing is stored. Responses carry no provider details.
import { cleanContact, invalidFields } from "@/lib/contact";
import { contactEnabled, sendEnquiry } from "@/lib/contactEmail";

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

export function GET() {
  return reply(200, { enabled: contactEnabled() });
}

export async function POST(request) {
  if (!contactEnabled()) return reply(503, { ok: false });
  if (!sameSite(request)) return reply(403, { ok: false });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, { ok: false });

  let input;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES) return reply(413, { ok: false });
    input = JSON.parse(raw);
  } catch {
    return reply(400, { ok: false });
  }
  if (!input || typeof input !== "object") return reply(400, { ok: false });

  // Spam checks: the hidden field stays empty and a person needs a moment to fill in the form.
  if (input.reference || !(Number(input.elapsed) >= MIN_FILL_MS)) return reply(400, { ok: false });

  const values = cleanContact(input);
  const invalid = invalidFields(values);
  if (invalid.length) return reply(422, { ok: false, invalid });

  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(address)) return reply(429, { ok: false });

  return (await sendEnquiry(values)) ? reply(200, { ok: true }) : reply(502, { ok: false });
}

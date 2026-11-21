// Saved booking topic (prototype PREF): set by links that go to /book with a topic, e.g.
// "Hire Scout ↗" -> { about: "Scout (Research agent)", path: "Hosted by us" }. Kept for the
// visit in sessionStorage so /book (Phase 5) and the contact form chip (Step 7) can read it.

const KEY = "xvox-topic";
export const PREFERENCE_EVENT = "xvox:topic";

export function savePreference(about, path) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({ about, path }));
  } catch {
    // Storage can be unavailable (private mode); the link still works without the topic.
  }
  window.dispatchEvent(new CustomEvent(PREFERENCE_EVENT));
}

export function readPreference() {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPreference() {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(PREFERENCE_EVENT));
}

// Contact form rules shared by the browser and the server. The server applies them again to everything it
// receives; the browser's checks are only there to help the visitor.

export const CONTACT_ENDPOINT = "/api/contact";
export const REQUIRED_FIELDS = ["name", "email", "company", "subject", "message"];
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  company: 150,
  subject: 150,
  interest: 150,
  start: 150,
  budget: 150,
  tools: 300,
  message: 5000,
  about: 200,
  path: 200,
};
// One address only: no spaces, brackets, quotes or list separators.
const EMAIL = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/;

// Trims, removes control characters and caps the length. Only the message keeps its line breaks.
export function cleanField(name, value) {
  if (typeof value !== "string") return "";
  const text = name === "message"
    ? value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F\u2028\u2029]+/g, " ");
  return text.trim().slice(0, FIELD_LIMITS[name]);
}

export function cleanContact(input) {
  return Object.fromEntries(Object.keys(FIELD_LIMITS).map((name) => [name, cleanField(name, input?.[name])]));
}

export function invalidFields(values) {
  return REQUIRED_FIELDS.filter((field) => (field === "email" ? !EMAIL.test(values.email) : !values[field]));
}

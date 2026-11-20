// Site-wide actions triggered from links in the prototype content.
// "#vox" in data/ means "open the Vox chat" (prototype #guide / data-ask), not a page.
export const VOX_HREF = "#vox";
export const OPEN_VOX_EVENT = "xvox:open-vox";
export const OPEN_CART_EVENT = "xvox:open-cart";

export function openVox() {
  window.dispatchEvent(new CustomEvent(OPEN_VOX_EVENT));
}

export function openCart() {
  window.dispatchEvent(new CustomEvent(OPEN_CART_EVENT));
}

export function isExternal(href = "") {
  return /^https?:\/\//.test(href);
}

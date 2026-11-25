// Focus helper for overlays that close because the route changed (browser Back or Forward, or a link).
// A native <dialog> returns focus to the control that opened it. After a navigation that control can be
// gone (for example an in-page "Ask Vox" button), and focus would fall to <body>. In that case focus
// moves to the page's <main> region so keyboard and screen-reader users continue at the new page.
// If the opener still exists (the header Cart button, the Vox launcher) nothing is changed.

export function focusIsLost() {
  const active = document.activeElement;
  return !active || active === document.body || active === document.documentElement;
}

export function restoreFocusIfLost() {
  if (!focusIsLost()) return;
  const main = document.querySelector("main");
  if (!main) return;
  if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
  main.style.outline = "none";
  main.focus({ preventScroll: true });
}

"use client";

import { useSyncExternalStore } from "react";
import { items } from "@/data/marketplace";

// Cart, kept in the browser exactly like the prototype: localStorage key "xvox-cart",
// value = JSON array of marketplace item ids. Unknown ids are dropped on read.
const KEY = "xvox-cart";
const known = new Set(items.map((i) => i.id));
const listeners = new Set();
const EMPTY = [];
let cache = null;

function read() {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
    cache = Array.isArray(parsed) ? parsed.filter((id) => known.has(id)) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode): the cart still works for this page view.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (e) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToCart(id) {
  const current = read();
  if (known.has(id) && !current.includes(id)) write([...current, id]);
}

export function removeFromCart(id) {
  write(read().filter((x) => x !== id));
}

// src/utils/invStore.js
const STORAGE_KEY = "inv_list";

export function loadInvList(fallback = []) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveInvList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []));
}

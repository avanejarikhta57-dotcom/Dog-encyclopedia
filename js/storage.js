const FAVORITES_KEY = "dog_breed_favorites_v1";
const THEME_KEY = "dog_breed_theme_v1";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  const parsed = safeJsonParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

function setFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function toggleFavorite(breedId) {
  const idStr = String(breedId);
  const current = getFavorites().map(String);
  const set = new Set(current);

  if (set.has(idStr)) set.delete(idStr);
  else set.add(idStr);

  const next = Array.from(set);
  setFavorites(next);
  return next;
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function getTheme() {
  const t = localStorage.getItem(THEME_KEY);
  return t === "dark" || t === "light" ? t : "light";
}


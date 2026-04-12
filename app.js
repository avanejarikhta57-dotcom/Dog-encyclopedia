import { fetchBreeds } from "./js/api.js";
import { applyFilters } from "./js/filter.js";
import { renderBreeds, renderModal, closeModal, showLoading, showError, clearStatus } from "./js/render.js";
import { getFavorites, saveTheme, getTheme } from "./js/storage.js";

const statusEl = document.getElementById("status");
const breedContainer = document.getElementById("breedContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const sizeFilter = document.getElementById("sizeFilter");
const favToggle = document.getElementById("favToggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const resultCount = document.getElementById("resultCount");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");

let allBreeds = [];
let showFavOnly = false;

const filters = {
  query: "",
  size: "all",
  sortKey: "default",
};

const SEARCH_DEBOUNCE_MS = 350;

function debounce(fn, delay = SEARCH_DEBOUNCE_MS) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function updateList() {
  const favorites = getFavorites();
  const filtered = applyFilters(allBreeds, {
    query: filters.query,
    size: filters.size,
    sortKey: filters.sortKey,
    showFavoritesOnly: showFavOnly,
    favorites,
  });

  const n = filtered.length;
  resultCount.textContent = `${n} ${pluralize(n, "breed", "breeds")} found`;

  renderBreeds(
    filtered,
    breedContainer,
    (breed) => renderModal(breed, modal, modalContent),
    updateList
  );
}

searchInput.addEventListener(
  "input",
  debounce((e) => {
    filters.query = e.target.value;
    updateList();
  })
);

sortSelect.addEventListener("change", (e) => {
  filters.sortKey = e.target.value;
  updateList();
});

sizeFilter.addEventListener("change", (e) => {
  filters.size = e.target.value;
  updateList();
});

favToggle.addEventListener("click", () => {
  showFavOnly = !showFavOnly;
  favToggle.textContent = showFavOnly ? "Show All" : "Show Favorites";
  favToggle.classList.toggle("active", showFavOnly);
  updateList();
});

modalClose.addEventListener("click", () => closeModal(modal));
modalOverlay.addEventListener("click", () => closeModal(modal));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(modal);
  }
});

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "Light" : "Dark";
  saveTheme(theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

applyTheme(getTheme());

async function init() {
  showLoading(statusEl);

  try {
    allBreeds = await fetchBreeds();

    if (!allBreeds || allBreeds.length === 0) {
      showError(statusEl, "No breeds returned from the API.");
      return;
    }

    clearStatus(statusEl);
    updateList();
  } catch (err) {
    console.error(err);
    const message =
      err instanceof Error
        ? err.message
        : "Failed to load dog breeds. Check your API key or network connection.";
    showError(statusEl, message);
  }
}

init();


import { fetchBreeds }                        from "./js/api.js";
import { applyFilters }                       from "./js/filter.js";
import { renderBreeds, renderModal, closeModal, showLoading, showError, clearStatus } from "./js/render.js";
import { getFavorites, saveTheme, getTheme }  from "./js/storage.js";


const statusEl      = document.getElementById("status");
const breedContainer = document.getElementById("breedContainer");
const searchInput   = document.getElementById("searchInput");
const sortSelect    = document.getElementById("sortSelect");
const sizeFilter    = document.getElementById("sizeFilter");
const favToggle     = document.getElementById("favToggle");
const themeToggle   = document.getElementById("themeToggle");
const themeIcon     = document.getElementById("themeIcon");
const resultCount   = document.getElementById("resultCount");
const modal         = document.getElementById("modal");
const modalContent  = document.getElementById("modalContent");
const modalClose    = document.getElementById("modalClose");
const modalOverlay  = document.getElementById("modalOverlay");

// ── Application State ───────────────────────────────────────
let allBreeds        = [];   // Raw data from API (never mutated)
let showFavOnly      = false;

const state = {
  query:   "",
  size:    "all",
  sortKey: "default",
};


function debounce(fn, delay = 350) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function refresh() {
  const favorites = getFavorites();

  const filtered = applyFilters(allBreeds, {
    query:            state.query,
    size:             state.size,
    sortKey:          state.sortKey,
    showFavoritesOnly: showFavOnly,
    favorites,
  });

  resultCount.textContent = `${filtered.length} breed${filtered.length !== 1 ? "s" : ""} found`;

  renderBreeds(
    filtered,
    breedContainer,
    (breed) => renderModal(breed, modal, modalContent), 
    () => refresh()                                     
  );
}

searchInput.addEventListener(
  "input",
  debounce((e) => {
    state.query = e.target.value;
    refresh();
  }, 350)
);


sortSelect.addEventListener("change", (e) => {
  state.sortKey = e.target.value;
  refresh();
});


sizeFilter.addEventListener("change", (e) => {
  state.size = e.target.value;
  refresh();
});


favToggle.addEventListener("click", () => {
  showFavOnly = !showFavOnly;
  favToggle.textContent = showFavOnly ? "💔 Show All" : "❤️ Show Favorites";
  favToggle.classList.toggle("active", showFavOnly);
  refresh();
});

// Modal close buttons
modalClose.addEventListener("click", () => closeModal(modal));
modalOverlay.addEventListener("click", () => closeModal(modal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal(modal);
});

// ── Dark / Light Mode ────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
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
    refresh();
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Failed to load dog breeds. Check your API key or network connection.";
    showError(statusEl, message);
  }
}

init();

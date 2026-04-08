import { getFavorites, toggleFavorite } from "./storage.js";

const PLACEHOLDER_IMG =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMetric(metric) {
  return metric ? String(metric) : "—";
}

function getTemperamentTags(temperament) {
  if (typeof temperament !== "string") return [];
  return temperament
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function showLoading(statusEl) {
  statusEl.classList.remove("error");
  statusEl.innerHTML = `
    <div class="loader">
      <div class="spinner" aria-hidden="true"></div>
      <div>Loading breeds...</div>
    </div>
  `;
}

export function showError(statusEl, message) {
  statusEl.classList.add("error");
  statusEl.textContent = message;
}

export function clearStatus(statusEl) {
  statusEl.classList.remove("error");
  statusEl.textContent = "";
}

export function renderBreeds(breeds, breedContainer, onOpenModal, onRefresh) {
  const favoritesSet = new Set(getFavorites().map(String));
  breedContainer.innerHTML = "";

  if (!breeds || breeds.length === 0) {
    const empty = document.createElement("div");
    empty.className = "no-results";
    empty.innerHTML = `<span>🐾</span><div>No breeds match your filters.</div>`;
    breedContainer.appendChild(empty);
    return;
  }

  for (const breed of breeds) {
    const breedId = String(breed.id);
    const isFavorite = favoritesSet.has(breedId);

    const card = document.createElement("div");
    card.className = "breed-card";
    card.addEventListener("click", () => onOpenModal(breed));

    const imgUrl = breed.image?.url || PLACEHOLDER_IMG;
    const imgWrap = document.createElement("div");
    imgWrap.className = "breed-image-wrap";

    const img = document.createElement("img");
    img.className = "breed-image";
    img.src = imgUrl;
    img.alt = breed.name ? `${breed.name} dog` : "Dog breed";
    img.loading = "lazy";

    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.className = "fav-btn";
    favBtn.classList.toggle("active", isFavorite);
    favBtn.textContent = isFavorite ? "❤️" : "♡";
    favBtn.setAttribute(
      "aria-label",
      isFavorite ? `Remove ${breed.name} from favorites` : `Add ${breed.name} to favorites`
    );
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(breed.id);
      onRefresh();
    });
    card.appendChild(favBtn);

    const info = document.createElement("div");
    info.className = "breed-info";

    const h2 = document.createElement("h2");
    h2.textContent = breed.name || "Unknown breed";
    info.appendChild(h2);

    const tags = document.createElement("div");
    tags.className = "breed-tags";
    const temperamentTags = getTemperamentTags(breed.temperament);

    if (temperamentTags.length === 0) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = "TEMPERAMENT";
      tags.appendChild(span);
    } else {
      for (const t of temperamentTags) {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = t.toUpperCase();
        tags.appendChild(span);
      }
    }
    info.appendChild(tags);

    const meta = document.createElement("div");
    meta.className = "breed-meta";
    meta.innerHTML = `
      <p><strong>Weight:</strong> ${escapeHtml(formatMetric(breed.weight?.metric))}</p>
      <p><strong>Height:</strong> ${escapeHtml(formatMetric(breed.height?.metric))}</p>
      <p><strong>Life span:</strong> ${escapeHtml(breed.life_span || "—")}</p>
    `;
    info.appendChild(meta);

    card.appendChild(info);
    breedContainer.appendChild(card);
  }
}

export function renderModal(breed, modal, modalContent) {
  const name = breed?.name || "Unknown breed";
  const imgUrl = breed?.image?.url || PLACEHOLDER_IMG;
  const temperament = breed?.temperament || "—";
  const origin = breed?.origin || "—";
  const weight = breed?.weight?.metric || "—";
  const height = breed?.height?.metric || "—";
  const lifeSpan = breed?.life_span || "—";

  modalContent.innerHTML = `
    <img class="modal-img" src="${escapeHtml(imgUrl)}" alt="${escapeHtml(name)}" />
    <div class="modal-body">
      <h2>${escapeHtml(name)}</h2>

      <div class="modal-row">
        <div class="modal-label">Temperament</div>
        <div class="modal-value">${escapeHtml(temperament)}</div>
      </div>
      <div class="modal-row">
        <div class="modal-label">Origin</div>
        <div class="modal-value">${escapeHtml(origin)}</div>
      </div>
      <div class="modal-row">
        <div class="modal-label">Weight</div>
        <div class="modal-value">${escapeHtml(weight)}</div>
      </div>
      <div class="modal-row">
        <div class="modal-label">Height</div>
        <div class="modal-value">${escapeHtml(height)}</div>
      </div>
      <div class="modal-row">
        <div class="modal-label">Life span</div>
        <div class="modal-value">${escapeHtml(lifeSpan)}</div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

export function closeModal(modal) {
  modal.classList.add("hidden");
}


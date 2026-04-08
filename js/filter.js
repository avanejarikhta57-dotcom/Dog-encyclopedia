function avgOfRangeMetric(metric) {
  const matches = String(metric || "").match(/[\d.]+/g);
  const nums = matches ? matches.map((n) => Number(n)).filter((n) => !Number.isNaN(n)) : [];
  if (nums.length === 0) return null;
  if (nums.length === 1) return nums[0];
  return (nums[0] + nums[1]) / 2;
}

function avgOfRangeYears(lifeSpan) {
  const matches = String(lifeSpan || "").match(/[\d.]+/g);
  const nums = matches ? matches.map((n) => Number(n)).filter((n) => !Number.isNaN(n)) : [];
  if (nums.length === 0) return null;
  if (nums.length === 1) return nums[0];
  return (nums[0] + nums[1]) / 2;
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

export function applyFilters(
  breeds,
  { query, size, sortKey, showFavoritesOnly, favorites }
) {
  let out = Array.isArray(breeds) ? breeds.slice() : [];

  if (showFavoritesOnly) {
    const favSet = new Set((favorites || []).map(String));
    out = out.filter((b) => favSet.has(String(b.id)));
  }

  const q = normalizeText(query);
  if (q) {
    out = out.filter((b) => normalizeText(b.name).includes(q));
  }

  if (size && size !== "all") {
    out = out.filter((b) => {
      const wAvg = avgOfRangeMetric(b.weight?.metric);
      if (wAvg == null) return false;
      if (size === "small") return wAvg <= 10;
      if (size === "medium") return wAvg >= 11 && wAvg <= 25;
      if (size === "large") return wAvg >= 26;
      return true;
    });
  }

  const wVal = (b) => {
    const w = avgOfRangeMetric(b.weight?.metric);
    return w == null ? Number.POSITIVE_INFINITY : w;
  };

  const lifeVal = (b) => {
    const y = avgOfRangeYears(b.life_span);
    return y == null ? Number.POSITIVE_INFINITY : y;
  };

  out.sort((a, b) => {
    switch (sortKey) {
      case "name-desc":
        return normalizeText(b.name).localeCompare(normalizeText(a.name), undefined, { sensitivity: "base" });
      case "name-asc":
      case "default":
        return normalizeText(a.name).localeCompare(normalizeText(b.name), undefined, { sensitivity: "base" });
      case "weight-desc":
        return wVal(b) - wVal(a);
      case "weight-asc":
        return wVal(a) - wVal(b);
      case "lifespan-desc":
        return lifeVal(b) - lifeVal(a);
      case "lifespan-asc":
        return lifeVal(a) - lifeVal(b);
      default:
        return normalizeText(a.name).localeCompare(normalizeText(b.name), undefined, { sensitivity: "base" });
    }
  });

  return out;
}


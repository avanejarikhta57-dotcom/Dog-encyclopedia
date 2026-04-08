const API_KEY = "live_jNfvwabmolOcgkJZAEM9IhZS7ak5HwigD5pMuiktACW784aj5kWjiv4eKs7xz9HM";
const BASE_URL = "https://api.thedogapi.com/v1";

function apiErrorFromResponse(response) {
  if (response.status === 401 || response.status === 403) {
    return new Error("Unauthorized: your The Dog API key is invalid or missing.");
  }
  if (response.status === 429) {
    return new Error("Rate limited: please wait and try again.");
  }
  return new Error(`API error: ${response.status} ${response.statusText}`);
}

export async function fetchBreeds() {
  const response = await fetch(`${BASE_URL}/breeds?limit=172&page=0`, {
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw apiErrorFromResponse(response);
  }

  const breeds = await response.json();
  return breeds;
}


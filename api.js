

const API_KEY = "your_api_key_here"; // 
const BASE_URL = "https://api.thedogapi.com/v1";

export async function fetchBreeds() {
  const response = await fetch(`${BASE_URL}/breeds?limit=172&page=0`, {
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const breeds = await response.json();
  return breeds;
}

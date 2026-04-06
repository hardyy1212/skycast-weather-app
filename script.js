const API_KEY = "2e702efb3c924f85c281abba97d77b11";

const els = {
  input: document.getElementById("cityInput"),
  search: document.getElementById("searchBtn"),
  geoloc: document.getElementById("locBtn"),
  status: document.getElementById("status"),
  card: document.getElementById("weatherCard"),
  city: document.getElementById("cityName"),
  updated: document.getElementById("updatedAt"),
  icon: document.getElementById("weatherIcon"),
  temp: document.getElementById("temperature"),
  desc: document.getElementById("description"),
  feels: document.getElementById("feelsLike"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
};

const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

function setStatus(msg = "") {
  els.status.textContent = msg;
}

function showError(msg) {
  setStatus("❌ " + msg);
  els.card.classList.add("hidden");
  els.card.setAttribute("aria-hidden", "true");
}

function showLoading(msg = "Fetching weather…") {
  setStatus("⏳ " + msg);
}

function kelvinToC(k) {
  return Math.round((k - 273.15) * 10) / 10;
}

// Fetch by city name (metric units to avoid manual conversion)
async function fetchWeatherByCity(city) {
  const url = `${ENDPOINT}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  return fetchWeather(url);
}

// Fetch by latitude/longitude
async function fetchWeatherByCoords(lat, lon) {
  const url = `${ENDPOINT}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return fetchWeather(url);
}

async function fetchWeather(url) {
  showLoading();
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error("City not found.");
      throw new Error("Failed to fetch weather. Try again.");
    }
    const data = await res.json();
    updateUI(data);
    setStatus(""); // clear status
  } catch (err) {
    showError(err.message);
    console.error(err);
  }
}

function updateUI(data) {
  els.card.classList.remove("hidden");
  els.card.setAttribute("aria-hidden", "false");

  const name = `${data.name}, ${data.sys?.country ?? ""}`.trim();
  els.city.textContent = name;
  const updated = new Date(data.dt * 1000);
  els.updated.textContent = `Updated ${updated.toLocaleString()}`;

  els.temp.textContent = `🌡️ ${Math.round(data.main.temp)}°C`;
  els.desc.textContent = data.weather?.[0]?.description ?? "—";
  els.feels.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
  els.humidity.textContent = `Humidity: ${data.main.humidity}%`;
  els.wind.textContent = `Wind: ${Math.round(data.wind.speed)} m/s`;

  const iconCode = data.weather?.[0]?.icon;
  if (iconCode) {
    els.icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    els.icon.alt = data.weather?.[0]?.main ?? "Weather icon";
  } else {
    els.icon.removeAttribute("src");
    els.icon.alt = "";
  }
}

// Event handlers
els.search.addEventListener("click", () => {
  const city = els.input.value.trim();
  if (!city) return showError("Please enter a city.");
  fetchWeatherByCity(city);
});

// Enter key triggers search
els.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    els.search.click();
  }
});

// Geolocation button
els.geoloc.addEventListener("click", () => {
  if (!navigator.geolocation) return showError("Geolocation is not supported by your browser.");
  showLoading("Getting your location…");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (err) => {
      console.error(err);
      showError("Unable to get your location. Please enter a city.");
    },
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
  );
});

// Optional: fetch a default city on first load (uncomment to use)
// fetchWeatherByCity("Jaipur");

# SkyCast – Weather App (Free OpenWeather API)

A simple, elegant weather web app you can finish in a week and showcase on LinkedIn & your resume.

## ✨ Features
- Search weather by city (metric °C)
- Use your current location (Geolocation API)
- Shows temperature, feels-like, humidity, wind, and icon
- Accessible, responsive UI with a clean design
- Pure HTML/CSS/JS – deploy anywhere

## 🧰 Tech Stack
- HTML, CSS, JavaScript (no frameworks)
- OpenWeather Free API (Current Weather endpoint)

## 🔑 Get Your Free API Key
1. Create an account at https://openweathermap.org/api
2. Go to **My API keys** and copy your key
3. Open `script.js` and replace `YOUR_API_KEY` with your key

> Free tier is enough for this project. Rate limits are generous for personal use.

## ▶️ Run Locally
1. Download or clone this folder
2. Open `index.html` in your browser (double click)
3. Type a city (e.g., *Jaipur*) and click **Search**
4. Or click **Use my location** and allow geolocation

> Tip: If your browser blocks geolocation for `file://`, serve locally with any static server,
> e.g., using Python: `python -m http.server 5500` (then open http://localhost:5500).

## 🚀 Deploy (Netlify or Vercel)
- **Netlify**: Drag-drop this folder into the Netlify dashboard, or connect a Git repo
- **Vercel**: New Project → Import from Git → Deploy
- This is a static site (no build step needed).

## 🔒 About API Key Security
For learning projects, keeping the key in the frontend is acceptable.
For production, you should proxy API calls through a server to keep the key secret.

## 🧩 Stretch Ideas (Optional)
- Unit toggle °C/°F
- 5-day forecast (OpenWeather 5-day/3-hour endpoint)
- Search suggestions / debounce
- Dark mode toggle
- Save last searched city in localStorage

## 🧑‍💻 Author
Built for learning and fast portfolio building. Have fun!
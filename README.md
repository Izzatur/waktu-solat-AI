# Waktu Solat Malaysia 🕌

A responsive web app that displays daily Islamic prayer times for all zones in Malaysia.
Hosted on GitHub Pages — no server required.

🔗 **Live Demo:** [https://izzatur.github.io/waktu-solat](https://izzatur.github.io/waktu-solat)

## Features

- 🕐 **Live clock** – real-time display of current time and date
- 📍 **Auto location detection** – uses browser geolocation + OpenStreetMap reverse geocoding to find your Malaysian prayer zone automatically
- 🗺️ **Manual zone picker** – choose any of the 60+ official prayer zones in Malaysia, grouped by state
- ⏱️ **Countdown timer** – shows time remaining to the next prayer (Subuh, Zohor, Asar, Maghrib, Isyak)
- 🌓 **Past/next prayer highlight** – past prayers are dimmed; the next prayer is highlighted
- 💾 **Zone persistence** – remembers your last selected zone via localStorage
- 📱 **Fully responsive** – works on mobile, tablet, and desktop

## Data Source

Prayer times are fetched from the official Malaysian government API:
**[e-solat.gov.my](https://www.e-solat.gov.my/)**

## Usage

### Option 1 – Live site (no installation needed)

Open the app directly in your browser:
👉 [https://izzatur.github.io/waktu-solat](https://izzatur.github.io/waktu-solat)

### Option 2 – Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Izzatur/waktu-solat-AI.git
   ```
2. Open `index.html` in any modern browser — no build step or server required.

## Zones Covered

All 60+ official JAKIM prayer zones across:
Johor · Kedah · Kelantan · Melaka · Negeri Sembilan · Pahang ·
Pulau Pinang · Perak · Perlis · Sabah · Sarawak · Selangor ·
Terengganu · W.P. Kuala Lumpur · W.P. Labuan

## Tech Stack

- Plain HTML, CSS, and JavaScript (no build tools or frameworks)
- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) for reverse geocoding
- [corsproxy.io](https://corsproxy.io/) as CORS fallback for the e-solat API

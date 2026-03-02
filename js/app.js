/**
 * Waktu Solat Malaysia — Main Application
 * Fetches prayer times from e-solat.gov.my API
 */

const API_BASE = "https://www.e-solat.gov.my/index.php";
const API_STATUS_OK = "OK!";
// CORS proxy used because e-solat.gov.my does not send CORS headers
const CORS_PROXY = "https://corsproxy.io/?";

const PRAYER_NAMES = [
  { key: "imsak",   label: "Imsak",   icon: "🌙" },
  { key: "fajr",    label: "Subuh",   icon: "🌄" },
  { key: "syuruk",  label: "Syuruk",  icon: "🌅" },
  { key: "dhuhr",   label: "Zohor",   icon: "☀️"  },
  { key: "asr",     label: "Asar",    icon: "🌤️" },
  { key: "maghrib", label: "Maghrib", icon: "🌇" },
  { key: "isha",    label: "Isyak",   icon: "🌃" },
];

// Prayers that count as "prayer time" for next-prayer detection (exclude imsak/syuruk)
const COUNTABLE_PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

let countdownInterval = null;
let clockInterval = null;
let currentZone = null;
let todayPrayers = null;

// ── Initialisation ────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  buildZoneSelect();
  startClock();
  loadSavedZone();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById("detectBtn").addEventListener("click", detectLocation);
  document.getElementById("zoneSelect").addEventListener("change", onZoneChange);
}

// ── Zone Select ───────────────────────────────────────────────────────────────

function buildZoneSelect() {
  const select = document.getElementById("zoneSelect");
  const grouped = getZonesByState();

  for (const [state, zones] of Object.entries(grouped)) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = state;
    for (const z of zones) {
      const opt = document.createElement("option");
      opt.value = z.code;
      opt.textContent = `${z.code} — ${z.label}`;
      optgroup.appendChild(opt);
    }
    select.appendChild(optgroup);
  }
}

function onZoneChange() {
  const code = document.getElementById("zoneSelect").value;
  if (code) {
    saveZone(code);
    fetchPrayerTimes(code);
  }
}

// ── Persistence ───────────────────────────────────────────────────────────────

function saveZone(code) {
  try { localStorage.setItem("waktuSolatZone", code); } catch (_) {}
}

function loadSavedZone() {
  try {
    const saved = localStorage.getItem("waktuSolatZone");
    if (saved) {
      document.getElementById("zoneSelect").value = saved;
      fetchPrayerTimes(saved);
      return;
    }
  } catch (_) {}
  // Default to WLY01 (KL)
  document.getElementById("zoneSelect").value = "WLY01";
  fetchPrayerTimes("WLY01");
}

// ── Geolocation ───────────────────────────────────────────────────────────────

function detectLocation() {
  const btn = document.getElementById("detectBtn");
  btn.textContent = "⏳ Mengesan lokasi…";
  btn.disabled = true;

  if (!navigator.geolocation) {
    showError("Pelayar anda tidak menyokong geolocation.");
    resetDetectBtn();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const state = await reverseGeocode(latitude, longitude);
        const zone = getZoneByState(state);
        document.getElementById("zoneSelect").value = zone;
        saveZone(zone);
        fetchPrayerTimes(zone);
      } catch (err) {
        showError("Gagal mendapatkan lokasi. Sila pilih zon secara manual.");
      } finally {
        resetDetectBtn();
      }
    },
    () => {
      showError("Kebenaran lokasi ditolak. Sila pilih zon secara manual.");
      resetDetectBtn();
    },
    { timeout: 10000 }
  );
}

function resetDetectBtn() {
  const btn = document.getElementById("detectBtn");
  btn.textContent = "📍 Kesan Lokasi";
  btn.disabled = false;
}

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=ms`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "ms,en" }
  });
  if (!res.ok) throw new Error("Nominatim error");
  const data = await res.json();
  const addr = data.address || {};
  return (
    addr.state ||
    addr.county ||
    addr.city ||
    addr.town ||
    ""
  );
}

// ── API Fetch ─────────────────────────────────────────────────────────────────

async function fetchPrayerTimes(zone) {
  currentZone = zone;
  showLoading(true);
  hideError();

  const apiUrl = `${API_BASE}?r=esolatApi/takwimsolat&period=today&zone=${zone}`;

  let data = null;
  try {
    // Try direct first
    data = await fetchJSON(apiUrl);
  } catch (_) {
    try {
      // Fallback to CORS proxy
      data = await fetchJSON(CORS_PROXY + encodeURIComponent(apiUrl));
    } catch (err) {
      showLoading(false);
      showError("Gagal mendapatkan waktu solat. Sila cuba semula.");
      return;
    }
  }

  showLoading(false);

  if (!data || data.status !== API_STATUS_OK || !data.prayerTime || !data.prayerTime.length) {
    showError("Data waktu solat tidak tersedia untuk zon ini.");
    return;
  }

  todayPrayers = data.prayerTime[0];
  renderPrayerTimes(zone, todayPrayers);
  startCountdown();
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderPrayerTimes(zone, prayers) {
  // Zone label
  const zoneObj = ZONES.find(z => z.code === zone);
  document.getElementById("zoneName").textContent =
    zoneObj ? `${zoneObj.code} — ${zoneObj.label}` : zone;
  document.getElementById("prayerDate").textContent = formatDate(prayers.date);

  // Cards
  const container = document.getElementById("prayerCards");
  container.innerHTML = "";

  for (const p of PRAYER_NAMES) {
    const timeStr = prayers[p.key];
    if (!timeStr) continue;

    const card = document.createElement("div");
    card.className = "prayer-card";
    card.id = `card-${p.key}`;

    card.innerHTML = `
      <span class="prayer-icon">${p.icon}</span>
      <span class="prayer-label">${p.label}</span>
      <span class="prayer-time">${timeStr}</span>
    `;
    container.appendChild(card);
  }

  document.getElementById("resultsSection").style.display = "block";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("ms-MY", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

// ── Clock ─────────────────────────────────────────────────────────────────────

function startClock() {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString("ms-MY", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });
  document.getElementById("todayDate").textContent = now.toLocaleDateString("ms-MY", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

// ── Countdown ─────────────────────────────────────────────────────────────────

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  if (!todayPrayers) return;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let nextPrayer = null;
  let nextMinutes = Infinity;

  // Remove highlighting from all cards
  document.querySelectorAll(".prayer-card").forEach(c => {
    c.classList.remove("next-prayer", "past-prayer");
  });

  for (const p of PRAYER_NAMES) {
    const timeStr = todayPrayers[p.key];
    if (!timeStr) continue;

    const [h, m] = timeStr.split(":").map(Number);
    const pMinutes = h * 60 + m;
    const card = document.getElementById(`card-${p.key}`);

    if (pMinutes < nowMinutes) {
      if (card) card.classList.add("past-prayer");
    } else if (pMinutes < nextMinutes && COUNTABLE_PRAYERS.includes(p.key)) {
      nextMinutes = pMinutes;
      nextPrayer = p;
    }
  }

  if (nextPrayer) {
    const card = document.getElementById(`card-${nextPrayer.key}`);
    if (card) {
      card.classList.remove("past-prayer");
      card.classList.add("next-prayer");
    }

    const secsRemaining = Math.max(0, Math.round((nextMinutes - nowMinutes) * 60));
    const h = Math.floor(secsRemaining / 3600);
    const m = Math.floor((secsRemaining % 3600) / 60);
    const s = secsRemaining % 60;
    const pad = n => String(n).padStart(2, "0");

    document.getElementById("nextPrayerName").textContent = nextPrayer.label;
    document.getElementById("countdown").textContent =
      h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    document.getElementById("countdownSection").style.display = "block";
  } else {
    document.getElementById("countdownSection").style.display = "none";
  }
}

// ── UI Helpers ────────────────────────────────────────────────────────────────

function showLoading(visible) {
  document.getElementById("loadingSpinner").style.display = visible ? "flex" : "none";
  if (visible) {
    document.getElementById("resultsSection").style.display = "none";
    document.getElementById("countdownSection").style.display = "none";
  }
}

function showError(msg) {
  const el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.style.display = "block";
}

function hideError() {
  document.getElementById("errorMsg").style.display = "none";
}

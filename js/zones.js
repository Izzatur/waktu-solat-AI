/**
 * Malaysia Prayer Zones Data
 * Source: e-solat.gov.my
 */

const ZONES = [
  // W.P. Federal Territories
  { code: "WLY01", label: "W.P. Kuala Lumpur & Putrajaya", state: "W.P." },
  { code: "WLY02", label: "W.P. Labuan", state: "W.P." },

  // Johor
  { code: "JHR01", label: "Pulau Aur & Pulau Pemanggil", state: "Johor" },
  { code: "JHR02", label: "Johor Bahru, Kota Tinggi, Mersing", state: "Johor" },
  { code: "JHR03", label: "Kluang, Pontian", state: "Johor" },
  { code: "JHR04", label: "Batu Pahat, Muar, Segamat, Gemas", state: "Johor" },

  // Kedah
  { code: "KDH01", label: "Kota Setar, Kubang Pasu, Pokok Sena", state: "Kedah" },
  { code: "KDH02", label: "Kuala Muda, Yan, Pendang", state: "Kedah" },
  { code: "KDH03", label: "Padang Terap, Sik", state: "Kedah" },
  { code: "KDH04", label: "Baling", state: "Kedah" },
  { code: "KDH05", label: "Bandar Baharu, Kulim", state: "Kedah" },
  { code: "KDH06", label: "Langkawi", state: "Kedah" },
  { code: "KDH07", label: "Puncak Gunung Jerai", state: "Kedah" },

  // Kelantan
  { code: "KLN01", label: "Kota Bharu, Bachok, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai", state: "Kelantan" },
  { code: "KLN02", label: "Gua Musang", state: "Kelantan" },
  { code: "KLN03", label: "Jeli, Ulu Kelantan", state: "Kelantan" },

  // Melaka
  { code: "MLK01", label: "Seluruh Negeri Melaka", state: "Melaka" },

  // Negeri Sembilan
  { code: "NGS01", label: "Jempol, Jelebu", state: "Negeri Sembilan" },
  { code: "NGS02", label: "Seremban, Port Dickson, Tampin, Kuala Pilah, Rembau", state: "Negeri Sembilan" },

  // Pahang
  { code: "PHG01", label: "Pulau Tioman", state: "Pahang" },
  { code: "PHG02", label: "Rompin", state: "Pahang" },
  { code: "PHG03", label: "Pekan, Kuantan, Muadzam Shah", state: "Pahang" },
  { code: "PHG04", label: "Temerloh, Maran", state: "Pahang" },
  { code: "PHG05", label: "Bera", state: "Pahang" },
  { code: "PHG06", label: "Jerantut, Raub, Lipis, Cameron Highlands, Genting Sempah", state: "Pahang" },
  { code: "PHG07", label: "Bentong, Bukit Tinggi, Genting Highlands", state: "Pahang" },
  { code: "PHG08", label: "Brinchang, Cameron Highlands", state: "Pahang" },

  // Pulau Pinang
  { code: "PNG01", label: "Seluruh Negeri Pulau Pinang", state: "Pulau Pinang" },

  // Perak
  { code: "PRK01", label: "Tapah, Slim River, Tanjong Malim", state: "Perak" },
  { code: "PRK02", label: "Kuala Kangsar, Ipoh, Sri Iskandar, Manjung", state: "Perak" },
  { code: "PRK03", label: "Lenggong, Pengkalan Hulu, Grik", state: "Perak" },
  { code: "PRK04", label: "Temengor, Belum", state: "Perak" },
  { code: "PRK05", label: "Kerian, Sungai Siput", state: "Perak" },
  { code: "PRK06", label: "Bagan Datoh", state: "Perak" },
  { code: "PRK07", label: "Teluk Intan, Bagan Datoh", state: "Perak" },
  { code: "PRK08", label: "Hilir Perak, Lumut, Sitiawan, Pulau Pangkor", state: "Perak" },

  // Perlis
  { code: "PLS01", label: "Seluruh Negeri Perlis", state: "Perlis" },

  // Sabah
  { code: "SBH01", label: "Beaufort, Kuala Penyu, Papar, Tuaran, Telupid", state: "Sabah" },
  { code: "SBH02", label: "Sandakan, Kinabatangan", state: "Sabah" },
  { code: "SBH03", label: "Lahad Datu, Semporna", state: "Sabah" },
  { code: "SBH04", label: "Tawau, Kunak", state: "Sabah" },
  { code: "SBH05", label: "Keningau, Tambunan", state: "Sabah" },
  { code: "SBH06", label: "Kota Belud, Kota Marudu, Pitas, Ranau", state: "Sabah" },
  { code: "SBH07", label: "Kota Kinabalu, Penampang, Putatan", state: "Sabah" },

  // Sarawak
  { code: "SWK01", label: "Limbang, Lawas, Sundar, Trusan", state: "Sarawak" },
  { code: "SWK02", label: "Miri, Niah, Bekenu, Sibuti, Marudi", state: "Sarawak" },
  { code: "SWK03", label: "Pusa, Beluru, Subis, Tatau, Sebauh, Bintulu", state: "Sarawak" },
  { code: "SWK04", label: "Sibu, Mukah, Dalat, Song, Kanowit, Tanjung Manis", state: "Sarawak" },
  { code: "SWK05", label: "Kapit, Belaga, Pakan", state: "Sarawak" },
  { code: "SWK06", label: "Sarikei, Matu, Julau, Rajang, Daro, Bintangor", state: "Sarawak" },
  { code: "SWK07", label: "Serian, Simunjan, Samarahan, Sebuyau, Meludam", state: "Sarawak" },
  { code: "SWK08", label: "Kuching, Bau, Lundu, Sematan", state: "Sarawak" },
  { code: "SWK09", label: "Sri Aman, Lubok Antu, Betong, Saratok, Roban, Debak", state: "Sarawak" },

  // Selangor
  { code: "SGR01", label: "Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, Shah Alam", state: "Selangor" },
  { code: "SGR02", label: "Kuala Selangor, Sabak Bernam", state: "Selangor" },
  { code: "SGR03", label: "Klang, Kuala Langat", state: "Selangor" },

  // Terengganu
  { code: "TRG01", label: "Kuala Terengganu, Marang, Kuala Nerus", state: "Terengganu" },
  { code: "TRG02", label: "Besut, Setiu", state: "Terengganu" },
  { code: "TRG03", label: "Hulu Terengganu", state: "Terengganu" },
  { code: "TRG04", label: "Dungun, Kemaman", state: "Terengganu" },
];

/**
 * Maps a state name (from reverse geocode) to a default zone code.
 * Used when automatic location detection is successful.
 */
const STATE_DEFAULT_ZONE = {
  "kuala lumpur": "WLY01",
  "putrajaya": "WLY01",
  "labuan": "WLY02",
  "johor": "JHR02",
  "kedah": "KDH01",
  "kelantan": "KLN01",
  "melaka": "MLK01",
  "malacca": "MLK01",
  "negeri sembilan": "NGS02",
  "pahang": "PHG03",
  "pulau pinang": "PNG01",
  "penang": "PNG01",
  "perak": "PRK02",
  "perlis": "PLS01",
  "sabah": "SBH07",
  "sarawak": "SWK08",
  "selangor": "SGR01",
  "terengganu": "TRG01",
  "terengganu darul iman": "TRG01",
};

/**
 * Returns the zone code for a given state name (case-insensitive).
 * Falls back to WLY01 if state is not found.
 */
function getZoneByState(stateName) {
  if (!stateName) return "WLY01";
  const key = stateName.toLowerCase().trim();
  // Exact match first
  if (STATE_DEFAULT_ZONE[key]) return STATE_DEFAULT_ZONE[key];
  // Then check if the returned state name contains a known key
  // e.g. "Selangor Darul Ehsan" → matches "selangor"
  for (const [k, v] of Object.entries(STATE_DEFAULT_ZONE)) {
    if (key.includes(k)) return v;
  }
  return "WLY01";
}

/**
 * Returns zones grouped by state for the dropdown.
 */
function getZonesByState() {
  const grouped = {};
  for (const zone of ZONES) {
    if (!grouped[zone.state]) grouped[zone.state] = [];
    grouped[zone.state].push(zone);
  }
  return grouped;
}

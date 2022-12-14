// Areas that we can query
export const areas = [
  "Ang Mo Kio",
  "Bedok",
  "Bishan",
  "Boon Lay",
  "Bukit Batok",
  "Bukit Merah",
  "Bukit Panjang",
  "Bukit Timah",
  "Central Water Catchment",
  "Changi",
  "Choa Chu Kang",
  "Clementi",
  "City",
  "Geylang",
  "Hougang",
  "Jalan Bahar",
  "Jurong East",
  "Jurong Island",
  "Jurong West",
  "Kallang",
  "Lim Chu Kang",
  "Mandai",
  "Marine Parade",
  "Novena",
  "Pasir Ris",
  "Paya Lebar",
  "Pioneer",
  "Pulau Tekong",
  "Pulau Ubin",
  "Punggol",
  "Queenstown",
  "Seletar",
  "Sembawang",
  "Sengkang",
  "Sentosa",
  "Serangoon",
  "Southern Islands",
  "Sungei Kadut",
  "Tampines",
  "Tanglin",
  "Tengah",
  "Toa Payoh",
  "Tuas",
  "Western Islands",
  "Western Water Catchment",
  "Woodlands",
  "Yishun",
];

// Have the data that API queries these locations
export default async function handler(req, res) {
  return res.status(200).json(areas);
}

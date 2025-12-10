const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
const playToggle = document.getElementById('playToggle');
const stepBtn = document.getElementById('step');
const resetBtn = document.getElementById('reset');
const yearEl = document.getElementById('year');
const eraLabelEl = document.getElementById('eraLabel');
const dominantEl = document.getElementById('dominantCulture');
const populationEl = document.getElementById('population');
const logEl = document.getElementById('log');
const clearLogBtn = document.getElementById('clearLog');
const speedSlider = document.getElementById('speed');
const scoreRows = document.getElementById('scoreRows');
const tooltip = document.getElementById('tooltip');
const eraSelect = document.getElementById('eraSelect');
const countrySelect = document.getElementById('countrySelect');
const playerCountryLabel = document.getElementById('playerCountryLabel');

const CULTURE_PALETTE = new Map();
const provincePaths = new Map();
const provinceState = new Map();

let year = 2025;
let timer = null;
let currentEra = '2025';
let playerCulture = '';

const ERAS = {
  1444: { label: 'Ère des grands royaumes', startYear: 1444 },
  1789: { label: 'Révolutions atlantiques', startYear: 1789 },
  1914: { label: 'Monde en armes', startYear: 1914 },
  1945: { label: 'Reconstruction', startYear: 1945 },
  1991: { label: 'Nouvel ordre', startYear: 1991 },
  2025: { label: 'Monde contemporain', startYear: 2025 },
};

const PROVINCES = [
  { id: 'portugal', name: 'Portugal', polygon: [[0.33, 0.48], [0.35, 0.48], [0.36, 0.56], [0.34, 0.56]], cultures: { 1444: 'Portugal', 1789: 'Portugal', 1914: 'Portugal', 1945: 'Portugal', 1991: 'Portugal', 2025: 'Portugal' } },
  { id: 'castile', name: 'Castille', polygon: [[0.35, 0.46], [0.39, 0.46], [0.39, 0.54], [0.35, 0.54]], cultures: { 1444: 'Castille', 1789: 'Espagne', 1914: 'Espagne', 1945: 'Espagne', 1991: 'Espagne', 2025: 'Espagne' } },
  { id: 'aragon', name: 'Aragon', polygon: [[0.38, 0.46], [0.42, 0.46], [0.42, 0.54], [0.38, 0.54]], cultures: { 1444: 'Aragon', 1789: 'Espagne', 1914: 'Espagne', 1945: 'Espagne', 1991: 'Espagne', 2025: 'Espagne' } },
  { id: 'france', name: 'France', polygon: [[0.36, 0.40], [0.42, 0.40], [0.42, 0.48], [0.36, 0.48]], cultures: { 1444: 'France', 1789: 'France', 1914: 'France', 1945: 'France', 1991: 'France', 2025: 'France' } },
  { id: 'burgundy', name: 'Bourgogne', polygon: [[0.40, 0.38], [0.44, 0.38], [0.44, 0.46], [0.40, 0.46]], cultures: { 1444: 'Bourgogne', 1789: 'France', 1914: 'France', 1945: 'France', 1991: 'France', 2025: 'France' } },
  { id: 'italy', name: 'Italie', polygon: [[0.42, 0.46], [0.46, 0.46], [0.46, 0.54], [0.42, 0.54]], cultures: { 1444: 'États italiens', 1789: 'États italiens', 1914: 'Italie', 1945: 'Italie', 1991: 'Italie', 2025: 'Italie' } },
  { id: 'england', name: 'Angleterre', polygon: [[0.34, 0.32], [0.38, 0.32], [0.38, 0.40], [0.34, 0.40]], cultures: { 1444: 'Angleterre', 1789: 'Grande-Bretagne', 1914: 'Royaume-Uni', 1945: 'Royaume-Uni', 1991: 'Royaume-Uni', 2025: 'Royaume-Uni' } },
  { id: 'scotland', name: 'Écosse', polygon: [[0.34, 0.26], [0.38, 0.26], [0.38, 0.32], [0.34, 0.32]], cultures: { 1444: 'Écosse', 1789: 'Grande-Bretagne', 1914: 'Royaume-Uni', 1945: 'Royaume-Uni', 1991: 'Royaume-Uni', 2025: 'Royaume-Uni' } },
  { id: 'ireland', name: 'Irlande', polygon: [[0.32, 0.30], [0.34, 0.30], [0.34, 0.38], [0.32, 0.38]], cultures: { 1444: 'Irlande', 1789: 'Irlande', 1914: 'Royaume-Uni', 1945: 'Irlande', 1991: 'Irlande', 2025: 'Irlande' } },
  { id: 'low_countries', name: 'Pays-Bas', polygon: [[0.40, 0.34], [0.44, 0.34], [0.44, 0.40], [0.40, 0.40]], cultures: { 1444: 'Flandre', 1789: 'Provinces-Unies', 1914: 'Belgique et Pays-Bas', 1945: 'Benelux', 1991: 'Belgique et Pays-Bas', 2025: 'Belgique et Pays-Bas' } },
  { id: 'hansa', name: 'Hanse', polygon: [[0.44, 0.30], [0.48, 0.30], [0.48, 0.36], [0.44, 0.36]], cultures: { 1444: 'Ligue hanséatique', 1789: 'États allemands', 1914: 'Allemagne', 1945: 'Allemagne', 1991: 'Allemagne', 2025: 'Allemagne' } },
  { id: 'bohemia', name: 'Bohême', polygon: [[0.46, 0.36], [0.50, 0.36], [0.50, 0.42], [0.46, 0.42]], cultures: { 1444: 'Bohême', 1789: 'Autriche', 1914: 'Autriche-Hongrie', 1945: 'Tchécoslovaquie', 1991: 'République tchèque', 2025: 'Tchéquie' } },
  { id: 'austria', name: 'Autriche', polygon: [[0.48, 0.40], [0.52, 0.40], [0.52, 0.46], [0.48, 0.46]], cultures: { 1444: 'Autriche', 1789: 'Autriche', 1914: 'Autriche-Hongrie', 1945: 'Autriche', 1991: 'Autriche', 2025: 'Autriche' } },
  { id: 'hungary', name: 'Hongrie', polygon: [[0.52, 0.40], [0.56, 0.40], [0.56, 0.46], [0.52, 0.46]], cultures: { 1444: 'Hongrie', 1789: 'Hongrie', 1914: 'Autriche-Hongrie', 1945: 'Hongrie', 1991: 'Hongrie', 2025: 'Hongrie' } },
  { id: 'poland', name: 'Pologne', polygon: [[0.50, 0.34], [0.56, 0.34], [0.56, 0.40], [0.50, 0.40]], cultures: { 1444: 'Pologne', 1789: 'Pologne-Lituanie', 1914: 'Pologne', 1945: 'Pologne', 1991: 'Pologne', 2025: 'Pologne' } },
  { id: 'lithuania', name: 'Lituanie', polygon: [[0.54, 0.28], [0.58, 0.28], [0.58, 0.36], [0.54, 0.36]], cultures: { 1444: 'Lituanie', 1789: 'Pologne-Lituanie', 1914: 'Russie impériale', 1945: 'URSS', 1991: 'Lituanie', 2025: 'Lituanie' } },
  { id: 'teutonic', name: 'Ordre Teutonique', polygon: [[0.50, 0.28], [0.54, 0.28], [0.54, 0.34], [0.50, 0.34]], cultures: { 1444: 'Ordre Teutonique', 1789: 'Prusse', 1914: 'Allemagne', 1945: 'Pologne', 1991: 'Pologne', 2025: 'Pologne' } },
  { id: 'denmark', name: 'Danemark', polygon: [[0.44, 0.24], [0.48, 0.24], [0.48, 0.30], [0.44, 0.30]], cultures: { 1444: 'Danemark', 1789: 'Danemark', 1914: 'Danemark', 1945: 'Danemark', 1991: 'Danemark', 2025: 'Danemark' } },
  { id: 'sweden', name: 'Suède', polygon: [[0.46, 0.18], [0.50, 0.18], [0.50, 0.24], [0.46, 0.24]], cultures: { 1444: 'Suède', 1789: 'Suède', 1914: 'Suède', 1945: 'Suède', 1991: 'Suède', 2025: 'Suède' } },
  { id: 'norway', name: 'Norvège', polygon: [[0.42, 0.18], [0.46, 0.18], [0.46, 0.26], [0.42, 0.26]], cultures: { 1444: 'Norvège', 1789: 'Danemark-Norvège', 1914: 'Norvège', 1945: 'Norvège', 1991: 'Norvège', 2025: 'Norvège' } },
  { id: 'novgorod', name: 'Novgorod', polygon: [[0.52, 0.22], [0.58, 0.22], [0.58, 0.30], [0.52, 0.30]], cultures: { 1444: 'Novgorod', 1789: 'Russie', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Russie', 2025: 'Russie' } },
  { id: 'muscovy', name: 'Moscovie', polygon: [[0.56, 0.24], [0.62, 0.24], [0.62, 0.34], [0.56, 0.34]], cultures: { 1444: 'Moscovie', 1789: 'Empire russe', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Russie', 2025: 'Russie' } },
  { id: 'kazan', name: 'Kazan', polygon: [[0.60, 0.28], [0.66, 0.28], [0.66, 0.36], [0.60, 0.36]], cultures: { 1444: 'Kazan', 1789: 'Empire russe', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Russie', 2025: 'Russie' } },
  { id: 'crimea', name: 'Crimée', polygon: [[0.56, 0.36], [0.60, 0.36], [0.60, 0.42], [0.56, 0.42]], cultures: { 1444: 'Horde de Crimée', 1789: 'Empire ottoman', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Ukraine', 2025: 'Ukraine' } },
  { id: 'ottomans', name: 'Empire ottoman', polygon: [[0.54, 0.42], [0.60, 0.42], [0.60, 0.48], [0.54, 0.48]], cultures: { 1444: 'Ottomans', 1789: 'Empire ottoman', 1914: 'Empire ottoman', 1945: 'Turquie', 1991: 'Turquie', 2025: 'Turquie' } },
  { id: 'greece', name: 'Grèce', polygon: [[0.52, 0.44], [0.54, 0.44], [0.54, 0.52], [0.52, 0.52]], cultures: { 1444: 'Byzance', 1789: 'Empire ottoman', 1914: 'Grèce', 1945: 'Grèce', 1991: 'Grèce', 2025: 'Grèce' } },
  { id: 'serbia', name: 'Serbie', polygon: [[0.50, 0.44], [0.52, 0.44], [0.52, 0.50], [0.50, 0.50]], cultures: { 1444: 'Serbie', 1789: 'Empire ottoman', 1914: 'Serbie', 1945: 'Yougoslavie', 1991: 'Serbie', 2025: 'Serbie' } },
  { id: 'hungary_south', name: 'Croatie', polygon: [[0.48, 0.46], [0.50, 0.46], [0.50, 0.52], [0.48, 0.52]], cultures: { 1444: 'Croatie', 1789: 'Habsbourg', 1914: 'Autriche-Hongrie', 1945: 'Yougoslavie', 1991: 'Croatie', 2025: 'Croatie' } },
  { id: 'wallachia', name: 'Valachie', polygon: [[0.52, 0.48], [0.54, 0.48], [0.54, 0.54], [0.52, 0.54]], cultures: { 1444: 'Valachie', 1789: 'Empire ottoman', 1914: 'Roumanie', 1945: 'Roumanie', 1991: 'Roumanie', 2025: 'Roumanie' } },
  { id: 'egypt', name: 'Égypte', polygon: [[0.56, 0.54], [0.60, 0.54], [0.60, 0.62], [0.56, 0.62]], cultures: { 1444: 'Mamelouks', 1789: 'Empire ottoman', 1914: 'Empire ottoman', 1945: 'Égypte', 1991: 'Égypte', 2025: 'Égypte' } },
  { id: 'maghreb', name: 'Maghreb', polygon: [[0.40, 0.56], [0.48, 0.56], [0.48, 0.62], [0.40, 0.62]], cultures: { 1444: 'Maroc', 1789: 'Maroc', 1914: 'Protectorats', 1945: 'Maroc & Algérie', 1991: 'Maroc & Algérie', 2025: 'Maghreb' } },
  { id: 'sahel', name: 'Sahel', polygon: [[0.42, 0.62], [0.50, 0.62], [0.50, 0.68], [0.42, 0.68]], cultures: { 1444: 'Mali', 1789: 'Mali', 1914: 'Colonies sahéliennes', 1945: 'Afrique sahélienne', 1991: 'Sahel', 2025: 'Sahel' } },
  { id: 'ethiopia', name: 'Éthiopie', polygon: [[0.54, 0.60], [0.58, 0.60], [0.58, 0.70], [0.54, 0.70]], cultures: { 1444: 'Éthiopie', 1789: 'Éthiopie', 1914: 'Éthiopie', 1945: 'Éthiopie', 1991: 'Éthiopie', 2025: 'Éthiopie' } },
  { id: 'central_africa', name: 'Afrique centrale', polygon: [[0.50, 0.64], [0.54, 0.64], [0.54, 0.72], [0.50, 0.72]], cultures: { 1444: 'Royaumes bantous', 1789: 'Royaumes bantous', 1914: 'Afrique équatoriale', 1945: 'États centrafricains', 1991: 'États centrafricains', 2025: 'Afrique centrale' } },
  { id: 'south_africa', name: 'Afrique australe', polygon: [[0.50, 0.72], [0.56, 0.72], [0.56, 0.82], [0.50, 0.82]], cultures: { 1444: 'Chefferies du sud', 1789: 'Chefferies du sud', 1914: 'Union sud-africaine', 1945: 'Afrique du Sud', 1991: 'Afrique australe', 2025: 'Afrique australe' } },
  { id: 'arabia', name: 'Arabie', polygon: [[0.60, 0.50], [0.66, 0.50], [0.66, 0.60], [0.60, 0.60]], cultures: { 1444: 'Arabie', 1789: 'Arabie', 1914: 'Arabie', 1945: 'Arabie', 1991: 'Arabie', 2025: 'Arabie' } },
  { id: 'persia', name: 'Perse', polygon: [[0.64, 0.44], [0.70, 0.44], [0.70, 0.54], [0.64, 0.54]], cultures: { 1444: 'Timourides', 1789: 'Dynastie Kadjar', 1914: 'Perse', 1945: 'Iran', 1991: 'Iran', 2025: 'Iran' } },
  { id: 'mesopotamia', name: 'Mésopotamie', polygon: [[0.62, 0.48], [0.66, 0.48], [0.66, 0.58], [0.62, 0.58]], cultures: { 1444: 'Qara Qoyunlu', 1789: 'Empire ottoman', 1914: 'Empire ottoman', 1945: 'Irak', 1991: 'Irak', 2025: 'Irak' } },
  { id: 'caucasus', name: 'Caucase', polygon: [[0.60, 0.40], [0.64, 0.40], [0.64, 0.48], [0.60, 0.48]], cultures: { 1444: 'Géorgie', 1789: 'Khanats caucasiens', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Caucase du Sud', 2025: 'Caucase du Sud' } },
  { id: 'uzbek', name: 'Steppes', polygon: [[0.66, 0.32], [0.74, 0.32], [0.74, 0.42], [0.66, 0.42]], cultures: { 1444: 'Ouzbeks', 1789: 'Khanats', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Asie centrale', 2025: 'Asie centrale' } },
  { id: 'transoxiana', name: 'Transoxiane', polygon: [[0.68, 0.36], [0.76, 0.36], [0.76, 0.46], [0.68, 0.46]], cultures: { 1444: 'Transoxiane', 1789: 'Khanats', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Asie centrale', 2025: 'Asie centrale' } },
  { id: 'india_delhi', name: 'Delhi', polygon: [[0.70, 0.48], [0.76, 0.48], [0.76, 0.56], [0.70, 0.56]], cultures: { 1444: 'Sultanat de Delhi', 1789: 'Compagnie des Indes', 1914: 'Raj britannique', 1945: 'Inde', 1991: 'Inde', 2025: 'Inde' } },
  { id: 'india_bengal', name: 'Bengale', polygon: [[0.74, 0.50], [0.80, 0.50], [0.80, 0.58], [0.74, 0.58]], cultures: { 1444: 'Bengale', 1789: 'Compagnie des Indes', 1914: 'Raj britannique', 1945: 'Inde', 1991: 'Inde', 2025: 'Bangladesh' } },
  { id: 'deccan', name: 'Deccan', polygon: [[0.70, 0.56], [0.76, 0.56], [0.76, 0.64], [0.70, 0.64]], cultures: { 1444: 'Bahmanides', 1789: 'Marathes', 1914: 'Raj britannique', 1945: 'Inde', 1991: 'Inde', 2025: 'Inde' } },
  { id: 'vijayanagar', name: 'Vijayanagar', polygon: [[0.72, 0.64], [0.78, 0.64], [0.78, 0.70], [0.72, 0.70]], cultures: { 1444: 'Vijayanagar', 1789: 'Mysore', 1914: 'Raj britannique', 1945: 'Inde du Sud', 1991: 'Inde du Sud', 2025: 'Inde du Sud' } },
  { id: 'tibet', name: 'Tibet', polygon: [[0.76, 0.44], [0.82, 0.44], [0.82, 0.54], [0.76, 0.54]], cultures: { 1444: 'Tibet', 1789: 'Tibet', 1914: 'Tibet', 1945: 'Chine', 1991: 'Chine', 2025: 'Chine' } },
  { id: 'china', name: 'Chine', polygon: [[0.78, 0.38], [0.86, 0.38], [0.86, 0.50], [0.78, 0.50]], cultures: { 1444: 'Ming', 1789: 'Qing', 1914: 'République de Chine', 1945: 'Chine populaire', 1991: 'Chine', 2025: 'Chine' } },
  { id: 'manchuria', name: 'Mandchourie', polygon: [[0.82, 0.32], [0.88, 0.32], [0.88, 0.40], [0.82, 0.40]], cultures: { 1444: 'Mandchous', 1789: 'Mandchous', 1914: 'Mandchoukouo', 1945: 'Chine', 1991: 'Chine', 2025: 'Chine' } },
  { id: 'japan', name: 'Japon', polygon: [[0.88, 0.36], [0.92, 0.36], [0.92, 0.48], [0.88, 0.48]], cultures: { 1444: 'Daimyōs', 1789: 'Shogunat', 1914: 'Empire du Japon', 1945: 'Japon', 1991: 'Japon', 2025: 'Japon' } },
  { id: 'korea', name: 'Corée', polygon: [[0.86, 0.36], [0.90, 0.36], [0.90, 0.44], [0.86, 0.44]], cultures: { 1444: 'Joseon', 1789: 'Joseon', 1914: 'Corée', 1945: 'Corée', 1991: 'Corée', 2025: 'Corée' } },
  { id: 'mongolia', name: 'Mongolie', polygon: [[0.78, 0.32], [0.84, 0.32], [0.84, 0.40], [0.78, 0.40]], cultures: { 1444: 'Mongolie', 1789: 'Mongolie', 1914: 'Chine', 1945: 'Mongolie', 1991: 'Mongolie', 2025: 'Mongolie' } },
  { id: 'south_china', name: 'Chine du Sud', polygon: [[0.76, 0.52], [0.84, 0.52], [0.84, 0.60], [0.76, 0.60]], cultures: { 1444: 'Ming', 1789: 'Qing', 1914: 'République de Chine', 1945: 'Chine', 1991: 'Chine', 2025: 'Chine' } },
  { id: 'south_east_asia', name: 'Asie du Sud-Est', polygon: [[0.80, 0.58], [0.88, 0.58], [0.88, 0.68], [0.80, 0.68]], cultures: { 1444: 'Ayutthaya', 1789: 'Siam', 1914: 'Indochine', 1945: 'États d’Asie du Sud-Est', 1991: 'ASEAN', 2025: 'ASEAN' } },
  { id: 'indonesia', name: 'Insulinde', polygon: [[0.82, 0.66], [0.92, 0.66], [0.92, 0.74], [0.82, 0.74]], cultures: { 1444: 'Majapahit', 1789: 'Indes orientales', 1914: 'Indes orientales', 1945: 'Indonésie', 1991: 'Indonésie', 2025: 'Indonésie' } },
  { id: 'australia', name: 'Australie', polygon: [[0.86, 0.74], [0.96, 0.74], [0.96, 0.88], [0.86, 0.88]], cultures: { 1444: 'Terres australes', 1789: 'Colonies britanniques', 1914: 'Dominion australien', 1945: 'Australie', 1991: 'Australie', 2025: 'Australie' } },
  { id: 'siberia', name: 'Sibérie', polygon: [[0.64, 0.20], [0.76, 0.20], [0.76, 0.32], [0.64, 0.32]], cultures: { 1444: 'Sibérie', 1789: 'Empire russe', 1914: 'Empire russe', 1945: 'URSS', 1991: 'Russie', 2025: 'Russie' } },
  { id: 'arabian_sea', name: 'Golfe Persique', polygon: [[0.66, 0.54], [0.70, 0.54], [0.70, 0.60], [0.66, 0.60]], cultures: { 1444: 'Koweït & Oman', 1789: 'Émirats', 1914: 'Protectorats', 1945: 'Golfe', 1991: 'Golfe', 2025: 'Golfe' } },
  { id: 'anatolia', name: 'Anatolie centrale', polygon: [[0.58, 0.44], [0.62, 0.44], [0.62, 0.52], [0.58, 0.52]], cultures: { 1444: 'Anatolie', 1789: 'Empire ottoman', 1914: 'Empire ottoman', 1945: 'Turquie', 1991: 'Turquie', 2025: 'Turquie' } },
  { id: 'levant', name: 'Levant', polygon: [[0.60, 0.52], [0.64, 0.52], [0.64, 0.60], [0.60, 0.60]], cultures: { 1444: 'Mamelouks', 1789: 'Empire ottoman', 1914: 'Empire ottoman', 1945: 'États du Levant', 1991: 'Levant', 2025: 'Levant' } },
  { id: 'arabian_peninsula', name: 'Péninsule Arabique', polygon: [[0.62, 0.56], [0.68, 0.56], [0.68, 0.66], [0.62, 0.66]], cultures: { 1444: 'Arabie', 1789: 'Arabie', 1914: 'Arabie', 1945: 'Arabie Saoudite', 1991: 'Arabie Saoudite', 2025: 'Arabie Saoudite' } },
  { id: 'afghanistan', name: 'Afghanistan', polygon: [[0.68, 0.44], [0.72, 0.44], [0.72, 0.52], [0.68, 0.52]], cultures: { 1444: 'Afghanistan', 1789: 'Afghanistan', 1914: 'Afghanistan', 1945: 'Afghanistan', 1991: 'Afghanistan', 2025: 'Afghanistan' } },
  { id: 'balkh', name: 'Balkh', polygon: [[0.70, 0.42], [0.74, 0.42], [0.74, 0.48], [0.70, 0.48]], cultures: { 1444: 'Khorasan', 1789: 'Afghanistan', 1914: 'Afghanistan', 1945: 'Afghanistan', 1991: 'Afghanistan', 2025: 'Afghanistan' } },
  { id: 'mali', name: 'Mali', polygon: [[0.36, 0.58], [0.42, 0.58], [0.42, 0.66], [0.36, 0.66]], cultures: { 1444: 'Mali', 1789: 'Mali', 1914: 'Colonies françaises', 1945: 'Mali', 1991: 'Mali', 2025: 'Mali' } },
  { id: 'west_africa', name: 'Golfe de Guinée', polygon: [[0.38, 0.64], [0.46, 0.64], [0.46, 0.72], [0.38, 0.72]], cultures: { 1444: 'Songhaï', 1789: 'Royaumes côtiers', 1914: 'Colonies européennes', 1945: 'Afrique de l’Ouest', 1991: 'Afrique de l’Ouest', 2025: 'Afrique de l’Ouest' } },
  { id: 'canada', name: 'Canada', polygon: [[0.06, 0.26], [0.18, 0.26], [0.18, 0.34], [0.06, 0.34]], cultures: { 1444: 'Tribus nordiques', 1789: 'Colonies britanniques', 1914: 'Canada', 1945: 'Canada', 1991: 'Canada', 2025: 'Canada' } },
  { id: 'great_lakes', name: 'Grands Lacs', polygon: [[0.12, 0.32], [0.22, 0.32], [0.22, 0.40], [0.12, 0.40]], cultures: { 1444: 'Confédérations amérindiennes', 1789: 'Colonies britanniques', 1914: 'États-Unis', 1945: 'États-Unis', 1991: 'États-Unis', 2025: 'États-Unis' } },
  { id: 'thirteen_colonies', name: 'Côte Est', polygon: [[0.18, 0.34], [0.26, 0.34], [0.26, 0.42], [0.18, 0.42]], cultures: { 1444: 'Nations algonquines', 1789: 'États-Unis', 1914: 'États-Unis', 1945: 'États-Unis', 1991: 'États-Unis', 2025: 'États-Unis' } },
  { id: 'great_plains', name: 'Grandes Plaines', polygon: [[0.14, 0.40], [0.26, 0.40], [0.26, 0.50], [0.14, 0.50]], cultures: { 1444: 'Tribus des Plaines', 1789: 'Frontière américaine', 1914: 'États-Unis', 1945: 'États-Unis', 1991: 'États-Unis', 2025: 'États-Unis' } },
  { id: 'mexico', name: 'Mexique', polygon: [[0.18, 0.46], [0.28, 0.46], [0.28, 0.56], [0.18, 0.56]], cultures: { 1444: 'Aztèques', 1789: 'Nouvelle-Espagne', 1914: 'Mexique', 1945: 'Mexique', 1991: 'Mexique', 2025: 'Mexique' } },
  { id: 'caribbean', name: 'Caraïbes', polygon: [[0.22, 0.46], [0.30, 0.46], [0.30, 0.54], [0.22, 0.54]], cultures: { 1444: 'Taïnos', 1789: 'Colonies caribéennes', 1914: 'Antilles', 1945: 'Antilles', 1991: 'Antilles', 2025: 'Antilles' } },
  { id: 'andes', name: 'Andes', polygon: [[0.18, 0.56], [0.26, 0.56], [0.26, 0.70], [0.18, 0.70]], cultures: { 1444: 'Incas', 1789: 'Vice-royauté du Pérou', 1914: 'Pérou', 1945: 'Pérou', 1991: 'Pérou', 2025: 'Pérou' } },
  { id: 'la_plata', name: 'La Plata', polygon: [[0.22, 0.68], [0.30, 0.68], [0.30, 0.80], [0.22, 0.80]], cultures: { 1444: 'Pampas', 1789: 'Vice-royauté du Rio de la Plata', 1914: 'Argentine', 1945: 'Argentine', 1991: 'Argentine', 2025: 'Argentine' } },
  { id: 'amazon', name: 'Amazonie', polygon: [[0.24, 0.56], [0.34, 0.56], [0.34, 0.68], [0.24, 0.68]], cultures: { 1444: 'Arawaks', 1789: 'Colonies portugaises', 1914: 'Brésil', 1945: 'Brésil', 1991: 'Brésil', 2025: 'Brésil' } },
  { id: 'brazil', name: 'Brésil atlantique', polygon: [[0.28, 0.60], [0.36, 0.60], [0.36, 0.74], [0.28, 0.74]], cultures: { 1444: 'Tribus côtières', 1789: 'Brésil', 1914: 'Brésil', 1945: 'Brésil', 1991: 'Brésil', 2025: 'Brésil' } },
  { id: 'patagonia', name: 'Patagonie', polygon: [[0.26, 0.74], [0.32, 0.74], [0.32, 0.86], [0.26, 0.86]], cultures: { 1444: 'Mapuche', 1789: 'Patagonie', 1914: 'Patagonie', 1945: 'Patagonie', 1991: 'Patagonie', 2025: 'Patagonie' } },
  { id: 'sahel_west', name: 'Golfe du Bénin', polygon: [[0.44, 0.62], [0.50, 0.62], [0.50, 0.70], [0.44, 0.70]], cultures: { 1444: 'Yoruba', 1789: 'Royaumes côtiers', 1914: 'Colonies européennes', 1945: 'Nigeria', 1991: 'Nigeria', 2025: 'Nigeria' } },
  { id: 'sahel_east', name: 'Nil bleu', polygon: [[0.50, 0.60], [0.54, 0.60], [0.54, 0.70], [0.50, 0.70]], cultures: { 1444: 'Sultanats nilotiques', 1789: 'Sultanats nilotiques', 1914: 'Soudan anglo-égyptien', 1945: 'Soudan', 1991: 'Soudan', 2025: 'Soudan' } },
];

const NEIGHBORS = {
  portugal: ['castile'],
  castile: ['portugal', 'aragon', 'france'],
  aragon: ['castile', 'france', 'italy', 'maghreb'],
  france: ['castile', 'burgundy', 'aragon', 'low_countries', 'england'],
  burgundy: ['france', 'low_countries', 'hansa', 'bohemia'],
  england: ['scotland', 'ireland', 'france'],
  scotland: ['england', 'norway'],
  ireland: ['england'],
  italy: ['france', 'aragon', 'austria', 'hungary_south'],
  low_countries: ['burgundy', 'hansa', 'france', 'teutonic'],
  hansa: ['low_countries', 'teutonic', 'denmark', 'bohemia'],
  bohemia: ['hansa', 'austria', 'poland'],
  austria: ['bohemia', 'hungary', 'hungary_south', 'italy', 'poland'],
  hungary: ['austria', 'poland', 'wallachia', 'serbia'],
  poland: ['teutonic', 'lithuania', 'hungary', 'austria'],
  lithuania: ['poland', 'teutonic', 'novgorod', 'muscovy'],
  teutonic: ['low_countries', 'hansa', 'poland', 'lithuania'],
  denmark: ['hansa', 'sweden', 'norway'],
  sweden: ['denmark', 'norway', 'novgorod'],
  norway: ['denmark', 'sweden', 'scotland'],
  novgorod: ['lithuania', 'sweden', 'muscovy', 'siberia'],
  muscovy: ['novgorod', 'lithuania', 'kazan', 'siberia'],
  kazan: ['muscovy', 'siberia', 'caucasus', 'uzbek'],
  crimea: ['kazan', 'ottomans', 'greece', 'wallachia'],
  ottomans: ['crimea', 'greece', 'anatolia', 'serbia'],
  greece: ['serbia', 'ottomans', 'anatolia'],
  serbia: ['hungary', 'hungary_south', 'greece', 'ottomans'],
  hungary_south: ['austria', 'serbia', 'greece'],
  wallachia: ['hungary', 'crimea', 'serbia'],
  egypt: ['maghreb', 'levant', 'arabia', 'ethiopia'],
  maghreb: ['castile', 'aragon', 'sahel', 'egypt', 'mali'],
  sahel: ['maghreb', 'sahel_west', 'sahel_east', 'central_africa'],
  ethiopia: ['egypt', 'central_africa', 'sahel_east'],
  central_africa: ['sahel', 'sahel_east', 'ethiopia', 'south_africa'],
  south_africa: ['central_africa'],
  arabia: ['egypt', 'arabian_peninsula', 'mesopotamia', 'levant'],
  persia: ['mesopotamia', 'caucasus', 'afghanistan', 'balkh'],
  mesopotamia: ['arabia', 'persia', 'caucasus', 'levant'],
  caucasus: ['mesopotamia', 'persia', 'kazan', 'muscovy'],
  uzbek: ['kazan', 'siberia', 'transoxiana'],
  transoxiana: ['uzbek', 'balkh', 'tibet'],
  india_delhi: ['transoxiana', 'afghanistan', 'deccan', 'india_bengal'],
  india_bengal: ['india_delhi', 'deccan', 'south_china'],
  deccan: ['india_delhi', 'india_bengal', 'vijayanagar'],
  vijayanagar: ['deccan'],
  tibet: ['transoxiana', 'china', 'india_bengal'],
  china: ['tibet', 'manchuria', 'mongolia', 'south_china'],
  manchuria: ['china', 'mongolia', 'korea'],
  japan: ['korea'],
  korea: ['manchuria', 'japan'],
  mongolia: ['manchuria', 'china', 'siberia'],
  south_china: ['india_bengal', 'china', 'south_east_asia'],
  south_east_asia: ['south_china', 'indonesia'],
  indonesia: ['south_east_asia', 'australia'],
  australia: ['indonesia'],
  siberia: ['novgorod', 'muscovy', 'kazan', 'uzbek', 'mongolia'],
  arabian_sea: ['arabian_peninsula', 'persia'],
  anatolia: ['ottomans', 'greece', 'levant'],
  levant: ['anatolia', 'arabia', 'mesopotamia', 'egypt'],
  arabian_peninsula: ['arabia', 'arabian_sea'],
  afghanistan: ['persia', 'india_delhi', 'balkh'],
  balkh: ['afghanistan', 'transoxiana', 'persia'],
  mali: ['maghreb', 'west_africa'],
  west_africa: ['mali', 'sahel_west', 'amazon'],
  sahel_west: ['west_africa', 'sahel', 'sahel_east'],
  sahel_east: ['sahel', 'sahel_west', 'ethiopia', 'central_africa'],
  canada: ['great_lakes'],
  great_lakes: ['canada', 'thirteen_colonies', 'great_plains'],
  thirteen_colonies: ['great_lakes', 'caribbean', 'great_plains'],
  great_plains: ['great_lakes', 'thirteen_colonies', 'mexico'],
  mexico: ['great_plains', 'andes', 'caribbean'],
  caribbean: ['mexico', 'amazon'],
  andes: ['mexico', 'amazon', 'la_plata', 'patagonia'],
  la_plata: ['andes', 'patagonia', 'brazil'],
  amazon: ['andes', 'brazil', 'west_africa'],
  brazil: ['amazon', 'la_plata'],
  patagonia: ['andes', 'la_plata'],
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cultureColor(name) {
  if (!CULTURE_PALETTE.has(name)) {
    const h = rand(0, 360);
    const s = rand(50, 68);
    const l = rand(45, 65);
    CULTURE_PALETTE.set(name, `hsl(${h} ${s}% ${l}%)`);
  }
  return CULTURE_PALETTE.get(name);
}

function cultureForProvince(prov) {
  return prov.cultures[currentEra] || prov.cultures.default || 'Culture libre';
}

function updateCountryOptions() {
  const cultures = new Set();
  PROVINCES.forEach((prov) => cultures.add(cultureForProvince(prov)));
  const ordered = [...cultures].sort((a, b) => a.localeCompare(b, 'fr'));
  countrySelect.innerHTML = '';
  ordered.forEach((culture) => {
    const option = document.createElement('option');
    option.value = culture;
    option.textContent = culture;
    countrySelect.appendChild(option);
  });

  if (!playerCulture || !cultures.has(playerCulture)) {
    playerCulture = ordered[0] || '';
  }

  countrySelect.value = playerCulture;
  playerCountryLabel.textContent = playerCulture || '—';
}

function buildPaths() {
  provincePaths.clear();
  PROVINCES.forEach((prov) => {
    const path = new Path2D();
    prov.polygon.forEach(([px, py], idx) => {
      const x = px * canvas.width;
      const y = py * canvas.height;
      if (idx === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    });
    path.closePath();
    provincePaths.set(prov.id, path);
  });
}

function basePopulationForEra() {
  const startYear = ERAS[currentEra].startYear;
  if (startYear < 1500) return rand(120, 200);
  if (startYear < 1800) return rand(180, 260);
  if (startYear < 1950) return rand(220, 320);
  return rand(260, 420);
}

function createWorld() {
  provinceState.clear();
  const era = ERAS[currentEra];
  updateCountryOptions();
  year = era.startYear;
  yearEl.textContent = year.toString();
  eraLabelEl.textContent = era.label;
  logEl.innerHTML = '';
  addLog(`Nouvelle partie en ${year} — ${era.label}.`);

  PROVINCES.forEach((prov) => {
    const culture = cultureForProvince(prov);
    provinceState.set(prov.id, {
      culture,
      color: cultureColor(culture),
      population: basePopulationForEra(),
    });
  });

  const { cultureCount, culturePop, totalPop } = summarizeWorld();
  updateOverview(cultureCount, totalPop);
  renderScoreboard(cultureCount, culturePop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  PROVINCES.forEach((prov) => {
    const state = provinceState.get(prov.id);
    ctx.fillStyle = state?.color || '#1f2937';
    const highlighted = state?.culture === playerCulture;
    ctx.strokeStyle = highlighted ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = highlighted ? 3 : 1;
    const path = provincePaths.get(prov.id);
    ctx.fill(path);
    ctx.stroke(path);
  });
}

function neighbors(id) {
  return (NEIGHBORS[id] || []).map((n) => ({ id: n, state: provinceState.get(n) }));
}

function tick() {
  year += 5;
  yearEl.textContent = year.toString();

  const changes = [];
  let totalPop = 0;
  const cultureCount = new Map();
  const culturePop = new Map();

  PROVINCES.forEach((prov) => {
    const cell = provinceState.get(prov.id);
    const growth = rand(3, 18);
    const famine = cell.population > 600 && Math.random() > 0.82 ? rand(30, 110) : 0;
    cell.population = Math.max(80, cell.population + growth - famine);

    totalPop += cell.population;
    cultureCount.set(cell.culture, (cultureCount.get(cell.culture) || 0) + 1);
    culturePop.set(cell.culture, (culturePop.get(cell.culture) || 0) + cell.population);

    const opposing = neighbors(prov.id).filter((n) => n.state && n.state.culture !== cell.culture);
    if (opposing.length && Math.random() > 0.68) {
      const target = opposing[rand(0, opposing.length - 1)];
      const strength = cell.population + rand(-60, 80);
      const defense = target.state.population + rand(-50, 70);
      if (strength > defense) {
        changes.push({ id: target.id, to: { ...cell, population: Math.max(100, Math.floor(strength * 0.6)) } });
        addLog(`${cell.culture} prend le contrôle de ${PROVINCES.find((p) => p.id === target.id).name}.`);
      }
    }
  });

  changes.forEach((change) => provinceState.set(change.id, change.to));

  const dominant = [...cultureCount.entries()].sort((a, b) => b[1] - a[1])[0];
  updateOverview(cultureCount, totalPop);
  renderScoreboard(cultureCount, culturePop);
  draw();

  if (dominant && dominant[1] === PROVINCES.length) {
    addLog(`${dominant[0]} unifie toutes les provinces !`);
    togglePlay(true);
  }
}

function addLog(message) {
  const item = document.createElement('li');
  item.textContent = message;
  logEl.prepend(item);
  const items = [...logEl.children];
  if (items.length > 40) items.pop().remove();
}

function togglePlay(forceStop = false) {
  if (timer || forceStop) {
    clearInterval(timer);
    timer = null;
    playToggle.textContent = '▶︎ Lecture';
  } else {
    const delay = Number(speedSlider.value);
    timer = setInterval(tick, delay);
    playToggle.textContent = '⏸ Pause';
  }
}

function summarizeWorld() {
  const cultureCount = new Map();
  const culturePop = new Map();
  let totalPop = 0;

  PROVINCES.forEach((prov) => {
    const cell = provinceState.get(prov.id);
    cultureCount.set(cell.culture, (cultureCount.get(cell.culture) || 0) + 1);
    culturePop.set(cell.culture, (culturePop.get(cell.culture) || 0) + cell.population);
    totalPop += cell.population;
  });

  return { cultureCount, culturePop, totalPop };
}

function updateOverview(cultureCount, totalPop) {
  const dominant = [...cultureCount.entries()].sort((a, b) => b[1] - a[1])[0];
  dominantEl.textContent = dominant ? `${dominant[0]} (${dominant[1]} provinces)` : '—';
  populationEl.textContent = totalPop.toLocaleString('fr-FR');
}

function renderScoreboard(cultureCount, culturePop) {
  const entries = [...cultureCount.entries()].map(([culture, provinces]) => ({
    culture,
    provinces,
    population: culturePop.get(culture) || 0,
  }));

  entries.sort((a, b) => b.population - a.population);
  scoreRows.innerHTML = '';

  for (const entry of entries) {
    const row = document.createElement('div');
    row.className = 'scoreboard__row';
    if (entry.culture === playerCulture) {
      row.classList.add('scoreboard__row--selected');
    }
    row.innerHTML = `
      <span class="scoreboard__culture">
        <span class="swatch" style="background:${cultureColor(entry.culture)}"></span>
        ${entry.culture}
      </span>
      <span>${entry.provinces}</span>
      <span>${entry.population.toLocaleString('fr-FR')}</span>
      <span>${(entry.population / entry.provinces).toFixed(0)} / prov.</span>
    `;
    scoreRows.appendChild(row);
  }
}

function findProvinceAt(x, y) {
  for (const prov of PROVINCES) {
    const path = provincePaths.get(prov.id);
    if (ctx.isPointInPath(path, x, y)) return prov;
  }
  return null;
}

playToggle.addEventListener('click', () => togglePlay());
stepBtn.addEventListener('click', tick);
resetBtn.addEventListener('click', () => {
  createWorld();
  draw();
});
clearLogBtn.addEventListener('click', () => (logEl.innerHTML = ''));
speedSlider.addEventListener('input', () => {
  if (timer) {
    clearInterval(timer);
    timer = setInterval(tick, Number(speedSlider.value));
  }
});

eraSelect.addEventListener('change', (event) => {
  currentEra = event.target.value;
  createWorld();
  draw();
});

countrySelect.addEventListener('change', (event) => {
  playerCulture = event.target.value;
  playerCountryLabel.textContent = playerCulture || '—';
  addLog(`Vous suivez désormais ${playerCulture}.`);
  draw();
  const summary = summarizeWorld();
  renderScoreboard(summary.cultureCount, summary.culturePop);
});

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const province = findProvinceAt(x, y);
  if (!province) {
    tooltip.style.opacity = 0;
    return;
  }
  const cell = provinceState.get(province.id);
  tooltip.style.opacity = 1;
  tooltip.style.transform = `translate(${x + 14}px, ${y + 8}px)`;
  tooltip.innerHTML = `<strong>${province.name}</strong><br />${cell.culture}<br />Population : ${cell.population.toLocaleString('fr-FR')}`;
});

canvas.addEventListener('mouseleave', () => {
  tooltip.style.opacity = 0;
});

buildPaths();
createWorld();
draw();

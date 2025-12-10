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

const CULTURE_PALETTE = new Map();
const provincePaths = new Map();
const provinceState = new Map();
let year = 2025;
let timer = null;
let currentEra = '2025';

const PROVINCES = [
  { id: 'eastern_canada', name: 'Canada oriental', region: 'colonies_nord', polygon: [[0.11, 0.22], [0.16, 0.26], [0.18, 0.32], [0.13, 0.36], [0.08, 0.32]] },
  { id: 'western_canada', name: 'Canada occidental', region: 'colonies_nord', polygon: [[0.06, 0.20], [0.10, 0.22], [0.12, 0.30], [0.06, 0.32], [0.03, 0.26]] },
  { id: 'eastern_usa', name: 'États de l’Est', region: 'colonies_nord', polygon: [[0.14, 0.36], [0.18, 0.36], [0.20, 0.42], [0.16, 0.46], [0.12, 0.44]] },
  { id: 'western_usa', name: 'États de l’Ouest', region: 'colonies_nord', polygon: [[0.08, 0.36], [0.13, 0.36], [0.16, 0.44], [0.12, 0.50], [0.07, 0.48]] },
  { id: 'mexico', name: 'Mexique et Mésoamérique', region: 'ameriques_sud', polygon: [[0.12, 0.48], [0.17, 0.48], [0.18, 0.54], [0.12, 0.58], [0.08, 0.54]] },
  { id: 'caribbean', name: 'Caraïbes', region: 'ameriques_sud', polygon: [[0.18, 0.46], [0.22, 0.48], [0.24, 0.52], [0.20, 0.54], [0.17, 0.52]] },
  { id: 'andes', name: 'Andes', region: 'ameriques_sud', polygon: [[0.14, 0.58], [0.16, 0.60], [0.15, 0.70], [0.12, 0.72], [0.10, 0.62]] },
  { id: 'brazil', name: 'Brésil', region: 'ameriques_sud', polygon: [[0.18, 0.58], [0.25, 0.56], [0.28, 0.64], [0.24, 0.72], [0.18, 0.66]] },
  { id: 'la_plata', name: 'La Plata', region: 'ameriques_sud', polygon: [[0.16, 0.72], [0.20, 0.72], [0.22, 0.82], [0.18, 0.86], [0.15, 0.80]] },
  { id: 'british_isles', name: 'Îles Britanniques', region: 'europe_ouest', polygon: [[0.34, 0.22], [0.36, 0.24], [0.35, 0.28], [0.32, 0.28], [0.31, 0.24]] },
  { id: 'iberia', name: 'Ibérie', region: 'europe_ouest', polygon: [[0.34, 0.30], [0.39, 0.32], [0.38, 0.40], [0.32, 0.40], [0.30, 0.34]] },
  { id: 'france', name: 'France', region: 'europe_ouest', polygon: [[0.36, 0.26], [0.40, 0.28], [0.42, 0.34], [0.38, 0.38], [0.34, 0.34]] },
  { id: 'germany', name: 'Allemagne et Pays-Bas', region: 'europe_centrale', polygon: [[0.42, 0.26], [0.46, 0.26], [0.48, 0.34], [0.44, 0.36], [0.40, 0.32]] },
  { id: 'italy', name: 'Italie', region: 'europe_centrale', polygon: [[0.42, 0.34], [0.45, 0.34], [0.48, 0.42], [0.44, 0.46], [0.40, 0.42]] },
  { id: 'balkans', name: 'Balkans', region: 'europe_centrale', polygon: [[0.46, 0.34], [0.50, 0.34], [0.52, 0.42], [0.48, 0.46], [0.45, 0.42]] },
  { id: 'scandinavia', name: 'Scandinavie', region: 'europe_centrale', polygon: [[0.42, 0.16], [0.46, 0.16], [0.48, 0.24], [0.44, 0.28], [0.40, 0.24]] },
  { id: 'eastern_europe', name: 'Europe orientale', region: 'europe_est', polygon: [[0.50, 0.28], [0.55, 0.28], [0.58, 0.38], [0.52, 0.40], [0.48, 0.34]] },
  { id: 'russia', name: 'Russie', region: 'europe_est', polygon: [[0.54, 0.18], [0.62, 0.18], [0.64, 0.30], [0.58, 0.34], [0.52, 0.26]] },
  { id: 'anatolia', name: 'Anatolie', region: 'anatolie', polygon: [[0.52, 0.40], [0.56, 0.40], [0.60, 0.44], [0.56, 0.48], [0.50, 0.46]] },
  { id: 'middle_east', name: 'Levant et Arabie', region: 'moyen_orient', polygon: [[0.56, 0.44], [0.60, 0.44], [0.62, 0.52], [0.57, 0.54], [0.52, 0.50]] },
  { id: 'persia', name: 'Perse', region: 'perse', polygon: [[0.60, 0.38], [0.66, 0.38], [0.68, 0.48], [0.62, 0.50], [0.58, 0.44]] },
  { id: 'central_asia', name: 'Steppes et Asie centrale', region: 'asie_centrale', polygon: [[0.64, 0.28], [0.72, 0.26], [0.72, 0.38], [0.66, 0.42], [0.60, 0.34]] },
  { id: 'india', name: 'Sous-continent indien', region: 'inde', polygon: [[0.66, 0.44], [0.72, 0.44], [0.74, 0.56], [0.68, 0.58], [0.64, 0.50]] },
  { id: 'china', name: 'Chine', region: 'chine', polygon: [[0.72, 0.34], [0.80, 0.34], [0.82, 0.46], [0.76, 0.50], [0.70, 0.42]] },
  { id: 'japan_korea', name: 'Japon et Corée', region: 'asie_est', polygon: [[0.82, 0.36], [0.86, 0.38], [0.86, 0.46], [0.82, 0.48], [0.78, 0.42]] },
  { id: 'southeast_asia', name: 'Péninsule d’Asie du Sud-Est', region: 'asie_sud_est', polygon: [[0.74, 0.52], [0.80, 0.52], [0.82, 0.62], [0.76, 0.64], [0.70, 0.58]] },
  { id: 'indonesia', name: 'Indonésie', region: 'asie_sud_est', polygon: [[0.78, 0.62], [0.84, 0.62], [0.86, 0.70], [0.80, 0.72], [0.74, 0.68]] },
  { id: 'australia', name: 'Australasie', region: 'oceanie', polygon: [[0.86, 0.68], [0.92, 0.68], [0.94, 0.82], [0.88, 0.84], [0.82, 0.76]] },
  { id: 'north_africa', name: 'Afrique du Nord', region: 'afrique_nord', polygon: [[0.40, 0.44], [0.48, 0.44], [0.50, 0.52], [0.44, 0.54], [0.36, 0.50]] },
  { id: 'west_africa', name: 'Afrique de l’Ouest', region: 'afrique_ouest', polygon: [[0.36, 0.52], [0.44, 0.54], [0.44, 0.62], [0.36, 0.64], [0.32, 0.58]] },
  { id: 'east_africa', name: 'Corne et Afrique orientale', region: 'afrique_est', polygon: [[0.48, 0.52], [0.54, 0.52], [0.56, 0.62], [0.50, 0.66], [0.44, 0.60]] },
  { id: 'south_africa', name: 'Afrique australe', region: 'afrique_australe', polygon: [[0.44, 0.64], [0.50, 0.66], [0.52, 0.78], [0.46, 0.82], [0.40, 0.74]] },
];

const NEIGHBORS = {
  eastern_canada: ['western_canada', 'eastern_usa'],
  western_canada: ['eastern_canada', 'western_usa'],
  eastern_usa: ['eastern_canada', 'western_usa', 'mexico', 'caribbean'],
  western_usa: ['western_canada', 'eastern_usa', 'mexico'],
  mexico: ['western_usa', 'eastern_usa', 'caribbean', 'andes', 'brazil'],
  caribbean: ['eastern_usa', 'mexico', 'brazil'],
  andes: ['mexico', 'brazil', 'la_plata'],
  brazil: ['caribbean', 'mexico', 'andes', 'la_plata'],
  la_plata: ['brazil', 'andes'],
  british_isles: ['france', 'scandinavia'],
  iberia: ['france', 'north_africa'],
  france: ['british_isles', 'iberia', 'germany', 'italy'],
  germany: ['france', 'italy', 'balkans', 'scandinavia', 'eastern_europe'],
  italy: ['france', 'germany', 'balkans'],
  balkans: ['germany', 'italy', 'anatolia', 'eastern_europe'],
  scandinavia: ['british_isles', 'germany', 'russia'],
  eastern_europe: ['germany', 'balkans', 'russia', 'anatolia'],
  russia: ['scandinavia', 'eastern_europe', 'central_asia'],
  anatolia: ['balkans', 'eastern_europe', 'middle_east'],
  middle_east: ['anatolia', 'persia', 'north_africa', 'east_africa'],
  persia: ['middle_east', 'central_asia', 'india'],
  central_asia: ['russia', 'persia', 'china', 'india'],
  india: ['persia', 'central_asia', 'china', 'southeast_asia'],
  china: ['central_asia', 'india', 'japan_korea', 'southeast_asia'],
  japan_korea: ['china'],
  southeast_asia: ['india', 'china', 'indonesia'],
  indonesia: ['southeast_asia', 'australia'],
  australia: ['indonesia'],
  north_africa: ['iberia', 'france', 'middle_east', 'west_africa'],
  west_africa: ['north_africa', 'east_africa', 'south_africa'],
  east_africa: ['middle_east', 'west_africa', 'south_africa'],
  south_africa: ['west_africa', 'east_africa'],
};

const ERA_PRESETS = {
  1444: {
    label: 'Ère des grands royaumes',
    startYear: 1444,
    cultures: {
      europe_ouest: 'France',
      europe_centrale: 'Saint-Empire',
      europe_est: 'Pologne-Lituanie',
      anatolie: 'Ottomans',
      moyen_orient: 'Mamelouks',
      perse: 'Timourides',
      asie_centrale: 'Khanats',
      inde: 'Sultanats indiens',
      chine: 'Ming',
      asie_est: 'Daimyōs',
      asie_sud_est: 'Ayutthaya',
      oceanie: 'Terres australes',
      afrique_nord: 'Maghreb',
      afrique_ouest: 'Mali',
      afrique_est: 'Adal',
      afrique_australe: 'Monomotapa',
      amerique_sud: 'Incas',
      amerique_centrale: 'Aztèques',
      colonies_nord: 'Tribus iroquoiennes',
    },
  },
  1789: {
    label: 'Révolutions atlantiques',
    startYear: 1789,
    cultures: {
      europe_ouest: 'Royaumes européens',
      europe_centrale: 'Empires centraux',
      europe_est: 'Russie impériale',
      anatolie: 'Empire ottoman',
      moyen_orient: 'Provinces ottomanes',
      perse: 'Dynastie Kadjar',
      asie_centrale: 'Khanats',
      inde: 'Compagnie des Indes',
      chine: 'Qing',
      asie_est: 'Shogunat',
      asie_sud_est: 'Royaumes siamois',
      oceanie: 'Colonies océaniques',
      afrique_nord: 'Beys et deys',
      afrique_ouest: 'Royaumes africains',
      afrique_est: 'Sultanats swahilis',
      afrique_australe: 'Chefferies zouloues',
      ameriques_sud: 'Colonies ibériques',
      ameriques_nord: 'Jeunes États-Unis',
      colonies_nord: 'Colonies nord-américaines',
      amerique_sud: 'Vice-royautés',
    },
  },
  1914: {
    label: 'Monde en armes',
    startYear: 1914,
    cultures: {
      europe_ouest: 'Entente',
      europe_centrale: 'Puissances centrales',
      europe_est: 'Empire russe',
      anatolie: 'Empire ottoman',
      moyen_orient: 'Provinces ottomanes',
      perse: 'Perse',
      asie_centrale: 'Protectorats russes',
      inde: 'Raj britannique',
      chine: 'République de Chine',
      asie_est: 'Empire du Japon',
      asie_sud_est: 'Indochine',
      oceanie: 'Dominions',
      afrique_nord: 'Colonies françaises',
      afrique_ouest: 'Colonies européennes',
      afrique_est: 'Colonies est-africaines',
      afrique_australe: 'Union sud-africaine',
      ameriques_sud: 'Républiques sud-américaines',
      colonies_nord: 'États-Unis',
      amerique_sud: 'Républiques sud-américaines',
    },
  },
  1945: {
    label: 'Reconstruction',
    startYear: 1945,
    cultures: {
      europe_ouest: 'Alliés',
      europe_centrale: 'Zones occupées',
      europe_est: 'Bloc de l’Est',
      anatolie: 'Turquie',
      moyen_orient: 'Mandats',
      perse: 'Iran',
      asie_centrale: 'Républiques soviétiques',
      inde: 'Empire britannique',
      chine: 'Républiques chinoises',
      asie_est: 'Japon d’après-guerre',
      asie_sud_est: 'États décolonisés',
      oceanie: 'Dominions',
      afrique_nord: 'Colonies nord-africaines',
      afrique_ouest: 'Décolonisation',
      afrique_est: 'Décolonisation',
      afrique_australe: 'États africains',
      ameriques_sud: 'Républiques sud-américaines',
      colonies_nord: 'États-Unis',
      amerique_sud: 'Républiques sud-américaines',
    },
  },
  1991: {
    label: 'Nouvel ordre',
    startYear: 1991,
    cultures: {
      europe_ouest: 'Union européenne',
      europe_centrale: 'Europe centrale',
      europe_est: 'Fédération de Russie',
      anatolie: 'Turquie',
      moyen_orient: 'Proche-Orient',
      perse: 'Iran',
      asie_centrale: 'Républiques indépendantes',
      inde: 'Inde',
      chine: 'Chine',
      asie_est: 'Tigres asiatiques',
      asie_sud_est: 'ASEAN',
      oceanie: 'Pacifique',
      afrique_nord: 'Afrique du Nord',
      afrique_ouest: 'Afrique de l’Ouest',
      afrique_est: 'Afrique orientale',
      afrique_australe: 'Afrique australe',
      ameriques_sud: 'Amérique latine',
      colonies_nord: 'États-Unis',
      amerique_sud: 'Amérique latine',
    },
  },
  2025: {
    label: 'Monde contemporain',
    startYear: 2025,
    cultures: {
      europe_ouest: 'Union européenne',
      europe_centrale: 'Europe centrale',
      europe_est: 'Eurasie',
      anatolie: 'Anatolie',
      moyen_orient: 'Moyen-Orient',
      perse: 'Iran',
      asie_centrale: 'Asie centrale',
      inde: 'Inde',
      chine: 'Chine',
      asie_est: 'Pacifique nord',
      asie_sud_est: 'ASEAN',
      oceanie: 'Océanie',
      afrique_nord: 'Afrique du Nord',
      afrique_ouest: 'Afrique de l’Ouest',
      afrique_est: 'Afrique orientale',
      afrique_australe: 'Afrique australe',
      ameriques_sud: 'Amérique latine',
      colonies_nord: 'Amérique du Nord',
      amerique_sud: 'Amérique latine',
    },
  },
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
  const era = ERA_PRESETS[currentEra];
  if (era.startYear < 1500) return rand(120, 200);
  if (era.startYear < 1800) return rand(180, 260);
  if (era.startYear < 1950) return rand(220, 320);
  return rand(260, 420);
}

function createWorld() {
  provinceState.clear();
  const era = ERA_PRESETS[currentEra];
  year = era.startYear;
  yearEl.textContent = year.toString();
  eraLabelEl.textContent = era.label;
  logEl.innerHTML = '';
  addLog(`Nouvelle partie en ${year} — ${era.label}.`);

  PROVINCES.forEach((prov) => {
    const culture =
      era.cultures[prov.region] || era.cultures[prov.id] || era.cultures['ameriques_sud'] || 'Culture libre';
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
  PROVINCES.forEach((prov) => {
    const state = provinceState.get(prov.id);
    ctx.fillStyle = state?.color || '#1f2937';
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
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

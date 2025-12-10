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

const ERAS = {
  1444: { label: 'Ère des grands royaumes', startYear: 1444 },
  1789: { label: 'Révolutions atlantiques', startYear: 1789 },
  1914: { label: 'Monde en armes', startYear: 1914 },
  1945: { label: 'Reconstruction', startYear: 1945 },
  1991: { label: 'Nouvel ordre', startYear: 1991 },
  2025: { label: 'Monde contemporain', startYear: 2025 },
};

// Fallback to the widely mirrored world/50m TopoJSON from world-atlas; avoid the
// previously broken states-provinces path that returned a 404.
const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/world/50m.json';

const CULTURE_PALETTE = new Map();
const provinces = [];
let neighbors = [];
let projection;
let geoPath;
let timer = null;
let year = 2025;
let currentEra = '2025';
let playerCulture = '';
let loadedTopology = null;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colorFromString(name) {
  if (CULTURE_PALETTE.has(name)) return CULTURE_PALETTE.get(name);
  const hue = (Math.abs(hashCode(name)) % 360 + 360) % 360;
  const color = `hsl(${hue}, 58%, 55%)`;
  CULTURE_PALETTE.set(name, color);
  return color;
}

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

async function ensureWorldData() {
  if (loadedTopology) return loadedTopology;
  try {
    const response = await fetch(WORLD_URL);
    if (!response.ok) throw new Error(`Impossible de charger la carte (${response.status})`);
    loadedTopology = await response.json();
    return loadedTopology;
  } catch (error) {
    logEvent(`Erreur de chargement de la carte : ${error.message}`);
    throw error;
  }
}

function getFeatureCollection(topology) {
  const objectKey = topology.objects.states || topology.objects.provinces || Object.keys(topology.objects)[0];
  return topojson.feature(topology, topology.objects[objectKey]);
}

function computeNeighbors(topology) {
  const objectKey = topology.objects.states || topology.objects.provinces || Object.keys(topology.objects)[0];
  neighbors = topojson.neighbors(topology.objects[objectKey].geometries);
}

function resetSimulation() {
  stop();
  provinces.length = 0;
  CULTURE_PALETTE.clear();
  seedEra(currentEra).catch((error) => logEvent(`Impossible de réinitialiser : ${error.message}`));
  updateHUD();
  renderMap();
}

async function seedEra(eraKey) {
  const topology = await ensureWorldData();
  const featureCollection = getFeatureCollection(topology);
  computeNeighbors(topology);

  projection = d3.geoNaturalEarth1().fitSize([canvas.width, canvas.height], featureCollection);
  geoPath = d3.geoPath(projection, ctx);

  provinces.length = 0;
  featureCollection.features.forEach((feature, index) => {
    const baseName = feature.properties.name || feature.properties.name_en || `Province ${index + 1}`;
    const tag = resolveCulture(baseName, feature, eraKey);
    provinces.push({
      id: index,
      name: baseName,
      feature,
      culture: tag,
      population: rand(50, 150),
      momentum: rand(1, 3),
    });
  });

  year = ERAS[eraKey].startYear;
  populateCountrySelect();
  logEvent(`Nouvelle partie démarrée en ${year} (${ERAS[eraKey].label}).`);
  updateHUD();
  renderMap();
}

function resolveCulture(name, feature, eraKey) {
  const country = (feature.properties.adm0_name || feature.properties.sovereignt || feature.properties.name || name).toLowerCase();
  if (country.includes('russian') || country.includes('russie') || country.includes('russia')) return tagEra('Russie', eraKey);
  if (country.includes('china') || country.includes('chine')) return tagEra('Chine', eraKey);
  if (country.includes('india') || country.includes('inde')) return tagEra('Inde', eraKey);
  if (country.includes('united states') || country.includes('états-unis') || country.includes('usa')) return tagEra('États-Unis', eraKey);
  if (country.includes('canada')) return tagEra('Canada', eraKey);
  if (country.includes('brazil') || country.includes('brésil')) return tagEra('Brésil', eraKey);
  if (country.includes('australia')) return tagEra('Australie', eraKey);
  if (country.includes('france')) return tagEra('France', eraKey);
  if (country.includes('germany') || country.includes('allemagne')) return tagEra('Allemagne', eraKey);
  if (country.includes('spain') || country.includes('espagne')) return tagEra('Espagne', eraKey);
  if (country.includes('portugal')) return tagEra('Portugal', eraKey);
  if (country.includes('ottoman') || country.includes('turkey') || country.includes('turquie')) return tagEra('Empire ottoman', eraKey);
  if (country.includes('egypt') || country.includes('égypte')) return tagEra('Égypte', eraKey);
  if (country.includes('iran') || country.includes('persia') || country.includes('iran')) return tagEra('Iran', eraKey);
  if (country.includes('japan') || country.includes('japon')) return tagEra('Japon', eraKey);
  if (country.includes('korea')) return tagEra('Corée', eraKey);
  if (country.includes('mexico')) return tagEra('Mexique', eraKey);
  if (country.includes('south africa')) return tagEra('Afrique du Sud', eraKey);
  if (country.includes('nigeria')) return tagEra('Nigeria', eraKey);
  if (country.includes('saudi') || country.includes('arabia')) return tagEra('Arabie', eraKey);
  if (country.includes('ukraine')) return tagEra('Ukraine', eraKey);
  if (country.includes('poland')) return tagEra('Pologne', eraKey);
  if (country.includes('sweden')) return tagEra('Suède', eraKey);
  if (country.includes('norway')) return tagEra('Norvège', eraKey);
  if (country.includes('finland')) return tagEra('Finlande', eraKey);
  if (country.includes('italy') || country.includes('italie')) return tagEra('Italie', eraKey);
  return tagEra(capitalize(name), eraKey);
}

function tagEra(label, eraKey) {
  const prefix = {
    1444: 'Dynastie',
    1789: 'Nation',
    1914: 'Puissance',
    1945: 'Bloc',
    1991: 'État',
    2025: 'Pays',
  }[eraKey] || 'Pays';
  return `${prefix} ${label}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function stepSimulation() {
  if (!provinces.length) return;
  for (let i = 0; i < 30; i += 1) {
    const source = provinces[rand(0, provinces.length - 1)];
    source.population += rand(0, 3);
    source.momentum = Math.min(source.momentum + 0.02, 4);

    const adj = neighbors[source.id] || [];
    if (!adj.length) continue;
    const targetIndex = adj[rand(0, adj.length - 1)];
    const target = provinces[targetIndex];
    if (!target) continue;

    if (target.culture !== source.culture) {
      const attack = source.population * source.momentum * Math.random();
      const defense = target.population * target.momentum * Math.random();
      if (attack > defense * 0.9) {
        target.culture = source.culture;
        target.momentum = Math.max(1, source.momentum - 0.2);
        logEvent(`${target.name} passe sous le contrôle de ${source.culture}.`);
      } else {
        source.momentum = Math.max(0.8, source.momentum - 0.1);
      }
    }
  }

  year += 1;
  renderMap();
  updateHUD();
}

function renderMap() {
  if (!geoPath || !projection) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  provinces.forEach((province) => {
    ctx.beginPath();
    geoPath(province.feature);
    ctx.fillStyle = colorFromString(province.culture);
    ctx.fill();
    if (province.culture === playerCulture) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1F3A8A';
      ctx.stroke();
    }
  });
}

function updateHUD() {
  const totals = provinces.reduce((acc, p) => {
    acc.population += p.population;
    acc.provinces += 1;
    acc.cultures[p.culture] = (acc.cultures[p.culture] || 0) + 1;
    return acc;
  }, { population: 0, provinces: 0, cultures: {} });

  const dominant = Object.entries(totals.cultures).sort((a, b) => b[1] - a[1])[0];
  yearEl.textContent = year;
  eraLabelEl.textContent = ERAS[currentEra].label;
  dominantEl.textContent = dominant ? `${dominant[0]} (${dominant[1]} prov.)` : '—';
  populationEl.textContent = totals.population.toLocaleString('fr-FR');
  playerCountryLabel.textContent = playerCulture || '—';
  updateScoreboard(totals.cultures);
}

function updateScoreboard(cultureCounts) {
  const entries = Object.entries(cultureCounts).map(([culture, provincesCount]) => {
    const pop = provinces.filter((p) => p.culture === culture).reduce((sum, p) => sum + p.population, 0);
    const avgMomentum = provinces.filter((p) => p.culture === culture).reduce((sum, p) => sum + p.momentum, 0) / provincesCount;
    return { culture, provincesCount, pop, momentum: avgMomentum };
  }).sort((a, b) => b.provincesCount - a.provincesCount);

  scoreRows.innerHTML = entries.map((entry) => `
    <div class="scoreboard__row ${entry.culture === playerCulture ? 'scoreboard__row--active' : ''}">
      <span><span class="color-dot" style="background:${colorFromString(entry.culture)}"></span>${entry.culture}</span>
      <span>${entry.provincesCount}</span>
      <span>${entry.pop.toLocaleString('fr-FR')}</span>
      <span>${entry.momentum.toFixed(2)}</span>
    </div>
  `).join('');
}

function logEvent(text) {
  const entry = document.createElement('li');
  entry.textContent = `${new Date().toLocaleTimeString()} — ${text}`;
  logEl.prepend(entry);
  while (logEl.children.length > 12) {
    logEl.removeChild(logEl.lastChild);
  }
}

function start() {
  if (timer) return;
  timer = setInterval(stepSimulation, Number(speedSlider.value));
  playToggle.textContent = '⏸ Pause';
}

function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  playToggle.textContent = '▶︎ Lecture';
}

function handlePointer(event) {
  if (!projection || !geoPath || !provinces.length) {
    tooltip.style.opacity = 0;
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const coords = projection.invert([x, y]);
  if (!coords) {
    tooltip.style.opacity = 0;
    return;
  }

  const province = provinces.find((p) => d3.geoContains(p.feature, coords));
  if (!province) {
    tooltip.style.opacity = 0;
    return;
  }

  tooltip.style.opacity = 1;
  tooltip.style.left = `${x + 14}px`;
  tooltip.style.top = `${y + 14}px`;
  tooltip.innerHTML = `
    <strong>${province.name}</strong><br />
    ${province.culture}<br />
    Population : ${province.population.toLocaleString('fr-FR')}<br />
    Momentum : ${province.momentum.toFixed(2)}
  `;
}

function populateCountrySelect() {
  const cultures = Array.from(new Set(provinces.map((p) => p.culture))).sort();
  countrySelect.innerHTML = '<option value="">—</option>' + cultures.map((culture) => `<option value="${culture}">${culture}</option>`).join('');
}

function setupInteractions() {
  playToggle.addEventListener('click', () => {
    if (timer) stop(); else start();
  });

  stepBtn.addEventListener('click', stepSimulation);
  resetBtn.addEventListener('click', () => seedEra(currentEra).catch((error) => logEvent(`Impossible de relancer : ${error.message}`)));
  speedSlider.addEventListener('input', () => {
    if (timer) {
      stop();
      start();
    }
  });

  clearLogBtn.addEventListener('click', () => logEl.replaceChildren());

  eraSelect.addEventListener('change', (event) => {
    currentEra = event.target.value;
    stop();
    seedEra(currentEra).catch((error) => logEvent(`Impossible de charger l'époque : ${error.message}`));
  });

  countrySelect.addEventListener('change', (event) => {
    playerCulture = event.target.value;
    playerCountryLabel.textContent = playerCulture || '—';
    renderMap();
  });

  canvas.addEventListener('mousemove', handlePointer);
  canvas.addEventListener('mouseleave', () => { tooltip.style.opacity = 0; });
}

setupInteractions();
seedEra(currentEra).catch((error) => logEvent(`Impossible de démarrer : ${error.message}`));

const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
const playToggle = document.getElementById('playToggle');
const stepBtn = document.getElementById('step');
const resetBtn = document.getElementById('reset');
const yearEl = document.getElementById('year');
const dominantEl = document.getElementById('dominantCulture');
const populationEl = document.getElementById('population');
const logEl = document.getElementById('log');
const clearLogBtn = document.getElementById('clearLog');
const speedSlider = document.getElementById('speed');
const scoreRows = document.getElementById('scoreRows');
const tooltip = document.getElementById('tooltip');

const WIDTH = 32;
const HEIGHT = 20;
const CELL = canvas.width / WIDTH;
const CULTURES = ['Aster', 'Brume', 'Cendrelac', 'Dunemar', 'Elyon', 'Frey', 'Galen'];

let grid = [];
let year = 0;
let timer = null;
const culturePalette = new Map();

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  const h = rand(0, 360);
  const s = rand(55, 70);
  const l = rand(45, 65);
  return `hsl(${h} ${s}% ${l}%)`;
}

function cultureColor(name) {
  if (!culturePalette.has(name)) {
    culturePalette.set(name, randomColor());
  }
  return culturePalette.get(name);
}

function createWorld() {
  grid = new Array(HEIGHT).fill(null).map(() => new Array(WIDTH).fill(null));
  const seeds = rand(4, 7);
  for (let i = 0; i < seeds; i++) {
    const culture = CULTURES[rand(0, CULTURES.length - 1)];
    const color = cultureColor(culture);
    const y = rand(0, HEIGHT - 1);
    const x = rand(0, WIDTH - 1);
    grid[y][x] = {
      culture,
      color,
      population: rand(40, 120),
    };
  }
  fillVoids();
  year = 0;
  yearEl.textContent = year.toString();
  logEl.innerHTML = '';
  addLog('Un nouveau monde apparaît, façonné par des cultures rivales.');
  const { cultureCount, culturePop, totalPop } = summarizeGrid();
  updateOverview(cultureCount, totalPop);
  renderScoreboard(cultureCount, culturePop);
}

function fillVoids() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (!grid[y][x]) {
        const culture = CULTURES[rand(0, CULTURES.length - 1)];
        grid[y][x] = {
          culture,
          color: cultureColor(culture),
          population: rand(20, 60),
        };
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cell = grid[y][x];
      ctx.fillStyle = cell.color;
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= WIDTH; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL, 0);
    ctx.lineTo(x * CELL, HEIGHT * CELL);
    ctx.stroke();
  }
  for (let y = 0; y <= HEIGHT; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL);
    ctx.lineTo(WIDTH * CELL, y * CELL);
    ctx.stroke();
  }
}

function neighbors(x, y) {
  const coords = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  return coords
    .filter(([nx, ny]) => nx >= 0 && nx < WIDTH && ny >= 0 && ny < HEIGHT)
    .map(([nx, ny]) => ({ cell: grid[ny][nx], x: nx, y: ny }));
}

function tick() {
  year += 5;
  yearEl.textContent = year.toString();

  const changes = [];
  let totalPop = 0;
  const cultureCount = new Map();
  const culturePop = new Map();

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cell = grid[y][x];
      const growth = rand(1, 8);
      const famine = cell.population > 220 && rand(0, 10) > 7 ? rand(8, 28) : 0;
      cell.population = Math.max(10, cell.population + growth - famine);
      totalPop += cell.population;
      cultureCount.set(cell.culture, (cultureCount.get(cell.culture) || 0) + 1);
      culturePop.set(cell.culture, (culturePop.get(cell.culture) || 0) + cell.population);

      const enemy = neighbors(x, y).find((n) => n.cell.culture !== cell.culture && rand(0, 10) > 7);
      if (enemy) {
        const strength = cell.population + rand(-25, 25);
        const defense = enemy.cell.population + rand(-20, 30);
        if (strength > defense) {
          changes.push({ x: enemy.x, y: enemy.y, to: { ...cell, population: Math.max(20, Math.floor(strength / 2)) } });
          addLog(`${cell.culture} s'empare de ${enemy.cell.culture} (${enemy.x},${enemy.y}).`);
        }
      } else if (rand(0, 10) > 8) {
        const target = neighbors(x, y).find((n) => n.cell.culture === cell.culture);
        if (target) {
          changes.push({ x: target.x, y: target.y, to: { ...cell, population: Math.floor(cell.population * 0.6) } });
          addLog(`${cell.culture} unifie davantage son territoire.`);
        }
      }
    }
  }

  for (const change of changes) {
    grid[change.y][change.x] = change.to;
  }

  const dominant = [...cultureCount.entries()].sort((a, b) => b[1] - a[1])[0];
  updateOverview(cultureCount, totalPop);
  renderScoreboard(cultureCount, culturePop);
  draw();
}

function addLog(message) {
  const item = document.createElement('li');
  item.textContent = message;
  logEl.prepend(item);
  const items = [...logEl.children];
  if (items.length > 40) items.pop().remove();
}

function togglePlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    playToggle.textContent = '▶︎ Lecture';
  } else {
    const delay = Number(speedSlider.value);
    timer = setInterval(tick, delay);
    playToggle.textContent = '⏸ Pause';
  }
}

playToggle.addEventListener('click', togglePlay);
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

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * WIDTH);
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * HEIGHT);
  const cell = grid[y]?.[x];
  if (!cell) return;
  tooltip.style.opacity = 1;
  tooltip.style.transform = `translate(${event.clientX - rect.left + 12}px, ${event.clientY - rect.top - 12}px)`;
  tooltip.innerHTML = `<strong>${cell.culture}</strong><br />Population : ${cell.population.toLocaleString('fr-FR')}<br />Coordonnées : ${x}, ${y}`;
});

canvas.addEventListener('mouseleave', () => {
  tooltip.style.opacity = 0;
});

function summarizeGrid() {
  const cultureCount = new Map();
  const culturePop = new Map();
  let totalPop = 0;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cell = grid[y][x];
      cultureCount.set(cell.culture, (cultureCount.get(cell.culture) || 0) + 1);
      culturePop.set(cell.culture, (culturePop.get(cell.culture) || 0) + cell.population);
      totalPop += cell.population;
    }
  }
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

createWorld();
draw();


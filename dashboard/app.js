const DATA_PATH = "../data/processed/player_scores.csv";
let players = [];
let selected = null;

function parseCsv(text) {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",");
  return lines.map(line => {
    const values = line.match(/("[^"]*"|[^,]+)/g) || [];
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] || "").replace(/^"|"$/g, "") ]));
  });
}

function num(value) { return Number(value || 0); }

async function loadData() {
  const res = await fetch(DATA_PATH);
  const text = await res.text();
  players = parseCsv(text);
  selected = players[0];
  render();
}

function getFiltered() {
  const q = document.querySelector("#search").value.toLowerCase();
  const sort = document.querySelector("#sort").value;
  return players
    .filter(p => `${p.player} ${p.team}`.toLowerCase().includes(q))
    .sort((a, b) => num(b[sort]) - num(a[sort]));
}

function renderScatter(data) {
  const svg = document.querySelector("#scatter");
  svg.innerHTML = "";
  const width = 700, height = 420, pad = 44;
  const x = v => pad + (num(v) / 100) * (width - pad * 2);
  const y = v => height - pad - (num(v) / 100) * (height - pad * 2);

  svg.insertAdjacentHTML("beforeend", `<line class="axis" x1="${pad}" y1="${height-pad}" x2="${width-pad}" y2="${height-pad}"/>`);
  svg.insertAdjacentHTML("beforeend", `<line class="axis" x1="${pad}" y1="${pad}" x2="${pad}" y2="${height-pad}"/>`);
  [0, 25, 50, 75, 100].forEach(t => {
    svg.insertAdjacentHTML("beforeend", `<text class="tick" x="${x(t)-8}" y="${height-pad+24}">${t}</text>`);
    svg.insertAdjacentHTML("beforeend", `<text class="tick" x="12" y="${y(t)+4}">${t}</text>`);
  });

  data.forEach(p => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "point");
    circle.setAttribute("cx", x(p.performance_score));
    circle.setAttribute("cy", y(p.marketability_score));
    circle.setAttribute("r", 8 + Math.max(0, num(p.momentum_score)) / 18);
    circle.addEventListener("click", () => { selected = p; render(); });
    svg.appendChild(circle);
  });
}

function renderRows(data) {
  const body = document.querySelector("#rows");
  body.innerHTML = data.map(p => `
    <tr data-player="${p.player}">
      <td>${p.player}</td><td>${p.team}</td>
      <td>${p.performance_score}</td><td>${p.marketability_score}</td>
      <td>${p.momentum_score}</td><td>${p.marketability_gap}</td>
      <td class="action">${p.recommended_action}</td>
    </tr>`).join("");
  body.querySelectorAll("tr").forEach(row => {
    row.addEventListener("click", () => {
      selected = players.find(p => p.player === row.dataset.player);
      render();
    });
  });
}

function renderDetail() {
  const p = selected || players[0];
  const card = document.querySelector("#detail");
  if (!p) return;
  card.innerHTML = `
    <h2>${p.player}</h2>
    <p>${p.team} · ${p.position} · age ${p.age}</p>
    <div class="metric"><span>Marketability</span><strong>${p.marketability_score}</strong></div>
    <div class="metric"><span>Performance</span><strong>${p.performance_score}</strong></div>
    <div class="metric"><span>Momentum</span><strong>${p.momentum_score}</strong></div>
    <div class="metric"><span>Gap</span><strong>${p.marketability_gap}</strong></div>
    <p><strong>Strength:</strong> ${p.primary_strength}</p>
    <p><strong>Weakness:</strong> ${p.primary_weakness}</p>
    <p class="action"><strong>Action:</strong> ${p.recommended_action}</p>
  `;
}

function render() {
  const data = getFiltered();
  renderScatter(data);
  renderRows(data);
  renderDetail();
}

document.querySelector("#search").addEventListener("input", render);
document.querySelector("#sort").addEventListener("change", render);
loadData().catch(err => {
  document.body.innerHTML = `<main class="app"><h1>Could not load data</h1><p>Run a local server from the repo root: <code>python -m http.server 8000</code></p><pre>${err}</pre></main>`;
});

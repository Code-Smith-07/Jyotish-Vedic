import './styles/index.css';
import { calculatePlanetaryPositions, getPlanetsInHouses, getHouseSigns, formatDMS } from './core/planets.js';
import { calculateVimshottariDasha, getCurrentDasha, formatDashaDate } from './core/dashas.js';
import { buildDivisionalChart } from './core/divisionalCharts.js';
import { detectYogas } from './core/yogas.js';
import { analyzeAllDoshas } from './core/doshas.js';
import { calculatePanchang, formatPanchangTime } from './core/panchang.js';
import { calculateSarvashtakavarga } from './core/ashtakavarga.js';
import { generateHousePredictions, generateRecommendations } from './core/predictions.js';
import { generateNorthIndianChart, generateSouthIndianChart } from './charts/chartRenderer.js';
import { searchCity, INDIAN_CITIES } from './utils/geocoding.js';
import icons, { icon } from './utils/icons.js';
import { PLANETS, PLANET_ORDER, RASHIS, DIVISIONAL_CHARTS, DASHA_YEARS, GEMSTONES, HOUSE_SIGNIFICATIONS } from './core/constants.js';
import { generateFullReport } from './core/interpretations/index.js';
import { downloadKundliPDF } from './utils/pdfExport.js';

let chartData = null;
let dashaData = null;
let currentTab = 'chart';

const app = document.getElementById('app');

const TAB_ICONS = {
  chart: icons.chart,
  report: icons.book,
  planets: icons.planet,
  dasha: icons.clock,
  panchang: icons.diya,
  divisional: icons.barChart,
  yogas: icons.sparkle,
  doshas: icons.warning,
  predictions: icons.crystal,
  ashtakavarga: icons.hash,
  remedies: icons.gem,
};
const TAB_LABELS = {
  chart: 'Chart', report: 'Life Report', planets: 'Planets', dasha: 'Dasha', panchang: 'Panchang',
  divisional: 'Vargas', yogas: 'Yogas', doshas: 'Doshas',
  predictions: 'Predictions', ashtakavarga: 'Ashtakavarga', remedies: 'Remedies',
};

function renderApp() {
  app.innerHTML = `
    <header class="app-header">
      <span class="om-symbol">${icons.om}</span>
      <h1>Jyotish Vedic</h1>
      <p class="subtitle">Accurate Indian Astrology</p>
    </header>
    <div class="card fade-in" id="birth-card">
      <div class="card-header"><span class="icon">${icons.form}</span><h3>Birth Details</h3></div>
      ${renderBirthForm()}
    </div>
    <div id="results-area"></div>`;
  attachFormEvents();
}

function renderBirthForm() {
  return `<div class="birth-form">
    <div class="form-group"><label>Full Name</label><input type="text" id="name" placeholder="Enter name" value=""></div>
    <div class="form-group"><label>Date of Birth</label><input type="date" id="dob" value="1990-04-29"></div>
    <div class="form-group"><label>Time of Birth</label><input type="time" id="tob" value="21:15" step="60"></div>
    <div class="form-group"><label>Birth Place</label>
      <div class="location-wrapper">
        <input type="text" id="place" placeholder="Search city..." autocomplete="off" value="Hyderabad">
        <div class="location-dropdown" id="loc-dropdown"></div>
      </div>
    </div>
    <div class="form-group"><label>Latitude</label><input type="number" id="lat" step="0.0001" value="17.385"></div>
    <div class="form-group"><label>Longitude</label><input type="number" id="lon" step="0.0001" value="78.4867"></div>
  </div>
  <div class="btn-group">
    <button class="btn btn-primary" id="generate-btn">${icons.generate} Generate Kundli</button>
    <button class="btn btn-secondary" id="clear-btn">${icons.clear} Clear</button>
  </div>`;
}

function attachFormEvents() {
  document.getElementById('generate-btn').addEventListener('click', generateKundli);
  document.getElementById('clear-btn').addEventListener('click', () => { document.getElementById('results-area').innerHTML = ''; chartData = null; });
  const placeInput = document.getElementById('place');
  let debounce;
  placeInput.addEventListener('input', (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
      const results = await searchCity(e.target.value);
      const dd = document.getElementById('loc-dropdown');
      if (results.length > 0) {
        dd.innerHTML = results.map((r, i) => `<div class="location-item" data-idx="${i}" data-lat="${r.lat}" data-lon="${r.lon}">${r.name}${r.state ? ', ' + r.state : r.fullName ? ' — ' + r.fullName.substring(0, 40) : ''}</div>`).join('');
        dd.classList.add('active');
        dd.querySelectorAll('.location-item').forEach(item => {
          item.addEventListener('click', () => {
            placeInput.value = item.textContent.split(' — ')[0].split(',')[0];
            document.getElementById('lat').value = item.dataset.lat;
            document.getElementById('lon').value = item.dataset.lon;
            dd.classList.remove('active');
          });
        });
      } else dd.classList.remove('active');
    }, 300);
  });
  placeInput.addEventListener('blur', () => setTimeout(() => document.getElementById('loc-dropdown').classList.remove('active'), 200));
}

function generateKundli() {
  const dob = document.getElementById('dob').value;
  const tob = document.getElementById('tob').value;
  const lat = parseFloat(document.getElementById('lat').value);
  const lon = parseFloat(document.getElementById('lon').value);
  if (!dob || !tob || isNaN(lat) || isNaN(lon)) { alert('Please fill all birth details'); return; }

  // Parse date/time components manually to avoid timezone ambiguity
  // We create a UTC date that represents the local birth time,
  // so the engine's timezone subtraction produces the correct actual UTC
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = tob.split(':').map(Number);
  const birthDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

  const tz = 5.5;
  chartData = calculatePlanetaryPositions(birthDate, lat, lon, tz);
  dashaData = calculateVimshottariDasha(chartData.planets.MOON.sidereal, birthDate);
  currentTab = 'chart';
  renderResults();
}

function renderResults() {
  if (!chartData) return;
  const area = document.getElementById('results-area');
  const tabKeys = Object.keys(TAB_ICONS);
  area.innerHTML = `
    <div class="results-toolbar">
      <div class="tabs" id="main-tabs">${tabKeys.map(t =>
        `<button class="tab ${currentTab === t ? 'active' : ''}" data-tab="${t}"><span class="tab-icon">${TAB_ICONS[t]}</span><span class="tab-label">${TAB_LABELS[t]}</span></button>`
      ).join('')}</div>
      <button class="btn btn-pdf" id="download-pdf-btn">${icons.generate} Download PDF</button>
    </div>
    <div id="tab-content" class="fade-in">${renderTabContent()}</div>`;
  document.getElementById('download-pdf-btn')?.addEventListener('click', () => {
    const name = document.getElementById('name')?.value || 'Native';
    downloadKundliPDF(chartData, dashaData, name);
  });
  area.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      currentTab = this.dataset.tab;
      renderResults();
    });
  });
}

function renderTabContent() {
  const renderers = { chart: renderChartTab, report: renderReportTab, planets: renderPlanetsTab, dasha: renderDashaTab, panchang: renderPanchangTab, divisional: renderDivisionalTab, yogas: renderYogasTab, doshas: renderDoshasTab, predictions: renderPredictionsTab, ashtakavarga: renderAshtakavargaTab, remedies: renderRemediesTab };
  return (renderers[currentTab] || (() => ''))();
}

function renderChartTab() {
  const north = generateNorthIndianChart(chartData, { title: 'Rashi Chart (D-1)', showDegrees: true });
  const d9 = buildDivisionalChart(chartData, 'D9');
  const navamsa = generateNorthIndianChart(chartData, { title: 'Navamsha (D-9)', divisionData: d9 });
  const asc = chartData.ascendant;
  return `<div class="card"><div class="card-header"><span class="icon">${icons.chart}</span><h3>Birth Chart — Ascendant: ${asc.rashiName} (${asc.rashiSanskrit}) ${asc.dms.display}</h3></div>
    <div class="charts-grid"><div class="chart-container">${north}</div><div class="chart-container">${navamsa}</div></div></div>`;
}

function renderPlanetsTab() {
  let rows = '';
  for (const key of PLANET_ORDER) {
    const p = chartData.planets[key];
    rows += `<tr>
      <td><div class="planet-cell"><span class="planet-dot" style="background:${p.color};color:${p.color}"></span>${p.name} (${p.sanskrit})</div></td>
      <td>${p.rashiName} (${p.rashiSanskrit})</td><td>${p.dms.display}</td><td>${p.house}</td>
      <td>${p.nakshatra.name} (Pada ${p.nakshatra.pada})</td><td>${PLANETS[p.nakshatra.lord]?.name || p.nakshatra.lord}</td>
      <td><span class="badge ${p.dignity.status === 'exalted' ? 'badge-success' : p.dignity.status === 'debilitated' ? 'badge-danger' : p.dignity.status === 'own' || p.dignity.status === 'moolatrikona' ? 'badge-info' : 'badge-purple'}">${p.dignity.label}</span></td>
      <td>${p.retrograde ? '<span class="badge badge-warning">R</span>' : ''}${p.combust ? ' <span class="badge badge-danger">C</span>' : ''}</td></tr>`;
  }
  return `<div class="card"><div class="card-header"><span class="icon">${icons.planet}</span><h3>Planetary Positions</h3></div>
    <div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Planet</th><th>Rashi</th><th>Degree</th><th>House</th><th>Nakshatra</th><th>Nak. Lord</th><th>Dignity</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function renderDashaTab() {
  if (!dashaData) return '<div class="card"><p>No Dasha data</p></div>';
  const current = getCurrentDasha(dashaData);
  let currentInfo = '';
  if (current) {
    currentInfo = `<div class="card" style="border-color:rgba(245,158,11,0.3)"><div class="card-header"><span class="icon">${icons.clock}</span><h3>Current Dasha Period</h3></div>
      <div class="panchang-grid">
        <div class="panchang-item"><div class="label">Mahadasha</div><div class="value text-gold">${current.mahadasha}</div><div class="sub">${DASHA_YEARS[current.mahadasha]} years</div></div>
        <div class="panchang-item"><div class="label">Antardasha</div><div class="value">${current.antardasha || '—'}</div></div>
        <div class="panchang-item"><div class="label">Pratyantardasha</div><div class="value">${current.pratyantardasha || '—'}</div></div>
      </div></div>`;
  }
  let tree = '<ul class="dasha-tree">';
  for (const maha of dashaData) {
    tree += `<li class="dasha-item ${maha.isActive ? 'active' : ''}">
      <div class="dasha-header" onclick="this.querySelector('.arrow').classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
        <span class="arrow ${maha.isActive ? 'open' : ''}">${icons.arrowRight}</span>
        <span class="planet-name" style="color:${PLANETS[maha.lord]?.color || '#f1f5f9'}">${maha.lord} (${PLANETS[maha.lord]?.sanskrit || ''})</span>
        <span class="badge ${maha.isActive ? 'badge-success' : 'badge-info'}">${DASHA_YEARS[maha.lord]}y</span>
        <span class="dates">${formatDashaDate(maha.startDate)} → ${formatDashaDate(maha.endDate)}</span>
      </div><div class="dasha-children ${maha.isActive ? 'open' : ''}"><ul class="dasha-tree">`;
    for (const antar of maha.antardashas) {
      tree += `<li class="dasha-item ${antar.isActive ? 'active' : ''}">
        <div class="dasha-header" onclick="this.querySelector('.arrow').classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
          <span class="arrow ${antar.isActive ? 'open' : ''}">${icons.arrowRight}</span>
          <span class="planet-name">${antar.lord}</span>
          <span class="dates">${formatDashaDate(antar.startDate)} → ${formatDashaDate(antar.endDate)}</span>
        </div><div class="dasha-children ${antar.isActive ? 'open' : ''}"><ul class="dasha-tree">`;
      for (const prat of antar.pratyantardashas) {
        tree += `<li class="dasha-item ${prat.isActive ? 'active' : ''}"><div class="dasha-header">
          <span style="width:12px"></span><span>${prat.lord}</span>
          <span class="dates">${formatDashaDate(prat.startDate)} → ${formatDashaDate(prat.endDate)}</span>
          ${prat.isActive ? '<span class="badge badge-success">Now</span>' : ''}</div></li>`;
      }
      tree += '</ul></div></li>';
    }
    tree += '</ul></div></li>';
  }
  tree += '</ul>';
  return `${currentInfo}<div class="card"><div class="card-header"><span class="icon">${icons.barChart}</span><h3>Vimshottari Dasha — Full Timeline</h3></div>${tree}</div>`;
}

function renderPanchangTab() {
  const bd = chartData.birthData;
  const panch = calculatePanchang(bd.date, bd.latitude, bd.longitude, bd.timezone);
  return `<div class="card"><div class="card-header"><span class="icon">${icons.diya}</span><h3>Panchang</h3></div>
    <div class="panchang-grid stagger">
      <div class="panchang-item"><div class="label">Tithi</div><div class="value">${panch.tithi.name}</div><div class="sub">${panch.tithi.paksha}</div></div>
      <div class="panchang-item"><div class="label">Nakshatra</div><div class="value">${panch.nakshatra.name}</div><div class="sub">Pada ${panch.nakshatra.pada} · Lord: ${panch.nakshatra.lord}</div></div>
      <div class="panchang-item"><div class="label">Yoga</div><div class="value">${panch.yoga.name}</div></div>
      <div class="panchang-item"><div class="label">Karana</div><div class="value">${panch.karana.name}</div></div>
      <div class="panchang-item"><div class="label">Vara (Day)</div><div class="value">${panch.vara.name}</div><div class="sub">${panch.vara.sanskrit} · ${panch.vara.lord}</div></div>
      <div class="panchang-item"><div class="label">${icon('sun', 14)} Sunrise</div><div class="value">${formatPanchangTime(panch.sunrise)}</div></div>
      <div class="panchang-item"><div class="label">${icon('moon', 14)} Sunset</div><div class="value">${formatPanchangTime(panch.sunset)}</div></div>
      <div class="panchang-item time-warning"><div class="label">${icon('warning', 14)} Rahu Kalam</div><div class="value">${panch.rahuKalam ? formatPanchangTime(panch.rahuKalam.start) + ' – ' + formatPanchangTime(panch.rahuKalam.end) : 'N/A'}</div></div>
      <div class="panchang-item time-warning"><div class="label">${icon('warning', 14)} Gulika Kalam</div><div class="value">${panch.gulikaKalam ? formatPanchangTime(panch.gulikaKalam.start) + ' – ' + formatPanchangTime(panch.gulikaKalam.end) : 'N/A'}</div></div>
      <div class="panchang-item time-warning"><div class="label">${icon('warning', 14)} Yamagandam</div><div class="value">${panch.yamagandam ? formatPanchangTime(panch.yamagandam.start) + ' – ' + formatPanchangTime(panch.yamagandam.end) : 'N/A'}</div></div>
      <div class="panchang-item time-good"><div class="label">${icon('sparkle', 14)} Abhijit Muhurta</div><div class="value">${panch.abhijitMuhurta ? formatPanchangTime(panch.abhijitMuhurta.start) + ' – ' + formatPanchangTime(panch.abhijitMuhurta.end) : 'N/A'}</div></div>
    </div></div>`;
}

function renderDivisionalTab() {
  let html = '<div class="charts-grid">';
  for (const dc of DIVISIONAL_CHARTS.slice(0, 8)) {
    const divData = buildDivisionalChart(chartData, dc.id);
    if (!divData) continue;
    const svg = generateNorthIndianChart(chartData, { title: `${dc.name} (${dc.id})`, size: 320, divisionData: divData });
    html += `<div class="card"><div class="card-header"><span class="icon">${icons.barChart}</span><h3>${dc.id} — ${dc.name}</h3></div><p class="text-muted mb-1" style="font-size:0.85rem">${dc.purpose}</p><div class="chart-container">${svg}</div></div>`;
  }
  return html + '</div>';
}

function renderYogasTab() {
  const yogas = detectYogas(chartData);
  if (yogas.length === 0) return `<div class="card"><div class="card-header"><span class="icon">${icons.sparkle}</span><h3>Yogas</h3></div><p class="text-muted">No significant yogas detected.</p></div>`;
  let html = `<div class="card"><div class="card-header"><span class="icon">${icons.sparkle}</span><h3>Yogas Detected (${yogas.length})</h3></div><div class="stagger">`;
  for (const y of yogas) {
    html += `<div class="yoga-item ${y.impact === 'positive' ? 'yoga-positive' : 'yoga-negative'}">
      <h4>${y.name} <span class="badge ${y.impact === 'positive' ? 'badge-success' : 'badge-danger'}">${y.impact === 'positive' ? 'Benefic' : 'Malefic'}</span> <span class="badge badge-purple">${y.type}</span></h4>
      <p>${y.description}</p></div>`;
  }
  return html + '</div></div>';
}

function renderDoshasTab() {
  const doshas = analyzeAllDoshas(chartData);
  let html = '<div class="stagger">';
  const md = doshas.mangalDosha;
  html += `<div class="card"><div class="card-header"><span class="icon">${icons.mars}</span><h3>Mangal Dosha (Manglik)</h3></div>
    <div class="dosha-item ${md.isManglik ? 'dosha-active' : 'dosha-inactive'}">
      <h4>${md.isManglik ? icon('warning', 16) + ' Mangal Dosha Present' : icon('check', 16) + ' No Mangal Dosha'} <span class="badge ${md.isManglik ? 'badge-danger' : 'badge-success'}">${md.severity}</span></h4>
      <p>${md.description}</p>${md.cancellations.length > 0 ? '<p class="mt-1 text-success" style="font-size:0.85rem">Cancellations: ' + md.cancellations.join('; ') + '</p>' : ''}</div></div>`;
  const ks = doshas.kaalSarpDosha;
  html += `<div class="card"><div class="card-header"><span class="icon">${icons.snake}</span><h3>Kaal Sarp Dosha</h3></div>
    <div class="dosha-item ${ks.isPresent ? 'dosha-active' : 'dosha-inactive'}">
      <h4>${ks.isPresent ? icon('warning', 16) + ' ' + ks.type + ' Kaal Sarp Dosha' : ks.isPartial ? icon('warning', 16) + ' Partial Kaal Sarp' : icon('check', 16) + ' No Kaal Sarp Dosha'}</h4>
      <p>${ks.description}</p></div></div>`;
  const ss = doshas.sadeSati;
  html += `<div class="card"><div class="card-header"><span class="icon">${icons.saturn}</span><h3>Sade Sati</h3></div>
    <div class="dosha-item ${ss.isActive ? 'dosha-active' : ss.isDhaiya ? 'dosha-active' : 'dosha-inactive'}">
      <h4>${ss.isActive ? icon('warning', 16) + ' Sade Sati Active — ' + ss.phase : ss.isDhaiya ? icon('warning', 16) + ' Dhaiya Active' : icon('check', 16) + ' Sade Sati Not Active'}</h4>
      <p>${ss.description}</p></div></div>`;
  const pd = doshas.pitraDosha;
  html += `<div class="card"><div class="card-header"><span class="icon">${icons.pray}</span><h3>Pitra Dosha</h3></div>
    <div class="dosha-item ${pd.isPresent ? 'dosha-active' : 'dosha-inactive'}">
      <h4>${pd.isPresent ? icon('warning', 16) + ' Pitra Dosha Indicators Found' : icon('check', 16) + ' No Significant Pitra Dosha'} <span class="badge ${pd.isPresent ? 'badge-warning' : 'badge-success'}">${pd.severity}</span></h4>
      <p>${pd.description}</p></div></div></div>`;
  return html;
}

function renderPredictionsTab() {
  const preds = generateHousePredictions(chartData);
  let html = '<div class="stagger">';
  for (const pred of preds) {
    html += `<div class="prediction-card"><h4>${HOUSE_SIGNIFICATIONS[pred.house].name} — ${pred.sign} ${pred.planets.length > 0 ? '(' + pred.planets.join(', ') + ')' : ''}</h4><p>${pred.interpretation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>')}</p></div>`;
  }
  return `<div class="card"><div class="card-header"><span class="icon">${icons.crystal}</span><h3>House-wise Predictions</h3></div>${html}</div>`;
}

function renderAshtakavargaTab() {
  const ashtak = calculateSarvashtakavarga(chartData);
  const signs = RASHIS.map(r => r.sanskrit.substring(0, 3));
  let headerRow = '<th>Planet</th>' + signs.map(s => `<th>${s}</th>`).join('') + '<th>Total</th>';
  let rows = '';
  for (const [planet, bindhus] of Object.entries(ashtak.planetTables)) {
    const total = bindhus.reduce((a, b) => a + b, 0);
    rows += `<tr><td style="font-weight:600;color:${PLANETS[planet]?.color || '#fff'}">${planet}</td>${bindhus.map(b => `<td class="${b >= 5 ? 'ashtak-high' : b <= 2 ? 'ashtak-low' : ''}">${b}</td>`).join('')}<td style="font-weight:700">${total}</td></tr>`;
  }
  rows += `<tr style="background:rgba(245,158,11,0.08);font-weight:700"><td>SARVA</td>${ashtak.sarvashtakavarga.map(b => `<td class="${b >= 30 ? 'ashtak-high' : b <= 20 ? 'ashtak-low' : ''}">${b}</td>`).join('')}<td>${ashtak.total}</td></tr>`;
  return `<div class="card"><div class="card-header"><span class="icon">${icons.hash}</span><h3>Ashtakavarga</h3></div>
    <p class="text-muted mb-2" style="font-size:0.85rem">Benefic points (Bindhus) for each planet across 12 signs. Higher = stronger benefic influence.</p>
    <div style="overflow-x:auto"><table class="ashtak-table"><thead><tr>${headerRow}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function renderRemediesTab() {
  const recs = generateRecommendations(chartData);
  let html = '<div class="grid-2">';
  html += `<div class="card"><div class="card-header"><span class="icon">${icons.gem}</span><h3>Gemstone Recommendations</h3></div>`;
  for (const g of recs.gemstones) {
    html += `<div class="yoga-item yoga-positive"><h4>${g.primary}</h4><p>For ${PLANETS[g.planet]?.name || g.planet} (${g.reason})<br>Alternative: ${g.alternative}</p></div>`;
  }
  if (recs.gemstones.length === 0) html += '<p class="text-muted">No specific gemstone recommendations based on current analysis.</p>';
  html += '</div>';
  html += `<div class="card"><div class="card-header"><span class="icon">${icons.luck}</span><h3>Lucky Attributes</h3></div>
    <div class="panchang-grid">
      <div class="panchang-item"><div class="label">Colors</div><div class="value">${recs.colors.join(', ')}</div></div>
      <div class="panchang-item"><div class="label">Numbers</div><div class="value">${recs.numbers.join(', ')}</div></div>
      <div class="panchang-item"><div class="label">Days</div><div class="value">${recs.days.join(', ')}</div></div>
    </div></div>`;
  html += `<div class="card" style="grid-column:1/-1"><div class="card-header"><span class="icon">${icons.book}</span><h3>Complete Gemstone Reference</h3></div><div class="grid-3">`;
  for (const key of PLANET_ORDER) {
    if (!GEMSTONES[key]) continue;
    const g = GEMSTONES[key];
    html += `<div class="panchang-item"><div class="label" style="color:${PLANETS[key].color}">${PLANETS[key].name} (${PLANETS[key].sanskrit})</div><div class="value" style="font-size:0.95rem">${g.primary}</div><div class="sub">Alt: ${g.alternative}</div></div>`;
  }
  html += '</div></div></div>';
  return html;
}

function renderReportTab() {
  const report = generateFullReport(chartData, dashaData);
  let html = '';

  // Ascendant Profile
  if (report.ascendant) {
    const a = report.ascendant;
    html += `<div class="card"><div class="card-header"><span class="icon">${icons.chart}</span><h3>Your Ascendant — ${a.sign} (${a.title})</h3></div>
      <div class="report-sections stagger">
        <div class="report-section"><h4>${icon('planet', 16)} Personality</h4><p>${a.personality}</p></div>
        <div class="report-section"><h4>${icon('planet', 16)} Appearance</h4><p>${a.appearance}</p></div>
        <div class="report-section"><h4>${icon('planet', 16)} Nature</h4><p>${a.nature}</p></div>
        <div class="report-section"><h4>${icon('chart', 16)} Career Inclinations</h4><p>${a.career}</p></div>
        <div class="report-section"><h4>${icon('warning', 16)} Health Profile</h4><p>${a.health}</p></div>
        <div class="report-section"><h4>${icon('sparkle', 16)} Relationships</h4><p>${a.relationships}</p></div>
      </div></div>`;
  }

  // Nakshatra Phal
  if (report.nakshatra) {
    const n = report.nakshatra;
    html += `<div class="card"><div class="card-header"><span class="icon">${icons.diya}</span><h3>Nakshatra Phal — ${n.nakshatra}</h3></div>
      <p class="text-muted" style="margin-bottom:12px">Deity: ${n.deity} | Symbol: ${n.symbol} | Moon in ${n.moonSign} | Pada ${n.pada}</p>
      <div class="report-sections stagger">
        <div class="report-section"><h4>Personality</h4><p>${n.personality}</p></div>
        <div class="report-section"><h4>Key Traits</h4><p>${n.traits}</p></div>
        <div class="report-section"><h4>Life Path</h4><p>${n.life}</p></div>
      </div></div>`;
  }

  // Life Predictions
  if (report.lifePredictions) {
    const lp = report.lifePredictions;
    html += `<div class="card"><div class="card-header"><span class="icon">${icons.crystal}</span><h3>Life Predictions — ${lp.moonSign} (${lp.moonSanskrit}) Moon</h3></div>
      <div class="report-sections stagger">`;
    for (const sec of lp.sections) {
      html += `<div class="report-section"><h4>${sec.title}</h4><p>${sec.text}</p></div>`;
    }
    html += '</div></div>';
  }

  // Dasha Predictions
  if (report.dashaPredictions && report.dashaPredictions.length > 0) {
    html += `<div class="card"><div class="card-header"><span class="icon">${icons.clock}</span><h3>Vimshottari Mahadasha Phal</h3></div>
      <div class="report-sections stagger">`;
    for (const dp of report.dashaPredictions) {
      const dateRange = `${formatDashaDate(dp.startDate)} – ${formatDashaDate(dp.endDate)}`;
      html += `<div class="report-section dasha-prediction ${dp.isActive ? 'dasha-active' : ''}">
        <h4 style="color:${PLANETS[dp.lord]?.color || '#f1f5f9'}">${dp.lordName} Mahadasha ${dp.isActive ? '<span class="badge badge-success">Current</span>' : ''}
          <span class="dates" style="font-weight:400;font-size:0.85rem;color:#94a3b8"> (${dateRange})</span></h4>
        <p class="text-muted" style="font-size:0.85rem;margin-bottom:4px">${dp.lordName} in ${dp.sign} in your ${dp.house}${ordinal(dp.house)} house</p>
        <p>${dp.prediction}</p></div>`;
    }
    html += '</div></div>';
  }

  // Planetary Insights
  if (report.planetaryInsights && report.planetaryInsights.length > 0) {
    html += `<div class="card"><div class="card-header"><span class="icon">${icons.sparkle}</span><h3>Planetary Insights & Dignities</h3></div>
      <div class="report-sections stagger">`;
    for (const ins of report.planetaryInsights) {
      html += `<div class="report-section"><h4>${ins.planet} (${ins.sanskrit}) — House ${ins.house}, ${ins.sign}</h4>
        ${ins.notes.map(n => `<p>${n}</p>`).join('')}</div>`;
    }
    html += '</div></div>';
  }

  return html;
}

function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return (s[(v-20)%10] || s[v] || s[0]);
}

renderApp();

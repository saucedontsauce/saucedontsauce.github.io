
// ============================
//  Core Types & Utilities
// ============================
// Lookback (days) is adjustable via UI; persist it.
const LOOKBACK_DAYS_KEY = 'balance.forecast.lookbackDays';
let LOOKBACK_DAYS = Number(localStorage.getItem(LOOKBACK_DAYS_KEY) || 14);

const THRESHOLDS_KEY = 'balance.forecast.thresholds';
const DEFAULT_THRESHOLDS = { criticalDays: 14, watchDays: 45 };

function loadThresholds() {
    try {
        const t = JSON.parse(localStorage.getItem(THRESHOLDS_KEY) || 'null');
        if (!t) return { ...DEFAULT_THRESHOLDS };
        const criticalDays = Math.max(1, Number(t.criticalDays || DEFAULT_THRESHOLDS.criticalDays));
        const watchDays = Math.max(1, Number(t.watchDays || DEFAULT_THRESHOLDS.watchDays));
        return { criticalDays, watchDays };
    } catch {
        return { ...DEFAULT_THRESHOLDS };
    }
}

function saveThresholds({ criticalDays, watchDays }) {
    localStorage.setItem(THRESHOLDS_KEY, JSON.stringify({ criticalDays, watchDays }));
}
// Helper
const getLookbackHours = () => LOOKBACK_DAYS * 24;

// Keep last series for responsive redraw
let __lastSeries = null;

// Accepts Date, "yyyy-mm-dd", or "yyyy-mm-ddTHH:mm" (from <input type="datetime-local">)
// Snaps minutes/seconds/millis to :00 for hourly model.
const toDate = (d) => {
    if (!d) return null;
    if (d instanceof Date) {
        const dt = new Date(d);
        dt.setMinutes(0, 0, 0);
        return dt;
    }
    const str = String(d).trim();
    // If the string already contains time, don't append anything
    const hasTime = /T\d{2}:\d{2}/.test(str);
    const iso = hasTime ? str : (str + 'T00:00');
    const dt = new Date(iso);
    dt.setMinutes(0, 0, 0);
    return dt;
};

/** Add hours to a Date, returning a new Date snapped to the top of the hour. */
const addHours = (date, hours) => { const d = new Date(date); d.setHours(d.getHours() + hours, 0, 0, 0); return d; };

/** True if two dates have the same yyyy-mm-dd in local time. */
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Format a date nicely */
const fmtDate = (d) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(d);

/** Format a date+time nicely */
const fmtDateTime = (d) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(d);

/** Compare if two dates are in the same hour (local) */
const sameHour = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() && a.getHours() === b.getHours();

/** Humanize hours -> 'Xd Yh' */
const humanizeHours = (h) => { if (h == null) return ''; const d = Math.floor(h / 24); const r = h % 24; return d > 0 ? `${d} day${d === 1 ? '' : 's'}${r ? ` ${r} hour${r === 1 ? '' : 's'}` : ''}` : `${r} hour${r === 1 ? '' : 's'}`; };

/** Clamp a number to fixed decimals without trailing zeros */
const fmtNum = (n, max = 8) => {
    const s = n.toFixed(Math.min(max, 8));
    return s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
};

const MS_PER_HOUR = 3600 * 1000;

function olsSlope(points) {
    if (!points || points.length < 2) return 0;
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (const { x, y } of points) { sumX += x; sumY += y; sumXY += x * y; sumXX += x * x; }
    const denom = (n * sumXX - sumX * sumX);
    if (denom === 0) return 0;
    return (n * sumXY - sumX * sumY) / denom; // per-hour slope
}

function regressionRatePerHour(ledger, now = new Date(), lookbackHours = getLookbackHours()) {
    const nowH = toDate(now);
    const windowStart = new Date(nowH.getTime() - lookbackHours * MS_PER_HOUR);

    const events = ledger.changes
        .map(c => ({ ...c, at: (c.at instanceof Date ? c.at : toDate(c.at)) }))
        .filter(c => c.at && c.at >= windowStart && c.at <= nowH)
        .sort((a, b) => a.at - b.at);

    const points = [{ x: 0, y: 0 }];
    let cum = 0;
    for (const ev of events) {
        const xHours = Math.max(0, Math.round((ev.at - windowStart) / MS_PER_HOUR));
        cum += ev.amount;
        points.push({ x: xHours, y: cum });
    }
    points.push({ x: lookbackHours, y: cum });

    return { rate: olsSlope(points), hoursSpan: lookbackHours, points };
}



// ============================
//  Data Model
// ============================
class Change {
    /**
     * One-time payment event.
     * @param {{amount:number, at: Date|string, label?:string}} p
     */
    constructor({ amount, at, label = '' }) {
        this.amount = Number(amount);
        if (Number.isNaN(this.amount)) throw new Error('Change.amount must be a number');
        this.at = toDate(at) || toDate(new Date());
        this.label = label || '';
    }
    /** Is this one-time payment applied in hour d? */
    activeOn(d) { return sameHour(d, this.at); }
}


class Ledger {
    /** @param {{currency:string, startingBalance:number, changes?:Change[]}} p */
    constructor({ currency = 'LTC', startingBalance = 0, changes = [] } = {}) {
        this.currency = currency;
        this.startingBalance = Number(startingBalance) || 0;
        this.changes = [...changes];
    }
    add(change) { this.changes.push(change); return this; }
    remove(idx) { this.changes.splice(idx, 1); }
    /** Net change on a given day by summing all active changes */
    netOn(d) { return this.changes.reduce((sum, c) => sum + (c.activeOn(d) ? c.amount : 0), 0); }
}

// ============================
//  Forecasting
// ============================
function forecastRunway({ ledger, from = new Date(), horizonHours = 24 * 365 * 5 }) {
    const startDate = toDate(from);
    const { rate } = regressionRatePerHour(ledger, startDate, getLookbackHours()); // per-hour

    const series = [{ date: startDate, balance: ledger.startingBalance }];
    let bal = ledger.startingBalance;
    let d = startDate;
    let hours = 0;
    let hitDate = null;

    if (rate >= 0) {
        for (let i = 0; i < horizonHours; i++) {
            bal += rate;
            d = addHours(d, 1);
            series.push({ date: d, balance: bal });
            hours++;
        }
        __lastSeries = series;
        return { date: null, hours: null, exhausted: false, series, ratePerHour: rate };
    }

    for (let i = 0; i < horizonHours; i++) {
        if (bal <= 0) { hitDate = d; break; }
        bal += rate;
        d = addHours(d, 1);
        series.push({ date: d, balance: bal });
        hours++;
    }

    const exhausted = series[series.length - 1].balance <= 0 || !!hitDate;
    if (!hitDate && exhausted) hitDate = series[series.length - 1].date;

    __lastSeries = series;
    return { date: hitDate, hours: hitDate ? Math.max(0, hours) : null, exhausted, series, ratePerHour: rate };
}




function simulateSeries({ ledger, from = new Date(), hours = 24 * 365 }) {
    const startDate = toDate(from);
    const { rate } = regressionRatePerHour(ledger, startDate, getLookbackHours());
    const series = [{ date: startDate, balance: ledger.startingBalance }];
    let bal = ledger.startingBalance, d = startDate;
    for (let i = 0; i < hours; i++) {
        bal += rate; d = addHours(d, 1);
        series.push({ date: d, balance: bal });
    }
    return series;
}


// ============================
//  Simple State (Local Storage)
// ============================
const STORE_KEY = 'balance.forecast.state';
const loadState = () => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; }
};
const saveState = (state) => localStorage.setItem(STORE_KEY, JSON.stringify(state));

// ============================
//  Minimal UI Layer
// ============================
const els = {
    currency: document.getElementById('currency'),
    sym: document.getElementById('sym'),
    balance: document.getElementById('balance'),
    saveSetup: document.getElementById('saveSetup'),
    reset: document.getElementById('reset'),
    addChange: document.getElementById('addChange'),
    chgLabel: document.getElementById('chgLabel'),
    chgAmount: document.getElementById('chgAmount'),
    chgWhen: document.getElementById('chgWhen'),
    changesWrap: document.getElementById('changesWrap'),
    results: document.getElementById('results'),
    chart: document.getElementById('chart'),
    lookback: document.getElementById('lookback'),
    threshCriticalDays: document.getElementById('threshCriticalDays'),
    threshWatchDays: document.getElementById('threshWatchDays'),
};

// Initialize fields from saved state
const state = loadState();
els.currency.value = state.currency || 'LTC';
els.sym.textContent = els.currency.value;
els.balance.value = state.balance ?? '';

/** @type {Ledger} */
let ledger = new Ledger({ currency: els.currency.value, startingBalance: Number(els.balance.value || 0), changes: [] });

const savedChanges = Array.isArray(state.changes) ? state.changes : [];
savedChanges.forEach(c => ledger.add(new Change({ amount: c.amount, at: c.at || c.start, label: c.label })));


// Init lookback UI
if (els.lookback) els.lookback.value = String(LOOKBACK_DAYS);
els.lookback?.addEventListener('change', () => {
    const v = Number(els.lookback.value);
    LOOKBACK_DAYS = isFinite(v) && v > 0 ? v : 14;
    localStorage.setItem(LOOKBACK_DAYS_KEY, String(LOOKBACK_DAYS));
    updateAll();
});

// Init thresholds UI
let thresholds = loadThresholds();
if (els.threshCriticalDays) els.threshCriticalDays.value = String(thresholds.criticalDays);
if (els.threshWatchDays) els.threshWatchDays.value = String(thresholds.watchDays);

function applyThresholdsFromUI() {
    let crit = Math.max(1, Number(els.threshCriticalDays?.value || thresholds.criticalDays));
    let watch = Math.max(1, Number(els.threshWatchDays?.value || thresholds.watchDays));

    // Ensure watch ≥ critical
    if (watch < crit) watch = crit;

    thresholds = { criticalDays: crit, watchDays: watch };
    if (els.threshCriticalDays) els.threshCriticalDays.value = String(crit);
    if (els.threshWatchDays) els.threshWatchDays.value = String(watch);
    saveThresholds(thresholds);
}

els.threshCriticalDays?.addEventListener('change', () => { applyThresholdsFromUI(); updateAll(); });
els.threshWatchDays?.addEventListener('change', () => { applyThresholdsFromUI(); updateAll(); });



function persist() {
    const safeISO = (x) => {
        try { return x instanceof Date ? x.toISOString() : (x ? new Date(x).toISOString() : null); }
        catch { return null; }
    };

    saveState({
        currency: ledger.currency,
        balance: ledger.startingBalance,
        changes: ledger.changes.map(c => ({
            amount: c.amount,
            at: safeISO(c.at),
            label: c.label
        }))
    });
}

function renderChanges() {
    if (!ledger.changes.length) {
        els.changesWrap.innerHTML = '<div class="empty">No payments yet — add one above.</div>';
        return;
    }
    const rows = ledger.changes.map((c, i) => `
        <tr>
          <td><strong>${c.label || '—'}</strong><br/><small>One-time</small></td>
          <td class="mono">${fmtNum(c.amount)}</td>
          <td><small>${c.at ? fmtDateTime(c.at) : '—'}</small></td>
          <td style="text-align:right"><button class="btn" data-remove="${i}">Remove</button></td>
        </tr>
      `).join('');
    els.changesWrap.innerHTML = `
        <table>
          <thead><tr><th>Label</th><th>Amount</th><th>Active</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
    els.changesWrap.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-remove'));
            ledger.remove(idx); persist(); updateAll();
        });
    });
}

function renderResults() {
    const { date, hours, exhausted, series, ratePerHour } = forecastRunway({ ledger, from: new Date() });
    const ratePerDay = ratePerHour * 24;
    let html = '';

    if (!ledger.changes.length || ledger.startingBalance === 0) {
        els.results.classList.add('empty');
        els.results.innerHTML = 'Enter a balance and at least one payment to see your forecast…';
    } else {
        els.results.classList.remove('empty');
        const rateStr = `${ratePerDay >= 0 ? '+' : ''}${fmtNum(ratePerDay, 6)}/day`;
        if (date && exhausted) {
            const criticalH = thresholds.criticalDays * 24;
            const warnH = thresholds.watchDays * 24;
            const badge = hours <= criticalH ? 'danger' : (hours <= warnH ? 'warn' : 'ok');
            html =
                `Avg rate (${LOOKBACK_DAYS}d): <strong class="mono">${rateStr}</strong><br/>` +
                `Balance will run out in <strong>${humanizeHours(hours)}</strong> — on <strong>${fmtDateTime(date)}</strong> ` +
                `<span class="badge ${badge}">${hours <= criticalH ? 'Critical' : hours <= warnH ? 'Watch' : 'Healthy'}</span>`;
        } else {
            html =
                `Avg rate (${LOOKBACK_DAYS}d): <strong class="mono">${rateStr}</strong><br/>` +
                `Balance does <strong>not</strong> run out within the simulation horizon. 🎉`;
        }
        els.results.innerHTML =
            html + `<div class="hint" style="margin-top:6px">Horizon: ${series.length - 1} hours (~${Math.floor((series.length - 1) / 24)} days) from now.</div>`;
    }
    drawChart(series);
}



function drawChart(series) {
    const svg = els.chart; while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Make width truly responsive
    const container = svg.parentElement || svg;
    const bboxW = container.getBoundingClientRect().width;
    const W = Math.max(400, Math.floor(bboxW || 800));
    const H = 300; // a little taller to reduce cramping
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.width = '100%';
    svg.style.height = 'auto';

    // More breathing room for labels
    const pad = { l: 60, r: 20, t: 16, b: 44 };
    const innerW = W - pad.l - pad.r; const innerH = H - pad.t - pad.b;

    // Scales
    const xs = (i) => pad.l + (i / Math.max(1, series.length - 1)) * innerW;
    const maxBal = Math.max(...series.map(p => p.balance));
    const minBal = Math.min(...series.map(p => p.balance));
    const yMax = Math.max(0, maxBal);
    const yMin = Math.min(0, minBal);
    const yRange = yMax - yMin || 1;
    const ys = (v) => pad.t + (1 - (v - yMin) / yRange) * innerH;

    // Grid lines (0 and quartiles)
    const grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const gridVals = [yMin, (yMin + yMax) / 2, yMax];
    gridVals.forEach(val => {
        const y = ys(val);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', pad.l); line.setAttribute('x2', W - pad.r); line.setAttribute('y1', y); line.setAttribute('y2', y);
        line.setAttribute('stroke', '#223041'); line.setAttribute('stroke-dasharray', '4 6');
        grid.appendChild(line);
        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', 8); txt.setAttribute('y', y + 4); txt.setAttribute('fill', '#7b8a9a'); txt.setAttribute('font-size', '12');
        txt.textContent = fmtNum(val);
        grid.appendChild(txt);
    });
    svg.appendChild(grid);

    // Path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = series.map((p, i) => `${i ? 'L' : 'M'} ${xs(i)} ${ys(p.balance)}`).join(' ');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'url(#grad)'); path.setAttribute('stroke-width', '2.5');
    svg.appendChild(path);

    // Gradient stroke
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'grad'); grad.setAttribute('x1', '0'); grad.setAttribute('x2', '1'); grad.setAttribute('y1', '0'); grad.setAttribute('y2', '0');
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#79c0ff');
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#b892ff');
    grad.appendChild(stop1); grad.appendChild(stop2); defs.appendChild(grad); svg.insertBefore(defs, svg.firstChild);

    // Zero line
    const zeroY = ys(0);
    const zero = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    zero.setAttribute('x1', pad.l); zero.setAttribute('x2', W - pad.r); zero.setAttribute('y1', zeroY); zero.setAttribute('y2', zeroY);
    zero.setAttribute('stroke', '#3a495e'); zero.setAttribute('stroke-width', '1.5');
    svg.appendChild(zero);

    // Markers (start & zero‑cross if any)
    const circ = (cx, cy, fill) => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', 4); c.setAttribute('fill', fill); return c; };
    svg.appendChild(circ(xs(0), ys(series[0].balance), '#79c0ff'));
    const firstZeroIdx = series.findIndex(p => p.balance <= 0);
    if (firstZeroIdx > -1) svg.appendChild(circ(xs(firstZeroIdx), ys(series[firstZeroIdx].balance), '#ff6b6b'));

    // X labels (first, middle, last)
    const dateLbl = (i, anchor = 'middle') => {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', xs(i)); t.setAttribute('y', H - 8); t.setAttribute('fill', '#7b8a9a'); t.setAttribute('font-size', '12'); t.setAttribute('text-anchor', anchor);
        t.textContent = fmtDateTime(series[i].date);
        svg.appendChild(t);
    };
    dateLbl(0, 'start');
    dateLbl(Math.floor(series.length / 2));
    dateLbl(series.length - 1, 'end');
}

function updateAll() {
    renderChanges(); renderResults(); persist();
}

// Events
els.currency.addEventListener('change', () => { ledger.currency = els.currency.value; els.sym.textContent = ledger.currency; persist(); });
els.saveSetup.addEventListener('click', () => {
    ledger.currency = els.currency.value;
    ledger.startingBalance = Number(els.balance.value || 0);
    els.sym.textContent = ledger.currency; updateAll();
});
els.reset.addEventListener('click', () => {
    localStorage.removeItem(STORE_KEY);
    ledger = new Ledger({ currency: 'LTC', startingBalance: 0, changes: [] });
    els.currency.value = 'LTC'; els.sym.textContent = 'LTC'; els.balance.value = '';
    renderChanges(); renderResults();
});

els.addChange.addEventListener('click', () => {
    const amount = Number(els.chgAmount.value);
    if (Number.isNaN(amount)) { alert('Please enter a numeric amount'); return; }
    const label = els.chgLabel.value.trim();
    const whenStr = els.chgWhen.value || new Date().toISOString().slice(0, 16);
    ledger.add(new Change({ amount, at: whenStr, label }));
    els.chgAmount.value = ''; els.chgLabel.value = ''; els.chgWhen.value = '';
    updateAll();
});


// First paint
updateAll();

window.addEventListener('resize', () => {
    if (__lastSeries && __lastSeries.length) drawChart(__lastSeries);
});

// ============================
//  Public API (for integration)
// ============================
window.BalanceForecast = Object.freeze({
    Change,
    Ledger,
    forecastRunway,
    simulateSeries,
    utils: { addHours, toDate, sameDay, sameHour, fmtDate, fmtDateTime, fmtNum, humanizeHours }
});
const $ = (selector) => document.querySelector(selector);

function splitEmail(email) {
    const at = email.lastIndexOf("@");
    if (at === -1) return { local: "", domain: "" };
    return { local: email.slice(0, at), domain: email.slice(at + 1).toLowerCase() };
}

const vowelRegex = new RegExp("[AEIOUaeiou]", "gi");
const letterRegex = new RegExp("[A-Za-z]", "g");

const POPULAR_DOMAINS = new Set(Object.keys({
    "gmail.com": true,
    "yahoo.com": true,
    "outlook.com": true,
    "hotmail.com": true,
    "icloud.com": true,
    "proton.me": true,
    "protonmail.com": true,
    "aol.com": true,
    "live.com": true,
    "hotmail.co.uk": true
}));

const DISPOSABLE_DOMAINS = new Set(Object.keys({
    "mailinator.com": true,
    "guerrillamail.com": true,
    "10minutemail.com": true,
    "tempmail.email": true,
    "yopmail.com": true,
    "trashmail.com": true,
    "getnada.com": true,
    "fakeinbox.com": true,
    "maildrop.cc": true
}));

const COMMON_TLDS = new Set(Object.keys({
    "com": true,
    "net": true,
    "org": true,
    "edu": true,
    "gov": true,
    "io": true,
    "co": true,
    "me": true,
    "ai": true,
    "uk": true,
    "de": true,
    "fr": true,
    "es": true,
    "it": true,
    "nl": true,
    "ca": true,
    "au": true
}));
const BASIC_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const hasConsecutiveDots = (s) => s.includes("..");
export const labelLengthsOk = (d) => d.split(".").every(l => l.length > 0 && l.length <= 63);
export const totalLengthOk = (e) => e.length <= 254;
export const localLengthOk = (l) => l.length > 0 && l.length <= 64;
export const startsOrEndsWithDot = (p) => p.startsWith(".") || p.endsWith(".");
export const tldLooksOk = (d) => { const t = d.split("."); if (t.length < 2) return false; const tl = t.at(-1); return /^[a-z]{2,63}$/.test(tl); };
export const tldIsCommon = (d) => COMMON_TLDS.has(d.split(".").pop());
export const isDisposable = (d) => DISPOSABLE_DOMAINS.has(d);

function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }
    return dp[m][n];
}

function bestDomainSuggestion(domain) {
    let best = null, bestDist = Infinity;
    for (const d of POPULAR_DOMAINS) {
        const dist = levenshtein(domain, d);
        if (dist < bestDist) { bestDist = dist; best = d; }
    }
    return bestDist <= 2 ? best : null;
}

function computeConfidence(email) {
    const checks = [];
    let score = 100;

    const { local, domain } = splitEmail(email);

    if (!BASIC_REGEX.test(email)) { score -= 40; checks.push(["❌ Invalid basic format", false]); }
    else checks.push(["✅ Basic format ok", true]);

    if (!totalLengthOk(email)) { score -= 15; checks.push(["❌ Over 254 chars", false]); }
    else checks.push(["✅ Total length ok", true]);

    if (!localLengthOk(local)) { score -= 10; checks.push(["❌ Local part length invalid", false]); }
    else checks.push(["✅ Local part length ok", true]);

    if (hasConsecutiveDots(local) || hasConsecutiveDots(domain)) { score -= 10; checks.push(["❌ Consecutive dots found", false]); }
    else checks.push(["✅ No consecutive dots", true]);

    if (startsOrEndsWithDot(local) || startsOrEndsWithDot(domain)) { score -= 10; checks.push(["❌ Starts/ends with a dot", false]); }
    else checks.push(["✅ No leading/trailing dots", true]);

    if (!labelLengthsOk(domain)) { score -= 8; checks.push(["❌ Domain label length issue", false]); }
    else checks.push(["✅ Domain label lengths ok", true]);

    if (!tldLooksOk(domain)) { score -= 12; checks.push(["❌ Suspicious/absent TLD", false]); }
    else checks.push(["✅ TLD looks valid", true]);

    if (local.includes("+")) checks.push(["ℹ️ Plus addressing detected", true]);

    if (isDisposable(domain)) { score -= 35; checks.push(["⚠️ Disposable/temporary domain detected", false]); }

    if (tldIsCommon(domain)) { score += 3; checks.push(["✅ Common TLD", true]); }

    score = Math.max(0, Math.min(100, Math.round(score)));

    const typoDomain = bestDomainSuggestion(domain);
    let suggestion = "Looks good! You can proceed with confidence.";
    if (typoDomain && typoDomain !== domain) {
        suggestion = `Did you mean <strong>${local}@${typoDomain}</strong>?`;
        if (score > 80) score = 80;
    }
    if (!BASIC_REGEX.test(email)) suggestion = "Check for missing '@', extra spaces, or missing domain part.";
    if (isDisposable(domain)) suggestion = "This looks like a disposable address. Consider requesting a permanent email.";

    return { score, checks, suggestion, typoDomain };
}

// --- UI helpers ---
function setBarAppearance(el, score) {
    el.style.width = score + "%";
    el.textContent = score + "%";
    el.classList.remove("bg-success", "bg-warning", "bg-danger");
    if (score >= 80) el.classList.add("bg-success");
    else if (score >= 50) el.classList.add("bg-warning");
    else el.classList.add("bg-danger");
}

function setBadgeAppearance(badgeEl, score) {
    badgeEl.textContent = isNaN(score) ? "--%" : `${score}%`;
    badgeEl.classList.remove("text-bg-success", "text-bg-warning", "text-bg-danger", "text-bg-secondary");
    if (isNaN(score)) {
        badgeEl.classList.add("text-bg-secondary");
    } else if (score >= 80) {
        badgeEl.classList.add("text-bg-success");
    } else if (score >= 50) {
        badgeEl.classList.add("text-bg-warning");
    } else {
        badgeEl.classList.add("text-bg-danger");
    }
}

function renderResults({ score, checks, suggestion }) {
    const list = document.getElementById("validityList");
    list.innerHTML = "";
    checks.forEach(([text]) => {
        const li = document.createElement("li");
        li.innerHTML = text;
        list.appendChild(li);
    });

    document.getElementById("confidenceScore").textContent = score + "%";
    setBarAppearance(document.getElementById("confidenceBar"), score);

    document.getElementById("suggestionsText").innerHTML = suggestion;
    document.getElementById("resultsContainer").classList.remove("d-none");
}

function renderChecklist(container, checks) {
    // green for true-ish lines, red for explicit failures, gray for info
    container.innerHTML = checks.map(([text, ok]) => {
        let klass = "text-secondary";
        if (ok === true) klass = "text-success";
        if (ok === false) klass = "text-danger";
        return `<div class="${klass}">• ${text}</div>`;
    }).join("");
}

function showToast(message) {
    const toastEl = document.getElementById('copyToast');
    const bodyEl = document.getElementById('copyToastBody');
    bodyEl.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// --- Wire up ---
const emailInput = document.getElementById("emailInput");
const liveBadge = document.getElementById("liveBadge");
const fixBtn = document.getElementById("fixBtn");
const checklistEl = document.getElementById("liveChecklist");

document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const results = computeConfidence(email);
    renderResults(results);
    //setBadgeAppearance(liveBadge, results.score);
});

// As-you-type updates: badge, checklist, and fix-btn state
emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();
    if (!value) {
        //setBadgeAppearance(liveBadge, NaN);
        checklistEl.innerHTML = "";
        fixBtn.title = "No typo suggestion yet";
        return;
    }
    const results = computeConfidence(value);
    //setBadgeAppearance(liveBadge, results.score);
    renderChecklist(checklistEl, results.checks);
});



/**
 * Rechenfix Smoke Test v3.1 — 9 automated checks per Rechner.
 *
 * USAGE:
 *   1. Open https://www.rechenfix.de (or any Rechenfix page) in the browser.
 *   2. Open DevTools → Console.
 *   3. Paste this entire file.
 *   4. Run `await runSmokeTestV3()`.
 *   5. Watch the live log; result table printed at the end.
 *   6. Full result set available at `window.__smokeTestResults`.
 *
 * DESIGN:
 *   - Discovers Rechner URLs from /sitemap.xml.
 *   - Loads each URL inside a hidden <iframe> so DOM state is isolated.
 *   - Waits for iframe `load`, then runs all checks against iframe.contentDocument.
 *   - No build integration — pure runtime script, consistent with v2.1.
 *
 * EXIT CONDITIONS:
 *   - Aborts current URL after 15 s if iframe never loads.
 *   - Captures per-check exceptions so one bad check does not kill the sweep.
 *
 * V3 additions over v2.1 (Prompt 85, Rezept-Umrechner audit, April 2026):
 *   C1  Division-by-zero resistance
 *   C2  Reset button restores sensible state
 *   C3  JS-side input clamping (min/max)
 *   C4  aria-live without double prefix
 *   C5  Plural correctness on unit output
 *   C6  Sidebar category matches current route
 *   C7  Title consistency (length, single suffix)
 *   C8  Copy button produces non-empty output
 *   C9  No unresolved template placeholders
 *
 * V3.1 changes (Prompt 87, April 2026):
 *   C8  — Replace clipboard.readText() with UI-feedback check
 *          (button text / aria-live / toast change). Clipboard API is
 *          blocked in cross-origin iframes — produced 156 false-positives.
 *   C2  — Broaden post-reset number scan to include table/hero/result/
 *          faktor containers. Rezept-Umrechner showed reset-state numbers
 *          only in the result-table, which the narrow scan missed.
 */

(function () {
  'use strict';

  // ------ Configuration --------------------------------------------------------

  const SITEMAP_URL = '/sitemap.xml';
  const IFRAME_TIMEOUT_MS = 15000;
  const SETTLE_MS = 400; // Let React render results after iframe load
  const MAX_TITLE_LEN = 72;
  const TITLE_EXCEPTIONS = new Set([
    '/gesundheit/schwangerschaft-gewicht-rechner',
  ]);

  // Meta-pages excluded from the sweep.
  const META_PATHS = new Set([
    '/',
    '/impressum',
    '/datenschutz',
    '/barrierefreiheit',
    '/suche',
    '/ki-rechner',
    '/ueber-uns',
    '/kontakt',
    '/feedback',
  ]);

  // Category slugs — anything directly under `/<slug>/` counts as a Rechner.
  const CATEGORY_SLUGS = new Set([
    'finanzen', 'alltag', 'wohnen', 'arbeit',
    'gesundheit', 'auto', 'kochen', 'mathe', 'sport',
  ]);

  // Units that should pluralise. Extend as new patterns appear.
  // Each entry: singular → expected plural. The check flags "(2+) singular".
  const UNIT_PLURAL = {
    'Prise': 'Prisen',
    'Dose': 'Dosen',
    'Tasse': 'Tassen',
    'Packung': 'Packungen',
    'Flasche': 'Flaschen',
    'Stück': 'Stück', // invariant — won't trigger
    'Scheibe': 'Scheiben',
    'Zehe': 'Zehen',
    'Blatt': 'Blätter',
    'Bund': 'Bunde',
  };

  // ------ State ----------------------------------------------------------------

  const results = {
    startedAt: null,
    finishedAt: null,
    total: 0,
    checked: 0,
    passed: 0,
    failed: 0,
    errors: 0,
    perRechner: [], // { url, fails: [{check, detail}], errors: [] }
  };

  // ------ Helpers --------------------------------------------------------------

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function fetchSitemapUrls() {
    const res = await fetch(SITEMAP_URL, { credentials: 'omit' });
    if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
    const xml = await res.text();
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const locs = Array.from(doc.querySelectorAll('url > loc')).map((n) => n.textContent.trim());
    const paths = locs.map((u) => {
      try { return new URL(u).pathname; } catch { return null; }
    }).filter(Boolean);
    return Array.from(new Set(paths)).filter(isRechnerPath).sort();
  }

  function isRechnerPath(p) {
    if (META_PATHS.has(p)) return false;
    const parts = p.split('/').filter(Boolean);
    // Rechner paths look like /<category>/<slug>
    if (parts.length !== 2) return false;
    return CATEGORY_SLUGS.has(parts[0]);
  }

  function currentCategoryFromPath(p) {
    return p.split('/').filter(Boolean)[0] || null;
  }

  function loadInIframe(url) {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1200px;height:900px;border:0;';
      iframe.src = url;
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error(`timeout after ${IFRAME_TIMEOUT_MS} ms`));
      }, IFRAME_TIMEOUT_MS);
      function cleanup() {
        clearTimeout(timer);
        iframe.removeEventListener('load', onLoad);
      }
      function onLoad() {
        clearTimeout(timer);
        resolve({ iframe, dispose: () => iframe.remove() });
      }
      iframe.addEventListener('load', onLoad);
      document.body.appendChild(iframe);
    });
  }

  // Dispatch change + input + blur so React's controlled inputs actually pick up the value.
  function setInputValue(input, value) {
    const proto = input.tagName === 'SELECT'
      ? HTMLSelectElement.prototype
      : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(input, String(value));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  function queryResultArea(doc) {
    // Best-effort: grab the live region + any obvious result container.
    const nodes = new Set();
    doc.querySelectorAll('[aria-live], [data-result], [role="status"]').forEach((n) => nodes.add(n));
    // Fallback: sections near the top that contain "Ergebnis" text
    doc.querySelectorAll('section, div').forEach((el) => {
      if (/Ergebnis/i.test(el.getAttribute('aria-label') || '')) nodes.add(el);
    });
    return Array.from(nodes);
  }

  function getResultText(doc) {
    return queryResultArea(doc).map((n) => n.textContent || '').join(' \n ');
  }

  function findButtonByText(doc, regex) {
    for (const b of doc.querySelectorAll('button, [role="button"]')) {
      if (regex.test((b.textContent || '').trim())) return b;
    }
    return null;
  }

  // ------ Checks ---------------------------------------------------------------

  function checkC1_DivisionByZero(doc, recordFail) {
    const numberInputs = Array.from(doc.querySelectorAll('input[type="number"]'));
    for (const input of numberInputs) {
      const original = input.value;
      for (const testValue of [0, '', -1]) {
        setInputValue(input, testValue);
        const text = getResultText(doc);
        if (/\bInfinity\b/.test(text) || /\bNaN\b/.test(text) || /\bundefined\b/.test(text)) {
          recordFail('C1', `input[name=${input.name || input.id || '?'}]=${JSON.stringify(testValue)} → "${text.slice(0, 80)}"`);
          break;
        }
      }
      // Restore
      setInputValue(input, original);
    }
  }

  async function checkC2_ResetButton(doc, recordFail) {
    const btn = findButtonByText(doc, /zur[uü]cksetzen|^reset\b/i);
    if (!btn) return; // No reset button — nothing to test

    // Pre-condition: mutate inputs so reset actually has work to do.
    const inputs = Array.from(doc.querySelectorAll('input[type="number"]'));
    for (const input of inputs) setInputValue(input, 999);
    await sleep(150);

    btn.click();
    await sleep(300);

    // Check A: at least one number input holds a positive value.
    const inputsAfter = Array.from(doc.querySelectorAll('input[type="number"]'));
    const anyInputPositive = inputsAfter.some((i) => {
      const v = parseFloat(i.value);
      return !isNaN(v) && v > 0;
    });

    // Check B: some number is visible in a broad set of result containers.
    // Intentionally wide — Rezept-Umrechner shows reset numbers in the
    // ingredients table, which a narrow [aria-live] scan misses. Better a
    // false negative than another false positive on a working Rechner.
    const scanRoots = [
      ...doc.querySelectorAll('[class*="result" i], [class*="ergebnis" i]'),
      ...doc.querySelectorAll('table'),
      ...doc.querySelectorAll('[aria-live]'),
      ...doc.querySelectorAll('[class*="hero" i], [class*="factor" i], [class*="faktor" i]'),
    ];
    const numberRegex = /\d[\d.,]*/;
    const anyNumberVisible = scanRoots.some((el) => numberRegex.test(el.textContent || ''));

    if (anyInputPositive && anyNumberVisible) return;
    if (!anyInputPositive) {
      recordFail('C2', 'Reset: alle Inputs sind 0 oder leer');
      return;
    }
    recordFail('C2', 'Reset: Inputs gesetzt, aber kein Ergebnis/Zahl sichtbar');
  }

  async function checkC3_Clamping(doc, recordFail) {
    const inputs = Array.from(doc.querySelectorAll('input[type="number"]'));
    for (const input of inputs) {
      const max = input.max !== '' ? parseFloat(input.max) : null;
      const min = input.min !== '' ? parseFloat(input.min) : null;
      if (max != null && !isNaN(max)) {
        setInputValue(input, max + 100);
        await sleep(50);
        const raw = parseFloat(input.value);
        if (!isNaN(raw) && raw > max) {
          recordFail('C3', `max=${max}, Eingabe ${max + 100} → Wert ${raw} bleibt (name=${input.name || input.id || '?'})`);
        }
      }
      if (min != null && !isNaN(min)) {
        setInputValue(input, min - 100);
        await sleep(50);
        const raw = parseFloat(input.value);
        if (!isNaN(raw) && raw < min) {
          recordFail('C3', `min=${min}, Eingabe ${min - 100} → Wert ${raw} bleibt (name=${input.name || input.id || '?'})`);
        }
      }
    }
  }

  function checkC4_AriaLiveDouble(doc, recordFail) {
    const live = Array.from(doc.querySelectorAll('[aria-live]'));
    for (const el of live) {
      const t = (el.textContent || '').trim();
      // Match "Word: Word:" where both Words are identical (>3 chars to avoid "Kg: kg:")
      const m = t.match(/\b([\wÄÖÜäöüß-]{4,})\s*:\s*\1\s*:/);
      if (m) {
        recordFail('C4', `aria-live Prefix-Dopplung: "${t.slice(0, 80)}"`);
      }
    }
  }

  function checkC5_PluralUnits(doc, recordFail) {
    const text = getResultText(doc);
    for (const [sing, plural] of Object.entries(UNIT_PLURAL)) {
      if (sing === plural) continue;
      // Match "2 Prise", "3 Dose", "12 Tasse" (but not "1 Prise"/"1 Dose")
      const re = new RegExp(`\\b([2-9]|\\d{2,})(?:[,.]\\d+)?\\s+${sing}\\b(?!\\w)`, 'g');
      const match = re.exec(text);
      if (match) {
        recordFail('C5', `"${match[0]}" statt "${match[1]} ${plural}"`);
      }
    }
  }

  function checkC6_SidebarCategory(doc, currentPath, recordFail) {
    const cat = currentCategoryFromPath(currentPath);
    if (!cat) return;
    const aside = doc.querySelector('aside');
    if (!aside) return; // Layout may be different on mobile; don't fail
    const links = Array.from(aside.querySelectorAll('a[href]'));
    const bad = [];
    for (const a of links) {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/')) continue;
      const parts = href.split('/').filter(Boolean);
      if (parts.length === 0) continue; // root
      const firstSeg = parts[0];
      if (META_PATHS.has(href)) continue;
      if (!CATEGORY_SLUGS.has(firstSeg)) continue;
      if (firstSeg !== cat) bad.push(href);
    }
    if (bad.length > 0) {
      recordFail('C6', `Sidebar zeigt ${bad.length} fremde Kategorie-Links (erwartet /${cat}/…, Bsp: ${bad[0]})`);
    }
  }

  function checkC7_Title(doc, currentPath, recordFail) {
    const title = doc.title || '';
    const suffix = ' | Rechenfix.de';
    // Endet genau auf Suffix?
    if (!title.endsWith(suffix)) {
      recordFail('C7', `Title endet nicht auf "${suffix}": "${title}"`);
    }
    // "Rechenfix" kommt nicht doppelt?
    const matches = title.match(/Rechenfix/g) || [];
    if (matches.length > 1) {
      recordFail('C7', `"Rechenfix" ${matches.length}× im Title: "${title}"`);
    }
    // Länge ≤ 72, mit dokumentierter Ausnahme
    if (title.length > MAX_TITLE_LEN && !TITLE_EXCEPTIONS.has(currentPath)) {
      recordFail('C7', `Title-Länge ${title.length} > ${MAX_TITLE_LEN}: "${title}"`);
    }
  }

  async function checkC8_CopyButton(doc, recordFail) {
    // Filter out the "Fix erklärt / Feedback" button which also contains "Copy"
    // in some rechner — we only want the primary result-copy button.
    const copyBtn = Array.from(doc.querySelectorAll('button'))
      .find((b) => /kopieren|copy/i.test(b.textContent || '')
        && !/feedback/i.test(b.textContent || ''));
    if (!copyBtn) return;
    if (copyBtn.disabled) {
      recordFail('C8', 'Copy-Button ist disabled');
      return;
    }

    // Snapshot UI state before clicking. We do NOT use navigator.clipboard —
    // cross-origin iframes block both read and write, so only DOM observability
    // is reliable. If the button produces any visible feedback (label swap,
    // aria-live update, or a toast/snackbar node appearing), that is what the
    // user actually sees and is what we consider "working".
    const textBefore = (copyBtn.textContent || '').trim();
    const ariaLiveBefore = Array.from(doc.querySelectorAll('[aria-live]'))
      .map((e) => (e.textContent || '').trim()).join('|');
    const TOAST_SEL = '[role="status"], [class*="toast" i], [class*="snackbar" i], [class*="notification" i]';
    const toastCountBefore = doc.querySelectorAll(TOAST_SEL).length;

    copyBtn.click();
    await sleep(350);

    const textAfter = (copyBtn.textContent || '').trim();
    const textChanged = textBefore !== textAfter;

    const ariaLiveAfter = Array.from(doc.querySelectorAll('[aria-live]'))
      .map((e) => (e.textContent || '').trim()).join('|');
    const ariaLiveChanged = ariaLiveBefore !== ariaLiveAfter;

    const toastCountAfter = doc.querySelectorAll(TOAST_SEL).length;
    const toastAppeared = toastCountAfter > toastCountBefore;

    if (textChanged || ariaLiveChanged || toastAppeared) return;
    recordFail('C8', 'Kein UI-Feedback nach Copy-Klick (Button-Text, aria-live, Toast alle unverändert)');
  }

  function checkC9_Placeholders(doc, recordFail) {
    // Scan rendered calc area + SEO content. Ignore raw <script> blocks.
    const main = doc.querySelector('main') || doc.body;
    const text = main.textContent || '';
    const re = /\{\{?\s*[a-zA-Z_][\w.]*\s*\}?\}/g;
    const m = text.match(re);
    if (m && m.length > 0) {
      recordFail('C9', `${m.length} offene Platzhalter, u. a. "${m[0]}"`);
    }
  }

  // ------ Per-URL runner -------------------------------------------------------

  async function runChecksForUrl(url) {
    const entry = { url, fails: [], errors: [] };
    const recordFail = (check, detail) => entry.fails.push({ check, detail });

    let handle;
    try {
      handle = await loadInIframe(url);
    } catch (e) {
      entry.errors.push(`load: ${e.message}`);
      return entry;
    }

    await sleep(SETTLE_MS);
    const doc = handle.iframe.contentDocument;

    if (!doc) {
      entry.errors.push('iframe contentDocument null (cross-origin?)');
      handle.dispose();
      return entry;
    }

    const safe = async (name, fn) => {
      try { await fn(); } catch (e) { entry.errors.push(`${name}: ${e.message}`); }
    };

    // Checks are ordered so destructive ones (C1, C2, C3) come last,
    // because they mutate inputs. Read-only checks run first on pristine DOM.
    await safe('C4', () => checkC4_AriaLiveDouble(doc, recordFail));
    await safe('C5', () => checkC5_PluralUnits(doc, recordFail));
    await safe('C6', () => checkC6_SidebarCategory(doc, url, recordFail));
    await safe('C7', () => checkC7_Title(doc, url, recordFail));
    await safe('C9', () => checkC9_Placeholders(doc, recordFail));
    await safe('C8', () => checkC8_CopyButton(doc, recordFail));
    // Destructive:
    await safe('C1', () => checkC1_DivisionByZero(doc, recordFail));
    await safe('C3', () => checkC3_Clamping(doc, recordFail));
    await safe('C2', () => checkC2_ResetButton(doc, recordFail));

    handle.dispose();
    return entry;
  }

  // ------ Entry point ----------------------------------------------------------

  async function runSmokeTestV3(options = {}) {
    const { limit = Infinity, filter = null } = options;
    console.log('%cSMOKE TEST v3', 'font-weight:bold;font-size:14px;');
    console.log('Discovering Rechner URLs via sitemap …');
    let urls;
    try {
      urls = await fetchSitemapUrls();
    } catch (e) {
      console.error('sitemap fetch failed:', e);
      return;
    }
    if (filter) urls = urls.filter((u) => filter.test(u));
    urls = urls.slice(0, limit);

    results.startedAt = new Date().toISOString();
    results.total = urls.length;
    results.checked = 0;
    results.passed = 0;
    results.failed = 0;
    results.errors = 0;
    results.perRechner = [];

    console.log(`Found ${urls.length} Rechner. Starting sweep …`);

    for (const url of urls) {
      const entry = await runChecksForUrl(url);
      results.perRechner.push(entry);
      results.checked++;
      if (entry.fails.length === 0 && entry.errors.length === 0) {
        results.passed++;
      } else {
        if (entry.fails.length > 0) results.failed++;
        if (entry.errors.length > 0) results.errors++;
      }
      const status = entry.fails.length === 0 && entry.errors.length === 0 ? '✅' : '❌';
      console.log(`${status} [${results.checked}/${urls.length}] ${url}  fails=${entry.fails.length}  errors=${entry.errors.length}`);
    }

    results.finishedAt = new Date().toISOString();
    window.__smokeTestResults = results;
    printSummary(results);
    return results;
  }

  function printSummary(r) {
    const lines = [];
    lines.push('');
    lines.push(`SMOKE TEST v3 — ${r.total} Rechner, 9 Checks`);
    lines.push('======================================');
    lines.push(`✅ ${r.passed} Rechner: alle Checks grün`);
    const problematic = r.perRechner.filter((e) => e.fails.length || e.errors.length);
    lines.push(`❌ ${problematic.length} Rechner mit Fails/Errors:`);
    lines.push('');
    const CHECK_LABELS = {
      C1: 'Division-by-zero',
      C2: 'Reset-Button',
      C3: 'Clamping',
      C4: 'aria-live Prefix',
      C5: 'Plural',
      C6: 'Sidebar-Kategorie',
      C7: 'Title',
      C8: 'Copy-Button',
      C9: 'Placeholder',
    };
    for (const e of problematic) {
      lines.push(`  ${e.url}`);
      for (const f of e.fails) lines.push(`    ✗ ${f.check} (${CHECK_LABELS[f.check] || ''}): ${f.detail}`);
      for (const err of e.errors) lines.push(`    ‼ runtime: ${err}`);
      lines.push('');
    }
    const totalFails = r.perRechner.reduce((s, e) => s + e.fails.length, 0);
    lines.push(`Gesamt: ${totalFails} Fails in ${problematic.length} Rechnern`);
    console.log(lines.join('\n'));
  }

  // Export
  window.runSmokeTestV3 = runSmokeTestV3;
  console.log('Smoke Test v3 geladen. `await runSmokeTestV3()` ausführen.');
  console.log('Optionen: `runSmokeTestV3({ limit: 5 })` oder `{ filter: /finanzen/ }`.');
})();

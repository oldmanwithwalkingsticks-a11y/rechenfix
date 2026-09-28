/**
 * Rechenfix Smoke Test v3.4 — 10 automated checks per Rechner.
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
 *   C3b Typing a valid value keystroke by keystroke keeps it (added in v3.2)
 *
 * V3.1 changes (Prompt 87, April 2026):
 *   C8  — Replace clipboard.readText() with UI-feedback check
 *          (button text / aria-live / toast change). Clipboard API is
 *          blocked in cross-origin iframes — produced 156 false-positives.
 *   C2  — Broaden post-reset number scan to include table/hero/result/
 *          faktor containers. Rezept-Umrechner showed reset-state numbers
 *          only in the result-table, which the narrow scan missed.
 *
 * V3.2 changes (28.09.2026):
 *   Kategorien — werden aus der Sitemap abgeleitet (erste Ebene jedes
 *          zweistufigen Pfads außer /blog/) statt aus einer festen Liste, weil
 *          die feste Liste die Kategorie `technik` nicht kannte und deren 15
 *          Rechner seit ihrer Einführung ungeprüft blieben. Die Ausgabe zählt
 *          die geprüften Seiten je Kategorie.
 *   Feld verlassen — setInputValue löst zusätzlich `focusout` aus. React
 *          (ab 17) hängt `onBlur` an `focusout`; das bisherige `blur`-Ereignis
 *          allein erreichte `onBlur` nie. C3 prüft damit nach dem Verlassen
 *          des Feldes, wie ein Nutzer es erlebt.
 *   C3b  — neuer Check: je Zahlenfeld mit min und max einen gültigen Wert aus
 *          der Mitte Zeichen für Zeichen tippen (je Zeichen ein input-Ereignis),
 *          dann das Feld verlassen; der Wert muss danach genau so im Feld
 *          stehen. Fängt Klammerungen, die schon beim Tippen die Untergrenze
 *          erzwingen und damit gültige Eingaben unmöglich machen, z. B. „80“ in
 *          einem Feld 30–250 (aus „8“ wird 30, aus „300“ wird 250).
 *
 * V3.3 (28.09.2026): C3b tippt zusätzlich den größten gültigen Wert ab „1“, C3 und C3b erfassen Textfelder über data-min/data-max (NummerEingabe), der Sitemap-Abruf nutzt credentials 'same-origin'.
 * V3.4 (28.09.2026): C3b tippt in Dezimalfeldern (step oder Grenze nicht ganzzahlig, inputmode="decimal") zusätzlich die Mitte mit einer Nachkommastelle und Komma, z. B. „1,5“ bei 0–3; Befund bei mehr als 0,1 Abweichung.
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
  // Seit v3.2 aus der Sitemap abgeleitet (fetchSitemapUrls): jede erste Ebene
  // eines zweistufigen Pfads, außer den hier genannten. Eine neue Kategorie
  // kann so nicht mehr ungeprüft bleiben.
  const KEINE_KATEGORIE = new Set(['blog']);
  let CATEGORY_SLUGS = new Set();

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
    // same-origin (v3.3): schickt das Vercel-Anmeldecookie mit, damit der Test
    // auch auf einer geschützten Vorschau läuft; auf www.rechenfix.de ohne Wirkung.
    const res = await fetch(SITEMAP_URL, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
    const xml = await res.text();
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const locs = Array.from(doc.querySelectorAll('url > loc')).map((n) => n.textContent.trim());
    const paths = locs.map((u) => {
      try { return new URL(u).pathname; } catch { return null; }
    }).filter(Boolean);
    const unique = Array.from(new Set(paths));
    CATEGORY_SLUGS = new Set(
      unique
        .filter((p) => !META_PATHS.has(p))
        .map((p) => p.split('/').filter(Boolean))
        .filter((parts) => parts.length === 2 && !KEINE_KATEGORIE.has(parts[0]))
        .map((parts) => parts[0]),
    );
    return unique.filter(isRechnerPath).sort();
  }

  /** „alltag 24 · arbeit 17 · …“ — Seiten je Kategorie, alphabetisch. */
  function zaehleJeKategorie(urls) {
    const z = {};
    for (const u of urls) {
      const k = currentCategoryFromPath(u);
      z[k] = (z[k] || 0) + 1;
    }
    return Object.keys(z).sort().map((k) => `${k} ${z[k]}`).join(' · ');
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
    setzeRohwert(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    verlasseFeld(input);
  }

  // Wert am React-Tracker vorbei setzen, ohne Ereignis.
  function setzeRohwert(input, value) {
    const proto = input.tagName === 'SELECT'
      ? HTMLSelectElement.prototype
      : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(input, String(value));
  }

  // Feld verlassen wie ein Nutzer: blur und focusout. React (ab 17) hängt
  // onBlur an focusout — blur allein erreicht onBlur nicht (v3.2).
  function verlasseFeld(input) {
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
  }

  // Tippen nachspielen: Feld leeren, dann je Zeichen den aktuellen Feldinhalt
  // um das Zeichen verlängern und ein input-Ereignis auslösen — so sieht ein
  // controlled input echte Tastendrücke, inklusive jeder Zwischenklammerung.
  async function tippe(input, text) {
    setzeRohwert(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(20);
    for (const zeichen of text) {
      setzeRohwert(input, input.value + zeichen);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(20);
    }
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

  // Felder mit Grenzen für C3/C3b: <input type="number"> mit min/max und seit
  // v3.3 Textfelder mit data-min/data-max (NummerEingabe gibt ihre Grenzen so
  // aus). data-* hat Vorrang vor min/max.
  const GRENZ_FELDER = 'input[type="number"], input[data-min], input[data-max]';
  function grenzen(input) {
    const lies = (dataAttr, attr) => {
      const v = input.getAttribute(dataAttr) ?? input.getAttribute(attr);
      return v !== null && v !== '' ? parseFloat(v) : null;
    };
    return { min: lies('data-min', 'min'), max: lies('data-max', 'max') };
  }

  async function checkC3_Clamping(doc, recordFail) {
    const inputs = Array.from(doc.querySelectorAll(GRENZ_FELDER));
    for (const input of inputs) {
      const { min, max } = grenzen(input);
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

  // C3b (v3.2): Ein gültiger Wert muss sich Zeichen für Zeichen eintippen
  // lassen. Ziel ist eine ganze Zahl aus der Mitte von min..max (auf das
  // step-Raster gesetzt, falls step ≥ 1). Ganze Zahlen, weil ein Zahlenfeld
  // halbe Eingaben wie „5.“ als leeren Wert meldet — das wäre ein Artefakt der
  // Simulation, kein Fehler des Rechners. Felder ohne min und max: übersprungen.
  function mitteImRaster(min, max, stepAttr) {
    let ziel = Math.round((min + max) / 2);
    const step = parseFloat(stepAttr);
    if (!isNaN(step) && step >= 1) ziel = min + Math.round((ziel - min) / step) * step;
    if (!Number.isInteger(ziel) || ziel < min || ziel > max) return null;
    return ziel;
  }

  // v3.3: Zweiter Wert für C3b — der größte gültige Wert mit mindestens zwei
  // Stellen, der mit „1“ beginnt (15 bei 2–15, 19 bei 18–99, 199 bei 30–250).
  // „1“ ist die kleinste mögliche erste Ziffer; greift eine Untergrenze zu früh,
  // zeigt sie sich genau hier. Ohne solchen Wert (etwa bei 0–4): null.
  function groessterWertAbEins(min, max, stepAttr) {
    const step = parseFloat(stepAttr);
    const raster = !isNaN(step) && step >= 1 ? step : 1;
    for (let stellen = String(Math.floor(max)).length; stellen >= 2; stellen--) {
      const unten = 10 ** (stellen - 1); // 10, 100, …
      const oben = 2 * 10 ** (stellen - 1) - 1; // 19, 199, …
      const roh = Math.min(Math.floor(max), oben);
      const ziel = min + Math.floor((roh - min) / raster) * raster;
      if (Number.isInteger(ziel) && ziel >= Math.max(min, unten) && ziel <= max && String(ziel)[0] === '1') {
        return ziel;
      }
    }
    return null;
  }

  // v3.4: Dezimalfelder — step nicht ganzzahlig oder „any“, eine Grenze nicht
  // ganzzahlig, oder inputmode="decimal". In ihnen tippt C3b zusätzlich einen
  // Wert mit Komma. Ein Zahlenfeld (type="number") verwirft das Komma: aus
  // „1,5“ wird bei Tastatureingabe in Chromium (de-DE) 15; in dieser
  // Simulation leert das Komma das Feld (Wertbereinigung für type="number").
  function istDezimalfeld(input, min, max) {
    const step = (input.getAttribute('step') || '').trim().toLowerCase();
    if (step === 'any') return true;
    const stepZahl = parseFloat(step);
    if (!isNaN(stepZahl) && !Number.isInteger(stepZahl)) return true;
    if (!Number.isInteger(min) || !Number.isInteger(max)) return true;
    return (input.getAttribute('inputmode') || '').trim().toLowerCase() === 'decimal';
  }

  // Zielwert für Dezimalfelder: Untergrenze plus halber Abstand, auf eine
  // Nachkommastelle gerundet und immer mit einer Nachkommastelle und Komma
  // geschrieben („1,5“ bei 0–3, „140,0“ bei 30–250) — das Komma steht so in
  // jedem Fall im Getippten. Die Rundung weicht höchstens 0,05 von der Mitte
  // ab; ein Befund ist erst eine Abweichung über das Doppelte, 0,1.
  const DEZIMAL_RUNDUNG = 0.05;
  function dezimalMitte(min, max) {
    const mitte = min + (max - min) / 2;
    const ziel = Math.round(mitte * 10) / 10;
    return { mitte, text: ziel.toFixed(1).replace('.', ',') };
  }

  async function checkC3b_Tippen(doc, recordFail) {
    const inputs = Array.from(doc.querySelectorAll(GRENZ_FELDER));
    for (const input of inputs) {
      if (input.disabled || input.readOnly) continue;
      const { min, max } = grenzen(input);
      if (min === null || max === null || isNaN(min) || isNaN(max) || max <= min) continue;
      const ziele = [
        ['Mitte', mitteImRaster(min, max, input.step)],
        ['ab 1', groessterWertAbEins(min, max, input.step)],
      ].filter(([, z], i, alle) => z !== null && alle.findIndex(([, w]) => w === z) === i);
      for (const [art, ziel] of ziele) {
        await tippe(input, String(ziel));
        verlasseFeld(input);
        await sleep(50);
        const ist = parseFloat(input.value);
        if (ist !== ziel) {
          recordFail('C3b', `min=${min}, max=${max}, ${art}: „${ziel}“ Zeichen für Zeichen getippt → Wert ${input.value === '' ? '(leer)' : input.value} (name=${input.name || input.id || '?'})`);
        }
      }
      // v3.4: Dezimaleingabe mit Komma. Gelesen wird mit Komma und Punkt als
      // gleichwertigem Dezimalzeichen.
      if (istDezimalfeld(input, min, max)) {
        const { mitte, text } = dezimalMitte(min, max);
        await tippe(input, text);
        verlasseFeld(input);
        await sleep(50);
        const ist = parseFloat(input.value.replace(',', '.'));
        if (isNaN(ist) || Math.abs(ist - mitte) > 2 * DEZIMAL_RUNDUNG) {
          recordFail('C3b', `min=${min}, max=${max}, Dezimal: „${text}“ Zeichen für Zeichen getippt → Wert ${input.value === '' ? '(leer)' : input.value} (name=${input.name || input.id || '?'})`);
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

    // Checks are ordered so destructive ones (C1, C2, C3, C3b) come last,
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
    await safe('C3b', () => checkC3b_Tippen(doc, recordFail));
    await safe('C2', () => checkC2_ResetButton(doc, recordFail));

    handle.dispose();
    return entry;
  }

  // ------ Entry point ----------------------------------------------------------

  async function runSmokeTestV3(options = {}) {
    const { limit = Infinity, filter = null } = options;
    console.log('%cSMOKE TEST v3.4', 'font-weight:bold;font-size:14px;');
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

    console.log(`Found ${urls.length} Rechner (${zaehleJeKategorie(urls)}). Starting sweep …`);

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
    lines.push(`SMOKE TEST v3.4 — ${r.total} Rechner, 10 Checks`);
    lines.push('======================================');
    lines.push(`Seiten je Kategorie: ${zaehleJeKategorie(r.perRechner.map((e) => e.url))}`);
    lines.push(`✅ ${r.passed} Rechner: alle Checks grün`);
    const problematic = r.perRechner.filter((e) => e.fails.length || e.errors.length);
    lines.push(`❌ ${problematic.length} Rechner mit Fails/Errors:`);
    lines.push('');
    const CHECK_LABELS = {
      C1: 'Division-by-zero',
      C2: 'Reset-Button',
      C3: 'Clamping',
      C3b: 'Tippen',
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
  console.log('Smoke Test v3.4 geladen. `await runSmokeTestV3()` ausführen.');
  console.log('Optionen: `runSmokeTestV3({ limit: 5 })` oder `{ filter: /finanzen/ }`.');
})();

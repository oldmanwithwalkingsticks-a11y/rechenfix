/*!
 * Rechenfix Raucher-Rechner — Embed-Widget (Backlink-Asset)
 * https://www.rechenfix.de/gesundheit/raucher-rechner
 *
 * Dependency-frei, Vanilla-JS. Läuft auf fremden Seiten ohne Build-Step.
 * Einbetten:
 *   <div id="rechenfix-raucher"></div>
 *   <script src="https://www.rechenfix.de/embed/raucher-widget.js" async></script>
 *
 * WICHTIG — Formel dupliziert:
 *   Quelle: lib/berechnungen/raucher.ts, Stand 2026-07-14.
 *   Bei Lib-Änderung (Formel/Konstanten) MUSS diese Datei mitgepflegt werden.
 *   Konstante hier relevant: RENDITE = 0.05 (5 % p. a.).
 */
(function () {
  'use strict';

  // ---- Berechnung (1:1-Port aus lib/berechnungen/raucher.ts, Stand 2026-07-14) ----
  var RENDITE = 0.05; // 5 % p. a.

  function berechneRaucherKosten(e) {
    var preisProZigarette = e.preisProPackung / e.zigarettenProPackung;
    var kostenProTag = e.zigarettenProTag * preisProZigarette;
    var kostenProWoche = kostenProTag * 7;
    var kostenProMonat = kostenProTag * 30.44; // Durchschnittliche Tage pro Monat
    var kostenProJahr = kostenProTag * 365.25;
    var kostenGesamt = kostenProJahr * e.jahreGeraucht;

    var zigarettenGesamt = Math.round(e.zigarettenProTag * 365.25 * e.jahreGeraucht);

    // Investment: FV = PMT × ((1+r)^n − 1) / r,  r = monatlicher Zins, n = Monate
    var monatlicheRate = kostenProMonat;
    var monatszins = RENDITE / 12;
    var monate = e.jahreGeraucht * 12;
    var investmentWert = monatszins > 0
      ? monatlicheRate * ((Math.pow(1 + monatszins, monate) - 1) / monatszins)
      : monatlicheRate * monate;

    return {
      kostenProTag: kostenProTag,
      kostenProWoche: kostenProWoche,
      kostenProMonat: kostenProMonat,
      kostenProJahr: kostenProJahr,
      kostenGesamt: kostenGesamt,
      zigarettenGesamt: zigarettenGesamt,
      investmentWert: investmentWert
    };
  }

  // ---- Formatierung (de-DE) ----
  var euroFmt, zahlFmt;
  try {
    euroFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    zahlFmt = new Intl.NumberFormat('de-DE');
  } catch (err) {
    euroFmt = { format: function (n) { return n.toFixed(2) + ' €'; } };
    zahlFmt = { format: function (n) { return String(n); } };
  }
  var DASH = '–';
  function euro(n) { return (isFinite(n)) ? euroFmt.format(n) : DASH; }
  function zahl(n) { return (isFinite(n)) ? zahlFmt.format(n) : DASH; }

  // ---- Eingabe-Parsing ----
  function num(v) {
    var n = parseFloat(String(v).replace(',', '.'));
    return isFinite(n) ? n : NaN;
  }
  function gueltig(e) {
    return e.zigarettenProTag > 0 &&
      e.preisProPackung > 0 &&
      e.zigarettenProPackung > 0 &&
      e.jahreGeraucht > 0;
  }

  // ---- Styles (scoped unter #rechenfix-raucher, Präfix rfx-) ----
  var P600 = '#2563EB', P700 = '#1D4ED8', ACCENT = '#F59E0B';
  var CSS = [
    '#rechenfix-raucher{all:initial;display:block;box-sizing:border-box;',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;',
    'max-width:420px;margin:0 auto;color:#1f2937;line-height:1.5;',
    'background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;',
    'box-shadow:0 1px 3px rgba(0,0,0,.08);padding:20px;}',
    '#rechenfix-raucher *,#rechenfix-raucher *::before,#rechenfix-raucher *::after{box-sizing:border-box;}',
    '#rechenfix-raucher .rfx-h{margin:0 0 4px;font-size:18px;font-weight:700;color:' + P700 + ';}',
    '#rechenfix-raucher .rfx-sub{margin:0 0 16px;font-size:13px;color:#6b7280;}',
    '#rechenfix-raucher .rfx-field{margin-bottom:12px;}',
    '#rechenfix-raucher .rfx-field label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:4px;}',
    '#rechenfix-raucher .rfx-field input{width:100%;height:44px;padding:0 12px;font-size:16px;color:#111827;',
    'background:#fff;border:1px solid #d1d5db;border-radius:10px;outline:none;-webkit-appearance:none;appearance:none;}',
    '#rechenfix-raucher .rfx-field input:focus{border-color:' + P600 + ';box-shadow:0 0 0 3px rgba(37,99,235,.15);}',
    '#rechenfix-raucher .rfx-out{margin-top:16px;background:#f9fafb;border:1px solid #eef1f5;border-radius:12px;padding:14px 16px;}',
    '#rechenfix-raucher .rfx-row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:5px 0;font-size:14px;}',
    '#rechenfix-raucher .rfx-row .rfx-k{color:#4b5563;}',
    '#rechenfix-raucher .rfx-row .rfx-v{font-weight:600;color:#111827;font-variant-numeric:tabular-nums;white-space:nowrap;}',
    '#rechenfix-raucher .rfx-hr{height:1px;background:#e5e7eb;margin:8px 0;border:0;}',
    '#rechenfix-raucher .rfx-big .rfx-k{font-weight:700;color:#111827;}',
    '#rechenfix-raucher .rfx-big .rfx-v{font-size:18px;color:' + P700 + ';}',
    '#rechenfix-raucher .rfx-invest .rfx-v{color:' + ACCENT + ';}',
    '#rechenfix-raucher .rfx-cta{display:block;margin-top:16px;text-align:center;font-size:14px;font-weight:700;',
    'text-decoration:none;color:#fff;background:' + P600 + ';padding:12px 16px;border-radius:10px;}',
    '#rechenfix-raucher .rfx-cta:hover{background:' + P700 + ';}',
    '#rechenfix-raucher .rfx-note{margin:10px 0 0;font-size:11px;color:#9ca3af;text-align:center;}',
    '#rechenfix-raucher .rfx-note a{color:#6b7280;}'
  ].join('');

  function injectStyles() {
    if (document.getElementById('rfx-raucher-styles')) return;
    var s = document.createElement('style');
    s.id = 'rfx-raucher-styles';
    s.type = 'text/css';
    s.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(s);
  }

  // ---- DOM-Aufbau ----
  function field(id, labelText, value, extra) {
    var wrap = document.createElement('div');
    wrap.className = 'rfx-field';
    var lab = document.createElement('label');
    lab.setAttribute('for', id);
    lab.textContent = labelText;
    var inp = document.createElement('input');
    inp.id = id;
    inp.value = value;
    if (extra && extra.type) inp.type = extra.type; else inp.type = 'number';
    if (extra) {
      if (extra.min != null) inp.setAttribute('min', extra.min);
      if (extra.step != null) inp.setAttribute('step', extra.step);
      if (extra.inputmode) inp.setAttribute('inputmode', extra.inputmode);
    }
    wrap.appendChild(lab);
    wrap.appendChild(inp);
    return { wrap: wrap, input: inp };
  }

  function row(key, cls) {
    var r = document.createElement('div');
    r.className = 'rfx-row' + (cls ? ' ' + cls : '');
    var k = document.createElement('span');
    k.className = 'rfx-k';
    k.textContent = key;
    var v = document.createElement('span');
    v.className = 'rfx-v';
    v.textContent = '–';
    r.appendChild(k);
    r.appendChild(v);
    return { row: r, value: v };
  }

  function render(container) {
    injectStyles();
    container.innerHTML = '';

    var h = document.createElement('p');
    h.className = 'rfx-h';
    h.textContent = 'Raucher-Kostenrechner';
    var sub = document.createElement('p');
    sub.className = 'rfx-sub';
    sub.textContent = 'Was kostet das Rauchen — und was wäre daraus geworden?';
    container.appendChild(h);
    container.appendChild(sub);

    var fZig = field('rfx-zig-tag', 'Zigaretten pro Tag', '15', { min: '1', step: '1', inputmode: 'numeric' });
    var fPreis = field('rfx-preis', 'Preis pro Packung (€)', '9,00', { type: 'text', inputmode: 'decimal' });
    var fStk = field('rfx-stk', 'Stück pro Packung', '20', { min: '1', step: '1', inputmode: 'numeric' });
    var fJahre = field('rfx-jahre', 'Jahre geraucht', '10', { min: '1', step: '1', inputmode: 'numeric' });
    container.appendChild(fZig.wrap);
    container.appendChild(fPreis.wrap);
    container.appendChild(fStk.wrap);
    container.appendChild(fJahre.wrap);

    var out = document.createElement('div');
    out.className = 'rfx-out';
    var rTag = row('Pro Tag');
    var rWoche = row('Pro Woche');
    var rMonat = row('Pro Monat');
    var rJahr = row('Pro Jahr');
    var hr1 = document.createElement('hr'); hr1.className = 'rfx-hr';
    var rGesamt = row('Kosten gesamt', 'rfx-big');
    var rZigG = row('Zigaretten gesamt');
    var hr2 = document.createElement('hr'); hr2.className = 'rfx-hr';
    var rInvest = row('Angelegt bei 5 % p. a.', 'rfx-invest rfx-big');
    out.appendChild(rTag.row);
    out.appendChild(rWoche.row);
    out.appendChild(rMonat.row);
    out.appendChild(rJahr.row);
    out.appendChild(hr1);
    out.appendChild(rGesamt.row);
    out.appendChild(rZigG.row);
    out.appendChild(hr2);
    out.appendChild(rInvest.row);
    container.appendChild(out);

    var cta = document.createElement('a');
    cta.className = 'rfx-cta';
    cta.href = 'https://www.rechenfix.de/gesundheit/raucher-rechner';
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.textContent = 'Vollständiger Raucher-Rechner auf rechenfix.de';
    container.appendChild(cta);

    var note = document.createElement('p');
    note.className = 'rfx-note';
    note.innerHTML = 'Kostenloser Rechner von <a href="https://www.rechenfix.de" target="_blank" rel="noopener">rechenfix.de</a>';
    container.appendChild(note);

    function update() {
      var e = {
        zigarettenProTag: num(fZig.input.value),
        preisProPackung: num(fPreis.input.value),
        zigarettenProPackung: num(fStk.input.value),
        jahreGeraucht: num(fJahre.input.value)
      };
      if (!gueltig(e)) {
        rTag.value.textContent = DASH;
        rWoche.value.textContent = DASH;
        rMonat.value.textContent = DASH;
        rJahr.value.textContent = DASH;
        rGesamt.value.textContent = DASH;
        rZigG.value.textContent = DASH;
        rInvest.value.textContent = DASH;
        return;
      }
      var r = berechneRaucherKosten(e);
      rTag.value.textContent = euro(r.kostenProTag);
      rWoche.value.textContent = euro(r.kostenProWoche);
      rMonat.value.textContent = euro(r.kostenProMonat);
      rJahr.value.textContent = euro(r.kostenProJahr);
      rGesamt.value.textContent = euro(r.kostenGesamt);
      rZigG.value.textContent = zahl(r.zigarettenGesamt);
      rInvest.value.textContent = euro(r.investmentWert);
    }

    [fZig, fPreis, fStk, fJahre].forEach(function (f) {
      f.input.addEventListener('input', update);
    });
    update();
  }

  function init() {
    var container = document.getElementById('rechenfix-raucher');
    if (!container) return;
    render(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

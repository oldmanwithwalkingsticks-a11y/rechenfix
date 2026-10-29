#!/usr/bin/env python3
"""Karola Rechner: Pruefwerkzeuge fuer Rechner auf rechenfix.de.

Aufruf (aus einem beliebigen Ordner, <repo> ist der Klon von rechenfix):

  python3 karola.py inventar <repo> <slug>     KR01  Bausteine und Verbraucher eines Rechners
  python3 karola.py zahlen   <repo> <slug>     KR03  jede Zahl in Config-Eintrag und Komponenten
  python3 karola.py formeln  <repo> [<slug>]   KR04  Rechenketten "Ausdruck = Zahl" nachrechnen
  python3 karola.py register <repo> [--alle]   KV01 bis KV06 aus assets/karola.json
  python3 karola.py quer     <repo> <zahl>     KR06  dieselbe Zahl in allen Schreibweisen im Repo
  python3 karola.py selbsttest                 eingebettete Faelle, Katalog deckungsgleich

Rueckgabewerte: 0 ohne Befund (Selbsttest gruen), 1 mit Befund (Selbsttest rot), 2 Aufruffehler.
Ohne Abhaengigkeiten ausser der Python-Standardbibliothek (ab 3.9). Gelesen werden nur
Dateien, die git verfolgt (R1); ohne .git-Ordner alle Dateien unter lib/, components/, app/.
"""
import argparse
import json
import math
import pathlib
import re
import subprocess
import sys
import tempfile

SKILL = pathlib.Path(__file__).resolve().parent.parent
KONFIG = SKILL / 'assets' / 'karola.json'

BUCHSTABE = 'A-Za-zÄÖÜäöüß'
ZAHL = r'\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?'
CONFIG_AUSSER = {'types.ts', 'index.ts', 'client-data.ts'}


# --------------------------------------------------------------------------- Dateien

def dateien(repo, praefixe, endungen):
    repo = pathlib.Path(repo)
    if (repo / '.git').exists():
        aus = subprocess.run(['git', '-C', str(repo), 'ls-files', '-z', '--', *praefixe],
                             capture_output=True, check=True).stdout.decode('utf-8')
        namen = [n for n in aus.split('\0') if n]
    else:
        namen = [str(p.relative_to(repo)).replace('\\', '/')
                 for pr in praefixe for p in (repo / pr).rglob('*') if p.is_file()]
    return sorted(n for n in namen if n.endswith(tuple(endungen)))


def lies(repo, rel):
    return (pathlib.Path(repo) / rel).read_text(encoding='utf-8').replace('\r\n', '\n')


def zeile_von(text, pos):
    return text.count('\n', 0, pos) + 1


# --------------------------------------------------------------------------- Tokenizer

REGEX_VOR = set('(,=:[!&|?{};+-*%~^<>')


def tokenisiere(text):
    """Zerlegt TS/TSX in Literale und Code.

    Liefert (literale, code): literale ist eine Liste (start, ende, inhalt, art) mit art in
    'str' und 'tpl' (Textteil eines Template-Literals); code ist der Text mit Kommentaren und
    Literalen durch Leerzeichen ersetzt, gleich lang wie text, Zeilenumbrueche bleiben.
    Einfache und doppelte Anfuehrungszeichen enden spaetestens am Zeilenende; ein Apostroph
    im JSX-Text kann so hoechstens eine Zeile verschlucken.
    """
    n = len(text)
    code = list(text)
    literale = []
    stapel = []          # offene ${ … } in Template-Literalen: Klammertiefe beim Oeffnen
    tiefe = 0
    i = 0
    letztes = ''         # letztes bedeutsames Code-Zeichen (fuer Regex-Erkennung)

    def leer(a, b):
        for k in range(a, b):
            if code[k] != '\n':
                code[k] = ' '

    def template(i):
        """i steht hinter dem oeffnenden Backtick oder hinter der schliessenden } von ${…}."""
        start = i
        while i < n:
            c = text[i]
            if c == '\\':
                i += 2
                continue
            if c == '`':
                literale.append((start, i, text[start:i], 'tpl'))
                leer(start, i)
                return i + 1, False
            if c == '$' and i + 1 < n and text[i + 1] == '{':
                literale.append((start, i, text[start:i], 'tpl'))
                leer(start, i)
                return i + 2, True
            i += 1
        literale.append((start, n, text[start:n], 'tpl'))
        leer(start, n)
        return n, False

    while i < n:
        c = text[i]
        if c == '/' and i + 1 < n and text[i + 1] == '/':
            j = text.find('\n', i)
            j = n if j < 0 else j
            leer(i, j)
            i = j
            continue
        if c == '/' and i + 1 < n and text[i + 1] == '*':
            j = text.find('*/', i + 2)
            j = n if j < 0 else j + 2
            leer(i, j)
            i = j
            continue
        if c in '\'"':
            j = i + 1
            while j < n and text[j] != c and text[j] != '\n':
                j += 2 if text[j] == '\\' else 1
            if j < n and text[j] == c:
                literale.append((i + 1, j, text[i + 1:j], 'str'))
                leer(i, j + 1)
                i = j + 1
                letztes = 'a'
                continue
            i += 1           # kein Literal (Apostroph im Text): Zeichen als Code lassen
            continue
        if c == '`':
            i, offen = template(i + 1)
            if offen:
                stapel.append(tiefe)
                tiefe += 1
            letztes = 'a'
            continue
        if c == '/' and (letztes in REGEX_VOR or letztes == '') and letztes != '<' \
                and not (i + 1 < n and text[i + 1] == '>'):
            j = i + 1
            klasse = False
            while j < n and text[j] != '\n':
                if text[j] == '\\':
                    j += 2
                    continue
                if text[j] == '[':
                    klasse = True
                elif text[j] == ']':
                    klasse = False
                elif text[j] == '/' and not klasse:
                    break
                j += 1
            if j < n and text[j] == '/':
                j += 1
                while j < n and text[j].isalpha():
                    j += 1
                leer(i, j)
                i = j
                letztes = 'a'
                continue
        if c == '{':
            tiefe += 1
        elif c == '}':
            tiefe -= 1
            if stapel and tiefe == stapel[-1]:
                stapel.pop()
                i, offen = template(i + 1)
                if offen:
                    stapel.append(tiefe)
                    tiefe += 1
                letztes = 'a'
                continue
        if not c.isspace():
            letztes = c
        i += 1
    return literale, ''.join(code)


# --------------------------------------------------------------------------- Config-Eintrag

def config_eintrag(repo, slug):
    """(datei, start, ende, text) des Objekts mit slug: '<slug>' in lib/rechner-config/."""
    treffer = []
    for rel in dateien(repo, ['lib/rechner-config/'], ['.ts']):
        if pathlib.Path(rel).name in CONFIG_AUSSER:
            continue
        text = lies(repo, rel)
        for m in re.finditer(r"\bslug:\s*(['\"])" + re.escape(slug) + r"\1", text):
            treffer.append((rel, text, m.start()))
    if len(treffer) != 1:
        raise SystemExit(f'FEHLER: slug {slug!r} {len(treffer)}-mal in lib/rechner-config/ gefunden, erwartet 1')
    rel, text, pos = treffer[0]
    _, code = tokenisiere(text)
    offen = []
    start = None
    for k, ch in enumerate(code):
        if k == pos:
            start = offen[-1] if offen else None
            break
        if ch == '{':
            offen.append(k)
        elif ch == '}' and offen:
            offen.pop()
    if start is None:
        raise SystemExit(f'FEHLER: Objektanfang zu slug {slug!r} in {rel} nicht gefunden')
    t = 0
    for k in range(start, len(code)):
        if code[k] == '{':
            t += 1
        elif code[k] == '}':
            t -= 1
            if t == 0:
                return rel, start, k + 1, text
    raise SystemExit(f'FEHLER: Objektende zu slug {slug!r} in {rel} nicht gefunden')


def komponente(repo, slug):
    text = lies(repo, 'components/rechner/RechnerLoader.tsx')
    m = re.search(r"['\"]" + re.escape(slug) + r"['\"]\s*:\s*dyn\(\s*\(\)\s*=>\s*import\(\s*['\"]@/([^'\"]+)['\"]", text)
    if not m:
        return None
    pfad = m.group(1)
    for endung in ('.tsx', '.ts'):
        if (pathlib.Path(repo) / (pfad + endung)).exists():
            return pfad + endung
    return None


IMPORT = re.compile(r"""^\s*import\s+(?:type\s+)?[^;]*?from\s+['"]([^'"]+)['"]""", re.M)


def importe(repo, rel):
    """Aufgeloeste Repo-Pfade der Importe einer Datei (nur @/ und relative)."""
    text = lies(repo, rel)
    basis = pathlib.PurePosixPath(rel).parent
    aus = []
    for spez in IMPORT.findall(text):
        if spez.startswith('@/'):
            p = spez[2:]
        elif spez.startswith('.'):
            teile = []
            for t in (basis / spez).parts:
                if t == '..':
                    if teile:
                        teile.pop()
                elif t != '.':
                    teile.append(t)
            p = '/'.join(teile)
        else:
            continue
        for endung in ('.ts', '.tsx', '/index.ts', '/index.tsx', ''):
            if (pathlib.Path(repo) / (p + endung)).is_file():
                aus.append(p + endung)
                break
    return aus


def importierer(repo, ziel, praefixe=('lib/', 'components/', 'app/', 'scripts/')):
    stamm = ziel.rsplit('.', 1)[0]
    name = pathlib.PurePosixPath(stamm).name
    aus = []
    for rel in dateien(repo, list(praefixe), ['.ts', '.tsx', '.mdx']):
        if rel == ziel:
            continue
        text = lies(repo, rel)
        if name not in text:
            continue
        if rel.endswith(('.ts', '.tsx')):
            treffer = ziel in importe(repo, rel)
        else:
            treffer = ('/' + stamm) in text
        if treffer:
            aus.append(rel)
    return aus


# --------------------------------------------------------------------------- Saetze

SATZGRENZE = re.compile(r'(?<=[.!?])\s+(?=[A-ZÄÖÜ„"(<])|</?p>|<li>|</li>|<br\s*/?>|</h\d>|<h\d>|</?td>|</?th>|</?tr>|\n')
TAG = re.compile(r'<[^>]+>')


def saetze(text):
    """(offset, satz) je Satz; Satzgrenzen sind Satzzeichen vor Grossbuchstaben und Block-Tags."""
    aus = []
    pos = 0
    for m in SATZGRENZE.finditer(text):
        if m.start() > pos:
            aus.append((pos, text[pos:m.start()]))
        pos = m.end()
    if pos < len(text):
        aus.append((pos, text[pos:]))
    return [(o, s) for o, s in aus if s.strip()]


def klartext(satz):
    return re.sub(r'\s+', ' ', TAG.sub('', satz).replace('&nbsp;', ' ').replace('&amp;', '&')).strip()


# --------------------------------------------------------------------------- Formeln

OP = r'(?:[×÷+−·]|(?<=\s)/(?=\s))'
PRO = r'(?:/(?:h|Std|Stunde|Woche|Monat|Jahr|Tag|kWh|km|kg|l)\b\.?)'   # zusammengesetzte Einheit wie €/h oder h/Woche (W200)
EINHEIT = rf'(?:\s*(?:€|%|m²|(?:EUR|Euro|h|Std|Stunden|Wochen|Monate|Tage|km|kg|kWh|l|m|Jahre|kcal|ct|W)\b)\.?{PRO}?)?'   # € und % sind keine Wortzeichen: kein \b dahinter
TERM = rf'(?:\(\s*)*(?:{ZAHL}){EINHEIT}(?:\s*\))*'
AUSDRUCK = rf'{TERM}(?:\s*{OP}\s*{TERM})+'
KETTE = re.compile(rf'(?P<ca>ca\.\s*|≈\s*|rund\s+)?(?P<links>{AUSDRUCK})(?P<rest>(?:\s*(?:=|≈)\s*(?:ca\.\s*)?(?:{AUSDRUCK}|{TERM}))+)')
FAKTOR = {'Tausend': 1e3, 'Millionen': 1e6, 'Million': 1e6, 'Mio.': 1e6, 'Mio': 1e6, 'Milliarden': 1e9, 'Mrd.': 1e9}
EINHEIT_WEG = re.compile(r'(€|EUR|Euro|%|Std\.?|Stunden|Wochen|Monate|Tage|kWh|kcal|km|kg|m²|Jahre|\bct\b|\bh\b|\bl\b|\bm\b|\bW\b)')
PRO_WEG = re.compile(r'(?<=[^\s\d])' + PRO)


def stellen(s):
    z = re.findall(ZAHL, s)
    if not z:
        return 0
    return len(z[-1].split(',')[1]) if ',' in z[-1] else 0


def ausgleichen(t):
    """Entfernt ueberzaehlige Klammern am Rand: '(40 × 52 ÷ 12' und '173,33)' werden rechenbar."""
    t = t.strip()
    while t.count('(') > t.count(')') and t.startswith('('):
        t = t[1:].lstrip()
    while t.count(')') > t.count('(') and t.endswith(')'):
        t = t[:-1].rstrip()
    return t


def auswerten(a, intervall=False):
    """Wert des Ausdrucks; mit intervall=True (min, max) bei Operanden, die auf ihre letzte
    angegebene Stelle gerundet sein koennen."""
    t = re.sub(rf'({ZAHL})\s*%', r'\1 __p__', a)          # Prozentzahl: Wert / 100
    t = ausgleichen(EINHEIT_WEG.sub('', PRO_WEG.sub('', t)))
    t = t.replace('×', '*').replace('·', '*').replace('÷', '/').replace('−', '-')
    zahlen = []

    def ersetze(m):
        zahlen.append(m.group(0))
        return f'__z{len(zahlen) - 1}__'
    t = re.sub(ZAHL, ersetze, t)
    t = re.sub(r'(__z\d+__)\s*__p__', r'(\1/100)', t)
    if t.count('/100)') == 1:                             # a − 19 % heisst a × (1 − 0,19)
        t = re.sub(r'([+\-])\s*\((__z\d+__)/100\)', r'*(1\1\2/100)', t)
    if re.search(r'[^0-9_z+\-*/() .]', t):
        return None
    werte = [zahl_wert(z) for z in zahlen]
    halb = [0.5 * 10 ** (-stellen(z)) if (intervall and (',' in z or '.' in z or len(z) >= 4)) else 0.0 for z in zahlen]

    def rechne(vs):
        s = re.sub(r'__z(\d+)__', lambda m: repr(vs[int(m.group(1))]), t)
        try:
            return eval(s, {'__builtins__': {}}, {})
        except Exception:
            return None
    if not intervall:
        return rechne(werte)
    ergebnisse = []
    for maske in range(2 ** len(werte)) if len(werte) <= 8 else [0]:
        vs = [w + (h if (maske >> k) & 1 else -h) for k, (w, h) in enumerate(zip(werte, halb))]
        r = rechne(vs)
        if r is None:
            return None
        ergebnisse.append(r)
    return min(ergebnisse), max(ergebnisse)


GEPRUEFT = [0]


def pruefe_satz(satz):
    """Prueft jede Rechenkette eines Satzes. Liefert (befunde, hinweise, stimmig): je eine Liste
    von Texten, stimmig ist die Menge der Zahlen aus Ketten, die aufgehen."""
    satz = klartext(satz)
    befunde, hinweise, stimmig = [], [], set()
    if re.search(r'[π²³√]|\$\{', satz):
        return befunde, hinweise, stimmig
    for m in KETTE.finditer(satz):
        vor = satz[:m.start('links')].rstrip()
        roh_vor = satz[:m.start('links')]
        links = m.group('links')
        klammer = links.lstrip().startswith('(')
        if re.search(r'\d/\d', m.group(0)):
            continue                                  # Bruch wie 1/2
        if vor and vor[-1] in '×÷+−·*/-–:' and (not klammer or links.count('(') <= links.count(')')):
            continue                                  # Teil eines laengeren Ausdrucks, Spanne oder Verhaeltnis
        if klammer and roh_vor[-1:].isalpha():
            continue                                  # Funktionsaufruf wie ln(5)
        nach = satz[m.end():m.end() + 12]
        if nach.lstrip().startswith(('%', 'Prozent', '‰', ':', 'Rest')) or nach.startswith(('–', '-')) \
                or re.match(r'/\s*[\d(]', nach):
            continue                                  # Prozentangabe, Verhaeltnis, Spanne, Bruch
        if re.match(r'\s*\d+\s*(min|s|g|cm|mm|ml)\b', nach):
            continue                                  # zusammengesetzte Groesse wie 3 h 45 min
        faktor = 1.0
        for wort, f in FAKTOR.items():
            if nach.lstrip().startswith(wort):
                faktor = f
        teile = [links] + [p for p in re.split(r'\s*(?:=|≈)\s*(?:ca\.\s*)?', m.group('rest')) if p.strip()]
        ungefaehr = bool(m.group('ca')) or '≈' in m.group('rest') or 'ca.' in m.group('rest')
        ok_kette = True
        for i in range(len(teile) - 1):
            a = auswerten(teile[i])
            b = auswerten(teile[i + 1])
            if a is None or b is None:
                ok_kette = False
                break
            if re.search(r'\bct\b', teile[i]) and not re.search(r'\bct\b', teile[i + 1]):
                a /= 100                              # Cent links, Euro rechts
            letzter = i + 1 == len(teile) - 1
            if letzter:
                b *= faktor
            tol = 0.5 * 10 ** (-stellen(teile[i + 1])) * (faktor if letzter else 1) + 1e-9
            if ungefaehr:
                tol = max(tol, abs(b) * 0.005)
            schluss = teile[i + 1].count(')') > teile[i + 1].count('(')
            if '%' in teile[i + 1] and abs(a - b * 100) <= tol * 100:
                b = a                                 # (80 − 60) ÷ 80 × 100 = 25 %: Ergebnis in Prozentpunkten
            if re.search(r'\baufgerundet\b', satz) and abs(b - math.ceil(a - 1e-9)) <= 1e-9 and stellen(teile[i + 1]) == 0:
                b = a                                 # § 8 Abs. 1a SGB IV: auf volle Euro aufgerundet
            if re.search(r'\babgerundet\b', satz) and abs(b - math.floor(a + 1e-9)) <= 1e-9 and stellen(teile[i + 1]) == 0:
                b = a
            if abs(a - b) > tol:
                erster = re.match(rf'\s*{TERM}', teile[i + 1])
                b1 = auswerten(erster.group(0)) if erster else None
                if b1 is not None and erster.group(0).strip() != teile[i + 1].strip() \
                        and abs(a - b1) <= max(tol, 0.5 * 10 ** (-stellen(erster.group(0))) + 1e-9):
                    pass                              # Kette geht im naechsten Ausdruck weiter
                else:
                    iv = auswerten(teile[i], intervall=True)
                    eintrag = f'{ausgleichen(teile[i])} = {ausgleichen(teile[i + 1])} | gerechnet {a:.4f}, angegeben {b:g}'
                    if iv is not None and iv[0] - tol <= b <= iv[1] + tol:
                        hinweise.append(eintrag + ' | stimmig nur mit gerundeten Zwischenwerten')
                    else:
                        befunde.append(eintrag)
                        ok_kette = False
            if schluss:
                break                                 # Klammer schliesst, der Rest gehoert zum aeusseren Ausdruck
        GEPRUEFT[0] += 1
        if ok_kette:
            stimmig.update(re.findall(ZAHL, m.group(0)))
    return befunde, hinweise, stimmig


def formeln_stellen(text, stellen_, quelle, funde, hinweise):
    for start, inhalt in stellen_:
        for off, satz in saetze(inhalt):
            b, h, _ = pruefe_satz(satz)
            zn = zeile_von(text, start + off)
            funde += [f'{quelle}:{zn}: {x}' for x in b]
            hinweise += [f'{quelle}:{zn}: {x}' for x in h]


def formeln_datei(repo, rel, funde, hinweise, bereich=None):
    """TS/TSX: nur Textstellen (Kommentare mit alten Werten zaehlen nicht); MDX: der ganze Text."""
    if rel.endswith(('.ts', '.tsx')):
        text, stellen_ = textstellen(repo, rel, bereich)
    else:
        text = lies(repo, rel)
        stellen_ = [(0, text)]
    formeln_stellen(text, stellen_, rel, funde, hinweise)


def formeln_text(text, quelle, funde, hinweise):
    formeln_stellen(text, [(0, text)], quelle, funde, hinweise)


def formeln(repo, slug=None):
    funde, hinweise = [], []
    if slug:
        rel, a, b, text = config_eintrag(repo, slug)
        formeln_datei(repo, rel, funde, hinweise, (a, b))
        komp = komponente(repo, slug)
        ziele = [komp] + [d for d in importe(repo, komp) if d.startswith('components/rechner/') and not generisch(repo, d)] if komp else []
        anzahl = 1 + len(ziele)
    else:
        ziele = dateien(repo, ['lib/rechner-config/', 'components/', 'app/'], ['.ts', '.tsx', '.mdx'])
        ziele = [z for z in ziele if not (z.startswith('lib/rechner-config/') and pathlib.Path(z).name in CONFIG_AUSSER)]
        anzahl = len(ziele)
    for z in ziele:
        formeln_datei(repo, z, funde, hinweise)
    return funde, hinweise, anzahl


# --------------------------------------------------------------------------- Zahlen

DATUM = re.compile(r'\b\d{1,2}\.\s?\d{1,2}\.\s?(?:\d{4}|\d{2})\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\.\s+(?:Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)(?:\s+\d{4})?')
NORM_VOR = re.compile(r'(§§?|Abs\.|Nr\.|Satz|Art\.|Anlage|Ziffer|Rn\.|Buchst\.|S\.|Az\.|BGBl\.(?:\s*I)?(?:\s*(?:S\.|Nr\.))?|AZR|AZB|BvR|BvL|Kapitel|Kap\.|Tz\.)\s*$')
GLIEDERUNG = re.compile(r'\b\d+(?:\.\d+){2,}\b')
LAYOUT = re.compile(r'^(?:px|rem|em|vh|vw|ms)\b')
ZAHL_TOKEN = re.compile(rf'(?<![{BUCHSTABE}_\d.,])(?:{ZAHL})(?![\d])')
ATTR_AUS = re.compile(r'(?:className|class|href|src|id|key|type|inputMode|name|htmlFor|role|aria-[\w-]+|data-[\w-]+|variant|programId|context|slug|kategorie|emoji|icon|color|farbe|width|height|viewBox|d|fill|stroke|transform|points|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2|dx|dy|fontSize|fontWeight|strokeWidth|strokeDasharray|offset|stopColor|gradientTransform|textAnchor|path|url|bild|image|gueltigAb|stand|datum|autoComplete|pattern|lang|target|rel)\s*[=:]\s*\{?\s*$')
JSX_TEXT = re.compile(r'>([^<>{}]*\d[^<>{}]*)(?=<|\{|$)|^([^<>{}=;]*\d[^<>{}=;]*)(?=<|\{)')


def zahl_wert(s):
    return float(s.replace('.', '').replace(',', '.'))


def klassen(satz):
    """(zahl, klasse) je Zahl im Satz; klasse '—' heisst: von Hand einzuordnen."""
    aus, belegt = [], []
    for m in DATUM.finditer(satz):
        belegt.append((m.start(), m.end()))
        aus.append((m.group(0), 'Datum'))
    for m in GLIEDERUNG.finditer(satz):
        if not any(a <= m.start() < b for a, b in belegt):
            belegt.append((m.start(), m.end()))
            aus.append((m.group(0), 'Gliederung'))
    for m in ZAHL_TOKEN.finditer(satz):
        if any(a <= m.start() < b for a, b in belegt):
            continue
        nach = satz[m.end():m.end() + 3]
        if re.match(rf'[a-zäöüß](?![{BUCHSTABE}])', nach):
            k = 'Norm'                                # 1a, 2b: Untergliederung einer Norm
        elif NORM_VOR.search(satz[max(0, m.start() - 24):m.start()]):
            k = 'Norm'
        elif re.fullmatch(r'(19|20)\d\d', m.group(0)):
            k = 'Jahr'
        elif LAYOUT.match(nach) :
            k = 'Layout'
        else:
            k = '—'
        aus.append((m.group(0), k))
    return aus


CSS_WORT = {'flex', 'grid', 'block', 'inline', 'hidden', 'relative', 'absolute', 'fixed', 'sticky', 'rounded',
            'shadow', 'border', 'transition', 'italic', 'underline', 'uppercase', 'truncate', 'container', 'group',
            'peer', 'sr-only', 'antialiased', 'tabular-nums', 'grow', 'shrink'}


CSS_REGEL = re.compile(r'[\w.#:>\-\[\]=" ]+\{\s*[a-z-]+\s*:[^{}]*\}')


def ist_text_literal(inhalt):
    if not re.search(r'\d', inhalt):
        return False
    if CSS_REGEL.search(inhalt):
        return False     # Stylesheet in <style>{`…`}: Hexfarben sind keine Zahlen (v1.1)
    if re.fullmatch(r'[\d.,]+', inhalt):
        return len(inhalt.replace('.', '').replace(',', '')) >= 2
    woerter = inhalt.split()
    if woerter and re.fullmatch(r'[a-z0-9:!\-/\[\].#%()_ ]+', inhalt) \
            and sum(1 for w in woerter if re.search(r'[-:]', w) or w in CSS_WORT) >= 0.6 * len(woerter):
        return False     # CSS-Klassen
    if inhalt.startswith(('/', '@/', 'http', '#', 'M ', 'M0', 'M1', 'M2')) and ' ' not in inhalt.strip():
        return False
    return True


def textstellen(repo, rel, bereich=None):
    """(offset, text) je Textstelle: String- und Template-Literale, bei .tsx auch JSX-Text."""
    text = lies(repo, rel)
    lit, code = tokenisiere(text)
    a, b = bereich if bereich else (0, len(text))
    aus = []
    for start, ende, inhalt, art in lit:
        if start < a or ende > b:
            continue
        vor = code[max(0, start - 60):start - (1 if art == 'str' else 0)]
        if art == 'str' and (ATTR_AUS.search(vor) or re.search(r'(from|import\(|require\()\s*$', vor)):
            continue
        if ist_text_literal(inhalt):
            aus.append((start, inhalt))
    if rel.endswith('.tsx'):
        pos = a
        for z in code[a:b].split('\n'):
            for m in JSX_TEXT.finditer(z):
                g = 1 if m.group(1) is not None else 2
                seg = m.group(g)
                if g == 1 and m.start() > 0 and z[m.start() - 1] in '=-':
                    continue                          # => oder >= oder ->: Code, kein JSX-Text
                if re.search(rf'[{BUCHSTABE}]{{3,}}', seg) and not re.search(
                        r'=>|&&|\|\||===|!==|;|\s\?\s|\s:\s|\breturn\b|\bconst\b|[A-Za-z_]\w*\.[A-Za-z_]\w*\(?', seg):
                    aus.append((pos + m.start(g), seg))
            pos += len(z) + 1
    return text, sorted(aus)


def zahlen_datei(repo, rel, bereich=None):
    """Zeilen (quelle, zeile, satz, [(zahl, klasse)]) je Satz mit mindestens einer Zahl."""
    text, stellen_ = textstellen(repo, rel, bereich)
    aus = []
    for start, inhalt in stellen_:
        for off, satz in saetze(inhalt):
            k = klassen(klartext(satz))
            if not k:
                continue
            _, _, stimmig = pruefe_satz(satz)
            k = [(z, 'Kette' if (kl == '—' and z in stimmig) else kl) for z, kl in k]
            aus.append((rel, zeile_von(text, start + off), klartext(satz), k))
    return aus


def zahlen_inventar(repo, slug):
    rel, a, b, _ = config_eintrag(repo, slug)
    zeilen = zahlen_datei(repo, rel, (a, b))
    komp = komponente(repo, slug)
    teile = []
    if komp:
        zeilen += zahlen_datei(repo, komp)
        for dep in importe(repo, komp):
            if dep.startswith('components/rechner/') and dep != komp and not generisch(repo, dep):
                teile.append(dep)
                zeilen += zahlen_datei(repo, dep)
    return rel, komp, teile, zeilen


_GENERISCH = {}


def generisch(repo, rel, grenze=12):
    """Geteilte Bausteine (von mehr als `grenze` Rechner-Komponenten importiert) gehoeren nicht ins Zahlen-Inventar."""
    if rel not in _GENERISCH:
        stamm = pathlib.PurePosixPath(rel).stem
        zahl = 0
        for d in dateien(repo, ['components/rechner/'], ['.tsx']):
            if d != rel and re.search(r"from\s+['\"][^'\"]*/" + re.escape(stamm) + r"['\"]", lies(repo, d)):
                zahl += 1
        _GENERISCH[rel] = zahl > grenze
    return _GENERISCH[rel]


# --------------------------------------------------------------------------- Register

def konfig():
    return json.loads(KONFIG.read_text(encoding='utf-8'))


KOMMENTARZEILE = re.compile(r'^\s*(//|\*|/\*|\{/\*)')


def register_text(eintrag, rel, text):
    treffer = []
    flagge = {'i': re.I}
    ausser = re.compile(eintrag['ausser_wenn']) if eintrag.get('ausser_wenn') else None
    for zn, zeile in enumerate(text.split('\n'), 1):
        if eintrag.get('zeilen') == 'code':
            if KOMMENTARZEILE.match(zeile):
                continue
            zeile = re.sub(r'(?<![:\'"])//.*$', '', zeile)
        if ausser and ausser.search(zeile):
            continue
        klein = None
        for mu in eintrag['muster']:
            if mu.get('kontext'):
                klein = klein if klein is not None else zeile.lower()
                if not any(x in klein for x in mu['kontext']):
                    continue
            if re.search(mu['regex'], zeile, flagge.get(mu.get('flags', ''), 0)):
                treffer.append((rel, zn, mu['name'], zeile.strip()[:160]))
    return treffer


def jahreswerte_muster(repo, e):
    """Muster fuer KV06 aus scripts/jahreswerte-config.json des Repos, in allen Schreibweisen."""
    pfad = pathlib.Path(repo) / 'scripts' / 'jahreswerte-config.json'
    if not pfad.is_file():
        return e['muster']
    werte = json.loads(pfad.read_text(encoding='utf-8')).get('forbiddenValues', [])
    muster = []
    for w in werte:
        formen = schreibweisen(w['value'].replace('.', ',') if re.fullmatch(r'\d+\.\d+', w['value']) else w['value'])
        rx = rf'(?<![{BUCHSTABE}_\d.,])(?:' + '|'.join(re.escape(f) for f in formen) + r')(?![\d]|[.,]\d)'
        muster.append({'name': w['description'][:60], 'regex': rx, 'flags': '',
                       'kontext': [x.lower() for x in w.get('contextKeywords', [])]})
    return muster


def rechner_bereich(repo, slug):
    """{datei: (erste, letzte Zeile)} fuer Config-Eintrag, Komponente und eigene Bausteine eines Rechners."""
    rel, a, b, text = config_eintrag(repo, slug)
    bereich = {rel: (zeile_von(text, a), zeile_von(text, b))}
    komp = komponente(repo, slug)
    if komp:
        bereich[komp] = (1, 10 ** 9)
        for d in importe(repo, komp):
            if d.startswith('components/rechner/') and not generisch(repo, d):
                bereich[d] = (1, 10 ** 9)
    return bereich


def register(repo, k=None):
    k = k or konfig()
    ergebnis = []
    for e in k['konventionen']:
        if e.get('art') == 'jahreswerte':
            e = {**e, 'muster': jahreswerte_muster(repo, e)}
        hits = []
        for rel in dateien(repo, e['pfade'], ['.ts', '.tsx', '.mdx']):
            if rel in e.get('ausnahmen', []) or rel.startswith(tuple(e.get('ausnahmen_praefix', []))) \
                    or (rel.startswith('lib/rechner-config/') and pathlib.Path(rel).name == 'client-data.ts'):
                continue
            hits += register_text(e, rel, lies(repo, rel))
        ergebnis.append((e, hits))
    return ergebnis


# --------------------------------------------------------------------------- Querabgleich

def schreibweisen(zahl):
    w = zahl_wert(zahl) if ',' in zahl or re.fullmatch(r'\d{1,3}(\.\d{3})+', zahl) else float(zahl)
    nk = len(zahl.split(',')[1]) if ',' in zahl else (len(zahl.split('.')[1]) if ('.' in zahl and not re.fullmatch(r'\d{1,3}(\.\d{3})+', zahl)) else 0)
    ganz, _, rest = f'{w:.{nk}f}'.partition('.')
    tausend = f'{int(ganz):,}'.replace(',', '.')
    formen = {ganz + (',' + rest if rest else ''), tausend + (',' + rest if rest else ''), ganz + ('.' + rest if rest else ''),
              f'{int(ganz):_}' + ('.' + rest if rest else '')}
    return sorted(formen, key=len, reverse=True)


def quer(repo, zahl):
    formen = schreibweisen(zahl)
    muster = re.compile(rf'(?<![{BUCHSTABE}_\d.,])(?:' + '|'.join(re.escape(f) for f in formen) + r')(?![\d]|[.,]\d)')
    treffer = []
    for rel in dateien(repo, ['lib/', 'components/', 'app/', 'scripts/'], ['.ts', '.tsx', '.mdx', '.json', '.mjs']):
        if pathlib.Path(rel).name == 'client-data.ts':
            continue
        for zn, zeile in enumerate(lies(repo, rel).split('\n'), 1):
            if muster.search(zeile):
                treffer.append((rel, zn, zeile.strip()[:170]))
    return formen, treffer


# --------------------------------------------------------------------------- Inventar

def inventar(repo, slug):
    rel, a, b, text = config_eintrag(repo, slug)
    kat = re.search(r"kategorieSlug:\s*['\"]([^'\"]+)['\"]|kategorie:\s*['\"]([^'\"]+)['\"]", text[a:b])
    kategorie = (kat.group(1) or kat.group(2)) if kat else '?'
    komp = komponente(repo, slug)
    zeilen = [f'# Inventar {slug}', '',
              f'- Config: `{rel}` Zeilen {zeile_von(text, a)} bis {zeile_von(text, b)} (Kategorie `{kategorie}`)',
              f'- Komponente: `{komp}`' if komp else '- Komponente: nicht in components/rechner/RechnerLoader.tsx gefunden']
    libs, teile = [], []
    if komp:
        for d in importe(repo, komp):
            if d.startswith('lib/berechnungen/'):
                libs.append(d)
            elif d.startswith('components/'):
                teile.append(d)
    for t in teile:
        zeilen.append(f'- Baustein: `{t}`' + (' (geteilt, nicht im Zahlen-Inventar)' if generisch(repo, t) else ''))
    for lib in libs:
        zeilen.append(f'- Lib: `{lib}`')
        verbraucher = [v for v in importierer(repo, lib) if v != komp]
        for v in verbraucher:
            zeilen.append(f'  - Verbraucher: `{v}`')
    andere = [d for d in dateien(repo, ['app/', 'lib/', 'components/', 'scripts/'], ['.ts', '.tsx', '.mdx', '.json'])
              if d not in (rel, komp, 'components/rechner/RechnerLoader.tsx') and pathlib.Path(d).name != 'client-data.ts'
              and re.search(r"['\"/]" + re.escape(slug) + r"['\"/#?]", lies(repo, d))]
    for d in andere:
        zeilen.append(f'- Nennt den Slug: `{d}`')
    return zeilen


# --------------------------------------------------------------------------- Selbsttest

def selbsttest():
    faelle = []

    def fall(name, ok):
        faelle.append((name, bool(ok)))

    # Formeln
    def f(zeile):
        funde, hinweise = [], []
        formeln_text(zeile, 't', funde, hinweise)
        return len(funde), len(hinweise)
    fall('F01 160-Stunden-Fall wird gefunden', f("text: 'Netto 3.500 € ÷ 160 = 20,19 €'") == (1, 0))
    fall('F02 richtige Kette bleibt still', f("text: '3.500 € ÷ (40 × 52 ÷ 12) = 3.500 € ÷ 173,33 = 20,19 €'") == (0, 0))
    fall('F03 Konvention 40 × 52 ÷ 12 = 174 wird gefunden', f("formel: '40 × 52 ÷ 12 = 174 Std.'") == (1, 0))
    fall('F04 Funktionsaufruf ln(5) uebergangen', f("formel: '16 × ln(5) + 31 = 16 × 1,61 + 31'") == (0, 0))
    fall('F05 Spanne 9–12 × 1,5 uebergangen', f("formel: '9–12 × 1,5 = 13,5–18 Monate'") == (0, 0))
    fall('F06 Ganzzahldivision mit Rest uebergangen', f("formel: '11 ÷ 4 = 2 Rest 3'") == (0, 0))
    fall('F07 Millionen als Faktor', f("text: '256 × 256 × 256 ≈ 16,7 Millionen Farben'") == (0, 0))
    fall('F08 Verhaeltnis 16:9 uebergangen', f("beispiel: '1920 ÷ 120 : 1080 ÷ 120 = 16:9'") == (0, 0))
    fall('F09 gerundeter Zwischenwert nur Hinweis', f("beispiel: 'Grundumsatz 1.718 × 1,55 = 2.662 kcal/Tag.'") == (0, 1))
    fall('F10 Template-Ausdruck uebergangen', f("html: `${fmt(a)} × 2 = ${fmt(b)}`") == (0, 0))
    fall('F11 ca. erlaubt ein halbes Prozent', f("text: 'ca. 2.000 × 1,1 = 2.205'") == (0, 0))
    fall('F12 falsche Summe wird gefunden', f("text: '1.200 € + 350 € = 1.500 €'") == (1, 0))
    fall('F13 Cent links, Euro rechts', f("text: '5.100 kWh × 7,70 ct = 393 € im Jahr'") == (0, 0))
    fall('F14 Klammer im laengeren Ausdruck', f("text: '15 min × (3 ÷ 4) ≈ 11 min'") == (0, 0))
    fall('F15 Bruch (1 + 1)/(11 + 9)', f("text: 'also (1 + 1)/(11 + 9) = 2/20 = 1/10'") == (0, 0))
    fall('F19 Prozent als Faktor', f("text: '(5.000 − 2.650) × 30 % = 705 €'") == (0, 0))
    fall('F20 Abzug eines Prozentsatzes', f("text: 'falsch wäre 119 € − 19% = 96,39 €'") == (0, 0))
    fall('F21 Quote als Ergebnis', f("text: '100 ÷ 400 = 25 %'") == (0, 0))
    fall('F22 falscher Prozentwert wird gefunden', f("text: '2.500 × 65 % = 1.600 €'") == (1, 0))
    fall('F23 Prozentpunkte nach × 100', f("text: '(80 − 60) ÷ 80 × 100 = 25%'") == (0, 0))
    fall('F24 aufgerundet auf volle Euro', f("text: 'Mindestlohn × 130 ÷ 3, aufgerundet auf volle Euro (13,90 € × 130 ÷ 3 = 603 €)'") == (0, 0))
    fall('F25 ohne Rundungsangabe nur Hinweis', f("text: '13,90 € × 130 ÷ 3 = 603 €'") == (0, 1))
    fall('F18 Einheit pro Tag bleibt pruefbar', f("text: 'Grundumsatz 1.718 × 1,55 = 2.700 kcal/Tag.'") == (1, 0))
    fall('F16 zusammengesetzte Groesse', f("text: '3,75 h = 3 h + 0,75 × 60 = 3 h 45 min'") == (0, 0))
    fall('F17 innere Klammer wird geprueft', f("text: '3.500 € Monatsgehalt / (40 Std × 52 ÷ 12 = 174 Std) = 20,11 €'") == (1, 0))
    fall('F26 Einheit pro Stunde in der Kette', f("antwort: 'Mindestlohn 13,90 €/h × 40 h/Woche = 556 € je Woche'") == (0, 0))
    fall('F27 falsche Kette mit €/h wird gefunden', f("antwort: 'Mindestlohn 13,90 €/h × 40 h/Woche = 565 € je Woche'") == (1, 0))

    # Tokenizer und Zahlen
    probe = ("const A = 'Freibetrag 603 €';\n// 999 im Kommentar\n"
             "<p className=\"text-xs mt-1 w-48\">Grenze ca. 2.409,33 € (§ 8 Abs. 1a SGB IV, seit 01.01.2026)</p>\n"
             "const re = /['\"]/g; const B = \"Satz 1,5 %\";\n"
             "const T = `Netto ${fmt(x)} bei 40 Stunden`;\n")
    lit, code = tokenisiere(probe)
    fall('Z01 Kommentar nicht im Code', '999' not in code)
    fall('Z02 Regex-Literal verschluckt kein Literal danach', any(l[2] == 'Satz 1,5 %' for l in lit))
    fall('Z03 Template-Textteil erkannt', any('bei 40 Stunden' in l[2] for l in lit))
    with tempfile.TemporaryDirectory() as tmp:      # der installierte Skill ist schreibgeschuetzt
        (pathlib.Path(tmp) / 'probe.tsx').write_text(probe, encoding='utf-8')
        z = zahlen_datei(tmp, 'probe.tsx')
    werte = {zk for zeile in z for zk in zeile[3]}
    fall('Z04 Zahl im String', ('603', '—') in werte)
    fall('Z05 Zahl im JSX-Text', ('2.409,33', '—') in werte)
    fall('Z06 Norm erkannt', ('8', 'Norm') in werte and ('1', 'Norm') in werte)
    fall('Z07 Datum erkannt', ('01.01.2026', 'Datum') in werte)
    fall('Z08 CSS-Klasse uebergangen', not any(zk[0] in ('48', '1') and zk[1] == '—' for zk in werte))
    fall('Z09 Kommentar uebergangen', not any(zk[0] == '999' for zk in werte))
    fall('Z10 Zahl im Template-Text', ('40', '—') in werte)
    k_satz = dict(klassen('Bei 3.500 € und 40 Stunden: 3.500 ÷ 173,33 = 20,19 €.'))
    fall('Z11 stimmige Kette markiert', dict((z, kl) for z, kl in [(a, 'Kette' if a in pruefe_satz('3.500 ÷ 173,33 = 20,19')[2] else b) for a, b in k_satz.items()]).get('20,19') == 'Kette')
    with tempfile.TemporaryDirectory() as tmp:
        (pathlib.Path(tmp) / 'code.tsx').write_text("const g = liste.reduce((s, r) => s + r.kwhJahr, 0);\n"
                                                    "const q = summe > 0 ? (r.kosten / summe) * 100 : 0;\n"
                                                    "<p>Auch LED statt Glühbirne (−85 %)</p>\n", encoding='utf-8')
        zc = {zk[0] for zeile in zahlen_datei(tmp, 'code.tsx') for zk in zeile[3]}
    fall('Z13 Pfeilfunktion und Vergleich sind kein JSX-Text', zc == {'85'})
    with tempfile.TemporaryDirectory() as tmp:
        (pathlib.Path(tmp) / 'grafik.tsx').write_text("<style>{`\n  .ms-ueber { fill: #F6D5C8; }\n  .dark .ms-t-coral { fill: #F0997B; }\n`}</style>\n"
                                                      "<text>Soll über dem Gehalt in 8 von 12 Monaten</text>\n", encoding='utf-8')
        zg = {zk[0] for zeile in zahlen_datei(tmp, 'grafik.tsx') for zk in zeile[3]}
    fall('Z14 Stylesheet im Template uebergangen', zg == {'8', '12'})
    fall('Z12 Saetze getrennt', len(saetze('Erster Satz mit 1,5 %. Zweiter Satz mit 2 €.<li>Dritter 3 h</li>')) == 3)

    # Register: jedes Muster trifft sein Positiv und nicht sein Negativ
    k = konfig()
    for e in k['konventionen']:
        for mu in e['muster']:
            pos = register_text({**e, 'muster': [mu]}, 'p', mu['positiv'])
            neg = register_text({**e, 'muster': [mu]}, 'n', mu['negativ'])
            fall(f"R {e['id']} {mu['name']}", len(pos) == 1 and len(neg) == 0)
    fall('R Kommentarzeile uebergangen', not register_text(k['konventionen'][0], 'k', '// const x = woche * 4.33;'))

    # Querabgleich
    fall('Q01 Schreibweisen 2.409,33', set(schreibweisen('2.409,33')) >= {'2.409,33', '2409,33', '2409.33', '2_409.33'})

    # Katalog deckungsgleich: SKILL.md, references/pruefkatalog.md, assets/karola.json
    ids_json = [p['id'] for p in k['pruefkatalog']]
    ids_kv = [e['id'] for e in k['konventionen']]
    skill_md = (SKILL / 'SKILL.md').read_text(encoding='utf-8')
    katalog_md = (SKILL / 'references' / 'pruefkatalog.md').read_text(encoding='utf-8')
    konv_md = (SKILL / 'references' / 'konventionen.md').read_text(encoding='utf-8')
    fall('K01 Kennungen KR01–KR10 lueckenlos', ids_json == [f'KR{n:02d}' for n in range(1, 11)])
    fall('K02 jede Kennung in SKILL.md', all(re.search(rf'\b{i}\b', skill_md) for i in ids_json))
    fall('K03 jede Kennung als Zeile in pruefkatalog.md', all(re.search(rf'^\| {i} \|', katalog_md, re.M) for i in ids_json))
    fall('K04 keine fremde Kennung in pruefkatalog.md', set(re.findall(r'^\| (KR\d\d) \|', katalog_md, re.M)) == set(ids_json))
    fall('K05 jede Konvention als Abschnitt in konventionen.md', all(re.search(rf'^## {i} ', konv_md, re.M) for i in ids_kv)
         and set(re.findall(r'^## (KV\d\d) ', konv_md, re.M)) == set(ids_kv))
    fall('K06 Stand-Zeile in SKILL.md', re.search(r'^\*\*Stand: v\d+(?:\.\d+)? \(\d\d\.\d\d\.\d{4}\)\.\*\*', skill_md, re.M))
    fall('K07 _stand im Format TT.MM.JJJJ', re.fullmatch(r'\d\d\.\d\d\.\d{4}', k.get('_stand', '')))

    for name, ok in faelle:
        if not ok:
            print(f'ROT  {name}')
    gruen = sum(1 for _, ok in faelle if ok)
    print(f"Selbsttest: {gruen} von {len(faelle)} Faellen wie erwartet — {'gruen' if gruen == len(faelle) else 'rot'}.")
    return 0 if gruen == len(faelle) else 1


# --------------------------------------------------------------------------- Aufruf

def main(argv=None):
    for strom in (sys.stdout, sys.stderr):
        try:
            strom.reconfigure(encoding='utf-8', errors='replace')   # Windows-Konsole: ÷ × ✓ — ausgeben koennen
        except (AttributeError, ValueError):
            pass
    p = argparse.ArgumentParser(description='Karola Rechner: Pruefwerkzeuge')
    s = p.add_subparsers(dest='befehl', required=True)
    for name in ('inventar', 'zahlen'):
        q = s.add_parser(name)
        q.add_argument('repo')
        q.add_argument('slug')
    q = s.add_parser('formeln')
    q.add_argument('repo')
    q.add_argument('slug', nargs='?')
    q = s.add_parser('register')
    q.add_argument('repo')
    q.add_argument('--alle', action='store_true', help='auch die Stellen der Stufe pruefen einzeln zeigen')
    q.add_argument('--slug', help='nur Stellen in Config-Eintrag, Komponente und eigenen Bausteinen dieses Rechners')
    q = s.add_parser('quer')
    q.add_argument('repo')
    q.add_argument('zahl')
    s.add_parser('selbsttest')
    a = p.parse_args(argv)

    if a.befehl == 'selbsttest':
        return selbsttest()
    if not (pathlib.Path(a.repo) / 'lib' / 'rechner-config').is_dir():
        print(f'FEHLER: {a.repo} ist kein rechenfix-Klon (lib/rechner-config fehlt)')
        return 2

    if a.befehl == 'inventar':
        print('\n'.join(inventar(a.repo, a.slug)))
        return 0
    if a.befehl == 'zahlen':
        rel, komp, teile, zeilen = zahlen_inventar(a.repo, a.slug)
        print(f'# Zahlen-Inventar {a.slug}\n')
        print(f'Quellen: `{rel}` (Eintrag), `{komp}`' + ''.join(f', `{t}`' for t in teile) + '\n')
        print('Einordnen je Zahl: E Eingabe oder Beispielannahme · R Ergebnis, mit Lib-Lauf reproduziert · '
              'G Rechtswert aus zentraler Lib mit Quelle · K Konvention aus dem Register · F Fakt mit Quelle · X falsch. '
              'Mit ✓ markierte Zahlen stehen in einer Rechenkette, die aufgeht (KR04).\n')
        print('| Datei:Zeile | Zahlen | Satz |')
        print('|---|---|---|')
        offen = stimmig = 0
        auto = {}
        for quelle, zn, satz, k in zeilen:
            hand = [z for z, kl in k if kl == '—']
            kette = [z for z, kl in k if kl == 'Kette']
            for z, kl in k:
                if kl not in ('—', 'Kette'):
                    auto[kl] = auto.get(kl, 0) + 1
            offen += len(hand)
            stimmig += len(kette)
            if hand or kette:
                zahlen_txt = ' · '.join(hand + [z + ' ✓' for z in kette])
                kurz = satz if len(satz) <= 260 else satz[:257] + '…'
                print(f"| {quelle}:{zn} | {zahlen_txt} | {kurz.replace('|', '¦')} |")
        print(f"\nZahlen-Inventar: {offen} von Hand einzuordnen, {stimmig} in stimmigen Ketten, automatisch eingeordnet: "
              + (', '.join(f'{v} {kk}' for kk, v in sorted(auto.items())) or 'keine'))
        return 0
    if a.befehl == 'formeln':
        funde, hinweise, anzahl = formeln(a.repo, a.slug)
        for x in funde:
            print('BEFUND ' + x)
        for x in hinweise:
            print('HINWEIS ' + x)
        print(f'\nFormel-Pruefer: {GEPRUEFT[0]} Ketten in {anzahl} Dateien, {len(funde)} Befund(e), {len(hinweise)} Hinweis(e)')
        return 1 if funde else 0
    if a.befehl == 'register':
        befunde = 0
        bereich = rechner_bereich(a.repo, a.slug) if a.slug else None
        for e, hits in register(a.repo):
            if bereich:
                hits = [h for h in hits if h[0] in bereich and bereich[h[0]][0] <= h[1] <= bereich[h[0]][1]]
            stufe = e['stufe']
            print(f"{e['id']} {e['groesse']}: {len(hits)} Stelle(n), Stufe {stufe}")
            if stufe == 'befund' or a.alle:
                for rel, zn, name, zeile in hits:
                    print(f'  {rel}:{zn} [{name}] {zeile}')
            if stufe == 'befund':
                befunde += len(hits)
        print(f'\nRegister: {befunde} Befund(e)')
        return 1 if befunde else 0
    if a.befehl == 'quer':
        formen, treffer = quer(a.repo, a.zahl)
        print('Schreibweisen: ' + ', '.join(formen))
        for rel, zn, zeile in treffer:
            print(f'{rel}:{zn}: {zeile}')
        print(f'\nQuerabgleich: {len(treffer)} Stelle(n)')
        return 0
    return 2


if __name__ == '__main__':
    sys.exit(main())

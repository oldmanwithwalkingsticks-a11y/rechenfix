# Audit-Methodik und redaktionelle Referenzwerte

> Referenzdatei zum Skill `rechner-builder`. Ausgelagert in Welle 114 (26.08.2026),
> damit die SKILL.md den Ablauf trägt und die Detailbestände erst bei Bedarf geladen werden.
> Der Inhalt ist gegenüber der früheren SKILL.md **unverändert**.

Zwei Bestände für Wellen, die **bestehenden** Code prüfen oder korrigieren, statt neuen zu bauen.

**Wann lesen:** wenn eine Audit- oder Korrektur-Welle läuft, oder wenn redaktionelle Referenzwerte in `lib/rechner-config/` angefasst werden (Preise, Beispielbeträge, Vergleichszahlen in Fließtext).

---

## Audit-Methodik (Welle 2 ab Prompt 130)

Für **Audit-Arbeit an bestehenden Rechnern** (nicht Neubau) gilt eine
reduzierte 4-Punkt-Methodik. Die Welle-1-7-Punkt-Methodik (Clamping,
Barrierefreiheit, Copy-Button, Smoketest, …) ist für Audits zu
umfangreich — die Infrastruktur-Punkte sind projektweit stabil und
werden über Guards G1–G14 + Prebuild-Hooks abgesichert.

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle** — Gegen Primärquelle prüfen (Gesetz im
   Internet, BGBl.-Anlage, amtliche Tabelle). Regel 12 aus CLAUDE.md
   („Claudes Memory ist keine Primärquelle") besonders beachten bei
   Parametern, die nach Knowledge-Cutoff Januar 2026 geändert wurden.
2. **Input-Validierung** — Min/Max/Schritt sinnvoll, Typecheck
   korrekt, Clamping im State-Reducer (nicht nur HTML-`max`).
3. **Edge Cases** — Leere Eingabe, Division durch null, Extremwerte,
   Datumsgrenzen.
4. **SSOT-Verwendung** — Nutzt der Rechner die zentrale Lib, oder
   hartkodiert er Werte? Ist er konsistent mit anderen Rechnern?

**Ablauf:** Audit-Prompt ohne Code-Fix → Bericht unter
`docs/audit-arbeitspapiere/` mit Executive Summary (Bug-Zahlen
P1/P2/P3), Pro-Rechner-Detail-Abschnitten, SSOT-Refactor-Kandidaten,
Fix-Plan als Folge-Prompts. **Folge-Prompts** (P1-Eskalation sofort,
P2-Polish-Batch danach, P3-UX-Extras bei Gelegenheit) greifen die
Befunde auf.

**Commits auf Folge-Prompts referenzieren den Detail-Abschnitt**
(Datei:Zeile oder Abschnittstitel), nicht die Executive Summary —
Summary-Paraphrasen können fehlerhaft sein (vgl. UND-vs-ODER-Slip
in Welle 1 Stufe 4a, 5-vs-6-P2-Zählfehler in Welle 2 Stufe 1).

Gilt für Welle 2 Stufe 1 Auto (Prompt 130, abgeschlossen 23.04.2026),
Stufe 2 Gesundheit (Prompts 140–144b, abgeschlossen 25.04.2026 — 17 Rechner,
2 P1 + 9 P2 + 9 P3 alle gefixt + Feature-Add Perioden-Länge). Rechtsstand-
Parameter werden nicht in SKILL.md dupliziert — siehe `CLAUDE.md` Abschnitt
„Aktueller Rechtsstand" für verifizierte Werte.

**Verify-Script-Pattern pro Stufe:** Pro Welle-2-Stufe entstehen
stufenspezifische Verify-Scripts (`scripts/verify-<kategorie>-p1.ts`,
`-p2.ts`, `-p3.ts`), die jeweils die P1-/P2-/P3-Findings absichern.
**Alle Tests gegen externe Primärquellen** — niemals zirkulär gegen die
getestete Lib (Lehre aus Prompt 120a). Beispiel-Stufe Gesundheit: 21 Tests
in 3 Scripts (7+6+8), gegen WHO-Fact-Sheet, ESH-2023, DGE-Referenzwerte,
IOM 2009, Naegele/§ 3 MuSchG, US-Navy Hodgdon-Beckett 1984, Fitzpatrick,
Widmark 1932, NSF/Hirshkowitz 2015. Pro Folge-Prompt wird das relevante
Script grün gehalten, die anderen als Regressions-Check mitgelaufen.

**Verify-Skripte-Konvention (seit Lehre 149d, 26.04.2026):** Endung `.ts`
(NICHT `.mjs`), Aufruf via `npx tsx scripts/verify-XYZ.ts` (NICHT `node`),
Helper-Parameter explizit typisiert (z. B. `eq(name: string, ist: number,
soll: number, tol = 0.005)`). Mjs-mit-`.ts`-Suffix-im-Import scheitert
sowohl beim Loader als auch beim `next build` strict-typecheck.

**Audit-Bundle-Pattern (seit Welle 2 Stufe 3 Arbeit Block B, 26.04.2026):**
Bei Audits mit vielen Files (>5) ist ein vorgeneriertes Bundle in
`docs/audit-bundles/<thema>.md` mit allen relevanten Datei-Inhalten als
Code-Blöcke effizienter als URL-Listen pro Datei. **Eine** `web_fetch`-URL
→ **alle** Files in einem Aufruf.

- **Generator-Skript:** `scripts/build-audit-bundle.ts` (TypeScript, NICHT `.mjs`!)
- **CLI:** `npm run audit:bundle <name>`
- **Bundle-Definitionen:** `scripts/audit-bundles.ts` (zentrale Liste mit File-Pfaden pro Bundle-Name)
- **Pflicht-Parameter** bei Bundles >100 KB: `text_content_token_limit: 300000` — Default reicht nicht und schneidet ohne sichtbare Warnung mitten im Inhalt ab
- **Lib-Audit als Folge-Bundle abhängbar**, wenn Component+Konfig+Beispiel-Trio Konsistenz erlaubt — Beispiel-Werte aus dem Konfig-`beispiel`-Feld manuell nachrechnen reicht oft für indirekte Lib-Verifikation
- **Beispiele aus 26.04.:** `block-b-arbeit` (149 KB, 13 Files), `block-b-libs` (16 KB, 5 Libs) — beide vollständig im Audit verarbeitet
- **Methodik-Lehre 20** (CLAUDE.md → Gelernte Regeln): Audit-Bundle-Pattern via konsolidierte MD-Datei

**Pre-5a/5b-Disziplin (Validation-Sweep-Methodik, 30.04.2026):**
Konsolidiert aus Validation-Sweep M3+M5+M6 (drei unabhängige Validierungen):

- **Pre-5a — SSOT-vor-Memory:** Bei Werte-Drift-Verdacht den SSOT-Soll-Wert direkt aus `lib/berechnungen/*.ts` lesen, nicht aus Memory entscheiden. Memory ist bei Konstanten mit Stichtag-Switch (Mindestlohn, Pfändung, BAföG, Strompreis, Mindestbedarf nach DT) systematisch unterspezifiziert oder veraltet. Beispiel M6: DT-Mindestbedarf-Drift 482/554/649 sah „oberflächlich plausibel" aus, war aber Pre-Welle-3-Werte — SSOT-Lookup ergab 486/558/653/698.
- **Pre-5b — Volltext-vor-UNKLAR:** Bei Drift-Klassifikations-Verdacht erst alle Konfig-Felder volltextlich auf den Begriff durchsuchen, bevor als UNKLAR oder DRIFT klassifiziert wird. Oft klärt ein nachgelagerter Absatz die scheinbare Diskrepanz, dann ist es KONSISTENT. Beispiel M6: 4 Verdachts-Stellen (kuendigungsfrist § 168/169 SGB IX, unterhalt § 94 Abs., abfindung 17.500 € vs. 10.300 €, zugewinnausgleich Werte-Vielfalt) wurden durch Volltext-Check als KONSISTENT bestätigt — hätten ohne Pre-5b zu UNKLAR-Verschiebung geführt.
- **Anwendungs-Konvention:** Beide Pre-5-Disziplinen gelten verbindlich für jeden Audit/Sweep mit Drift-Klassifikation. Pre-5a ergänzt L-30 (Konsumenten-Sweep nach SSOT-Refactor) auf der Audit-Seite; Pre-5b verhindert künstliche UNKLAR-Aufblähung.

**Wert-Recherche durch Claude im Web (seit Lehre 22, 26.04.2026):** Bei
Werten, die durch Web-Suche eindeutig recherchierbar sind (Mieterbund
Betriebskostenspiegel, BMF-Tabellen, Destatis, BDEW, Bundesnetzagentur,
Stiftung Warentest), kann Claude die Recherche direkt durchführen statt
auf Karsten zu warten. **Pflicht:** (1) Aktualität-Hinweis im Quellen-
Verweis, (2) zwei unabhängige Sekundärquellen für Konsistenz-Check, (3)
Repo-Stand vor Patch-Generierung lesen. **URL-Permission-Workflow:**
`web_fetch`-Permissions blockieren Pattern-Konstruktion auf URLs ohne
User-Klartext-Freigabe — Karsten muss neue URLs als Klartext im Chat
pasten, Screenshot-OCR aus Bildern zählt nicht.

## Redaktionelle Referenzwerte in Configs (Wellen 82–102, 14.08.2026)

**Die Lücke, die diese Wellen aufgedeckt haben:** G11 verbietet eigene Konstanten für *gesetzliche* Werte in *Berechnungs-Libs*. Für **redaktionelle Referenzwerte in Config-Prosa** — Spritpreise, Strompreise, Ladepreise — gab es keine Regel. Ergebnis: 56 hartkodierte Energiepreise über drei Config-Dateien, teils widersprüchlich zueinander, teils zwei Jahre alt. `lib/berechnungen/strompreis.ts` verbot in seinem eigenen Kopfkommentar ausdrücklich hartkodierte Werte — und keine einzige Config hielt sich daran.

### G13 — Referenzwerte kommen aus einer SSOT und werden interpoliert

Jeder wiederkehrende Zahlenwert in Config-Text (Preise, Marktspannen, Durchschnittswerte) gehört in eine Parameter-Datei unter `lib/berechnungen/` und wird von dort interpoliert, nicht abgeschrieben. Bestehende: `spritpreise-parameter.ts`, `strompreis.ts`, `ladepreise-parameter.ts`.

`check-energiepreise.mjs` erzwingt das für Energiepreise. **Szenariospannen** (`0,20–0,25 €/kWh`) sind erlaubt und werden an ihrer Form erkannt — sie beschreiben eine Bandbreite, keinen Referenzwert, und gehören in keine SSOT.

Semantik vor Bequemlichkeit: `LADEPREISE.wallbox` ist in `ladepreise-parameter.ts` als `STROMPREIS_2026.durchschnitt_bdew / 100` definiert — nicht zufällig verwandt, sondern abgeleitet, und dabei anders skaliert (0,37 €/kWh gegen 37 ct/kWh). Ein Haushaltsgeräte-Rechner nimmt die Strompreis-SSOT, kein Ladepreis-Feld. Ausführlich mit Begründung im Abschnitt »Technik — was diese Kategorie von den anderen unterscheidet«.

### Preise binden ist die halbe Arbeit — die Ergebnisse stehen woanders

Eine Suche nach `€/kWh` oder `€/l` findet die **Preise**. Sie findet nicht die Beträge, die aus ihnen gerechnet wurden — die stehen als nackte Zahlen in Rechenwegen, Tabellen, Fazit-Texten und Fußnoten, oft mehrere Blöcke entfernt.

Dieser Fehler ist in dieser Serie **dreimal** aufgetreten (Wellen 85→86, 88→89, 89 Nachlauf). Nach jeder Preisbindung folgt ein zweiter Durchgang: nach den alten **Ergebniswerten** suchen, nicht nach den Preisen.

Und ein dritter Durchgang nach **Rückverweisen**: „den größten Teil der hier gerechneten 123 Euro" nennt den Betrag ein zweites Mal, drei Sätze später.

### Beschriftungen neben gebundenen Beträgen mitbinden

Wird ein Betrag an eine Konstante gebunden und die Beschriftung daneben bleibt hartkodiert, entsteht aus einer veralteten Zahl ein **sichtbarer Rechenfehler**:

```
Benziner (Vergleich) | 7,5 l × 1,75 € | 15,94 €
```

7,5 × 1,75 ergibt 13,13. Das ist die schlechtere Lage als eine bloß alte Zahl, weil es die ganze Rechnung in Zweifel zieht — und es entsteht **durch** das Binden. Nach jeder Bindung prüfen, ob im selben Element eine beschreibende Formel steht.

### Quotierung prüfen, bevor `${…}` eingesetzt wird

Ein Interpolationsausdruck in einem **einfach gequoteten** Feld landet wörtlich auf der Seite. Weder der Build noch `check-backticks.mjs` melden das — beides ist syntaktisch einwandfrei.

Vor jeder Ersetzung prüfen, wie das Zielfeld gequotet ist. Bei einfachen Anführungszeichen die **ganze Zeile** ersetzen und öffnendes **und** schließendes Zeichen auf Backtick umstellen. In JSX gilt das Gegenteil: dort `{…}` ohne Dollarzeichen.

### Erst klären, ob das Feld gerendert wird — und wer es sonst liest

`app/[kategorie]/[rechner]/page.tsx` entscheidet per Ternär zwischen `contentBloecke` und dem alten Pfad. Vor Welle 101 war der alte Pfad für **keinen** Rechner erreichbar, obwohl er wie eine Absicherung für zwei Ausnahmen aussah. Von 14 gefundenen Fundstellen in einem Rechner waren 7 unsichtbar; eine Korrektur landete in totem Text.

Die zweite Frage ist wichtiger als die erste: **Wer liest das Feld sonst noch?** `beispiel` speist `scripts/social-caption-builder.ts` — ein Feld zu entfernen, das nur die Seite nicht rendert, hätte die Social-Pipeline getroffen. Vor jeder großflächigen Änderung `grep -rn "\.feldname"` über `app`, `components`, `lib`, `scripts`.

### Wächter: die Frage muss zur Änderungsrate der Quelle passen

Ein Wächter, der das **Datenalter** einer Quelle prüft, die nur zweimal im Jahr veröffentlicht, warnt dauerhaft bei korrekten Werten — und erzieht dazu, Warnungen zu überlesen. Das entwertet die nächste echte Warnung.

- Wert ändert sich laufend (Spritpreise, wöchentlich) → `stand` prüfen
- Wert ändert sich träge (BDEW, ACE) → `geprueft` prüfen: wann hat zuletzt jemand nachgesehen, ob es Neueres gibt

Beim Bau eines Wächters gehört jeder Treffer, der **nicht** gemeldet wird, genauso geprüft wie jeder gemeldete. Ein stilles `continue` bei fehlendem Feld, ein `catch`, das eine fehlende Datei überspringt, ein Muster ohne Wortgrenze — alle drei lassen einen Wächter grün melden, ohne geprüft zu haben. Ein Wächter, der eine echte Lücke verdeckt, ist schlechter als keiner.

### Ein toter Auffangpfad ist gefährlicher als gar keiner

Der entfernte Fallback in `page.tsx` hat jahrelang die Illusion einer Absicherung erzeugt und dabei verdeckt, dass die eigentliche Prüfung fehlt. Wird ein Fallback entfernt, muss vorher geklärt sein, wer seine Aufgabe übernimmt — hier `check-contentbloecke-pflicht.mjs`.

### Beim Entfernen: Gegenzählung dessen, was nicht getroffen werden darf

Bei 412 Schnitten über zehn Dateien prüft niemand den Diff mit dem Auge. Die aussagekräftige Zahl ist nicht, wie viele Felder entfernt wurden, sondern wie viele gleichnamige Vorkommen **unberührt** geblieben sind — 1.875 `formel:`-Schlüssel in den `contentBloecke`-Bausteinen. Wäre das Muster zu weit gegriffen, hätte genau diese Zahl den Schaden sofort angezeigt.

Dazu die Strukturprobe auf verwaiste Kommas (`,\s*,` und `\{\s*,`) — der wahrscheinlichste Schaden beim Entfernen von Objekteigenschaften.

Und: Feldwerte niemals per Regex schneiden. Sie enthalten Apostrophe, Zeilenumbrüche und Template-Literale mit eigenen Anführungszeichen. String-Leser mit Escape-Behandlung, rückwärts arbeitend, mit Abbruch bei unlesbarem Literal.

### Belegkriterien müssen erreichbar sein

Ein Prüfkriterium, das nie grün werden kann, ist kein Beleg, sondern Aufwand. Datei-Hashes gebauter Seiten taugen in diesem Projekt **nicht**: Next.js schreibt je Build eine neue `buildId` und neue Chunk-Namen, zwei Builds aus identischen Quellen liefern verschiedene Hashes.

Tauglich ist der Vergleich des **sichtbaren Textes**: Vorzustand über `git stash` bauen, Skripte und Tags entfernen, ab dem Breadcrumb vergleichen, Zeichenzahl gegenüberstellen.

# Kategorie-Besonderheiten

> Referenzdatei zum Skill `rechner-builder`. Ausgelagert in Welle 114 (26.08.2026),
> damit die SKILL.md den Ablauf trägt und die Detailbestände erst bei Bedarf geladen werden.
> Der Inhalt ist gegenüber der früheren SKILL.md **unverändert**.

Was einzelne Kategorien von den anderen unterscheidet.

**Wann lesen:** beim Bau eines Technik-Rechners.

**Nicht hier:** die Wellbeing-Pflichten für Gesundheits-Rechner. Die stehen bewusst im SKILL.md selbst, weil sie sicherheitsrelevant sind und nicht hinter einer Indirektion liegen dürfen.

---

## Technik — was diese Kategorie von den anderen unterscheidet

**Stand 20.08.2026, gemessen an `cc4adf4`: 15 Rechner, `kategorieSlug: 'technik'`, Kategoriename `Technik`.**

### Die meisten Werte sind Physik, nicht Recht

Technik ist die einzige Kategorie, deren Zahlen überwiegend aus Einheiten­definitionen und physikalischen Zusammenhängen stammen: Bit zu Byte, Pixel zu Zoll, Diagonale zu Seitenverhältnis, Kapazität durch Leistung. Diese Werte **driften nicht**. Kein Jahres-Audit, keine Verordnung, kein Stichtag.

Praktische Folge beim Bauen: Der sonst richtige Reflex — „welche SSOT-Lib liefert diesen Wert, wann wurde sie zuletzt geprüft" — geht bei **dreizehn** der fünfzehn Rechner ins Leere. Dort ist die richtige Prüfung eine **Gegenrechnung von Hand**, kein Quellenabgleich.

### Die zwei Ausnahmen stehen dafür in der Audit-Kette

Genau zwei Technik-Rechner beziehen Preise und veralten damit wie Finanz- oder Wohnen-Rechner:

| Rechner | Bezug |
|---|---|
| `eauto-ladekosten-rechner` | `ladepreise-parameter`, `spritpreise-parameter`, `strompreis` — Komponente **und** Config |
| `stromverbrauch-geraete-rechner` | `strompreis`, über die Modul-Konstante `SG_PREIS` in der Config |

**`eauto-ladezeit-rechner` gehört ausdrücklich NICHT dazu.** Der Name legt es nahe, der Rechner rechnet aber reine Physik: kWh ÷ kW. Er enthält keine einzige Preis-Zeichenkette. Wer ihn beim Preis-Audit mitnimmt, sucht dort nach etwas, das es nicht gibt — und wer umgekehrt vom Namen auf den Inhalt schließt, baut denselben Fehler in die andere Richtung.

Merksatz: **Preisbezug wird gemessen, nicht am Namen abgelesen.** Er kann in der Komponente sitzen oder in der Config — beide Ebenen prüfen, weil die Config die Libs modulweit importiert und über abgeleitete Konstanten (`SG_PREIS`, `STAND_STROM`, `STAND_LADEN`, `ekJahr*`) an einzelne Einträge weiterreicht.

### Die Falle, die schon einmal zugeschnappt ist

In `lib/rechner-config/technik.ts` steht dieser Kommentar. Er ist keine Formalie, sondern die Kodifizierung eines echten Fehlers:

> Bewusst NICHT `LADEPREISE.wallbox`: das ist derselbe Zahlenwert, meint aber das Laden eines Autos. Hier geht es um Haushaltsgeraete.

Die beiden Größen sind nicht zufällig verwandt — `lib/berechnungen/ladepreise-parameter.ts` definiert `wallbox: STROMPREIS_2026.durchschnitt_bdew / 100`. Der eine Wert **ist** der andere, nur anders benannt und anders skaliert.

Daraus folgen zwei Regeln:

**Erstens: Bedeutung schlägt Herkunft.** Genau weil die Ersetzung heute folgenlos aussähe, steht der Warnkommentar da. Die Ableitung ist eine Entscheidung von heute, keine Naturkonstante — sobald Ladestrom und Haushaltsstrom getrennt gepflegt werden, laufen die Werte auseinander, und jede Stelle, die den falschen Bezeichner nennt, wird still falsch. Anzusprechen ist immer der Bezeichner, der die **gemeinte Größe** trägt, nie der, der zufällig die passende Zahl hält.

**Zweitens: die Einheit mitlesen.** `durchschnitt_bdew` ist **37** (ct/kWh), `wallbox` ist **0,37** (€/kWh). Die Werte sind einheitengleich, nicht zahlengleich. Ein unbedachter Tausch bringt keinen kleinen Fehler, sondern den Faktor 100.

### Zwei Einheitenkonventionen, die festliegen

**Mbit/s zu MB/s: durch 8.** Anbieter werben in Bit, Ladefenster zeigen Byte. Der Faktor ist keine Näherung und wird nie weggelassen.

**Dezimal, nicht binär.** Die Rechner rechnen mit 1 GB = 1.000 MB. Die binäre Entsprechung (1 GiB = 1.024 MiB) wird in FAQ und Erklärtext **benannt und erklärt**, aber nicht zur Rechengrundlage gemacht. Das ist bereits so ausgerollt und wird nicht je Rechner neu entschieden.

### Prüfung beim Bauen

Weil bei dreizehn von fünfzehn Rechnern keine Quelle gegenliest, ersetzt die **Gegenrechnung** den Quellenabgleich:

- Jedes Zahlenbeispiel in `beispiel`, `faq`, `erklaerung` und `formel` von Hand nachrechnen — dieselbe Stale-Nest-Regel wie überall, nur ohne die Ausrede, die Quelle habe sich geändert.
- Bei Umrechnungen die **Gegenprobe in die andere Richtung**: 100 Mbit/s ÷ 8 = 12,5 MB/s, also muss 12,5 × 8 wieder 100 ergeben.
- Bei Zeit- und Kapazitätsrechnern die Größenordnung prüfen: eine 5-GB-Datei bei 50 Mbit/s dauert rund 13 Minuten — nicht 13 Sekunden, nicht 13 Stunden.

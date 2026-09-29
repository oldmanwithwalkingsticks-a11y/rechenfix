# Messung: Kling-Kennzeichnung gegen die Medienkette von rechenfix

**Stand:** 29.09.2026 · **Gegenstand:** Artikel `warum-das-bankjahr-360-tage-hat` (W140a, `05cfc16`) ·
**Art:** reine Messung, keine Änderung an Skripten, Medien, `GENERATOREN`, `inventar.json` oder Rechtstexten.

## Ergebnis in einem Satz je Datei

- **`bankjahr-titelbild.png` (Gemini 3 Pro Image über den Kling-Connector):** Das Rohbild trägt ein
  **gültiges** C2PA-Manifest von Google LLC samt Google-XMP. Beides geht beim **ersten sharp-Schritt**
  (Verkleinern auf 1536 px) vollständig verloren, also vor `ki-metadaten-schreiben.mjs`. Die
  veröffentlichte Datei trägt kein C2PA mehr, nur noch die Repo-Kennzeichnung.
- **`bankjahr.mp4` (Kling AI 3.0 Omni):** Das Rohvideo trägt **kein** C2PA-Manifest und kein XMP. Die
  einzige eingebettete Kling-Marke ist eine H.264-SEI-Nachricht `kling-ai`. Sie geht beim
  **ffmpeg-Schritt** (Neukodieren auf 1080p) verloren. Die veröffentlichte Datei trägt nur die
  Repo-Kennzeichnung.
- **`bankjahr-video-standbild.jpg`:** Das Standbild ist abgeleitet, nämlich das erste Einzelbild des
  umgewandelten Videos. Es trug zu keinem Zeitpunkt eine Kennzeichnung von Kling oder Google, nur die
  Repo-Kennzeichnung.

**Zur Ausgangsfrage.** `ki-metadaten-schreiben.mjs` hat in der tatsächlichen Kette nichts zu
entwerten, weil vorher schon nichts mehr da ist. Die Verluste entstehen in den Schritten zur
Auslieferungsfassung, bei sharp und ffmpeg. Hätte eine Datei beim Metadatenlauf noch ein gültiges
Manifest, würde das Skript es **entwerten**. Der Behälter bliebe dabei stehen und die Hash-Bindung
bräche. Das ist an Kontrolldateien und am rohen Google-Titelbild gemessen (Abschnitt 6).

**Nicht gemessen:** das unsichtbare Wasserzeichen im Bild- bzw. Videoinhalt. Das betrifft Klings
Wasserzeichen und das Google-SynthID, das das Manifest ausdrücklich nennt. Mit c2patool und ExifTool
ist es nicht messbar, deshalb sagt dieser Bericht nichts darüber, ob es Verkleinern, Palettieren oder
Neukodieren übersteht.

## 1. Kette von der Generatordatei bis `public/blog/`

Die Befehle stammen aus dem Ausroll-Prompt von Welle 140 (Schritte 4 bis 6) und aus dem
Fortsetzungs-Prompt (Schritte 2 und 3). Beide liegen lokal unter `_lokal/`. Die Reihenfolge der
Metadatenläufe ergibt sich aus dem Fortsetzungs-Prompt: Der erste Lauf endete an STOP 5, **nachdem**
der Metadatenschritt gelaufen war. Die Fortsetzung palettierte dann und ließ das Skript ein zweites
Mal über alle Dateien laufen.

| Datei | Schritt | Befehl | Größe danach |
|---|---|---|---|
| Titelbild | Rohdatei | von Karsten unter dem Endnamen abgelegt | 6.514.392 B |
| | 4a | `sharp(…).resize({width:1536}).png({compressionLevel:9})` | 2.735.891 B |
| | 6 | `node scripts/ki-metadaten-schreiben.mjs` (Lauf 1) | 2.736.995 B |
| | F2 | `sharp(…).png({palette:true,compressionLevel:9,effort:10})` | 678.368 B |
| | F3 | `node scripts/ki-metadaten-schreiben.mjs` (Lauf 2) | 679.472 B |
| Video | Rohdatei | von Karsten unter dem Endnamen abgelegt | 4.750.968 B |
| | 4b | `ffmpeg -y -i … -vf scale=1920:-2 -c:v libx264 -crf 20 -preset slow -an …` | 1.522.088 B |
| | 6 / F3 | `ki-metadaten-schreiben.mjs`, Lauf 1 und 2 | 1.525.608 B |
| Standbild | 5 | `ffmpeg -y -i bankjahr.mp4 -vframes 1 -q:v 3 …` aus dem **umgewandelten** Video | 93.161 B |
| | 6 / F3 | `ki-metadaten-schreiben.mjs`, Lauf 1 und 2 | 96.690 B |

**Die Kette ist nicht nur aus den Prompts abgeleitet, sondern byte-genau reproduziert.** Aus den
Rohdateien im Archiv `Blogs/Bilder-neu/` und `Blogs/Videos-neu/` erzeugen genau diese Befehle alle drei
veröffentlichten Dateien mit identischer SHA-256:

| Datei | SHA-256 der Nachbildung | SHA-256 `public/blog/` |
|---|---|---|
| `bankjahr-titelbild.png` | `4313668fd553…` | `4313668fd553…` |
| `bankjahr.mp4` | `732c1281a45f…` | `732c1281a45f…` |
| `bankjahr-video-standbild.jpg` | `2a2a423614c2…` | `2a2a423614c2…` |

Die Zwischengrößen 678.368 B, 1.522.088 B und 93.161 B decken sich mit dem Eintrag zu Welle 140 in
`welle-status-historie.md`.

**Was die Prompts nicht belegen:**
- **ffmpeg-Fassung:** Die Prompts rufen `ffmpeg` vom Suchpfad auf und nennen keine Fassung. Das
  veröffentlichte Video trägt in seiner x264-SEI `core 165 r3223 0480cb0`, dieselbe Kennung wie die
  Nachbildung mit ffmpeg 8.0.1 (Build von gyan.dev). Die Byte-Gleichheit belegt, dass Encoder und
  Parameter übereinstimmen. Die Fassungsnummer von damals ist damit nicht belegt.
- **Titelbild ohne Neudownload:** Für das Titelbild gibt es keinen neuen Download in `kling-roh/`. Siehe
  Abschnitt 2 dazu, warum die Archivdatei trotzdem als unverändert belegt ist.
- **Weg vom Generator zur Rohdatei:** Ob die Datei aus dem Konto oder über den Connector kam, belegen
  die Prompts nicht.

Andere Medienskripte des Repos schreiben nicht nach `public/blog/`.
`scripts/videos-neu-kodieren.ps1` und `scripts/titelbilder-verkleinern.mjs` schreiben ins Archiv
`Blogs/`, `scripts/build-tiktok-videos.mjs` betrifft nur `public/social-videos/`.

## 2. Originale und ihre Herkunft

`docs/audit-arbeitspapiere/_lokal/kling-roh/` enthält fünf Videos, am 28.09.2026 neu aus dem Kling-Konto
heruntergeladen. **Keine dieser Dateien ist hash-gleich** mit `Blogs/Videos-neu/bankjahr.mp4`
(`cbf7536b755a…`), und ein Titelbild ist nicht darunter.

- **Zuordnung:** `kling_20260914_VIDEO_Locked_off_1976_0.mp4` ist das Bankjahr-Video. Es hat 3840×2160,
  5,04 s und 121 Einzelbilder, wie die Archivdatei. Der SSIM über alle Einzelbilder gegen die
  Archivdatei beträgt **0,9939**. Die Gegenprobe mit `…Close_stat_1954_0.mp4` vom selben Tag ergibt
  0,7324.
- **Abweichung:** Die beiden Dateien sind nicht dieselben Bytes. Der Neudownload hat 4.873.639 B, die
  Archivdatei 4.750.968 B, und schon die MD5 des Videostroms unterscheidet sich (`4643625f…` gegen
  `a6ec110d…`). Es ist dieselbe Generierung, beim Download anders kodiert. Der Behälter ist gleich
  aufgebaut, und die Encoder-Kennung `Lavf60.16.100` ist dieselbe. Beide tragen keinerlei C2PA und beide dieselbe
  SEI-Marke. Gemessen wurde nach Vorgabe der Neudownload, die Archivdatei lief als tatsächlicher
  Ausgangspunkt von Welle 140 mit.
- **Titelbild:** Hier gibt es keinen Neudownload. Gemessen wurde `Blogs/Bilder-neu/bankjahr-titelbild.png`.
  Dass sie unverändert ist, belegt ihr **gültiges** C2PA-Manifest selbst. Es bindet die Signatur von
  Google über `c2pa.hash.data` an die Bytes der Datei und wurde am 2026-09-13T23:40:28Z signiert. Jede
  spätere Änderung hätte `assertion.dataHash.mismatch` ergeben (Abschnitt 6 zeigt genau das).

## 3. Werkzeuge

| Werkzeug | Fassung | Herkunft |
|---|---|---|
| c2patool | 0.27.22 | GitHub `contentauth/c2pa-rs`, Release `c2patool-v0.27.22` (10.09.2026), `c2patool-v0.27.22-x86_64-pc-windows-msvc.zip`, 10.863.857 B, SHA-256 `2e6808719b5610f9ab096857f600f16938fda3c7388de3829f0dea1c2a345011`, übereinstimmend mit der Prüfsumme des Releases. Installiert im Scratchpad der Sitzung, nicht im Repo |
| ExifTool | 13.59 | `exiftool-vendored` 37.0.0 aus dem Repo, Aufruf `-a -G1 -s` |
| ffmpeg / ffprobe | 8.0.1-full_build (gyan.dev) | `C:\ffmpeg\bin`, libx264 `core 165 r3223 0480cb0` |
| sharp | 0.34.5 | aus dem Repo, dieselbe Fassung wie im Lockfile von `05cfc16` |
| eigener Behälterscan | Python 3.14.5 | liest MP4-Boxen (Top-Level, uuid, moov/udta/meta), PNG-Chunks und JPEG-Segmente direkt aus den Bytes, unabhängig von c2patool |

`ki-metadaten-schreiben.mjs` lief **unverändert** aus dem Repo, aber mit dem Arbeitsordner als
Arbeitsverzeichnis. Das Skript liest `process.cwd()/public/blog`, deshalb hat es nur die Kopien
beschrieben. Seit `05cfc16` wurden dort nur drei `GENERATOREN`-Zeilen für kinder-lohnsteuer ergänzt.
Nach jedem Lauf sind `git status` und die SHA-256 der drei Dateien in `public/blog/` geprüft, beides
unverändert.

## 4. Positivkontrolle

Die Testdateien stammen aus `contentauth/c2pa-rs`, Pfad `sdk/tests/fixtures/`, Stand `main` bei
`69907b5a6656`.

| Datei | Soll | c2patool 0.27.22 |
|---|---|---|
| `video1.mp4` (828.571 B) | gültiges Manifest | Manifest gelesen, `validation_state: Valid`, `assertion.bmffHash.match`, `claimSignature.validated` |
| `C.jpg` (132.518 B) | gültiges Manifest | Manifest gelesen, `Valid`, `assertion.dataHash.match`, `claimSignature.validated` |
| PNG (siehe unten) | gültiges Manifest | Manifest gelesen, `Valid`, `assertion.dataHash.match`, `claimSignature.validated` |
| `video1_no_manifest.mp4` | kein Manifest | `No claim found` |
| `no_manifest.jpg` | kein Manifest | `No claim found` |
| `libpng-test.png` | kein Manifest | `No claim found` |

- **PNG-Kontrolle:** Kein PNG-Fixture war als Positivkontrolle brauchbar. `sample1.png` trägt entgegen
  seinem Namen kein Manifest. `exp-test1.png` trägt ein aktives Manifest mit gültigem Hash und gültiger
  Signatur, meldet aber insgesamt `Invalid`, weil eine eingebettete Zutat mit einem selbstsignierten
  Zertifikat signiert ist (`signingCredential.invalid`). Als PNG-Kontrolle dient deshalb
  `libpng-test.png`, mit c2patool und dem Testzertifikat aus dem Release (`sample/es256_certs.pem`)
  signiert.
- **Zum Code `signingCredential.untrusted`:** Er erscheint bei allen gültigen Dateien, auch bei der von
  Google, weil keine Vertrauensliste geladen war. Er betrifft das Vertrauen in den Aussteller, nicht die
  Unversehrtheit. „Gültig“ heißt in diesem Bericht: Hash-Bindung und Signatur des aktiven Manifests
  sind in Ordnung. Ob Googles Zertifikat auf der C2PA-Vertrauensliste steht, ist nicht geprüft.

Erst nach dieser Kontrolle wird eine Abwesenheit als Befund gewertet. Die Aussage „kein Manifest“
unten gilt für eingebettete Manifeste. Einen Verweis auf ein entferntes Manifest trügen XMP oder ein
C2PA-Behälter, und die Rohvideos tragen weder XMP noch eine `uuid`-Box (eigener Behälterscan).

## 5. Vergleich je Datei und Schritt

### Titelbild (Ausgang `Blogs/Bilder-neu/bankjahr-titelbild.png`)

| Stufe | Bytes | C2PA | gültig | Validator | Behälter/XMP |
|---|---|---|---|---|---|
| Rohdatei | 6.514.392 | ja (`caBX` 7.605 B) | **ja** | `Valid`: `dataHash.match`, `claimSignature.validated` | `iTXt` XMP von Google: `DigitalSourceType` und `DigitalSourceFileType` = `trainedAlgorithmicMedia`, `photoshop:Credit` = „Made with Google AI“, Toolkit „Adobe XMP Core 7.0“; 2752×1536 RGB |
| nach sharp resize | 2.735.891 | **nein** | — | `No claim found` | kein `caBX`, kein XMP; 1536×857 RGB |
| nach Metadaten Lauf 1 | 2.736.995 | nein | — | `No claim found` | XMP des Repos |
| nach sharp palette | 678.368 | nein | — | `No claim found` | kein XMP; Farbtyp 3 (Palette) |
| nach Metadaten Lauf 2 | 679.472 | nein | — | `No claim found` | XMP des Repos: `DigitalSourceType`, `dc:Description`, `dc:Rights`, `xmp:CreatorTool` |
| `public/blog/` | 679.472 | nein | — | `No claim found` | byte-gleich mit der Stufe davor |

Inhalt des Google-Manifests (`claim.v2`, Aussteller Google LLC, CN „Google Media Processing Services“,
Generator „Google C2PA Core Generator Library“): `c2pa.actions.v2` mit `c2pa.created` („Created by Google
Generative AI.“) und `c2pa.edited` („Applied imperceptible SynthID watermark.“), beide mit
`digitalSourceType` `trainedAlgorithmicMedia`.

**Was nach der Kette fehlt:**
- das gesamte C2PA-Manifest samt Signatur;
- `DigitalSourceFileType`;
- die Credit-Zeile „Made with Google AI“.

Der `DigitalSourceType` steht danach wieder in der Datei, aber als Eintrag des Repo-Skripts, nicht als
Googles eigener.

### Video (Ausgang `kling-roh/…Locked_off_1976_0.mp4`)

| Stufe | Bytes | C2PA | gültig | Validator | Behälter/Marken |
|---|---|---|---|---|---|
| Rohdatei | 4.873.639 | **nein** | — | `No claim found` | Boxen `ftyp`, `moov` (mit `udta/meta`: nur `major_brand`, `minor_version`, `compatible_brands`, `encoder`), `free`, `mdat`; **keine** `uuid`-Box, kein XMP; im Videostrom eine SEI `user_data_unregistered`, UUID `91ca6061-4aee-3854-8614-2d5f73f4ae2e`, Nutzlast `kling-ai`, einmal |
| nach ffmpeg | 1.513.061 | nein | — | `No claim found` | SEI `kling-ai` **fehlt** |
| nach Metadaten Lauf 1 | 1.516.581 | nein | — | `No claim found` | XMP des Repos |
| nach Metadaten Lauf 2 | 1.516.581 | nein | — | `No claim found` | byte-gleich mit Lauf 1 |
| `public/blog/` | 1.525.608 | nein | — | `No claim found` | XMP des Repos, kein `kling-ai`; entsteht byte-gleich aus der Archiv-Rohdatei (Abschnitt 1) |

Mit der Archiv-Rohdatei als Ausgang ergibt sich dasselbe Bild. Sie trägt kein C2PA und dieselbe
SEI-Marke einmal, und nach ffmpeg fehlt die Marke.

**Was nach der Kette fehlt:** die SEI-Marke `kling-ai`.

### Standbild

| Stufe | Bytes | C2PA | gültig | Validator | Segmente |
|---|---|---|---|---|---|
| erstes Einzelbild (ffmpeg) | 98.213 (Ausgang Neudownload) / 93.161 (Ausgang Archiv) | nein | — | `No claim found` | nur Kommentar, Quantisierungs- und Huffman-Tabellen, Bildkopf; kein APP1, kein APP11 |
| nach Metadaten | 101.742 / 96.690 | nein | — | `No claim found` | zusätzlich APP1 mit XMP des Repos |
| `public/blog/` | 96.690 | nein | — | `No claim found` | byte-gleich mit der Kette aus dem Archiv |

### Die übrigen Originale in `kling-roh/`, nur roh ausgelesen

| Datei | Auflösung | C2PA | XMP | Zeichenkette `kling-ai` | `AIGC`-Schlüssel in `moov/udta/meta` |
|---|---|---|---|---|---|
| `kling_20260903_VIDEO_Close_up___1825_0.mp4` | 1920×1080 | nein | nein | 1× | nein |
| `kling_20260914_VIDEO_Close_stat_1954_0.mp4` | 1920×1080 | nein | nein | 1× | nein |
| `kling_20260927_VIDEO_Dust_float_5099_0.mp4` | 1916×1080 | nein | nein | 1× | **ja** |
| `kling_20260927_VIDEO_One_single_5125_0.mp4` | 1916×1080 | nein | nein | 1× | **ja** |

Die beiden Generierungen vom 27.09. tragen einen Metadatenschlüssel `AIGC` mit JSON:
`{"Label":"1","ContentProducer":"kling","ProduceID":"SGP_PROD_ai_web_…","ContentPropagator":"kling","PropagateID":…}`.
Die älteren Generierungen vom 03.09. und 14.09. tragen ihn nicht, obwohl auch sie am 28.09.
heruntergeladen wurden. Für die Bankjahr-Datei ist die SEI-Nachricht vollständig entschlüsselt, für
die übrigen ist nur die Zeichenkette gezählt.

**Zur Aussage in Klings Dokumentation.** Kling schreibt auf `kling.ai/docs/ai-content-detection`, in
Bildern und Videos würden ein unsichtbares Wasserzeichen und Metadaten eingebettet, ausgerichtet an
offenen Herkunftsstandards „e.g. C2PA“. Ein C2PA-Manifest trägt keine der fünf heruntergeladenen
Videodateien. Das ist eine Aussage über diese fünf Dateien, nicht über Kling allgemein.

**Wirkung der Kette auf das `AIGC`-Etikett, an einer Kopie von `Dust_float` gemessen:**
- Der ffmpeg-Befehl aus Welle 140 entfernt `AIGC` **und** `kling-ai`.
- `ki-metadaten-schreiben.mjs` allein lässt beides stehen.

Das betrifft künftige Artikel, deren Rohvideos diesen Schlüssel tragen werden.

## 6. Wirkungskontrolle: Was `ki-metadaten-schreiben.mjs` mit einem gültigen Manifest macht

Das ist nicht die Produktionskette. Hier läuft das Skript unverändert auf Dateien, die noch ein
gültiges Manifest tragen. Sie liegen unter den Endnamen in einem eigenen Arbeitsordner.

| Eingang | vorher | nachher |
|---|---|---|
| `video1.mp4` als `bankjahr.mp4` | `Valid` | Manifest noch da, **`Invalid`**: `assertion.bmffHash.mismatch` |
| signiertes PNG als `bankjahr-titelbild.png` | `Valid` | Manifest noch da, **`Invalid`**: `assertion.dataHash.mismatch` |
| `C.jpg` als `bankjahr-video-standbild.jpg` | `Valid` | Manifest noch da, **`Invalid`**: `assertion.dataHash.mismatch` |
| rohes Google-Titelbild (ohne sharp) | `Valid` | Manifest noch da, **`Invalid`**: `assertion.dataHash.mismatch` |

In allen vier Fällen bleibt `claimSignature.validated` erhalten, die Signatur über den Claim ist also
intakt. Gebrochen ist die Bindung an die Datei. **„Behälter noch da“ und „gültig“ fallen genau hier
auseinander**, wie im Anlass vermutet.

## 7. Unabhängige Gegenprobe mit Klings Detektor

Der Detektor liegt unter `kling.ai/detection`. Beim Laden am 29.09.2026 zeigte er keine
Anmeldesperre, nur ein Feld zum Hochladen mit dem Hinweis „Batch upload supported“. **Nicht
benutzt.** Die Gegenprobe verlangt, eine Datei an einen fremden Dienst zu übertragen, darunter das
unveröffentlichte Rohvideo. Die Browserwerkzeuge dieser Sitzung können keine lokalen Dateien
auswählen. Ob der Upload selbst eine Anmeldung verlangt, ist deshalb nicht festgestellt. Der Detektor
ist der einzige hier genannte Weg, der etwas über Klings unsichtbares Wasserzeichen sagen könnte.
Sinnvolle Paare für eine Prüfung von Hand: Rohvideo gegen `public/blog/bankjahr.mp4`, Rohbild gegen
`public/blog/bankjahr-titelbild.png`.

## 8. Vorschlag — nicht umgesetzt

Schritt 5 zeigt einen Verlust bei allen drei Arten von Kennzeichnung, die sich messen lassen: Googles
C2PA-Manifest, Googles XMP-Credit und Klings Marken (`kling-ai`-SEI, bei neueren Dateien `AIGC`).
Ursache sind die Schritte zur Auslieferungsfassung, nicht der Metadatenlauf. Welche Variante gilt,
entscheidet Karsten. Ob daraus etwas für Rechtstexte folgt, gehört Susanne, und die Einordnung gegen
Klings Community Guidelines Peter.

1. **Video: Kling-Marken beim Neukodieren mitnehmen.** Die Marken lassen sich erhalten, ohne auf die
   Verkleinerung zu verzichten. An einer Kopie von `Dust_float` gemessen:
   - `-map_metadata 0 -movflags use_metadata_tags` erhält den `AIGC`-Schlüssel wortgleich.
   - `-bsf:v "h264_metadata=sei_user_data=91ca6061-4aee-3854-8614-2d5f73f4ae2e+kling-ai"` setzt die
     SEI-Marke wieder ein. Nach der Umwandlung steht die Zeichenkette zweimal im Strom, im Original
     einmal.
   - Beides übersteht den anschließenden Metadatenlauf, und der `DigitalSourceType` des Repos kommt
     hinzu.

   Offen und zu entscheiden: Die wieder eingesetzte SEI ist eine **Kopie** von Klings Marke, erzeugt
   von rechenfix und nicht von Kling. Ob Klings Detektor diese Marke überhaupt auswertet, ist nicht
   gemessen.
2. **Titelbild: Ein gültiges Manifest übersteht keine Umwandlung.** Die Signatur bindet an die Bytes,
   und schon ein zusätzlicher XMP-Block bricht die Bindung (Abschnitt 6). Drei Wege:
   - (a) **Original unverändert ausliefern.** Das widerspricht der Größenregel: 6,5 MB gegen rund
     0,7 MB. Die Datei müsste außerdem vom Metadatenlauf ausgenommen werden, sonst entwertet ihn das
     Skript. Ihr eigenes XMP trägt den `DigitalSourceType` bereits.
   - (b) **Nach dem Umwandeln neu signieren**, mit einem eigenen C2PA-Manifest, das Googles Original
     als Zutat führt (c2patool `--parent`). Das braucht ein eigenes Signaturzertifikat, und ohne
     Eintrag auf der C2PA-Vertrauensliste meldet jeder Prüfer `signingCredential.untrusted`.
   - (c) **Stand belassen und dokumentieren.** Die dreistufige Repo-Kennzeichnung bleibt, Googles
     Herkunftsnachweis entfällt.

   Eine Sidecar-Datei mit Googles Manifest würde gegen die umgewandelten Bytes nicht validieren. Das
   ist aus der Hash-Bindung abgeleitet und nicht eigens gemessen.
3. **Schutz im Skript, unabhängig von 1 und 2.** `ki-metadaten-schreiben.mjs` könnte vor dem Schreiben
   prüfen, ob eine Datei einen C2PA-Behälter trägt (PNG `caBX`, JPEG APP11/JUMBF, MP4 `uuid`
   `d8fec3d6-1b0e-483c-9297-5828877ec481`). Dann würde es abbrechen oder die Datei auslassen, statt das
   Manifest stillschweigend zu entwerten. In der heutigen Kette trifft das nie zu. Es trifft genau dann
   zu, wenn eine künftige Kette ein Original unverändert durchreicht.

## Anhang: Ablage der Messdaten (lokal, nicht versioniert)

`docs/audit-arbeitspapiere/_lokal/kling-messung/`:
- `0-roh/`: Kopien aller Originale
- `momentaufnahmen/`, `momentaufnahmen-blogs/`, `momentaufnahmen-aigc/`: je Schritt eine Datei
- `dumps/`: vollständige ExifTool-Ausgaben
- `*.json` / `*.txt`: Messprotokolle

Die Kontrolldateien und c2patool liegen außerhalb des Repos. Nichts davon ist committet.

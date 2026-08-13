/**
 * Einmal-Skript: schreibt XMP-/IPTC-Metadaten in alle KI-generierten Blog-Assets.
 *
 * Aufruf:  node scripts/ki-metadaten-schreiben.mjs
 *          node scripts/ki-metadaten-schreiben.mjs --pruefen   (nur auslesen)
 *
 * Warum: Die maschinenlesbare Auszeichnung im JSON-LD gilt nur auf unserer
 * eigenen Seite. Sobald jemand ein Bild herunterlädt und weiterverbreitet, geht
 * sie verloren. XMP-Metadaten in der Datei bleiben erhalten und sind das, was
 * Plattformen tatsächlich auslesen.
 *
 * Geschrieben wird der IPTC-Standardwert `trainedAlgorithmicMedia` als
 * DigitalSourceType — der etablierte Marker für vollständig KI-erzeugte Medien.
 *
 * Voraussetzung: devDependency `exiftool-vendored` (bringt die Binary mit, es
 * muss nichts manuell auf dem System installiert werden).
 *
 * Gruppenname: `XMP-iptcExt` ist der kanonische Familie-1-Gruppenname von
 * ExifTool für den Iptc4xmpExt-Namensraum. Die naheliegende Schreibweise
 * `XMP-Iptc4xmpExt` kann einen BESTEHENDEN Namensraum aktualisieren, aber
 * keinen neuen anlegen — ExifTool meldet dann nur eine Warnung
 * („doesn't exist or isn't writable"), die die Node-API verschluckt, sodass der
 * Aufruf fälschlich als erfolgreich erscheint. Deshalb NICHT ändern.
 *
 * Achtung: Das Skript verändert Dateien in public/blog/ IN PLACE. Vorher
 * committen, damit ein Rückweg über git existiert. Es legt keine _original-
 * Sicherungskopien an (writeArgs: overwrite_original), sonst landen
 * .png_original-Dateien im Repo.
 */

import { exiftool } from 'exiftool-vendored';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const ORDNER = path.join(process.cwd(), 'public', 'blog');
const DIGITAL_SOURCE_TYPE =
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';

/**
 * Zuordnung Datei -> Generator. Bewusst explizit statt über Dateiendung
 * geraten: Wer ein neues Asset hinzufügt, muss hier eintragen, womit es
 * erzeugt wurde — oder das Skript meldet es als unbekannt.
 */
const GENERATOREN = {
  'bildschirm-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'bildschirm-video-standbild.png': 'Gemini 3 Pro Image (Google)',
  'bildschirm.mp4': 'Kling AI 3.0 (Kuaishou)',
  'blutdruck-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'blutdruck-video-standbild.png': 'Gemini 3 Pro Image (Google)',
  'blutdruck.mp4': 'Kling AI 3.0 (Kuaishou)',
  'bmi-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'bmi.mp4': 'Kling AI 3.0 (Kuaishou)',
  'cups-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'cups.mp4': 'Kling AI 3.0 (Kuaishou)',
  'datenmengen-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'datenmengen.mp4': 'Kling AI 3.0 (Kuaishou)',
  'euro-dmark-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'euro-dmark.mp4': 'Kling AI 3.0 (Kuaishou)',
  'kalorien-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'kalorien.mp4': 'Kling AI 3.0 (Kuaishou)',
  'meter-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'meter-video-standbild.png': 'Gemini 3 Pro Image (Google)',
  'meter.mp4': 'Kling AI 3.0 (Kuaishou)',
  'pferdestaerke-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'pferdestaerke-muehlenpferd.mp4': 'Kling AI 3.0 (Kuaishou)',
  'schuhgroessen-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'schuhgroessen.mp4': 'Kling AI 3.0 (Kuaishou)',
  'zeit-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'zeit.mp4': 'Kling AI 3.0 (Kuaishou)',
  'pfund-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'pfund.mp4': 'Kling AI 3.0 (Kuaishou)',
  'wohnflaeche-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'wohnflaeche-video-standbild.jpg': 'Kling AI 3.0 (Kuaishou)',
  'wohnflaeche.mp4': 'Kling AI 3.0 (Kuaishou)',
  'promille-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'promille-video-standbild.jpg': 'Kling AI 3.0 (Kuaishou)',
  'promille.mp4': 'Kling AI 3.0 (Kuaishou)',
  'bremsweg-titelbild.png': 'Gemini 3 Pro Image (Google)',
  'bremsweg-video-standbild.jpg': 'Kling AI 3.0 (Kuaishou)',
  'bremsweg.mp4': 'Kling AI 3.0 (Kuaishou)',
};

const nurPruefen = process.argv.includes('--pruefen');

async function main() {
  const dateien = (await readdir(ORDNER)).filter((f) => /\.(png|jpe?g|mp4)$/i.test(f));

  let geschrieben = 0;
  let unbekannt = 0;

  for (const datei of dateien) {
    const pfad = path.join(ORDNER, datei);
    const generator = GENERATOREN[datei];

    if (!generator) {
      console.warn(`UNBEKANNT  ${datei} — kein Generator hinterlegt, übersprungen`);
      unbekannt++;
      continue;
    }

    if (nurPruefen) {
      const tags = await exiftool.read(pfad);
      const wert = tags.DigitalSourceType ?? tags['XMP-iptcExt:DigitalSourceType'] ?? '—';
      console.log(`${wert === DIGITAL_SOURCE_TYPE ? 'OK        ' : 'FEHLT     '}${datei}  ${wert}`);
      continue;
    }

    await exiftool.write(
      pfad,
      {
        'XMP-iptcExt:DigitalSourceType': DIGITAL_SOURCE_TYPE,
        'XMP-dc:Description': `KI-generiertes Medium, erzeugt mit ${generator}. Kein reales Foto, keine reale Aufnahme.`,
        'XMP-xmp:CreatorTool': generator,
        'XMP-dc:Rights': 'Rechenfix.de',
      },
      { writeArgs: ['-overwrite_original'] },
    );

    console.log(`GESCHRIEBEN ${datei}  (${generator})`);
    geschrieben++;
  }

  if (!nurPruefen) {
    console.log(`\nFertig: ${geschrieben} Dateien ausgezeichnet, ${unbekannt} unbekannt.`);
    if (unbekannt > 0) {
      console.log('Unbekannte Dateien in GENERATOREN eintragen und erneut laufen lassen.');
    }
  }
}

main()
  .catch((fehler) => {
    console.error('Fehler:', fehler);
    process.exitCode = 1;
  })
  .finally(() => exiftool.end());

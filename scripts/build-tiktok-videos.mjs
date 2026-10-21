/**
 * W18.3b — TikTok-Video-Renderer (PNG → MP4 Standbild).
 *
 * Rendert jedes 9:16-PNG aus public/social-videos-src/{slug}.png in ein
 * ~6s-Standbild-MP4 (H.264, 1080×1920, yuv420p, 30fps, stumm) nach
 * public/social-videos/{slug}.mp4.
 *
 * Läuft LOKAL (Karstens Windows / npm-Script) — NICHT in der Vercel-
 * Lambda. Die Cron-Route lädt später nur die fertige .mp4-Datei hoch,
 * dieses Script wird von ihr NICHT importiert.
 *
 * Nutzt das ffmpeg-static-Binary (npm-Package, kein System-Install) und
 * child_process.execFile mit Array-Args (kein Shell-Escaping-Risiko).
 *
 * Aufruf:
 *   node scripts/build-tiktok-videos.mjs                 (alle Quellbilder)
 *   node scripts/build-tiktok-videos.mjs --slug pace-rechner   (nur einer)
 *   node scripts/build-tiktok-videos.mjs --skip-existing  (nur fehlende)
 *   node scripts/build-tiktok-videos.mjs --stale          (nur veraltete, Welle 172)
 *   node scripts/build-tiktok-videos.mjs --check          (nur melden, Exit 1 bei veralteten)
 *
 * Manifest (Welle 172): lib/social/kacheln-manifest.json, Bereich „videos“,
 * hält je Video den SHA-256 des Quellbilds und des MP4, seit Welle 192 auch
 * die Fassung der Filterkette (VIDEO_FASSUNG). Veraltet ist ein Video, wenn
 * es fehlt, nicht im Manifest steht, die Datei nicht passt, das Quellbild sich
 * seitdem geändert hat oder es mit einer älteren Fassung erzeugt wurde.
 * Ob das Quellbild selbst aktuell
 * ist, prüft `python scripts/social-image-builder.py --from-config --vertical --check`.
 *
 * Dependency: ffmpeg-static (^5.3.0). Fehlt das Binary → klare Meldung.
 */

import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ffmpegPathImport from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'public', 'social-videos-src');
const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'social-videos');
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'lib', 'social', 'kacheln-manifest.json');
const MANIFEST_HINWEIS =
  'Erzeugt von scripts/social-image-builder.py und scripts/build-tiktok-videos.mjs. ' +
  'Nicht von Hand ändern.';

function dateiSha256(datei) {
  return createHash('sha256').update(readFileSync(datei)).digest('hex');
}

function manifestLaden() {
  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    : {};
  manifest.hinweis = MANIFEST_HINWEIS;
  manifest.version ??= 1;
  for (const bereich of ['quadrat', 'hochformat', 'videos']) manifest[bereich] ??= {};
  return manifest;
}

// Gleiches Format wie social-image-builder.py (json.dumps mit sort_keys,
// indent=2, ensure_ascii=False): sortierte Schlüssel, LF, Umbruch am Ende.
function sortiert(wert) {
  if (Array.isArray(wert)) return wert.map(sortiert);
  if (wert && typeof wert === 'object') {
    return Object.fromEntries(
      Object.keys(wert)
        .sort()
        .map((k) => [k, sortiert(wert[k])]),
    );
  }
  return wert;
}

function manifestSchreiben(manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(sortiert(manifest), null, 2) + '\n', 'utf8');
}

// Ändert sich die Filterkette in buildArgs, diese Kennung hochzählen. Dann gelten
// alle Videos als veraltet und --stale erzeugt sie neu.
// zoom-2 (Welle 192): nur noch der Ken-Burns-Zoom, kein Helligkeitspuls mehr.
const VIDEO_FASSUNG = 'zoom-2';

function veraltetGrund(eintrag, inputPng, outputMp4) {
  if (!existsSync(outputMp4)) return 'Video fehlt';
  if (!eintrag) return 'nicht im Manifest';
  if (eintrag.sha256 !== dateiSha256(outputMp4)) return 'Videodatei passt nicht zum Manifest';
  if (eintrag.quelleSha256 !== dateiSha256(inputPng)) return 'Quellbild geändert';
  if (eintrag.fassung !== VIDEO_FASSUNG) return 'ältere Fassung der Filterkette';
  return null;
}

// ffmpeg-static exportiert den Binary-Pfad als Default-Export.
const ffmpegPath = ffmpegPathImport;

/**
 * ffmpeg-Filterkette (Welle 192): TikTok-kompatibles MP4 (h264 / 1080×1920 /
 * yuv420p / 30fps / 6s, stumm) mit Bewegung durch einen Ken-Burns-Zoom
 * (1.0→1.10 gleichmäßig über volle 6s). Das erste Bild zeigt die ganze Kachel.
 *
 * Bis Welle 191 lag darüber ein Helligkeitspuls über das ganze Bild (W18.3b-3,
 * Tal 10 % / Spitze 100 %, etwa jede Sekunde). Das Video blinkte, gut die
 * Hälfte der Bilder war fast schwarz, auch das erste. Der Zoom allein reicht
 * als Bewegung.
 *
 * Da execFile mit Array-Args läuft (kein Shell), ist kein Shell-Escaping
 * nötig. Der filter_complex-String ist EIN Array-Element.
 */
function buildArgs(inputPng, outputMp4) {
  // Ken-Burns-Zoom (1.0→1.10 gleichmäßig über 180 Frames = 6s)
  const filter = [
    "[0:v]scale=2160:3840,",
    "zoompan=z='min(zoom+0.00056,1.10)':d=180:",
    "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,",
    "format=yuv420p[out]",
  ].join('');

  return [
    '-y',
    '-loop', '1',
    '-i', inputPng,
    '-filter_complex', filter,
    '-map', '[out]',
    '-c:v', 'libx264',
    // Welle 192: ohne die dunklen Bilder des Pulses brauchte die Standardqualität (CRF 23)
    // gut 40 % mehr Platz. CRF 26 hält die bisherige Dateigröße (SSIM 0,9987 zum verlustfreien Bild).
    '-crf', '26',
    '-t', '6',
    '-pix_fmt', 'yuv420p',
    '-r', '30',
    '-movflags', '+faststart',
    outputMp4,
  ];
}

function runFfmpeg(inputPng, outputMp4) {
  return new Promise((resolve, reject) => {
    execFile(
      ffmpegPath,
      buildArgs(inputPng, outputMp4),
      { windowsHide: true },
      (err, _stdout, stderr) => {
        if (err) {
          // ffmpeg schreibt Diagnostik auf stderr; letzte Zeile ist am
          // aussagekräftigsten.
          const tail = (stderr || err.message || '')
            .trim()
            .split('\n')
            .pop();
          reject(new Error(tail || 'ffmpeg exit != 0'));
          return;
        }
        resolve();
      },
    );
  });
}

function parseArgs(argv) {
  const args = { slug: null, skipExisting: false, stale: false, check: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--slug') {
      args.slug = argv[i + 1];
      i++;
    } else if (argv[i] === '--skip-existing') {
      args.skipExisting = true;
    } else if (argv[i] === '--stale') {
      args.stale = true;
    } else if (argv[i] === '--check') {
      args.check = true;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!ffmpegPath || !existsSync(ffmpegPath)) {
    console.error(
      'FEHLER: ffmpeg-static Binary nicht gefunden — npm install ffmpeg-static',
    );
    process.exit(1);
  }

  if (!existsSync(SRC_DIR)) {
    console.error(
      `FEHLER: Quell-Ordner fehlt: ${path.relative(PROJECT_ROOT, SRC_DIR)}\n` +
        'Erst die 9:16-PNGs erzeugen: ' +
        'python scripts/social-image-builder.py --vertical',
    );
    process.exit(1);
  }

  // Ziel-Liste bestimmen
  let slugs;
  if (args.slug) {
    const srcPath = path.join(SRC_DIR, `${args.slug}.png`);
    if (!existsSync(srcPath)) {
      console.error(
        `FEHLER: Quellbild fehlt: ${path.relative(PROJECT_ROOT, srcPath)}`,
      );
      process.exit(1);
    }
    slugs = [args.slug];
  } else {
    const entries = await readdir(SRC_DIR);
    slugs = entries
      .filter((f) => f.toLowerCase().endsWith('.png'))
      .map((f) => f.slice(0, -'.png'.length))
      .sort();
  }

  if (slugs.length === 0) {
    console.log('Keine Quellbilder in public/social-videos-src/ gefunden.');
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const manifest = manifestLaden();
  let rendered = 0;
  let skipped = 0;
  let aktuell = 0;
  const veraltet = [];
  const failed = [];

  for (const slug of slugs) {
    const inputPng = path.join(SRC_DIR, `${slug}.png`);
    const outputMp4 = path.join(OUT_DIR, `${slug}.mp4`);

    if (args.skipExisting && existsSync(outputMp4)) {
      skipped++;
      continue;
    }

    if (args.stale || args.check) {
      const grund = veraltetGrund(manifest.videos[slug], inputPng, outputMp4);
      if (grund === null) {
        aktuell++;
        continue;
      }
      if (args.check) {
        veraltet.push([slug, grund]);
        continue;
      }
    }

    try {
      await runFfmpeg(inputPng, outputMp4);
      manifest.videos[slug] = {
        fassung: VIDEO_FASSUNG,
        quelleSha256: dateiSha256(inputPng),
        sha256: dateiSha256(outputMp4),
      };
      const kb = Math.round((await stat(outputMp4)).size / 1024);
      console.log(
        `  ✓ ${slug} → ${path.relative(PROJECT_ROOT, outputMp4)} (${kb} KB)`,
      );
      rendered++;
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`);
      failed.push(slug);
    }
  }

  if (args.check) {
    for (const [slug, grund] of veraltet) console.log(`  ✗ ${slug} — ${grund}`);
    console.log(`\nAktuell: ${aktuell} · Veraltet: ${veraltet.length}`);
    if (veraltet.length > 0) process.exit(1);
    return;
  }

  if (rendered > 0) manifestSchreiben(manifest);

  console.log(
    `\nRendered: ${rendered} · Skipped: ${skipped}` +
      (args.stale ? ` · Aktuell: ${aktuell}` : '') +
      ` · Failed: ${failed.length}`,
  );
  if (failed.length > 0) {
    console.error(`Failed-Slugs: ${failed.join(', ')}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});

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
 * hält je Video den SHA-256 des Quellbilds und des MP4. Veraltet ist ein
 * Video, wenn es fehlt, nicht im Manifest steht, die Datei nicht passt oder
 * das Quellbild sich seitdem geändert hat. Ob das Quellbild selbst aktuell
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

function veraltetGrund(eintrag, inputPng, outputMp4) {
  if (!existsSync(outputMp4)) return 'Video fehlt';
  if (!eintrag) return 'nicht im Manifest';
  if (eintrag.sha256 !== dateiSha256(outputMp4)) return 'Videodatei passt nicht zum Manifest';
  if (eintrag.quelleSha256 !== dateiSha256(inputPng)) return 'Quellbild geändert';
  return null;
}

// ffmpeg-static exportiert den Binary-Pfad als Default-Export.
const ffmpegPath = ffmpegPathImport;

/**
 * Verifizierte ffmpeg-Filterkette (W18.3b-3 — kantenfreier Vollbild-Puls):
 * erzeugt TikTok-kompatibles MP4 (h264 / 1080×1920 / yuv420p / 30fps / 6s,
 * stumm) MIT Bewegung — Ken-Burns-Zoom (1.0→1.10 über volle 6s) +
 * Vollbild-Helligkeits-Puls (~6× über die Länge, Tal ~10% / Peak 100%).
 *
 * Bewusst KEIN Crop/Blur/Overlay: das GANZE Bild wird gleichmäßig in der
 * Helligkeit moduliert → keine Zonen-Kante, kein grauer/schwarzer Kasten.
 * (Ersetzt die W18.3b-2-Glow-Crop-Blur-Kette, die auf fast-schwarzem
 * Hintergrund einen grauen Rechteck-Halo erzeugte.)
 *
 * Escaping: Kommas im geq-Ausdruck müssen ffmpeg-intern escaped werden
 * (`\\,` im JS-String = literales `\,` an ffmpeg). Da execFile mit
 * Array-Args läuft (kein Shell), ist NUR das ffmpeg-Escaping nötig,
 * KEIN Shell-Escaping. Der filter_complex-String ist EIN Array-Element.
 */
function buildArgs(inputPng, outputMp4) {
  // Ken-Burns-Zoom (1.0→1.10 gleichmäßig über 180 Frames = 6s)
  // + Vollbild-Helligkeits-Puls (~6× über die Länge, Tal ~10% / Peak 100%).
  const pulse = '(0.1+0.9*max(0\\,sin(T*5.71)))';
  const filter = [
    "[0:v]scale=2160:3840,",
    "zoompan=z='min(zoom+0.00056,1.10)':d=180:",
    "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,",
    "format=rgb24,",
    `geq=r='r(X\\,Y)*${pulse}':g='g(X\\,Y)*${pulse}':b='b(X\\,Y)*${pulse}',`,
    "format=yuv420p[out]",
  ].join('');

  return [
    '-y',
    '-loop', '1',
    '-i', inputPng,
    '-filter_complex', filter,
    '-map', '[out]',
    '-c:v', 'libx264',
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

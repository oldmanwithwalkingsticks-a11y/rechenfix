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
 *
 * Dependency: ffmpeg-static (^5.3.0). Fehlt das Binary → klare Meldung.
 */

import { execFile } from 'node:child_process';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ffmpegPathImport from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'public', 'social-videos-src');
const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'social-videos');

// ffmpeg-static exportiert den Binary-Pfad als Default-Export.
const ffmpegPath = ffmpegPathImport;

/**
 * Verifizierte ffmpeg-Argumentkette (W18.3b — an echtem Bild getestet,
 * NICHT ändern): erzeugt TikTok-kompatibles MP4
 * (h264 / 1080×1920 / yuv420p / 30fps / 6s, stumm).
 *
 * scale+pad ist ein Sicherheitsnetz für nicht-exakt-1080×1920-Inputs;
 * bei korrektem 9:16-PNG ein No-Op.
 */
function buildArgs(inputPng, outputMp4) {
  return [
    '-y',
    '-loop', '1',
    '-i', inputPng,
    '-c:v', 'libx264',
    '-t', '6',
    '-pix_fmt', 'yuv420p',
    '-vf',
    'scale=1080:1920:force_original_aspect_ratio=decrease,' +
      'pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black,format=yuv420p',
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
  const args = { slug: null, skipExisting: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--slug') {
      args.slug = argv[i + 1];
      i++;
    } else if (argv[i] === '--skip-existing') {
      args.skipExisting = true;
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

  let rendered = 0;
  let skipped = 0;
  const failed = [];

  for (const slug of slugs) {
    const inputPng = path.join(SRC_DIR, `${slug}.png`);
    const outputMp4 = path.join(OUT_DIR, `${slug}.mp4`);

    if (args.skipExisting && existsSync(outputMp4)) {
      skipped++;
      continue;
    }

    try {
      await runFfmpeg(inputPng, outputMp4);
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

  console.log(
    `\nRendered: ${rendered} · Skipped: ${skipped} · Failed: ${failed.length}`,
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

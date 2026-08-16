import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { platformsForSlug, ALL_PLATFORMS, type Platform } from '@/lib/social/state';
import { getBerlinDate, istTikTokTag } from '@/lib/social/utils';
import queueFile from '@/lib/social/queue.json';
import type { QueueFile } from '@/lib/social/schema';
import { istAdminAngemeldet } from '@/lib/admin-session';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const QUEUE = (queueFile as unknown as QueueFile).queue;

// Schlüssel-Ableitung — bewusst hier inline, damit NICHTS aus publisher.ts
// oder den schreibenden state-Helfern (Runden-Reset, Done-Mark) importiert
// wird. Diese Route ist strikt lesend (Welle 43).
const doneKey = (slug: string, p: Platform) => `social:done:${slug}:${p}`;
const roundKey = (p: Platform) => `social:round:${p}`;
const roundResetKey = (p: Platform) => `social:round-reset:${p}`;

interface PlattformStatus {
  platform: Platform;
  zustaendig: number;
  erledigt: number;
  runde: number;
  letzterRundenwechsel: string | null;
  naechsterSlug: string | null;
}

export async function GET() {
  if (!(await istAdminAngemeldet())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const plattformen: PlattformStatus[] = await Promise.all(
      ALL_PLATFORMS.map(async (platform): Promise<PlattformStatus> => {
        const zustaendigeSlugs = QUEUE.filter((s) =>
          platformsForSlug(s).includes(platform),
        );
        const zustaendig = zustaendigeSlugs.length;

        let erledigt = 0;
        let naechsterSlug: string | null = null;

        if (zustaendig > 0) {
          // Gebündelt statt 205 Einzel-GETs: eine MGET-Abfrage pro Plattform.
          const marks = (await redis.mget(
            ...zustaendigeSlugs.map((s) => doneKey(s, platform)),
          )) as (string | null)[];
          for (let i = 0; i < zustaendigeSlugs.length; i++) {
            const done = marks[i] !== null && marks[i] !== undefined;
            if (done) {
              erledigt++;
            } else if (naechsterSlug === null) {
              // Lesend: erster zuständiger Slug ohne Done-Marke = nächster fälliger.
              naechsterSlug = zustaendigeSlugs[i];
            }
          }
        }

        const meta = (await redis.mget(
          roundKey(platform),
          roundResetKey(platform),
        )) as (string | null)[];
        const runde = Number(meta[0]) || 1;
        const letzterRundenwechsel =
          typeof meta[1] === 'string' && meta[1].length > 0 ? meta[1] : null;

        return {
          platform,
          zustaendig,
          erledigt,
          runde,
          letzterRundenwechsel,
          naechsterSlug,
        };
      }),
    );

    // W52 — TikTok postet nur jeden zweiten Tag. Damit der Admin-Tab an einem
    // Nicht-Takttag (TikTok ohne Zuständigkeit) nicht wie ein Defekt aussieht.
    const heuteBerlin = getBerlinDate();
    const tiktokTakttagHeute = istTikTokTag(heuteBerlin);
    let tiktokNaechsterTakttag = heuteBerlin;
    const basisMs = Date.parse(`${heuteBerlin}T00:00:00Z`);
    for (let i = 0; i < 800; i++) {
      const tag = new Date(basisMs + i * 86_400_000).toISOString().slice(0, 10);
      if (istTikTokTag(tag)) {
        tiktokNaechsterTakttag = tag;
        break;
      }
    }

    return NextResponse.json({
      queueLaenge: QUEUE.length,
      abgerufenAm: new Date().toISOString(),
      plattformen,
      tiktokTakttagHeute,
      tiktokNaechsterTakttag,
    });
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

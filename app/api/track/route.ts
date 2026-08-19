import { NextResponse } from 'next/server';
import { redis, KEYS } from '@/lib/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Maximale Anzahl gespeicherter Einträge (älteste fallen raus)
const MAX_CLICKS = 20000;
const MAX_FEEDBACKS = 20000;
const MAX_PDFS = 20000;
const MAX_KI = 20000;

interface TrackClickBody {
  type: 'click';
  programId: string;
  context?: string;
  rechner: string;
}

interface TrackFeedbackBody {
  type: 'feedback';
  feedback: 'ja' | 'nein';
  rechner: string;
}

interface TrackPdfBody {
  type: 'pdf';
  rechner: string;
}

type KiFeature = 'erklaerung' | 'ki-rechner' | 'was-waere-wenn' | 'strom-spartipp' | 'schlaf-tipp';

const KI_FEATURES: readonly KiFeature[] = [
  'erklaerung', 'ki-rechner', 'was-waere-wenn', 'strom-spartipp', 'schlaf-tipp',
] as const;

interface TrackKiBody {
  type: 'ki';
  feature: KiFeature;
  /** Anzeigename des Rechners; beim eigenständigen KI-Rechner leer. */
  rechner?: string;
  status: 'ok' | 'fehler';
}

type TrackBody = TrackClickBody | TrackFeedbackBody | TrackPdfBody | TrackKiBody;

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0 && v.length < 500;
}

export async function POST(req: Request) {
  let body: TrackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    if (body.type === 'click') {
      if (!isString(body.programId) || !isString(body.rechner)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const entry = {
        p: body.programId,
        c: typeof body.context === 'string' ? body.context.slice(0, 100) : '',
        r: body.rechner.slice(0, 200),
        t: Date.now(),
      };
      await redis.lpush(KEYS.clicks, JSON.stringify(entry));
      await redis.ltrim(KEYS.clicks, 0, MAX_CLICKS - 1);
      return NextResponse.json({ ok: true });
    }

    if (body.type === 'feedback') {
      if ((body.feedback !== 'ja' && body.feedback !== 'nein') || !isString(body.rechner)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const entry = {
        v: body.feedback,
        r: body.rechner.slice(0, 200),
        t: Date.now(),
      };
      await redis.lpush(KEYS.feedbacks, JSON.stringify(entry));
      await redis.ltrim(KEYS.feedbacks, 0, MAX_FEEDBACKS - 1);
      return NextResponse.json({ ok: true });
    }

    if (body.type === 'pdf') {
      if (!isString(body.rechner)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const entry = {
        r: body.rechner.slice(0, 200),
        t: Date.now(),
      };
      await redis.lpush(KEYS.pdfs, JSON.stringify(entry));
      await redis.ltrim(KEYS.pdfs, 0, MAX_PDFS - 1);
      return NextResponse.json({ ok: true });
    }

    if (body.type === 'ki') {
      if (!KI_FEATURES.includes(body.feature)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      if (body.status !== 'ok' && body.status !== 'fehler') {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const entry = {
        f: body.feature,
        r: typeof body.rechner === 'string' ? body.rechner.slice(0, 200) : '',
        s: body.status,
        t: Date.now(),
      };
      await redis.lpush(KEYS.ki, JSON.stringify(entry));
      await redis.ltrim(KEYS.ki, 0, MAX_KI - 1);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

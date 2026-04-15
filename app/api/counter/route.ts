import { NextResponse } from 'next/server';
import { redis, KEYS, ZAEHLER_STARTWERT } from '@/lib/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// GET: aktuellen Zählerstand liefern (kein Increment)
export async function GET() {
  try {
    const v = await redis.get<number>(KEYS.zaehler);
    return NextResponse.json({ value: v ?? ZAEHLER_STARTWERT });
  } catch {
    return NextResponse.json({ value: ZAEHLER_STARTWERT });
  }
}

// POST: Zähler atomar um 1 erhöhen
export async function POST() {
  try {
    // Erst setzen, falls noch nicht existent (no-op wenn vorhanden)
    await redis.setnx(KEYS.zaehler, ZAEHLER_STARTWERT);
    const neu = await redis.incr(KEYS.zaehler);
    return NextResponse.json({ value: neu });
  } catch {
    return NextResponse.json({ value: ZAEHLER_STARTWERT }, { status: 500 });
  }
}

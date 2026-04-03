import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rechenfix.de — Kostenlose Online-Rechner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 80, fontWeight: 800, color: '#ffffff' }}>
            Rechen
          </span>
          <span style={{ fontSize: 80, fontWeight: 800, color: '#f59e0b' }}>
            fix
          </span>
          <span style={{ fontSize: 32, color: '#93c5fd', marginLeft: 8 }}>
            .de
          </span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#bfdbfe',
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          Fix gerechnet!
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#ffffff',
            maxWidth: 800,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit
        </div>
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 40,
            fontSize: 40,
          }}
        >
          <span>💰</span>
          <span>📊</span>
          <span>🚗</span>
          <span>💚</span>
          <span>⚡</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

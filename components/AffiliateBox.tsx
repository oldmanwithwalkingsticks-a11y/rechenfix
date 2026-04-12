'use client';

import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/components/cookie/CookieConsentProvider';

// --- Affiliate-Programm-Daten ---

const AFFILIATE_PROGRAMS = {
  wiso: {
    name: 'WISO Steuer',
    tagline: 'Steuererklärung leicht gemacht — durchschnittlich 1.063 € Erstattung',
    cta: 'WISO Steuer ansehen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=17387&awinaffid=2843240',
    deeplink: 'https://www.buhl.de/produkte/wiso-steuer/',
    icon: '📊',
    color: '#0066CC',
  },
  smartsteuer: {
    name: 'smartsteuer',
    tagline: 'Online-Steuererklärung in unter 1 Stunde — ohne Vorkenntnisse',
    cta: 'smartsteuer testen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=15043&awinaffid=2843240',
    deeplink: 'https://steuererklaerung.smartsteuer.de/',
    icon: '⚡',
    color: '#00A651',
  },
  lexware: {
    name: 'Lexware Office',
    tagline: 'Buchhaltung, Rechnungen & Steuern — alles in einer Software',
    cta: 'Lexware Office testen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=13787&awinaffid=2843240',
    deeplink: 'https://www.lexware.de/buchhaltungssoftware/',
    icon: '💼',
    color: '#003399',
  },
  check24: {
    name: 'CHECK24',
    tagline: 'Anbieter vergleichen und sofort sparen',
    cta: 'Jetzt vergleichen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=9364&awinaffid=2843240',
    deeplink: '',
    icon: '🔍',
    color: '#003E7E',
  },
  congstar: {
    name: 'congstar',
    tagline: 'Faire Handytarife ab 5 €/Monat — monatlich kündbar',
    cta: 'Tarife ansehen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=11938&awinaffid=2843240',
    deeplink: 'https://www.congstar.de/handytarife/',
    icon: '📱',
    color: '#FF6600',
  },
  'ks-auxilia': {
    name: 'KS Auxilia Rechtsschutz',
    tagline: 'Rechtsschutzversicherung ab 18,90 €/Monat — für Arbeit, Verkehr & Privat',
    cta: 'Rechtsschutz anfragen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=108114&awinaffid=2843240',
    deeplink: '',
    icon: '⚖️',
    color: '#B22222',
  },
  eventfloss: {
    name: 'Eventfloss Berlin',
    tagline: 'Unvergessliche Events auf dem Wasser — jetzt planen',
    cta: 'Events entdecken',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=27722&awinaffid=2843240',
    deeplink: 'https://www.eventfloss-berlin.de/',
    icon: '🚢',
    color: '#1E90FF',
  },
} as const;

type ProgramId = keyof typeof AFFILIATE_PROGRAMS;

// --- Kontextuelle Beschreibungen ---

const CONTEXT_TEXTS: Partial<Record<ProgramId, Record<string, string>>> = {
  wiso: {
    'brutto-netto': 'Mit der Steuererklärung holen Sie sich einen Teil der Abzüge zurück.',
    'kfz-steuer': 'Die Kfz-Steuer können Sie in der Steuererklärung angeben.',
    'pendlerpauschale': 'WISO Steuer berechnet Ihre Pendlerpauschale automatisch optimal.',
    'grunderwerbsteuer': 'Kaufnebenkosten lassen sich teilweise von der Steuer absetzen.',
    'steuererstattung': 'WISO Steuer: Umfassende Steuersoftware mit automatischem Belegabruf.',
  },
  smartsteuer: {
    'brutto-netto': 'Online-Steuererklärung machen und Geld vom Finanzamt zurückholen.',
    'kfz-steuer': 'Kfz-Kosten in der Steuererklärung angeben — smartsteuer zeigt wie.',
    'pendlerpauschale': 'Pendlerpauschale automatisch berechnen lassen mit smartsteuer.',
    'grunderwerbsteuer': 'Immobilienkosten steuerlich geltend machen — smartsteuer hilft.',
    'steuererstattung': 'Online-Steuererklärung in unter 60 Minuten — perfekt für einfache Steuerfälle.',
  },
  lexware: {
    'mwst': 'Als Selbstständiger? Lexware Office erstellt Ihre UStVA automatisch.',
    'stundenlohn': 'Stundensatz kalkulieren und direkt professionelle Rechnungen schreiben.',
    'arbeitszeitrechner': 'Arbeitszeiten erfassen und direkt in Rechnungen umwandeln.',
    'ueberstunden': 'Arbeitszeiten und Überstunden sauber dokumentieren.',
    'freelancer': 'Angebote, Rechnungen und Buchhaltung für Freelancer — alles in einem Tool.',
  },
  check24: {
    'strom': 'Stromtarife vergleichen und bis zu 500 € pro Jahr sparen.',
    'stromvergleich': 'Stromanbieter vergleichen — kostenlos, unverbindlich und mit Wechselbonus.',
    'heizkosten': 'Gas- und Heizstromtarife vergleichen und Heizkosten senken.',
    'nebenkosten': 'Strom- und Gasanbieter wechseln — einfach und kostenlos über CHECK24.',
    'kfz-steuer': 'Kfz-Versicherung vergleichen und bis zu 850 € sparen.',
    'spritkosten': 'Autokosten senken? Kfz-Versicherung vergleichen auf CHECK24.',
    'kredit': 'Kredite vergleichen — niedrige Zinsen, schnelle Auszahlung, kostenlos.',
  },
  congstar: {
    'handykosten': 'congstar bietet faire Tarife ab 5 €/Monat — monatlich kündbar und ohne versteckte Kosten.',
  },
  'ks-auxilia': {
    'rechtsschutz': 'KS Auxilia bietet Rechtsschutzversicherung ab 18,90 €/Monat — mit freier Anwaltswahl.',
    'kuendigung': 'Im Streitfall abgesichert — Rechtsschutz für Arbeitsrecht.',
    'urlaubstage': 'Arbeitgeber kürzt Urlaub? Rechtsschutz gibt Ihnen Sicherheit.',
    'ueberstunden': 'Unbezahlte Überstunden? Mit Rechtsschutz zu Ihrem Recht.',
    'bussgeld': 'Einspruch gegen den Bußgeldbescheid? KS Auxilia Rechtsschutz übernimmt die Anwaltskosten — auch im Verkehrsrecht.',
  },
};

// --- Kontextspezifische Deeplinks ---

const CONTEXT_DEEPLINKS: Partial<Record<ProgramId, Record<string, string>>> = {
  check24: {
    'kfz-steuer': 'https://www.check24.de/kfz-versicherung/',
    'spritkosten': 'https://www.check24.de/kfz-versicherung/',
    'strom': 'https://www.check24.de/strom/',
    'stromvergleich': 'https://www.check24.de/strom/',
    'nebenkosten': 'https://www.check24.de/gas/',
    'heizkosten': 'https://www.check24.de/gas/',
    'kredit': 'https://www.check24.de/kredit/',
    'default': 'https://www.check24.de/',
  },
};

// --- Hilfsfunktionen ---

function buildAwinUrl(program: typeof AFFILIATE_PROGRAMS[ProgramId], clickref: string, deeplink?: string): string {
  let url = `${program.baseUrl}&clickref=${encodeURIComponent(clickref)}`;

  const dl = deeplink || program.deeplink;
  if (dl) {
    url += `&ued=${encodeURIComponent(dl)}`;
  }

  return url;
}

function getDescription(programId: ProgramId, context?: string): string {
  const program = AFFILIATE_PROGRAMS[programId];
  if (context && CONTEXT_TEXTS[programId]?.[context]) {
    return CONTEXT_TEXTS[programId]![context];
  }
  return program.tagline;
}

// --- Komponente ---

interface AffiliateBoxProps {
  programId: ProgramId;
  context?: string;
  variant?: 'compact' | 'full';
}

export function AffiliateBox({ programId, context, variant = 'full' }: AffiliateBoxProps) {
  const program = AFFILIATE_PROGRAMS[programId];
  const description = getDescription(programId, context);
  const pathname = usePathname();
  const { marketingAllowed } = useCookieConsent();

  const clickref = useMemo(() => {
    return `https://www.rechenfix.de${pathname}`;
  }, [pathname]);

  const contextDeeplink = context
    ? (CONTEXT_DEEPLINKS[programId]?.[context] || CONTEXT_DEEPLINKS[programId]?.['default'])
    : CONTEXT_DEEPLINKS[programId]?.['default'];
  const url = buildAwinUrl(program, clickref, contextDeeplink);

  const handleClick = useCallback(() => {
    // localStorage-Logging: keine personenbezogenen Daten, immer erlaubt
    try {
      const clicks = JSON.parse(localStorage.getItem('rf_aff_clicks') || '[]');
      clicks.push({
        p: programId,
        c: context || '',
        r: window.location.pathname,
        t: Date.now(),
      });
      if (clicks.length > 200) clicks.splice(0, clicks.length - 200);
      localStorage.setItem('rf_aff_clicks', JSON.stringify(clicks));
    } catch { /* localStorage nicht verfügbar */ }

    // GA-Event nur mit Marketing-Consent
    if (marketingAllowed) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (typeof window !== 'undefined' && w.gtag) {
        w.gtag('event', 'affiliate_click', {
          event_category: 'affiliate',
          event_label: programId,
          affiliate_program: programId,
          rechner_page: window.location.pathname,
        });
      }
    }
  }, [programId, context, marketingAllowed]);

  if (variant === 'compact') {
    return (
      <div
        className="mt-6 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden print:hidden"
        style={{ borderLeftWidth: '4px', borderLeftColor: program.color }}
      >
        <span className="absolute top-2 right-3 text-[11px] text-gray-400 dark:text-gray-500 font-medium">
          Anzeige
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="flex items-center gap-3 px-4 py-3 pr-20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <span className="text-xl flex-shrink-0" role="img" aria-hidden="true">
            {program.icon}
          </span>
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex-shrink-0">
            {program.name}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate hidden sm:inline">
            {description}
          </span>
          <span className="ml-auto flex-shrink-0 text-sm font-medium whitespace-nowrap"
            style={{ color: program.color }}
          >
            {program.cta} →
          </span>
        </a>
      </div>
    );
  }

  // variant === 'full'
  return (
    <div
      className="mt-6 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 print:hidden"
      style={{ borderLeftWidth: '4px', borderLeftColor: program.color }}
    >
      <span className="absolute top-3 right-4 text-[11px] text-gray-400 dark:text-gray-500 font-medium">
        Anzeige
      </span>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl" role="img" aria-hidden="true">
            {program.icon}
          </span>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {program.name}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 pr-12">
          {description}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: program.color }}
        >
          {program.cta}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

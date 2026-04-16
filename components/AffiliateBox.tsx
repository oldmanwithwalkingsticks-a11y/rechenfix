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
    color: '#007A3C',
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
    color: '#B54700',
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
    color: '#1565C0',
  },
  verivox: {
    name: 'Verivox',
    tagline: 'Depots vergleichen und das passende für Ihren ETF-Sparplan finden',
    cta: 'Depots vergleichen',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=14797&awinaffid=2843240',
    deeplink: 'https://www.verivox.de/depot/',
    icon: '📊',
    color: '#1D4ED8',
  },
  naturesway: {
    name: "Nature's Way",
    tagline: 'Vitamine, Mineralstoffe und Pflanzenstoffe für Ihre tägliche Unterstützung',
    cta: 'Produkte entdecken',
    baseUrl: 'https://www.awin1.com/cread.php?awinmid=47173&awinaffid=2843240',
    deeplink: 'https://www.naturesway.de/collections/all',
    icon: '🌿',
    color: '#1F6B42',
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
    'teilzeit': 'Teilzeit und Steuern? WISO Steuer hilft Ihnen, das Maximum aus Ihrer Steuererklärung herauszuholen.',
    'abfindung': 'Fünftelregelung in der Steuererklärung beantragen — WISO Steuer führt Sie Schritt für Schritt.',
    'mutterschutz': 'Steuererklärung im Mutterschutzjahr? WISO Steuer berechnet Mutterschaftsgeld und Elterngeld automatisch korrekt.',
    'rente': 'Altersvorsorge steuerlich absetzen — Riester, Rürup und betriebliche Altersvorsorge optimal in der Steuererklärung angeben.',
    'splitting': 'WISO Steuer berechnet automatisch, ob Einzel- oder Zusammenveranlagung für Sie günstiger ist.',
    'kindergeld': 'WISO Steuer führt die Günstigerprüfung automatisch durch und holt das Maximum für Familien heraus.',
    'erbschaft': 'Erbschaft in der Steuererklärung korrekt angeben — WISO Steuer führt Sie durch alle Angaben.',
    'gehaltserhoehung': 'Bei Gehaltssprung steigt oft die Steuerlast — WISO Steuer holt das Maximum aus Ihrer Steuererklärung.',
    'steuerprogression': 'WISO Steuer berechnet Ihren persönlichen Steuersatz und holt das Maximum heraus.',
    'spenden': 'Spenden korrekt in der Steuererklärung angeben — WISO Steuer führt Sie durch den Sonderausgabenabzug.',
    'nettolohn': 'Sachbezüge und Gehaltsextras korrekt in der Steuererklärung angeben — WISO Steuer hilft.',
  },
  smartsteuer: {
    'brutto-netto': 'Online-Steuererklärung machen und Geld vom Finanzamt zurückholen.',
    'kfz-steuer': 'Kfz-Kosten in der Steuererklärung angeben — smartsteuer zeigt wie.',
    'pendlerpauschale': 'Pendlerpauschale automatisch berechnen lassen mit smartsteuer.',
    'grunderwerbsteuer': 'Immobilienkosten steuerlich geltend machen — smartsteuer hilft.',
    'steuererstattung': 'Online-Steuererklärung in unter 60 Minuten — perfekt für einfache Steuerfälle.',
    'splitting': 'Gemeinsame Steuererklärung als Ehepaar? smartsteuer führt Sie in unter 1 Stunde durch.',
    'erbschaft': 'Erbschaft oder Schenkung erhalten? smartsteuer hilft bei der steuerlichen Erfassung.',
  },
  lexware: {
    'mwst': 'Als Selbstständiger? Lexware Office erstellt Ihre UStVA automatisch.',
    'stundenlohn': 'Stundensatz kalkulieren und direkt professionelle Rechnungen schreiben.',
    'arbeitszeitrechner': 'Arbeitszeiten erfassen und direkt in Rechnungen umwandeln.',
    'ueberstunden': 'Arbeitszeiten und Überstunden sauber dokumentieren.',
    'freelancer': 'Angebote, Rechnungen und Buchhaltung für Freelancer — alles in einem Tool.',
    'skonto': 'Rechnungen mit Skonto-Konditionen erstellen und Zahlungsfristen verwalten — mit Lexware Office.',
    'gmbh': 'Als GmbH-Geschäftsführer? Lexware Office übernimmt Buchhaltung, Rechnungen und Lohnabrechnung in einem Tool.',
    'afa': 'Anlagenverwaltung und AfA automatisch berechnen — mit Lexware Office für Selbstständige.',
    'betriebskosten': 'Einnahmen und Ausgaben im Blick — Lexware Office für Ihre Buchhaltung.',
  },
  check24: {
    'strom': 'Stromtarife vergleichen und bis zu 500 € pro Jahr sparen.',
    'stromvergleich': 'Stromanbieter vergleichen — kostenlos, unverbindlich und mit Wechselbonus.',
    'heizkosten': 'Gas- und Heizstromtarife vergleichen und Heizkosten senken.',
    'nebenkosten': 'Strom- und Gasanbieter wechseln — einfach und kostenlos über CHECK24.',
    'kfz-steuer': 'Kfz-Versicherung vergleichen und bis zu 850 € sparen.',
    'spritkosten': 'Autokosten senken? Kfz-Versicherung vergleichen auf CHECK24.',
    'kredit': 'Kredite vergleichen — niedrige Zinsen, schnelle Auszahlung, kostenlos.',
    'etf': 'Depot-Vergleich auf CHECK24 — das passende Depot für Ihren ETF-Sparplan finden.',
    'baufinanzierung': 'Baufinanzierung vergleichen auf CHECK24 — über 450 Anbieter, kostenlos und unverbindlich.',
    'mietrendite': 'Immobilienfinanzierung vergleichen — günstige Kredite für Ihre Kapitalanlage auf CHECK24.',
    'autokosten': 'Kfz-Versicherung vergleichen und bis zu 850 € pro Jahr sparen — der einfachste Weg Ihre Autokosten zu senken.',
    'waermepumpe': 'Günstigen Wärmepumpen-Stromtarif finden — Stromanbieter vergleichen auf CHECK24.',
    'leasing': 'Autofinanzierung als Alternative zum Leasing? Kredite vergleichen auf CHECK24.',
    'photovoltaik': 'Günstigen Reststrom-Tarif finden — Stromanbieter vergleichen auf CHECK24.',
    'balkonsolar': 'Günstigen Reststrom-Tarif finden — Stromanbieter vergleichen auf CHECK24.',
    'eauto': 'Kfz-Versicherung für Ihr E-Auto vergleichen — oft günstiger als für Verbrenner.',
    'vorfaelligkeit': 'Umschuldung prüfen — günstigere Konditionen finden auf CHECK24.',
    'energiekosten': 'Stromtarif vergleichen und Energiekosten senken — kostenlos auf CHECK24.',
  },
  congstar: {
    'handykosten': 'congstar bietet faire Tarife ab 5 €/Monat — monatlich kündbar und ohne versteckte Kosten.',
  },
  verivox: {
    'etf': 'ETF-Depot vergleichen auf Verivox — Ordergebühren, Sparplan-Kosten und Aktionsangebote im Überblick.',
    'rente': 'Rentenlücke schließen? Depot-Vergleich auf Verivox — das passende Depot für Ihre private Altersvorsorge.',
    'sparplan': 'Mehr aus Ihrem Ersparten machen — Depots vergleichen und Sparplan starten auf Verivox.',
    'riester': 'Riester-Produkte vergleichen auf Verivox — den passenden Anbieter für Ihre Altersvorsorge finden.',
    'kapitalertrag': 'Depot-Vergleich auf Verivox — das passende Depot mit niedrigen Gebühren für Ihre Kapitalerträge.',
  },
  naturesway: {
    'kalorien': 'Vitamine und Mineralstoffe passend zu Ihrem Ernährungsziel — für die tägliche Unterstützung von innen heraus.',
    'bmi': 'Vitamine und Pflanzenstoffe für eine ausgewogene Ernährung von innen heraus.',
  },
  'ks-auxilia': {
    'rechtsschutz': 'KS Auxilia bietet Rechtsschutzversicherung ab 18,90 €/Monat — mit freier Anwaltswahl.',
    'kuendigung': 'Kündigung erhalten? KS Auxilia Rechtsschutz übernimmt die Anwaltskosten bei Kündigungsschutzklage und arbeitsrechtlichen Streitigkeiten.',
    'abfindung': 'Kündigung erhalten? Mit KS Auxilia Rechtsschutz können Sie eine höhere Abfindung verhandeln.',
    'urlaubstage': 'Arbeitgeber kürzt Urlaub? Rechtsschutz gibt Ihnen Sicherheit.',
    'ueberstunden': 'Unbezahlte Überstunden? Mit Rechtsschutz zu Ihrem Recht.',
    'bussgeld': 'Einspruch gegen den Bußgeldbescheid? KS Auxilia Rechtsschutz übernimmt die Anwaltskosten — auch im Verkehrsrecht.',
    'scheidung': 'Rechtsschutzversicherung mit Familienrecht? KS Auxilia übernimmt Anwalts- und Gerichtskosten bei Scheidung.',
    'zugewinn': 'Streit um den Zugewinnausgleich? KS Auxilia Rechtsschutz übernimmt Ihre Anwaltskosten im Familienrecht.',
    'mietpreisbremse': 'Miete zu hoch? KS Auxilia Rechtsschutz übernimmt die Kosten für die Durchsetzung der Mietpreisbremse.',
    'ehegattenunterhalt': 'Streit um Ehegattenunterhalt? KS Auxilia Rechtsschutz deckt Ihre Anwaltskosten im Familienrecht.',
  },
};

// --- Kontextspezifische Deeplinks ---

const CONTEXT_DEEPLINKS: Partial<Record<ProgramId, Record<string, string>>> = {
  check24: {
    'kfz-steuer': 'https://www.check24.net/kfz-versicherung/',
    'spritkosten': 'https://www.check24.net/kfz-versicherung/',
    'strom': 'https://www.check24.net/stromvergleich/',
    'stromvergleich': 'https://www.check24.net/stromvergleich/',
    'nebenkosten': 'https://www.check24.net/gasvergleich/',
    'heizkosten': 'https://www.check24.net/gasvergleich/',
    'kredit': 'https://www.check24.net/kredit/',
    'etf': 'https://www.check24.de/depot/',
    'baufinanzierung': 'https://www.check24.net/kredit/',
    'mietrendite': 'https://www.check24.net/kredit/',
    'autokosten': 'https://www.check24.net/kfz-versicherung/',
    'waermepumpe': 'https://www.check24.net/strom/',
    'leasing': 'https://www.check24.net/kredit/',
    'photovoltaik': 'https://www.check24.net/strom/',
    'balkonsolar': 'https://www.check24.net/strom/',
    'eauto': 'https://www.check24.net/kfz-versicherung/',
    'vorfaelligkeit': 'https://www.check24.net/kredit/',
    'energiekosten': 'https://www.check24.net/strom/',
    'default': 'https://www.check24.net/',
  },
  verivox: {
    'etf': 'https://www.verivox.de/depot/etf-vergleich/',
    'kapitalertrag': 'https://www.verivox.de/depot/',
    'default': 'https://www.verivox.de/depot/',
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
    // Fire-and-forget Tracking — keine personenbezogenen Daten
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'click',
          programId,
          context: context || '',
          rechner: window.location.pathname,
        }),
        keepalive: true,
      }).catch(() => { /* ignore */ });
    } catch { /* ignore */ }

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
        className="mt-6 mb-6 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden print:hidden"
        style={{ borderLeftWidth: '4px', borderLeftColor: program.color }}
      >
        <span className="absolute top-2 right-3 text-[11px] text-gray-600 dark:text-gray-500 font-medium">
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
      className="mt-6 mb-6 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 print:hidden"
      style={{ borderLeftWidth: '4px', borderLeftColor: program.color }}
    >
      <span className="absolute top-3 right-4 text-[11px] text-gray-600 dark:text-gray-500 font-medium">
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

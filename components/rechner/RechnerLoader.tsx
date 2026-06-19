'use client';

/**
 * Client-Wrapper für die 170 Rechner-Components.
 *
 * Bei Verwendung in einer Server-Component (`app/[kategorie]/[rechner]/page.tsx`)
 * sorgt das `'use client'`-Pragma dafür, dass die `dynamic()`-Imports als echte
 * Code-Splits behandelt werden — pro Slug ein eigener Chunk. Vorher wurden alle
 * 170 Components in das Page-Bundle gebündelt (~2,1 MB Chunk, T1-Befund C1).
 *
 * Wichtig:
 * - `ssr: true` (Default) — SSR-Sichtbarkeit für Crawler bleibt erhalten
 * - Lookup-Map muss vollständig sein; fehlende Slugs liefern `null`
 * - SSOT-Drift-Schutz übernimmt scripts/slug-drift-scan.mjs (Prebuild-Hook):
 *   Eine RechnerConfig ohne entsprechende RECHNER_MAP-Entry bzw. eine
 *   Map-Entry ohne Component-File würde dort Build-Break auslösen.
 *
 * W15C-T6-C1 (24.05.2026): Skeleton mit reservierter Höhe verhindert CLS,
 * während die `dynamic()`-Component noch geladen wird. PSI-Diagnose ergab,
 * dass auf BMI- und Mietrechner-Pages der Middle-AdSlot um ~280 px nach
 * unten geschoben wurde, sobald die echte Calculator-Component bei Hydration
 * erschien — Score 0,300 exakt = Container-Höhe rectangle-AdSlot. Auf
 * Brutto-Netto trat das nicht auf, weil dieser Slug in `INLINE_ERKLAERUNG_SLUGS`
 * gewhitelisted ist und sein Calculator-Inhalt statisch im Page-Template
 * rendert. Skeleton-Höhe 600 px deckt die typische Calculator-Höhe ab
 * (Eingabe-Felder + Ergebnis-Block bei Default-State). Bei kleineren
 * Rechnern entsteht vor Hydration leerer Weißraum (akzeptabel); bei
 * größeren Rechnern bleibt ein kleiner Rest-CLS deutlich unter 0,1 (AdSense-
 * konform). Per-Slug-Höhe wäre Option B falls nach Verify einzelne Ausreißer
 * bleiben.
 */
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Loading-Fallback mit reservierter Höhe.
 * `aria-hidden` weil rein optischer Platzhalter ohne semantische Bedeutung.
 */
function RechnerSkeleton() {
  return <div className="min-h-[600px]" aria-hidden="true" data-rechner-skeleton />;
}

/**
 * Helper: `dynamic()` mit Skeleton-Loading-Prop für alle 170 Rechner-Imports.
 * Default-Behavior von `next/dynamic` bleibt (ssr: true, kein Suspense-Mode).
 */
const dyn = (loader: () => Promise<{ default: ComponentType }>): ComponentType =>
  dynamic(loader, { loading: RechnerSkeleton });

const RECHNER_MAP: Record<string, ComponentType> = {
  'prozentrechner': dyn(() => import('@/components/rechner/Prozentrechner')),
  'brutto-netto-rechner': dyn(() => import('@/components/rechner/BruttoNettoRechner')),
  'mwst-rechner': dyn(() => import('@/components/rechner/MwStRechner')),
  'dreisatz-rechner': dyn(() => import('@/components/rechner/DreisatzRechner')),
  'bmi-rechner': dyn(() => import('@/components/rechner/BmiRechner')),
  'spritkosten-rechner': dyn(() => import('@/components/rechner/SpritkostenRechner')),
  'kw-ps-umrechner': dyn(() => import('@/components/rechner/KwPsRechner')),
  'kfz-steuer-rechner': dyn(() => import('@/components/rechner/KfzSteuerRechner')),
  'zinsrechner': dyn(() => import('@/components/rechner/ZinsRechner')),
  'tagerechner': dyn(() => import('@/components/rechner/TageRechner')),
  'elterngeld-rechner': dyn(() => import('@/components/rechner/ElterngeldRechner')),
  'buergergeld-rechner': dyn(() => import('@/components/rechner/BuergergeldRechner')),
  'stundenlohn-rechner': dyn(() => import('@/components/rechner/StundenlohnRechner')),
  'sparrechner': dyn(() => import('@/components/rechner/SparRechner')),
  'inflationsrechner': dyn(() => import('@/components/rechner/InflationsRechner')),
  'stromkosten-rechner': dyn(() => import('@/components/rechner/StromkostenRechner')),
  'nebenkosten-rechner': dyn(() => import('@/components/rechner/NebenkostenRechner')),
  'mietrechner': dyn(() => import('@/components/rechner/MietrechnerRechner')),
  'heizkosten-rechner': dyn(() => import('@/components/rechner/HeizkostenRechner')),
  'grunderwerbsteuer-rechner': dyn(() => import('@/components/rechner/GrunderwerbsteuerRechner')),
  'tapetenbedarf-rechner': dyn(() => import('@/components/rechner/TapetenbedarfRechner')),
  'quadratmeter-rechner': dyn(() => import('@/components/rechner/QuadratmeterRechner')),
  'bruchrechner': dyn(() => import('@/components/rechner/BruchRechner')),
  'einheiten-umrechner': dyn(() => import('@/components/rechner/EinheitenRechner')),
  'notenschluessel-rechner': dyn(() => import('@/components/rechner/NotenschluesselRechner')),
  'durchschnitt-rechner': dyn(() => import('@/components/rechner/DurchschnittRechner')),
  'wissenschaftlicher-taschenrechner': dyn(() => import('@/components/rechner/TaschenrechnerRechner')),
  'arbeitszeitrechner': dyn(() => import('@/components/rechner/ArbeitszeitRechner')),
  'urlaubstage-rechner': dyn(() => import('@/components/rechner/UrlaubstageRechner')),
  'ueberstunden-rechner': dyn(() => import('@/components/rechner/UeberstundenRechner')),
  'pendlerpauschale-rechner': dyn(() => import('@/components/rechner/PendlerpauschaleRechner')),
  'promillerechner': dyn(() => import('@/components/rechner/PromilleRechner')),
  'rabattrechner': dyn(() => import('@/components/rechner/RabattRechner')),
  'gehaltsvergleich': dyn(() => import('@/components/rechner/GehaltsvergleichRechner')),
  'countdown': dyn(() => import('@/components/rechner/CountdownRechner')),
  'lebenszeit-rechner': dyn(() => import('@/components/rechner/LebenszeitRechner')),
  'streaming-kosten-rechner': dyn(() => import('@/components/rechner/StreamingKostenRechner')),
  'raucher-rechner': dyn(() => import('@/components/rechner/RaucherRechner')),
  'wahrer-stundenlohn': dyn(() => import('@/components/rechner/WahrerStundenlohnRechner')),
  'schlaf-rechner': dyn(() => import('@/components/rechner/SchlafRechner')),
  'kaffee-kosten-rechner': dyn(() => import('@/components/rechner/KaffeeKostenRechner')),
  'lieferservice-rechner': dyn(() => import('@/components/rechner/LieferserviceRechner')),
  'abo-rechner': dyn(() => import('@/components/rechner/AboRechner')),
  'handykosten-rechner': dyn(() => import('@/components/rechner/HandykostenRechner')),
  'rechtsschutz-rechner': dyn(() => import('@/components/rechner/RechtsschutzRechner')),
  'steuererstattung-rechner': dyn(() => import('@/components/rechner/SteuererstattungRechner')),
  'stromvergleich-rechner': dyn(() => import('@/components/rechner/StromvergleichRechner')),
  'freelancer-stundensatz-rechner': dyn(() => import('@/components/rechner/FreelancerStundensatzRechner')),
  'bussgeldrechner': dyn(() => import('@/components/rechner/BussgeldRechner')),
  'kreditrechner': dyn(() => import('@/components/rechner/KreditRechner')),
  'kalorienrechner': dyn(() => import('@/components/rechner/KalorienRechner')),
  'geburtstermin-rechner': dyn(() => import('@/components/rechner/GeburtsterminRechner')),
  'idealgewicht-rechner': dyn(() => import('@/components/rechner/IdealgewichtRechner')),
  'protein-rechner': dyn(() => import('@/components/rechner/ProteinRechner')),
  'kuendigungsfrist-rechner': dyn(() => import('@/components/rechner/KuendigungsfristRechner')),
  'etf-sparplanrechner': dyn(() => import('@/components/rechner/EtfSparplanRechner')),
  'teilzeit-rechner': dyn(() => import('@/components/rechner/TeilzeitRechner')),
  'abfindungsrechner': dyn(() => import('@/components/rechner/AbfindungsRechner')),
  'mutterschutz-rechner': dyn(() => import('@/components/rechner/MutterschutzRechner')),
  'baufinanzierung-rechner': dyn(() => import('@/components/rechner/BaufinanzierungRechner')),
  'rentenrechner': dyn(() => import('@/components/rechner/RentenRechner')),
  'wasserbedarf-rechner': dyn(() => import('@/components/rechner/WasserbedarfRechner')),
  'umzugskosten-rechner': dyn(() => import('@/components/rechner/UmzugskostenRechner')),
  'trinkgeld-rechner': dyn(() => import('@/components/rechner/TrinkgeldRechner')),
  'koerperfett-rechner': dyn(() => import('@/components/rechner/KoerperfettRechner')),
  'flaechenrechner': dyn(() => import('@/components/rechner/FlaechenRechner')),
  'mietrendite-rechner': dyn(() => import('@/components/rechner/MietrenditeRechner')),
  'geburtstag-rechner': dyn(() => import('@/components/rechner/GeburtstagRechner')),
  'prozentuale-veraenderung-rechner': dyn(() => import('@/components/rechner/ProzVeraenderungRechner')),
  'splitting-rechner': dyn(() => import('@/components/rechner/SplittingRechner')),
  'autokosten-rechner': dyn(() => import('@/components/rechner/AutokostenRechner')),
  'wohngeld-rechner': dyn(() => import('@/components/rechner/WohngeldRechner')),
  'bafoeg-rechner': dyn(() => import('@/components/rechner/BafoegRechner')),
  'aufstiegs-bafoeg-rechner': dyn(() => import('@/components/rechner/AfbgRechner')),
  'kindergeld-rechner': dyn(() => import('@/components/rechner/KindergeldRechner')),
  'pflegegeld-rechner': dyn(() => import('@/components/rechner/PflegegeldRechner')),
  'ssw-rechner': dyn(() => import('@/components/rechner/SswRechner')),
  'erbschaftsteuer-rechner': dyn(() => import('@/components/rechner/ErbschaftsteuerRechner')),
  'scheidungskosten-rechner': dyn(() => import('@/components/rechner/ScheidungskostenRechner')),
  'indexmiete-rechner': dyn(() => import('@/components/rechner/IndexmieteRechner')),
  'minijob-rechner': dyn(() => import('@/components/rechner/MinijobRechner')),
  'waermepumpen-rechner': dyn(() => import('@/components/rechner/WaermepumpeRechner')),
  'gehaltserhoehung-rechner': dyn(() => import('@/components/rechner/GehaltserhoehungRechner')),
  'zugewinnausgleich-rechner': dyn(() => import('@/components/rechner/ZugewinnausgleichRechner')),
  'volumenrechner': dyn(() => import('@/components/rechner/VolumenRechner')),
  'leasing-rechner': dyn(() => import('@/components/rechner/LeasingRechner')),
  'skontorechner': dyn(() => import('@/components/rechner/SkontoRechner')),
  'krankengeld-rechner': dyn(() => import('@/components/rechner/KrankengeldRechner')),
  'abi-rechner': dyn(() => import('@/components/rechner/AbiRechner')),
  'photovoltaik-rechner': dyn(() => import('@/components/rechner/PhotovoltaikRechner')),
  'schwangerschaft-gewicht-rechner': dyn(() => import('@/components/rechner/SchwangerschaftGewichtRechner')),
  'uhrzeitrechner': dyn(() => import('@/components/rechner/UhrzeitRechner')),
  'gmbh-geschaeftsfuehrer-rechner': dyn(() => import('@/components/rechner/GmbhGfRechner')),
  'arbeitstage-rechner': dyn(() => import('@/components/rechner/ArbeitstageRechner')),
  'binaer-rechner': dyn(() => import('@/components/rechner/BinaerRechner')),
  'dachflaechen-rechner': dyn(() => import('@/components/rechner/DachflaechenRechner')),
  'hundejahre-rechner': dyn(() => import('@/components/rechner/HundejahreRechner')),
  'zyklusrechner': dyn(() => import('@/components/rechner/ZyklusRechner')),
  'hochrechner': dyn(() => import('@/components/rechner/HochRechner')),
  'malerkosten-rechner': dyn(() => import('@/components/rechner/MalerkostenRechner')),
  'waehrungsrechner': dyn(() => import('@/components/rechner/WaehrungsRechner')),
  'alkohol-abbau-rechner': dyn(() => import('@/components/rechner/AlkoholAbbauRechner')),
  'unterhaltsrechner': dyn(() => import('@/components/rechner/UnterhaltsRechner')),
  'arbeitslosengeld-rechner': dyn(() => import('@/components/rechner/ArbeitslosengeldRechner')),
  'grundsteuer-rechner': dyn(() => import('@/components/rechner/GrundsteuerRechner')),
  'midijob-rechner': dyn(() => import('@/components/rechner/MidijobRechner')),
  'firmenwagen-rechner': dyn(() => import('@/components/rechner/FirmenwagenRechner')),
  'elternzeit-rechner': dyn(() => import('@/components/rechner/ElternzeitRechner')),
  'witwenrente-rechner': dyn(() => import('@/components/rechner/WitwenrenteRechner')),
  'kurzarbeitergeld-rechner': dyn(() => import('@/components/rechner/KurzarbeitergeldRechner')),
  'riester-rechner': dyn(() => import('@/components/rechner/RiesterRechner')),
  'fuehrerschein-rechner': dyn(() => import('@/components/rechner/FuehrerscheinRechner')),
  'nettolohn-optimierer': dyn(() => import('@/components/rechner/NettolohnOptimiererRechner')),
  'mietpreisbremse-rechner': dyn(() => import('@/components/rechner/MietpreisbremseRechner')),
  'kapitalertragsteuer-rechner': dyn(() => import('@/components/rechner/KapitalertragsteuerRechner')),
  'schuhgroessen-rechner': dyn(() => import('@/components/rechner/SchuhgroessenRechner')),
  'reichweiten-rechner': dyn(() => import('@/components/rechner/ReichweitenRechner')),
  'poolkosten-rechner': dyn(() => import('@/components/rechner/PoolkostenRechner')),
  'pythagoras-rechner': dyn(() => import('@/components/rechner/PythagorasRechner')),
  'gleichungsrechner': dyn(() => import('@/components/rechner/GleichungsloeserRechner')),
  'kleidergroessen-rechner': dyn(() => import('@/components/rechner/KleidergroessenRechner')),
  'ehegattenunterhalt-rechner': dyn(() => import('@/components/rechner/EhegattenunterhaltRechner')),
  'afa-rechner': dyn(() => import('@/components/rechner/AfaRechner')),
  'vorfaelligkeitsentschaedigung-rechner': dyn(() => import('@/components/rechner/VorfaelligkeitsentschaedigungRechner')),
  'energiekosten-rechner': dyn(() => import('@/components/rechner/EnergiekostenRechner')),
  'betriebskosten-rechner': dyn(() => import('@/components/rechner/BetriebskostenRechner')),
  'fliesenbedarf-rechner': dyn(() => import('@/components/rechner/FliesenbedarfRechner')),
  'laminat-rechner': dyn(() => import('@/components/rechner/LaminatRechner')),
  'whr-rechner': dyn(() => import('@/components/rechner/WhrRechner')),
  'mwst-rueckerstattung-rechner': dyn(() => import('@/components/rechner/MwStRueckerstattungRechner')),
  'primzahl-rechner': dyn(() => import('@/components/rechner/PrimzahlRechner')),
  'quersumme-rechner': dyn(() => import('@/components/rechner/QuersummeRechner')),
  'potenz-rechner': dyn(() => import('@/components/rechner/PotenzRechner')),
  'ggt-kgv-rechner': dyn(() => import('@/components/rechner/GgtKgvRechner')),
  'zufallszahl-generator': dyn(() => import('@/components/rechner/ZufallszahlRechner')),
  'blutdruck-rechner': dyn(() => import('@/components/rechner/BlutdruckRechner')),
  'schritte-rechner': dyn(() => import('@/components/rechner/SchritteRechner')),
  'sonnenschutz-rechner': dyn(() => import('@/components/rechner/SonnenschutzRechner')),
  'reisekosten-rechner': dyn(() => import('@/components/rechner/ReisekostenRechner')),
  'zeitwert-rechner': dyn(() => import('@/components/rechner/ZeitwertRechner')),
  'fahrrad-rahmengroesse-rechner': dyn(() => import('@/components/rechner/FahrradRahmenRechner')),
  'taxi-rechner': dyn(() => import('@/components/rechner/TaxiRechner')),
  'beton-rechner': dyn(() => import('@/components/rechner/BetonRechner')),
  'estrich-rechner': dyn(() => import('@/components/rechner/EstrichRechner')),
  'balkon-solar-rechner': dyn(() => import('@/components/rechner/BalkonSolarRechner')),
  'noten-international': dyn(() => import('@/components/rechner/NotenInternationalRechner')),
  'steuerprogression-rechner': dyn(() => import('@/components/rechner/SteuerprogressionsRechner')),
  'budget-rechner': dyn(() => import('@/components/rechner/BudgetRechner')),
  'spenden-rechner': dyn(() => import('@/components/rechner/SpendenRechner')),
  'nebenjob-rechner': dyn(() => import('@/components/rechner/NebenjobRechner')),
  'schenkungssteuer-rechner': dyn(() => import('@/components/rechner/SchenkungssteuerRechner')),
  'gewerbesteuer-rechner': dyn(() => import('@/components/rechner/GewerbesteuerRechner')),
  'einkommensteuer-rechner': dyn(() => import('@/components/rechner/EinkommensteuerRechner')),
  'steuerklassen-vergleich-rechner': dyn(() => import('@/components/rechner/SteuerklassenVergleichRechner')),
  'pfaendungsrechner': dyn(() => import('@/components/rechner/PfaendungRechner')),
  'lohnsteuer-rechner': dyn(() => import('@/components/rechner/LohnsteuerRechner')),
  'rezept-umrechner': dyn(() => import('@/components/rechner/RezeptUmrechner')),
  'cups-umrechner': dyn(() => import('@/components/rechner/CupsUmrechner')),
  'pace-rechner': dyn(() => import('@/components/rechner/PaceRechner')),
  'herzfrequenz-zonen-rechner': dyn(() => import('@/components/rechner/HerzfrequenzZonenRechner')),
  'backform-umrechner': dyn(() => import('@/components/rechner/BackformUmrechner')),
  'backzeit-rechner': dyn(() => import('@/components/rechner/BackzeitRechner')),
  'kochzeit-rechner': dyn(() => import('@/components/rechner/KochzeitRechner')),
  'hefe-umrechner': dyn(() => import('@/components/rechner/HefeUmrechner')),
  'pizzateig-rechner': dyn(() => import('@/components/rechner/PizzateigRechner')),
  'brotback-rechner': dyn(() => import('@/components/rechner/BrotbackRechner')),
  'alkoholgehalt-rechner': dyn(() => import('@/components/rechner/AlkoholgehaltRechner')),
  'naehrwert-rechner': dyn(() => import('@/components/rechner/NaehrwertRechner')),
  'zucker-umrechner': dyn(() => import('@/components/rechner/ZuckerUmrechner')),
  'gefrierdauer-rechner': dyn(() => import('@/components/rechner/GefrierdauerRechner')),
  'internetgeschwindigkeit-rechner': dyn(() => import('@/components/rechner/InternetgeschwindigkeitRechner')),
  'datenmengen-umrechner': dyn(() => import('@/components/rechner/DatenmengenRechner')),
  'megapixel-rechner': dyn(() => import('@/components/rechner/MegapixelRechner')),
  'stromverbrauch-geraete-rechner': dyn(() => import('@/components/rechner/StromverbrauchGeraeteRechner')),
  'bildschirmgroesse-ppi-rechner': dyn(() => import('@/components/rechner/BildschirmgroessePpiRechner')),
  'kalorienverbrauch-rechner': dyn(() => import('@/components/rechner/KalorienverbrauchRechner')),
};

export default function RechnerLoader({ slug }: { slug: string }) {
  const Component = RECHNER_MAP[slug];
  if (!Component) return null;
  return <Component />;
}

import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import RechnerLoader from '@/components/rechner/RechnerLoader';
import Infobox from '@/components/blog/Infobox';
import KarstenSagt from '@/components/blog/KarstenSagt';
import Quellen from '@/components/blog/Quellen';
import Bild from '@/components/blog/Bild';
import Video from '@/components/blog/Video';
import ArtikelDatum from '@/components/blog/ArtikelDatum';
import MeterFehleranteile from '@/components/blog/grafik/MeterFehleranteile';
import MeterTriangulation from '@/components/blog/grafik/MeterTriangulation';
import MeterTriangulationAnimiert from '@/components/blog/grafik/MeterTriangulationAnimiert';
import MeterLotabweichung from '@/components/blog/grafik/MeterLotabweichung';
import MeterZeitleiste from '@/components/blog/grafik/MeterZeitleiste';
import MeterSollIst from '@/components/blog/grafik/MeterSollIst';
import HerleitungPS from '@/components/blog/grafik/HerleitungPS';
import ZahlenWirrwarr from '@/components/blog/grafik/ZahlenWirrwarr';
import HpVsPs from '@/components/blog/grafik/HpVsPs';
import ZeitleistePS from '@/components/blog/grafik/ZeitleistePS';
import GerstenkornStreuung from '@/components/blog/grafik/GerstenkornStreuung';
import ViertelVsDrittel from '@/components/blog/grafik/ViertelVsDrittel';
import NormVsEtikett from '@/components/blog/grafik/NormVsEtikett';
import ZeitleisteSchuhgroesse from '@/components/blog/grafik/ZeitleisteSchuhgroesse';
import ZehenUndBallen from '@/components/blog/grafik/ZehenUndBallen';
import PassformStreuung from '@/components/blog/grafik/PassformStreuung';
import HerleitungCup from '@/components/blog/grafik/HerleitungCup';
import ZweiLaenderZweiCups from '@/components/blog/grafik/ZweiLaenderZweiCups';
import EckpreiseKrumm from '@/components/blog/grafik/EckpreiseKrumm';
import QuadratRegel from '@/components/blog/grafik/QuadratRegel';
import FormateGleicheDiagonale from '@/components/blog/grafik/FormateGleicheDiagonale';
import SaeulenVergleich from '@/components/blog/grafik/SaeulenVergleich';
import ZeitleisteBlutdruck from '@/components/blog/grafik/ZeitleisteBlutdruck';
import SchereDezimalBinaer from '@/components/blog/grafik/SchereDezimalBinaer';
import ZweiNormen from '@/components/blog/grafik/ZweiNormen';
import DiskettenRaetsel from '@/components/blog/grafik/DiskettenRaetsel';
import WerZaehltWie from '@/components/blog/grafik/WerZaehltWie';
import ZweiWarnungen from '@/components/blog/grafik/ZweiWarnungen';
import SchwelleWandert from '@/components/blog/grafik/SchwelleWandert';
import WasDieFormelSieht from '@/components/blog/grafik/WasDieFormelSieht';
import ZeitleisteBmi from '@/components/blog/grafik/ZeitleisteBmi';
import VierCups from '@/components/blog/grafik/VierCups';
import EtikettGegenRezept from '@/components/blog/grafik/EtikettGegenRezept';
import LoeffelFalle from '@/components/blog/grafik/LoeffelFalle';
import MehlStreuung from '@/components/blog/grafik/MehlStreuung';
import SechsStellen from '@/components/blog/grafik/SechsStellen';
import HalbeErhoehung from '@/components/blog/grafik/HalbeErhoehung';
import MalZweiFalle from '@/components/blog/grafik/MalZweiFalle';
import AusgabenGegenHaeufigkeit from '@/components/blog/grafik/AusgabenGegenHaeufigkeit';
import ZweiRundeZahlen from '@/components/blog/grafik/ZweiRundeZahlen';
import DieDreiFaktoren from '@/components/blog/grafik/DieDreiFaktoren';
import EnergieKaskade from '@/components/blog/grafik/EnergieKaskade';
import SpannenDerFaktoren from '@/components/blog/grafik/SpannenDerFaktoren';
import MandelDifferenz from '@/components/blog/grafik/MandelDifferenz';
import FuenfWege from '@/components/blog/grafik/FuenfWege';
import SonneGegenUhr from '@/components/blog/grafik/SonneGegenUhr';
import FuenfZeitenAmBodensee from '@/components/blog/grafik/FuenfZeitenAmBodensee';
import ZweiUhrenImBahnhof from '@/components/blog/grafik/ZweiUhrenImBahnhof';
import WasWashingtonBeschloss from '@/components/blog/grafik/WasWashingtonBeschloss';
import ZeitleisteEinheitszeit from '@/components/blog/grafik/ZeitleisteEinheitszeit';
import GrenzwertSprung from '@/components/blog/grafik/GrenzwertSprung';
import PfundImVergleich from '@/components/blog/grafik/PfundImVergleich';
import DreiAbschaffungsjahre from '@/components/blog/grafik/DreiAbschaffungsjahre';
import ZweiPfunde from '@/components/blog/grafik/ZweiPfunde';
import PfundZuGeld from '@/components/blog/grafik/PfundZuGeld';
import PreisschildRegel from '@/components/blog/grafik/PreisschildRegel';
import PfundZeitleiste from '@/components/blog/grafik/PfundZeitleiste';
import DachschraegeZonen from '@/components/blog/grafik/DachschraegeZonen';
import ZweiZulaessigeErgebnisse from '@/components/blog/grafik/ZweiZulaessigeErgebnisse';
import WasZaehltMit from '@/components/blog/grafik/WasZaehltMit';
import ZehnProzentZeitachse from '@/components/blog/grafik/ZehnProzentZeitachse';
import GetraenkeAlkohol from '@/components/blog/grafik/GetraenkeAlkohol';
import PromilleKurve from '@/components/blog/grafik/PromilleKurve';
import GrenzwertZeitachse from '@/components/blog/grafik/GrenzwertZeitachse';
import ZweiRueckrechnungen from '@/components/blog/grafik/ZweiRueckrechnungen';
import GrenzwertUebersicht from '@/components/blog/grafik/GrenzwertUebersicht';
import FaustformelHerleitung from '@/components/blog/grafik/FaustformelHerleitung';
import FahrbahnVergleich from '@/components/blog/grafik/FahrbahnVergleich';
import AnhaltewegZerlegung from '@/components/blog/grafik/AnhaltewegZerlegung';
import RestgeschwindigkeitVergleich from '@/components/blog/grafik/RestgeschwindigkeitVergleich';
import VerzoegerungsTabelle from '@/components/blog/grafik/VerzoegerungsTabelle';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typografie: MDX-Standardelemente an das Site-Design angleichen
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">{children}</ol>
    ),
    a: ({ href, children }) => {
      const url = href ?? '#';
      return url.startsWith('/') ? (
        <Link href={url} className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:no-underline">
          {children}
        </Link>
      ) : (
        <a href={url} rel="noopener noreferrer" target="_blank" className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:no-underline">
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
        {children}
      </blockquote>
    ),
    // Eigene Bausteine — in .mdx ohne Import verwendbar
    RechnerLoader,
    Infobox,
    KarstenSagt,
    Quellen,
    Bild,
    Video,
    ArtikelDatum,
    MeterFehleranteile,
    MeterTriangulation,
    MeterTriangulationAnimiert,
    MeterLotabweichung,
    MeterZeitleiste,
    MeterSollIst,
    HerleitungPS,
    ZahlenWirrwarr,
    HpVsPs,
    ZeitleistePS,
    GerstenkornStreuung,
    ViertelVsDrittel,
    NormVsEtikett,
    ZeitleisteSchuhgroesse,
    ZehenUndBallen,
    PassformStreuung,
    HerleitungCup,
    ZweiLaenderZweiCups,
    EckpreiseKrumm,
    QuadratRegel,
    FormateGleicheDiagonale,
    SaeulenVergleich,
    ZeitleisteBlutdruck,
    SchereDezimalBinaer,
    ZweiNormen,
    DiskettenRaetsel,
    WerZaehltWie,
    ZweiWarnungen,
    SchwelleWandert,
    WasDieFormelSieht,
    ZeitleisteBmi,
    VierCups,
    EtikettGegenRezept,
    LoeffelFalle,
    MehlStreuung,
    SechsStellen,
    HalbeErhoehung,
    MalZweiFalle,
    AusgabenGegenHaeufigkeit,
    ZweiRundeZahlen,
    DieDreiFaktoren,
    EnergieKaskade,
    SpannenDerFaktoren,
    MandelDifferenz,
    FuenfWege,
    SonneGegenUhr,
    FuenfZeitenAmBodensee,
    ZweiUhrenImBahnhof,
    WasWashingtonBeschloss,
    ZeitleisteEinheitszeit,
    GrenzwertSprung,
    PfundImVergleich,
    DreiAbschaffungsjahre,
    ZweiPfunde,
    PfundZuGeld,
    PreisschildRegel,
    PfundZeitleiste,
    DachschraegeZonen,
    ZweiZulaessigeErgebnisse,
    WasZaehltMit,
    ZehnProzentZeitachse,
    GetraenkeAlkohol,
    PromilleKurve,
    GrenzwertZeitachse,
    ZweiRueckrechnungen,
    GrenzwertUebersicht,
    FaustformelHerleitung,
    FahrbahnVergleich,
    AnhaltewegZerlegung,
    RestgeschwindigkeitVergleich,
    VerzoegerungsTabelle,
    ...components,
  };
}

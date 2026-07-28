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
    ...components,
  };
}

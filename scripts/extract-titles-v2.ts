import { rechner } from '../lib/rechner-config';
import * as fs from 'fs';
import * as path from 'path';

const SUFFIX = ' | Rechenfix.de';
const SUFFIX_LEN = SUFFIX.length;

interface Entry {
  slug: string;
  kategorieSlug: string;
  url: string;
  metaTitle: string;
  renderedTitle: string;
  renderedLen: number;
}

const entries: Entry[] = rechner.map((r: any) => {
  const metaTitle: string = r.metaTitle || '';
  const renderedTitle = metaTitle + SUFFIX;
  return {
    slug: r.slug,
    kategorieSlug: r.kategorieSlug,
    url: `/${r.kategorieSlug}/${r.slug}`,
    metaTitle,
    renderedTitle,
    renderedLen: renderedTitle.length,
  };
});

// Sort by kategorieSlug then by renderedLen desc
const CAT_ORDER = ['finanzen', 'alltag', 'wohnen', 'arbeit', 'gesundheit', 'auto', 'kochen', 'mathe', 'sport'];
entries.sort((a, b) => {
  const ca = CAT_ORDER.indexOf(a.kategorieSlug);
  const cb = CAT_ORDER.indexOf(b.kategorieSlug);
  if (ca !== cb) return ca - cb;
  return b.renderedLen - a.renderedLen;
});

const stats = {
  total: entries.length,
  over60: entries.filter(e => e.renderedLen > 60).length,
  avg: Math.round(entries.reduce((s, e) => s + e.renderedLen, 0) / entries.length),
  max: Math.max(...entries.map(e => e.renderedLen)),
  le55: entries.filter(e => e.renderedLen <= 55).length,
  b56to60: entries.filter(e => e.renderedLen >= 56 && e.renderedLen <= 60).length,
  b61to65: entries.filter(e => e.renderedLen >= 61 && e.renderedLen <= 65).length,
  b66to70: entries.filter(e => e.renderedLen >= 66 && e.renderedLen <= 70).length,
  b71to75: entries.filter(e => e.renderedLen >= 71 && e.renderedLen <= 75).length,
  ge76: entries.filter(e => e.renderedLen >= 76).length,
};

const outDir = path.resolve(__dirname, '..', 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, '_titles-v2-data.json'),
  JSON.stringify({ stats, entries }, null, 2)
);
console.log('Total:', stats.total);
console.log('Over 60:', stats.over60);
console.log('Avg:', stats.avg);
console.log('Max:', stats.max);
console.log('Dist: <=55:', stats.le55, '| 56-60:', stats.b56to60, '| 61-65:', stats.b61to65, '| 66-70:', stats.b66to70, '| 71-75:', stats.b71to75, '| 76+:', stats.ge76);
console.log('Written to reports/_titles-v2-data.json');

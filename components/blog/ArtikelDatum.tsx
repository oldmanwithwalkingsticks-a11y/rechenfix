/**
 * Sichtbares Veröffentlichungsdatum für Blog-Artikel (MDX).
 * Server-Komponente, rein präsentational. Wird direkt unter der H1
 * eines Artikels gerendert: <ArtikelDatum datum={artikel.datum} />.
 *
 * Formatierung identisch zur Blog-Übersicht (app/blog/page.tsx):
 * langes deutsches Datum. Das <time>-Element mit dateTime liefert
 * zusätzlich ein maschinenlesbares Datum.
 */
export default function ArtikelDatum({ datum }: { datum: string }) {
  const formatiert = new Date(datum).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <p className="-mt-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
      Veröffentlicht am <time dateTime={datum}>{formatiert}</time>
    </p>
  );
}

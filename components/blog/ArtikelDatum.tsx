/**
 * Sichtbares Veröffentlichungsdatum für Blog-Artikel (MDX).
 * Server-Komponente, rein präsentational. Wird direkt unter der H1
 * eines Artikels gerendert: <ArtikelDatum datum={artikel.datum} />.
 *
 * Formatierung identisch zur Blog-Übersicht (app/blog/page.tsx):
 * langes deutsches Datum. Das <time>-Element mit dateTime liefert
 * zusätzlich ein maschinenlesbares Datum.
 *
 * Kein negativer oberer Rand (W149): Der Abstand zur H1 kommt allein aus deren
 * mb-3. Das frühere -mt-4 zog das Datum 4 px in den Titel hinein; bei
 * zweizeiligen Titeln stieß es an die Unterlängen der zweiten Zeile.
 */
export default function ArtikelDatum({ datum }: { datum: string }) {
  const formatiert = new Date(datum).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
      Veröffentlicht am <time dateTime={datum}>{formatiert}</time>
    </p>
  );
}

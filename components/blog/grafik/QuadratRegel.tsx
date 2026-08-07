/**
 * Grafik: Die Fläche eines Bildschirms wächst mit dem Quadrat der Diagonale.
 * Vier ineinandergesetzte 16:9-Rechtecke (13,5 / 19,1 / 27 / 38,2 Zoll) zeigen,
 * dass jede Verdopplung der Fläche nur die 1,414-fache Diagonale braucht und
 * doppelte Diagonale die vierfache Fläche ergibt.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function QuadratRegel() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .r1 { fill: #E1F5EE; }
          .r2 { fill: #C7EADD; }
          .r3 { fill: #FAEEDA; }
          .r4 { fill: #FAECE7; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .dark .r1 { fill: #1E3A32; }
          .dark .r2 { fill: #24463C; }
          .dark .r3 { fill: #3A3222; }
          .dark .r4 { fill: #3A2A22; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
        `}</style>
        <title>Bildschirmfläche wächst mit dem Quadrat der Diagonale</title>
        <desc>
          Vier Bildschirme im Format 16 zu 9 mit den Diagonalen 13,5, 19,1, 27 und 38,2 Zoll,
          mittig ineinandergelegt. Jede Stufe verdoppelt die Bildfläche, obwohl die Diagonale
          nur um den Faktor 1,414 wächst. Von 13,5 auf 27 Zoll verdoppelt sich die Diagonale,
          die Fläche vervierfacht sich.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Jede Stufe verdoppelt die Fläche</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Vier Bildschirme im Format 16:9, mittig übereinandergelegt.</text>

        {/* 38,2 Zoll: Basisbreite 424 x 238,5 -> Mittelpunkt bei (260, 210) */}
        <rect className="r4" x="48" y="91" width="424" height="238" rx="4" stroke="#993C1D" strokeWidth="1" />
        {/* 27 Zoll: Faktor 0,7071 */}
        <rect className="r3" x="110" y="126" width="300" height="169" rx="4" stroke="#854F0B" strokeWidth="1" />
        {/* 19,1 Zoll: Faktor 0,5 */}
        <rect className="r2" x="154" y="150" width="212" height="119" rx="4" stroke="#0F6E56" strokeWidth="1" />
        {/* 13,5 Zoll: Faktor 0,3536 */}
        <rect className="r1" x="185" y="168" width="150" height="84" rx="4" stroke="#0F6E56" strokeWidth="1" />

        <text x="260" y="215" fontSize="12" fontWeight="500" textAnchor="middle" className="t-teal">13,5 Zoll</text>
        <text x="260" y="262" fontSize="12" textAnchor="middle" className="t-teal">19,1 Zoll</text>
        <text x="260" y="288" fontSize="12" textAnchor="middle" fill="#9ca3af">27 Zoll</text>
        <text x="260" y="322" fontSize="12" textAnchor="middle" className="t-coral">38,2 Zoll</text>

        {/* Legende rechts */}
        <text x="500" y="120" fontSize="12" fontWeight="500" fill="currentColor">Diagonale mal 1,414</text>
        <text x="500" y="138" fontSize="12" fill="#9ca3af">= doppelte Fläche</text>
        <text x="500" y="170" fontSize="12" fontWeight="500" fill="currentColor">Diagonale mal 2</text>
        <text x="500" y="188" fontSize="12" fill="#9ca3af">= vierfache Fläche</text>
        <text x="500" y="220" fontSize="12" fontWeight="500" fill="currentColor">55 auf 65 Zoll</text>
        <text x="500" y="238" fontSize="12" fill="#9ca3af">= plus 40 Prozent</text>
        <text x="500" y="270" fontSize="12" fontWeight="500" fill="currentColor">65 auf 75 Zoll</text>
        <text x="500" y="288" fontSize="12" fill="#9ca3af">= plus 33 Prozent</text>

        <text x="24" y="366" fontSize="12" className="t-teal" fontWeight="500">Faktor = größere Diagonale geteilt durch kleinere, das Ergebnis mal sich selbst.</text>
        <text x="24" y="386" fontSize="12" fill="#9ca3af">Derselbe Zuwachs in Zoll bringt bei großen Geräten prozentual weniger.</text>
      </svg>
    </figure>
  );
}

/**
 * Grafik: Die veröffentlichten Anteile schlecht passender Schuhe streuen erheblich —
 * je nach Erhebung, Altersgruppe und Messverfahren. Zeigt vier Befunde als Spannen
 * auf einer gemeinsamen Prozentachse, statt einen einzelnen Wert als Wahrheit
 * auszugeben. Skala: 0 % bei x=250, 100 % bei x=560 (3,1 px je Prozentpunkt),
 * bewusst gestaucht, damit rechts Platz für die Wertelabels bleibt.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function PassformStreuung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 330" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .band-teal { fill: #E1F5EE; }
          .band-rosa { fill: #FAECE7; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .dark .band-teal { fill: #1E3A32; }
          .dark .band-rosa { fill: #3A2A22; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
        `}</style>
        <title>Streuung der veröffentlichten Anteile schlecht passender Schuhe</title>
        <desc>
          Vier Befunde auf einer gemeinsamen Prozentachse. Bei Erwachsenen ergab die
          Auswertung von achtzehn Studien einen Anteil von 63 bis 72 Prozent. Für zu kurze
          Straßenschuhe bei Kindern nennen zwei Erhebungen desselben Forschungsteams 40,4
          und 69,4 Prozent, für Hausschuhe 59,4 und 88,8 Prozent. Die Angaben zu falsch
          etikettierten Kinderschuhen reichen von 86 über 87 bis 97 Prozent. Die Spannen
          sind teilweise größer als der Effekt, den sie beschreiben.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Vier Befunde, vier Spannen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Wie viele Schuhe nicht passen, hängt stark davon ab, wer misst.</text>

        {/* Achse */}
        <line x1="250" y1="78" x2="560" y2="78" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="250" y="70" fontSize="11" textAnchor="middle" fill="#9ca3af">0</text>
        <text x="327" y="70" fontSize="11" textAnchor="middle" fill="#9ca3af">25</text>
        <text x="405" y="70" fontSize="11" textAnchor="middle" fill="#9ca3af">50</text>
        <text x="482" y="70" fontSize="11" textAnchor="middle" fill="#9ca3af">75</text>
        <text x="560" y="70" fontSize="11" textAnchor="middle" fill="#9ca3af">100 %</text>

        {/* 1: Erwachsene, 18 Studien: 63–72 % */}
        <text x="24" y="106" fontSize="13" fontWeight="500" fill="currentColor">Erwachsene</text>
        <text x="24" y="122" fontSize="11" fill="#9ca3af">Auswertung von 18 Studien</text>
        <rect className="band-teal" x="445" y="94" width="28" height="30" rx="5" stroke="#0F6E56" strokeWidth="1" />
        <text x="483" y="114" fontSize="12" fontWeight="500" className="t-teal">63 – 72 %</text>

        {/* 2: Kinder, Straßenschuhe: 40,4 und 69,4 % */}
        <text x="24" y="162" fontSize="13" fontWeight="500" fill="currentColor">Kinder, Straßenschuhe</text>
        <text x="24" y="178" fontSize="11" fill="#9ca3af">zwei Erhebungen, ein Team</text>
        <rect className="band-rosa" x="375" y="150" width="90" height="30" rx="5" stroke="#993C1D" strokeWidth="1" />
        <text x="475" y="170" fontSize="12" fontWeight="500" className="t-coral">40,4 – 69,4 %</text>

        {/* 3: Kinder, Hausschuhe: 59,4 und 88,8 % */}
        <text x="24" y="218" fontSize="13" fontWeight="500" fill="currentColor">Kinder, Hausschuhe</text>
        <text x="24" y="234" fontSize="11" fill="#9ca3af">dieselben zwei Erhebungen</text>
        <rect className="band-rosa" x="434" y="206" width="91" height="30" rx="5" stroke="#993C1D" strokeWidth="1" />
        <text x="535" y="226" fontSize="12" fontWeight="500" className="t-coral">59,4 – 88,8 %</text>

        {/* 4: Etikett falsch: 86, 87, 97 % */}
        <text x="24" y="274" fontSize="13" fontWeight="500" fill="currentColor">Kinderschuhe kürzer</text>
        <text x="24" y="290" fontSize="11" fill="#9ca3af">als die aufgedruckte Größe</text>
        <rect className="band-rosa" x="517" y="262" width="34" height="30" rx="5" stroke="#993C1D" strokeWidth="1" />
        <text x="561" y="282" fontSize="12" fontWeight="500" className="t-coral">86 · 87 · 97 %</text>

        <text x="24" y="318" fontSize="12" fill="#9ca3af">Als falsche Größe gilt bereits eine Abweichung von fünf Millimetern.</text>
      </svg>
    </figure>
  );
}

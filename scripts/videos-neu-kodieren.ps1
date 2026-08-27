<#
.SYNOPSIS
  Kodiert die Blogvideos neu, misst die Qualitaet per SSIM und schreibt beides
  in einen SEPARATEN Ordner. Es wird nichts ueberschrieben und nichts im Repo
  geaendert.

.BESCHREIBUNG
  Befund vom 27.08.2026: Die 17 Videos unter public\blog belegten 183,8 MB und
  wurden ROH ausgeliefert - anders als Bilder durchlaufen Videos keinen
  Optimierer. Wer eines startete, lud zwischen 2,8 und 23,7 MB.

  Gemessen an steuerklassen.mp4 (1920x1080, H.264, 5,04 s), SSIM jeweils als
  Gesamtwert gegen das Original:

      Original    7,10 MB   11.819 kbit/s
      CRF 20      1,94 MB    3.234 kbit/s   SSIM 0,9904
      CRF 23      1,19 MB    1.985 kbit/s   SSIM 0,9884
      CRF 26      0,76 MB    1.257 kbit/s   SSIM 0,9859

  Voreingestellt ist CRF 20: rund ein Viertel der Groesse bei 0,99 SSIM. Der
  Abstand zu CRF 23 ist mit 0,002 nicht wahrnehmbar, aber CRF 20 laesst gar
  keine Diskussion ueber Qualitaet zu. Wer weiter runter will, setzt -Crf 23.

  Ergebnis des Laufs vom 27.08.2026 ueber alle 17 Dateien:
  183,8 MB -> 64,1 MB, Faktor 2,87. SSIM Minimum 0,9866, Mittel 0,9906,
  Maximum 0,996 - keine Datei unter 0,98.

.ZWEI FEHLER, DIE HIER BEHOBEN SIND
  1. SSIM WURDE NICHT GEMESSEN. Die erste Fassung rief ffmpeg mit "-v error"
     auf. Der ssim-Filter schreibt seine Zusammenfassung aber auf Log-Stufe
     "info" - sie wurde unterdrueckt, und die Spalte blieb leer.

  2. PIPE STATT WORTGRENZE BEI DER AUSWERTUNG. Wer per "stats_file=-" die
     Einzelbild-Statistik liest und "tail -1" nimmt, bekommt das LETZTE BILD,
     nicht den Mittelwert. Die dabei entstandenen Zahlen (0,9884 statt 0,9904)
     waren durchweg zu niedrig. Ausgewertet wird deshalb die
     Zusammenfassungszeile.

  Zusaetzlich: PowerShell 5.1 wandelt bei externen Programmen jede
  stderr-Zeile in einen ErrorRecord um. ffmpeg schreibt seinen Fortschritt nach
  stderr - ohne "-v error" bricht ein Aufruf mit "2>&1" deshalb mit
  NativeCommandError ab. Die Zusammenfuehrung uebernimmt hier cmd; PowerShell
  sieht nur stdout und kann nicht stolpern.

.WICHTIG
  Zwei Dateien haben eine echte Tonspur (bildschirm.mp4 und
  pferdestaerke-muehlenpferd.mp4, gemessen mean -29,5 dB / max -2,8 dB - also
  kein stiller Platzhalter). Der Ton wird mit "-c:a copy" unveraendert
  uebernommen, nicht neu kodiert und keinesfalls entfernt.

  Das Neukodieren ZERSTOERT die XMP-Kennzeichnung nach Art. 50 Abs. 4 KI-VO.
  In den Wellen 122, 123 und 124 war das jedes Mal messbar: direkt nach dem
  Kopieren lieferte "grep -ac trainedAlgorithmicMedia" fuer jede neu erzeugte
  Datei 0. Nach dem Einspielen ins Repo muss
  "node scripts\ki-metadaten-schreiben.mjs" erneut laufen und "--pruefen" fuer
  jede Datei OK melden.

.QUELLE
  Bewusst public\blog und NICHT der Archivordner unter Blogs\Videos:
  public\blog enthaelt exakt das, was live ausgeliefert wird.

.BEISPIEL
  .\scripts\videos-neu-kodieren.ps1
  .\scripts\videos-neu-kodieren.ps1 -Crf 23
  .\scripts\videos-neu-kodieren.ps1 -Nur "bremsweg,wohnflaeche"
  .\scripts\videos-neu-kodieren.ps1 -NurMessen      # nichts kodieren, nur SSIM
#>

param(
  [string] $Quelle      = 'public\blog',
  [string] $Ziel        = 'Blogs\Videos-neu',
  [int]    $Crf         = 20,
  [string] $Preset      = 'slow',
  [string] $Nur         = '',
  [double] $Untergrenze = 0.97,
  [switch] $NurMessen,
  [switch] $OhneSsim
)

$ErrorActionPreference = 'Stop'

foreach ($werkzeug in 'ffmpeg', 'ffprobe') {
  if (-not (Get-Command $werkzeug -ErrorAction SilentlyContinue)) {
    Write-Host "ABBRUCH: $werkzeug nicht gefunden." -ForegroundColor Red
    Write-Host 'Installation:  winget install Gyan.FFmpeg'
    Write-Host 'Danach eine neue PowerShell oeffnen, damit der PATH greift.'
    exit 1
  }
}

if (-not (Test-Path $Quelle)) { Write-Host "ABBRUCH: Quellordner fehlt: $Quelle" -ForegroundColor Red; exit 1 }
if ($Crf -lt 16 -or $Crf -gt 28) {
  Write-Host "ABBRUCH: -Crf $Crf liegt ausserhalb des sinnvollen Bereichs 16..28." -ForegroundColor Red
  exit 1
}

New-Item -ItemType Directory -Force -Path $Ziel | Out-Null

$dateien = Get-ChildItem -Path (Join-Path $Quelle '*.mp4') | Sort-Object Name
if ($Nur) {
  $muster = $Nur -split ',' | ForEach-Object { $_.Trim() }
  $dateien = $dateien | Where-Object { $n = $_.BaseName; $muster | Where-Object { $n -like "*$_*" } }
}
if (-not $dateien) { Write-Host "ABBRUCH: keine passenden .mp4 in $Quelle" -ForegroundColor Red; exit 1 }

Write-Host ''
Write-Host "Quelle : $Quelle"
Write-Host "Ziel   : $Ziel"
if ($NurMessen) {
  Write-Host 'Modus  : NUR MESSEN - es wird nicht kodiert'
} else {
  Write-Host "CRF    : $Crf   Preset: $Preset   Ton: unveraendert kopiert"
}
Write-Host "Dateien: $($dateien.Count)   SSIM-Untergrenze: $Untergrenze"
Write-Host ''

function Get-Info($pfad) {
  $j = & ffprobe -v error -show_entries format=duration,bit_rate,size `
        -show_entries stream=codec_type,codec_name,width,height `
        -of json -- "$pfad" | ConvertFrom-Json
  $v = $j.streams | Where-Object codec_type -eq 'video' | Select-Object -First 1
  $a = $j.streams | Where-Object codec_type -eq 'audio' | Select-Object -First 1
  [pscustomobject]@{
    Bytes    = [int64]$j.format.size
    Sekunden = [double]$j.format.duration
    KBits    = [math]::Round([double]$j.format.bit_rate / 1000)
    Breite   = $v.width
    Hoehe    = $v.height
    Ton      = [bool]$a
  }
}

function Get-Ssim($neu, $original) {
  # cmd uebernimmt die Zusammenfuehrung von stderr nach stdout, sonst wandelt
  # PowerShell 5.1 jede ffmpeg-Zeile in einen ErrorRecord um.
  # KEIN "-v error": der ssim-Filter schreibt seine Zusammenfassung auf "info".
  # Ausgewertet wird die LETZTE All:-Zeile, das ist der Gesamtwert - NICHT eine
  # Einzelbild-Zeile aus stats_file.
  $befehl = 'ffmpeg -hide_banner -nostats -i "{0}" -i "{1}" -lavfi "[0:v][1:v]ssim" -f null - 2>&1' -f $neu, $original
  $roh = cmd /c $befehl
  $treffer = $roh | Select-String -Pattern 'All:([0-9.]+)' | Select-Object -Last 1
  if (-not $treffer) { return $null }
  return [math]::Round([double]$treffer.Matches[0].Groups[1].Value, 4)
}

$ergebnisse = @()
$i = 0

foreach ($d in $dateien) {
  $i++
  $ausgabe = Join-Path $Ziel $d.Name
  $vor = Get-Info $d.FullName

  if ($NurMessen) {
    if (-not (Test-Path $ausgabe)) {
      Write-Host ("[{0}/{1}] {2,-34} KEINE NEUE FASSUNG" -f $i, $dateien.Count, $d.Name) -ForegroundColor Yellow
      continue
    }
  } elseif (Test-Path $ausgabe) {
    Write-Host ("[{0}/{1}] UEBERSPRUNGEN (Ziel existiert): {2}" -f $i, $dateien.Count, $d.Name) -ForegroundColor Yellow
    continue
  } else {
    Write-Host ("[{0}/{1}] {2}  {3}x{4}  {5:N2}s  {6:N2} MB  {7} kbit/s{8}" -f `
        $i, $dateien.Count, $d.Name, $vor.Breite, $vor.Hoehe, $vor.Sekunden,
        ($vor.Bytes / 1MB), $vor.KBits, $(if ($vor.Ton) { '  +Ton' } else { '' }))

    & ffmpeg -y -v error -i "$($d.FullName)" `
        -c:v libx264 -crf $Crf -preset $Preset -pix_fmt yuv420p `
        -movflags +faststart -c:a copy -- "$ausgabe"

    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $ausgabe)) {
      Write-Host '   FEHLER beim Kodieren - Datei uebersprungen.' -ForegroundColor Red
      continue
    }
  }

  $nach = Get-Info $ausgabe

  $warnung = @()
  if ([math]::Abs($nach.Sekunden - $vor.Sekunden) -gt 0.15) { $warnung += 'DAUER WEICHT AB' }
  if ($nach.Breite -ne $vor.Breite -or $nach.Hoehe -ne $vor.Hoehe) { $warnung += 'AUFLOESUNG WEICHT AB' }
  if ($vor.Ton -and -not $nach.Ton) { $warnung += 'TONSPUR VERLOREN' }
  if ($nach.Bytes -ge $vor.Bytes) { $warnung += 'NICHT KLEINER' }

  $ssim = ''
  if (-not $OhneSsim) {
    $ssim = Get-Ssim $ausgabe $d.FullName
    if ($null -eq $ssim) { $warnung += 'SSIM-MESSUNG FEHLGESCHLAGEN'; $ssim = '' }
    elseif ($ssim -lt $Untergrenze) { $warnung += "SSIM UNTER GRENZE ($ssim)" }
  }

  $faktor = [math]::Round($vor.Bytes / $nach.Bytes, 2)
  Write-Host ("        -> {0:N2} MB  {1} kbit/s  Faktor {2}x  SSIM {3}{4}" -f `
      ($nach.Bytes / 1MB), $nach.KBits, $faktor, $ssim,
      $(if ($warnung) { '  ' + ($warnung -join ' | ') } else { '' })) `
      -ForegroundColor $(if ($warnung) { 'Red' } else { 'Green' })

  $ergebnisse += [pscustomobject]@{
    Datei     = $d.Name
    VorMB     = [math]::Round($vor.Bytes / 1MB, 2)
    NachMB    = [math]::Round($nach.Bytes / 1MB, 2)
    Faktor    = $faktor
    VorKBits  = $vor.KBits
    NachKBits = $nach.KBits
    Sekunden  = [math]::Round($vor.Sekunden, 2)
    Ton       = $vor.Ton
    SSIM      = $ssim
    Warnung   = ($warnung -join ' | ')
  }
}

Write-Host ''
Write-Host '================= BILANZ =================' -ForegroundColor Cyan
$ergebnisse | Format-Table Datei, VorMB, NachMB, Faktor, VorKBits, NachKBits, SSIM, Warnung -AutoSize

$vorSum  = ($ergebnisse | Measure-Object VorMB  -Sum).Sum
$nachSum = ($ergebnisse | Measure-Object NachMB -Sum).Sum
if ($vorSum) {
  Write-Host ("Summe vorher : {0:N1} MB" -f $vorSum)
  Write-Host ("Summe nachher: {0:N1} MB   ({1:N0} % gespart, Faktor {2:N2}x)" -f `
      $nachSum, (100 - $nachSum / $vorSum * 100), ($vorSum / $nachSum))
}

$gemessen = $ergebnisse | Where-Object { $_.SSIM -ne '' }
if ($gemessen) {
  $min = ($gemessen | Measure-Object SSIM -Minimum).Minimum
  $mit = [math]::Round(($gemessen | Measure-Object SSIM -Average).Average, 4)
  $max = ($gemessen | Measure-Object SSIM -Maximum).Maximum
  Write-Host ("SSIM  Minimum {0}   Mittel {1}   Maximum {2}   gemessen: {3} von {4}" -f `
      $min, $mit, $max, $gemessen.Count, $ergebnisse.Count)
}

$problem = $ergebnisse | Where-Object Warnung
Write-Host ''
if ($problem) {
  Write-Host "ACHTUNG - $($problem.Count) Datei(en) mit Warnung. NICHT ins Repo uebernehmen," -ForegroundColor Red
  Write-Host 'bevor die Ursache geklaert ist:' -ForegroundColor Red
  $problem | ForEach-Object { Write-Host "   $($_.Datei): $($_.Warnung)" -ForegroundColor Red }
} else {
  Write-Host 'Keine Warnungen.' -ForegroundColor Green
}

$csv = Join-Path $Ziel 'bilanz.csv'
$ergebnisse | Export-Csv -Path $csv -NoTypeInformation -Encoding UTF8
Write-Host ''
Write-Host "Tabelle gespeichert: $csv"
Write-Host ''
Write-Host 'NAECHSTER SCHRITT - nichts wurde im Repo geaendert.' -ForegroundColor Cyan
Write-Host "  1. Zwei bis drei Videos aus $Ziel im Player gegen das Original ansehen."
Write-Host '     Empfehlung: die groesste Datei und eine mit Ton.'
Write-Host '  2. Erst danach die Welle, die sie ins Repo uebernimmt und die'
Write-Host '     KI-Kennzeichnung mit scripts\ki-metadaten-schreiben.mjs neu schreibt.'

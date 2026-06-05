"""
W17A.1.F — Social-Image-Builder
1080×1080 PNG pro Slug aus lib/social/queue.json.

Portierung von scripts/build_phase0_posts.py:
  - 10 hartcodierte POSTS → Iteration über queue.json (160 Slugs)
  - Linux-Font-Pfade → Cross-Platform-Resolution (ENV/Windows/Linux)
  - /home/claude/-Output → public/social-posts/<slug>.png
  - Layout-Helper (render_emoji, render_bolt_mini, render_post)
    unverändert übernommen — Pixel-perfekte Phase-0-Optik.

Datenquellen (von zwei TS-Helper-Scripts erzeugt):
  - lib/social/queue.json                (Slug-Reihenfolge)
  - lib/social/kategorie-farben.json     (bg + accent pro Kategorie)
  - lib/social/_rechner-snapshot.json    (titel, icon, beispiel pro Slug)

Pflicht-Voraussetzungen:
  1. npx tsx scripts/verify-kategorie-slugs.ts   (exit 0)
  2. npx tsx scripts/dump-rechner-data.ts        (erzeugt _rechner-snapshot.json)

Aufruf:
  python scripts/social-image-builder.py
  python scripts/social-image-builder.py --slug bmi-rechner   (nur ein Slug)
  python scripts/social-image-builder.py --skip-existing      (nur fehlende)

ENV-Overrides für Font-Pfade (Linux/Windows-Unterschiede):
  SOCIAL_FONT_BOLD   = absoluter Pfad zur Bold-TTF
  SOCIAL_FONT_REG    = absoluter Pfad zur Regular-TTF
  SOCIAL_FONT_EMOJI  = absoluter Pfad zur Color-Emoji-TTF
  SOCIAL_BOLT_SVG    = absoluter Pfad zur Bolt-SVG (Default: public/bolt.svg)

Dependencies:  pip install Pillow cairosvg
"""

import argparse
import io
import json
import os
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("FEHLER: Pillow nicht installiert. Run: pip install Pillow")

try:
    import cairosvg
except ImportError:
    sys.exit("FEHLER: cairosvg nicht installiert. Run: pip install cairosvg")


# ============================================================
# Brand constants (unverändert aus Phase 0)
# ============================================================
SLATE_900 = (15, 23, 42)
WHITE = (255, 255, 255)
CANVAS = 1080


# ============================================================
# Cross-Platform-Font-Resolution
# ============================================================
def _resolve_font(env_var: str, candidates: list[str]) -> str:
    """Suche zuerst ENV, dann Kandidaten-Pfade. Wirft RuntimeError wenn keiner."""
    env = os.environ.get(env_var)
    if env and Path(env).is_file():
        return env
    for cand in candidates:
        if Path(cand).is_file():
            return cand
    raise RuntimeError(
        f"Kein Font gefunden für {env_var}. Setze ENV oder lege eine "
        f"der Dateien an: {candidates}"
    )


def get_fonts():
    bold = _resolve_font(
        "SOCIAL_FONT_BOLD",
        [
            # Linux
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
            "/usr/share/fonts/TTF/LiberationSans-Bold.ttf",
            # Windows
            "C:/Windows/Fonts/arialbd.ttf",
            "C:\\Windows\\Fonts\\arialbd.ttf",
            # macOS
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        ],
    )
    reg = _resolve_font(
        "SOCIAL_FONT_REG",
        [
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
            "/usr/share/fonts/TTF/LiberationSans-Regular.ttf",
            "C:/Windows/Fonts/arial.ttf",
            "C:\\Windows\\Fonts\\arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial.ttf",
        ],
    )
    emoji = _resolve_font(
        "SOCIAL_FONT_EMOJI",
        [
            # Linux (Phase-0-Original)
            "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf",
            # Windows
            "C:/Windows/Fonts/seguiemj.ttf",
            "C:\\Windows\\Fonts\\seguiemj.ttf",
            # macOS
            "/System/Library/Fonts/Apple Color Emoji.ttc",
        ],
    )
    return bold, reg, emoji


def get_bolt_svg() -> str:
    env = os.environ.get("SOCIAL_BOLT_SVG")
    if env and Path(env).is_file():
        return env
    default = Path(__file__).resolve().parent.parent / "public" / "bolt.svg"
    if not default.is_file():
        raise RuntimeError(f"Bolt-SVG nicht gefunden: {default}")
    return str(default)


# ============================================================
# Layout-Helper (unverändert aus Phase 0)
# ============================================================
def measure(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def render_emoji(emoji_char, target_size, emoji_font_path):
    """Render a color emoji at the given pixel size."""
    # Noto Color Emoji rendert nur in 109px; bei Windows seguiemj
    # können andere Größen verwendet werden. 109 als sicherer Default.
    try:
        font = ImageFont.truetype(emoji_font_path, 109)
    except Exception:
        # Fallback für Windows (seguiemj erwartet andere Größen)
        font = ImageFont.truetype(emoji_font_path, 96)
    tile = Image.new("RGBA", (140, 140), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    try:
        td.text((0, 0), emoji_char, font=font, embedded_color=True)
    except Exception:
        # Manche Fonts unterstützen kein embedded_color
        td.text((0, 0), emoji_char, font=font)
    bbox = tile.getbbox()
    if bbox:
        tile = tile.crop(bbox)
    w, h = tile.size
    if max(w, h) == 0:
        return tile
    scale = target_size / max(w, h)
    new_w = int(w * scale)
    new_h = int(h * scale)
    return tile.resize((new_w, new_h), Image.LANCZOS)


def render_bolt_mini(size, bolt_svg_path):
    png_bytes = cairosvg.svg2png(
        url=bolt_svg_path,
        output_width=size,
        output_height=size,
    )
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


# ============================================================
# W17A.1: Content-Ableitung aus Rechner-Config
# ============================================================
EYEBROWS = [
    "Wusstest du?",
    "Schnell gerechnet",
    "Mal nachgerechnet",
    "Selbst-Check",
    "Rechenbeispiel",
    "Klassiker",
    "Faustregel",
    "Praktisch",
]


def pick_eyebrow(slug: str) -> str:
    """Deterministisch rotierend, damit Re-Builds stabil bleiben."""
    # Summe der CodePoints ist robust gegen Slugs mit identischem ersten Buchstaben
    h = sum(ord(c) for c in slug)
    return EYEBROWS[h % len(EYEBROWS)]


# Strip führender „Beispiel: " oder „z. B. "-Marker
_LEAD_RE = re.compile(r"^(Beispiel\s*[:\-—]\s*|z\.\s*B\.\s*)", re.IGNORECASE)


def extract_highlight(beispiel: str) -> str:
    """
    Heuristik: nimm den Teil nach dem letzten =, → oder ≈.
    Splitte an Satzende-Markern, cap auf 28 Zeichen.
    Returns "" wenn nichts Sinnvolles ableitbar.
    """
    if not beispiel:
        return ""
    s = _LEAD_RE.sub("", beispiel.strip())
    # letztes Vorkommen eines Marker-Zeichens finden
    positions = [s.rfind(m) for m in ["=", "→", "≈"]]
    pos = max(positions)
    if pos < 0:
        return ""
    after = s[pos + 1:].strip()
    # Splitten an Pipe + Punkt-mit-Leerzeichen + Newline
    for sep in [" | ", "|", "\n", ". "]:
        if sep in after:
            after = after.split(sep)[0].strip()
    after = after.rstrip(".,;:")
    if len(after) < 3:
        return ""
    if len(after) > 28:
        after = after[:26].rstrip() + "…"
    return after


def wrap_title(titel: str, max_chars_per_line: int = 22) -> list[str]:
    """Bricht den Titel maximal auf 2 Zeilen um (Wortgrenze)."""
    if len(titel) <= max_chars_per_line:
        return [titel]
    words = titel.split()
    line1, line2 = [], []
    for w in words:
        cur1 = " ".join(line1 + [w])
        if len(cur1) <= max_chars_per_line:
            line1.append(w)
        else:
            line2.append(w)
    result = [" ".join(line1)]
    if line2:
        result.append(" ".join(line2))
    return result


# ============================================================
# Spec-Builder pro Slug
# ============================================================
def build_spec(slug: str, snapshot: dict, farben: dict) -> dict | None:
    """Returnt spec oder None bei harten Daten-Fehlern."""
    r = snapshot.get(slug)
    if not r:
        print(f"  ✗ {slug:35} kein Snapshot-Eintrag", file=sys.stderr)
        return None
    kat = r["kategorieSlug"]
    farben_eintrag = farben.get(kat)
    if not farben_eintrag:
        print(
            f"  ✗ {slug:35} kategorieSlug '{kat}' nicht in kategorie-farben.json",
            file=sys.stderr,
        )
        return None
    return {
        "slug": slug,
        "emoji": r.get("icon") or "📊",
        "bg": tuple(farben_eintrag["bg"]),
        "accent": tuple(farben_eintrag["accent"]),
        "eyebrow": pick_eyebrow(slug),
        "lines": wrap_title(r["titel"]),
        "highlight": extract_highlight(r.get("beispiel", "")),
    }


# ============================================================
# Post-Renderer (Pixel-perfekte Phase-0-Optik, leicht erweitert)
# ============================================================
def render_post(spec, fonts, bolt_svg_path):
    font_bold_path, _font_reg_path, font_emoji_path = fonts

    img = Image.new("RGBA", (CANVAS, CANVAS), spec["bg"] + (255,))
    draw = ImageDraw.Draw(img)

    accent = spec["accent"]
    dark = SLATE_900

    # ---- Emoji top ----
    emoji_target_h = 200
    emoji_tile = render_emoji(spec["emoji"], emoji_target_h, font_emoji_path)
    ew, eh = emoji_tile.size
    emoji_x = (CANVAS - ew) // 2
    emoji_y = 110
    img.alpha_composite(emoji_tile, dest=(emoji_x, emoji_y))

    cursor_y = emoji_y + eh + 40

    # ---- Eyebrow ----
    font_eyebrow = ImageFont.truetype(font_bold_path, 42)
    eyebrow = spec["eyebrow"].upper()
    spaced = "  ".join(list(eyebrow))
    sw, sh = measure(draw, spaced, font_eyebrow)
    draw.text(((CANVAS - sw) // 2, cursor_y), spaced, font=font_eyebrow, fill=accent + (255,))
    cursor_y += sh + 60

    # ---- Normal lines (Titel, ggf. 2 Zeilen) ----
    font_line = ImageFont.truetype(font_bold_path, 72)
    for line in spec["lines"]:
        lw, lh = measure(draw, line, font_line)
        # falls Titel-Zeile zu lang → kleiner
        if lw > CANVAS - 80:
            for size in [64, 56, 48]:
                font_line_shrink = ImageFont.truetype(font_bold_path, size)
                lw, lh = measure(draw, line, font_line_shrink)
                if lw <= CANVAS - 80:
                    draw.text(((CANVAS - lw) // 2, cursor_y), line, font=font_line_shrink, fill=dark + (255,))
                    cursor_y += lh + 14
                    break
            continue
        draw.text(((CANVAS - lw) // 2, cursor_y), line, font=font_line, fill=dark + (255,))
        cursor_y += lh + 14

    # ---- Highlight ----
    if spec["highlight"]:
        cursor_y += 50
        font_highlight = ImageFont.truetype(font_bold_path, 110)
        hw, hh = measure(draw, spec["highlight"], font_highlight)
        if hw > CANVAS - 100:
            for try_size in [100, 92, 84, 78, 72, 66, 60]:
                font_highlight = ImageFont.truetype(font_bold_path, try_size)
                hw, hh = measure(draw, spec["highlight"], font_highlight)
                if hw <= CANVAS - 100:
                    break
        draw.text(
            ((CANVAS - hw) // 2, cursor_y),
            spec["highlight"],
            font=font_highlight,
            fill=accent + (255,),
        )

    # ---- Footer ----
    footer_y = CANVAS - 90
    font_url = ImageFont.truetype(font_bold_path, 42)
    bolt = render_bolt_mini(54, bolt_svg_path)
    bw = bolt.size[0]
    gap = 14
    url = "rechenfix.de"
    uw, _uh = measure(draw, url, font_url)
    group_w = bw + gap + uw
    group_x = (CANVAS - group_w) // 2

    img.alpha_composite(bolt, dest=(group_x, footer_y - 8))
    draw.text(
        (group_x + bw + gap, footer_y),
        url,
        font=font_url,
        fill=dark + (255,),
    )

    return img


# ============================================================
# Drift-Check (vor Build)
# ============================================================
def verify_repo_state(queue: dict, farben: dict, snapshot: dict) -> bool:
    """Sanity-Check: Queue-Slugs alle in snapshot + Farben-Map komplett."""
    ok = True

    missing_snapshot = [s for s in queue["queue"] if s not in snapshot]
    if missing_snapshot:
        print(
            f"✗ {len(missing_snapshot)} Queue-Slugs nicht im snapshot:",
            ", ".join(missing_snapshot[:5]),
            "…" if len(missing_snapshot) > 5 else "",
            file=sys.stderr,
        )
        ok = False

    used_kats = {snapshot[s]["kategorieSlug"] for s in queue["queue"] if s in snapshot}
    missing_farben = [k for k in used_kats if k not in farben]
    if missing_farben:
        print(
            f"✗ kategorieSlug ohne Farb-Eintrag: {missing_farben}",
            file=sys.stderr,
        )
        ok = False

    return ok


# ============================================================
# Main
# ============================================================
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Nur einen Slug rendern")
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        help="Skip falls PNG bereits in public/social-posts/ existiert",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Nur die ersten N Slugs der Queue (für Quick-Tests)",
    )
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent

    # Daten laden
    with open(project_root / "lib" / "social" / "queue.json", encoding="utf-8") as f:
        queue = json.load(f)
    with open(project_root / "lib" / "social" / "kategorie-farben.json", encoding="utf-8") as f:
        farben = json.load(f)["farben"]
    snapshot_path = project_root / "lib" / "social" / "_rechner-snapshot.json"
    if not snapshot_path.is_file():
        sys.exit(
            "FEHLER: lib/social/_rechner-snapshot.json fehlt.\n"
            "Erst ausführen: npx tsx scripts/dump-rechner-data.ts"
        )
    with open(snapshot_path, encoding="utf-8") as f:
        snapshot = json.load(f)["rechner"]

    # Drift-Check
    if not verify_repo_state(queue, farben, snapshot):
        sys.exit("Drift erkannt — Build abgebrochen.")

    # Fonts + Bolt-SVG
    try:
        fonts = get_fonts()
        bolt_svg = get_bolt_svg()
    except RuntimeError as err:
        sys.exit(f"FEHLER: {err}")

    # Ziel-Liste bestimmen
    if args.slug:
        if args.slug not in queue["queue"]:
            sys.exit(f"Slug '{args.slug}' nicht in queue.json.")
        targets = [args.slug]
    else:
        targets = queue["queue"]
        if args.limit:
            targets = targets[: args.limit]

    out_dir = project_root / "public" / "social-posts"
    out_dir.mkdir(parents=True, exist_ok=True)

    ok = 0
    skipped = 0
    failed: list[str] = []

    for slug in targets:
        out_path = out_dir / f"{slug}.png"
        if args.skip_existing and out_path.is_file():
            skipped += 1
            continue
        spec = build_spec(slug, snapshot, farben)
        if spec is None:
            failed.append(slug)
            continue
        try:
            img = render_post(spec, fonts, bolt_svg)
            img.save(out_path, "PNG", optimize=True)
            print(f"  ✓ {slug:35} → {out_path.relative_to(project_root)}")
            ok += 1
        except Exception as exc:
            print(f"  ✗ {slug:35} {type(exc).__name__}: {exc}", file=sys.stderr)
            failed.append(slug)

    print(f"\nGenerated: {ok}")
    print(f"Skipped:   {skipped}")
    print(f"Failed:    {len(failed)}")
    if failed:
        print(f"Failed-Slugs: {', '.join(failed)}")
        sys.exit(1)


if __name__ == "__main__":
    main()

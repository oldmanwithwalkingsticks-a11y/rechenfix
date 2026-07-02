"""
W17A.1.F — Social-Image-Builder
1080×1080 PNG pro Slug aus lib/social/queue.json.

Portierung von scripts/build_phase0_posts.py:
  - 10 hartcodierte POSTS → Iteration über queue.json (160 Slugs)
  - Linux-Font-Pfade → Cross-Platform-Resolution (ENV/Windows/Linux)
  - /home/claude/-Output → public/social-posts/<slug>.png
  - Layout-Helper (render_emoji, render_bolt_mini, render_post)
    unverändert übernommen — Pixel-perfekte Phase-0-Optik.

Datenquellen:
  - lib/social/queue.json                (Slug-Reihenfolge)
  - lib/social/kategorie-farben.json     (bg + accent pro Kategorie)
  - lib/social/_rechner-snapshot.json    (titel, icon pro Slug — TS-Dump)
  - lib/social/captions.json             (socialHeadline + socialEyebrow
                                          pro Slug, KI-generiert)

Pflicht-Voraussetzungen:
  1. npx tsx scripts/verify-kategorie-slugs.ts        (exit 0)
  2. npx tsx scripts/dump-rechner-data.ts             (Snapshot)
  3. npx tsx scripts/social-caption-builder.ts        (Captions + Headlines)

Aufruf:
  python scripts/social-image-builder.py
  python scripts/social-image-builder.py --slug bmi-rechner   (nur ein Slug)
  python scripts/social-image-builder.py --skip-existing      (nur fehlende)

ENV-Overrides für Font-Pfade (Linux/Windows-Unterschiede):
  SOCIAL_FONT_BOLD   = absoluter Pfad zur Bold-TTF
  SOCIAL_FONT_REG    = absoluter Pfad zur Regular-TTF
  SOCIAL_FONT_EMOJI  = absoluter Pfad zur Color-Emoji-TTF
  SOCIAL_BOLT_PNG    = absoluter Pfad zur Bolt-PNG (Default: public/bolt-footer.png)

Dependencies:  pip install Pillow
(cairosvg/libcairo NICHT mehr nötig — der Bolt wird Pillow-only nachgezeichnet.)
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("FEHLER: Pillow nicht installiert. Run: pip install Pillow")


# ============================================================
# Brand constants (unverändert aus Phase 0)
# ============================================================
SLATE_900 = (15, 23, 42)
WHITE = (255, 255, 255)
CANVAS = 1080

# W18.3a — Hochformat (TikTok 9:16). Eigene Konstanten, CANVAS bleibt Quadrat.
CANVAS_V_W = 1080
CANVAS_V_H = 1920

# TikTok-Vertical-Farbschema (W18.3a-2) — fest, kategorie-unabhängig.
# Maximaler Feed-Kontrast: dunkler Grund + Neongelb-Akzent + weißer Text.
TIKTOK_BG     = (13, 13, 15)    # #0D0D0F  fast-schwarz
TIKTOK_ACCENT = (223, 255, 0)   # #DFFF00  neongelb
TIKTOK_TEXT   = (255, 255, 255) # weiß


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


# ============================================================
# Bolt-PNG (Pillow-only, kein cairosvg/libcairo nötig)
# ============================================================
# Polygon-Daten 1:1 aus public/bolt.svg (viewBox 0 0 48 48):
#   <polygon points="28,6 14,26 22,26 18,42 34,20 26,20 30,6"
#            fill="url(#bolt)" stroke="#1e40af" stroke-width="1.5" />
#   gradient: #FBBF24 (251,191,36) → #F59E0B (245,158,11)
# Wir approximieren den Gradient mit der Mittel-Farbe — bei der
# Display-Größe 54×54 Footer ist der Gradient ohnehin nicht sichtbar.
BOLT_POLYGON_48 = [
    (28, 6), (14, 26), (22, 26), (18, 42),
    (34, 20), (26, 20), (30, 6),
]
BOLT_FILL = (248, 174, 24)       # Mittel zwischen #FBBF24 und #F59E0B
BOLT_STROKE = (30, 64, 175)      # #1e40af
BOLT_VIEWBOX = 48
BOLT_CACHE_SIZE = 256            # Master-Größe, wird beim Render downsized


def _generate_bolt_png(target_path: Path, size: int = BOLT_CACHE_SIZE) -> None:
    """Zeichnet den Bolt mit Pillow direkt nach (kein SVG-Parsing).

    Polygon-Koords aus public/bolt.svg viewBox 0 0 48 48 werden auf
    size×size skaliert. Solid-Fill (Gradient-Mittel) + Stroke #1e40af
    proportional skaliert. Output PNG mit Alpha-Kanal, transparenter
    Hintergrund.
    """
    scale = size / BOLT_VIEWBOX
    pts = [
        (int(round(x * scale)), int(round(y * scale)))
        for x, y in BOLT_POLYGON_48
    ]
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    stroke_w = max(2, int(round(1.5 * scale)))
    draw.polygon(pts, fill=BOLT_FILL, outline=BOLT_STROKE, width=stroke_w)
    target_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(target_path, "PNG", optimize=True)


def get_bolt_png() -> Path:
    """Liefert Pfad zu bolt-footer.png. Erzeugt es einmalig wenn fehlt."""
    env = os.environ.get("SOCIAL_BOLT_PNG")
    if env and Path(env).is_file():
        return Path(env)
    default = (
        Path(__file__).resolve().parent.parent / "public" / "bolt-footer.png"
    )
    if not default.is_file():
        print(f"  ℹ {default.name} fehlt — erzeuge aus Bolt-Polygon …")
        _generate_bolt_png(default)
    return default


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


def render_bolt_mini(size, bolt_png_path):
    """Lädt das transparente Bolt-PNG und skaliert auf Footer-Größe.

    Ersetzt die ehemalige cairosvg-Variante (libcairo-Dependency
    war auf Windows nicht trivial installierbar — OSError: no library
    called 'cairo-2'). Pillow-LANCZOS gibt sauberes Downsizing.
    """
    img = Image.open(bolt_png_path).convert("RGBA")
    return img.resize((size, size), Image.LANCZOS)


# ============================================================
# W17A.2: Content kommt aus captions.json (KI-generiert)
# ============================================================
# Vorher (W17A.1) wurden Eyebrow + Highlight aus rechner.beispiel
# geparst — Trefferquote ~50 %. Seit W17A.2 liefert der Caption-
# Builder pro Slug eine socialHeadline + socialEyebrow mit, der
# Image-Builder liest sie direkt. Default-Eyebrow bei fehlendem
# Eintrag (Pipeline robust gegen Teil-Befüllungen).
DEFAULT_EYEBROW = "Rechenfix.de"


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
def build_spec(
    slug: str,
    snapshot: dict,
    farben: dict,
    captions: dict,
) -> dict | None:
    """Returnt spec oder None bei harten Daten-Fehlern.

    eyebrow + highlight kommen aus captions[slug] (W17A.2).
    Wenn der Slug noch keinen Captions-Eintrag hat (Pipeline mit
    Teil-Befüllung), greifen sanfte Defaults: eyebrow="Rechenfix.de",
    highlight leer (Highlight-Block wird einfach weggelassen).
    """
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
    caption = captions.get(slug) or {}
    eyebrow = (caption.get("socialEyebrow") or "").strip() or DEFAULT_EYEBROW
    highlight = (caption.get("socialHeadline") or "").strip()
    return {
        "slug": slug,
        "emoji": r.get("icon") or "📊",
        "bg": tuple(farben_eintrag["bg"]),
        "accent": tuple(farben_eintrag["accent"]),
        "eyebrow": eyebrow,
        "lines": wrap_title(r["titel"]),
        "highlight": highlight,
    }


# ============================================================
# Post-Renderer (Pixel-perfekte Phase-0-Optik, leicht erweitert)
# ============================================================
def render_post(spec, fonts, bolt_png_path):
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
    bolt = render_bolt_mini(54, bolt_png_path)
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
# W18.3a — Vertical-Renderer (1080×1920, TikTok 9:16)
# ============================================================
def render_post_vertical(spec, fonts, bolt_png_path):
    """Rendert einen Slug als 1080×1920-Hochformat für TikTok.

    Drei vertikale Zonen (Vollbild-Logik: der Hook oben muss in den
    ersten Sekunden greifen):
      Zone 1 (oben)   — Eyebrow + großer Highlight-Hook
      Zone 2 (Mitte)  — Emoji-Motiv + Titel
      Zone 3 (unten)  — CTA "Jetzt berechnen →" + Marken-Footer

    Nutzt ausschließlich das vorhandene spec-Dict (build_spec bleibt
    unangetastet) sowie die geteilten Helfer measure/render_emoji/
    render_bolt_mini.
    """
    font_bold_path, _font_reg_path, font_emoji_path = fonts

    # W18.3a-2 — festes TikTok-Schema statt Kategorie-Pastell (spec["bg"]/
    # spec["accent"]). render_post (square, IG/FB) bleibt davon unberührt.
    img = Image.new("RGBA", (CANVAS_V_W, CANVAS_V_H), TIKTOK_BG + (255,))
    draw = ImageDraw.Draw(img)

    accent = TIKTOK_ACCENT
    text_color = TIKTOK_TEXT

    def center_x(w):
        return (CANVAS_V_W - w) // 2

    has_highlight = bool(spec["highlight"])

    # ---------- Zone 1 — HOOK (oben) ----------
    # Eyebrow gesperrt, accent, Bold 46 (shrinkt falls zu breit)
    font_eyebrow = ImageFont.truetype(font_bold_path, 46)
    eyebrow = spec["eyebrow"].upper()
    spaced = "  ".join(list(eyebrow))
    ebw, ebh = measure(draw, spaced, font_eyebrow)
    if ebw > CANVAS_V_W - 100:
        for size in [40, 36, 32, 28]:
            font_eyebrow = ImageFont.truetype(font_bold_path, size)
            ebw, ebh = measure(draw, spaced, font_eyebrow)
            if ebw <= CANVAS_V_W - 100:
                break
    eyebrow_y = 180
    draw.text((center_x(ebw), eyebrow_y), spaced, font=font_eyebrow, fill=accent + (255,))

    # Highlight = größter Text im Bild (der eigentliche Hook).
    # Auto-Shrink absteigend, bis Breite ≤ CANVAS_V_W − 120.
    if has_highlight:
        hl_y = eyebrow_y + ebh + 80
        font_hl = ImageFont.truetype(font_bold_path, 130)
        hw, hh = measure(draw, spec["highlight"], font_hl)
        for try_size in [130, 120, 110, 100, 92, 84, 76]:
            font_hl = ImageFont.truetype(font_bold_path, try_size)
            hw, hh = measure(draw, spec["highlight"], font_hl)
            if hw <= CANVAS_V_W - 120:
                break
        draw.text((center_x(hw), hl_y), spec["highlight"], font=font_hl, fill=accent + (255,))

    # ---------- Zone 2 — MOTIV (Mitte) ----------
    # Ohne Highlight rückt das Motiv nach oben, damit der Titel selbst
    # zum Hook wird und keine leere Fläche im oberen Drittel bleibt.
    emoji_target_h = 280
    emoji_tile = render_emoji(spec["emoji"], emoji_target_h, font_emoji_path)
    etw, eth = emoji_tile.size
    emoji_y = 780 if has_highlight else 520
    img.alpha_composite(emoji_tile, dest=(center_x(etw), emoji_y))

    title_y = emoji_y + eth + 60
    font_line = ImageFont.truetype(font_bold_path, 72)
    for line in spec["lines"]:
        lw, lh = measure(draw, line, font_line)
        if lw > CANVAS_V_W - 100:
            f_line = font_line
            for size in [64, 58, 52, 46]:
                f_line = ImageFont.truetype(font_bold_path, size)
                lw, lh = measure(draw, line, f_line)
                if lw <= CANVAS_V_W - 100:
                    break
            draw.text((center_x(lw), title_y), line, font=f_line, fill=text_color + (255,))
            title_y += lh + 18
            continue
        draw.text((center_x(lw), title_y), line, font=font_line, fill=text_color + (255,))
        title_y += lh + 18

    # ---------- Zone 3 — CTA / FOOTER (unten) ----------
    cta_text = "Jetzt berechnen →"
    font_cta = ImageFont.truetype(font_bold_path, 52)
    cw, _ch = measure(draw, cta_text, font_cta)
    cta_y = 1600
    draw.text((center_x(cw), cta_y), cta_text, font=font_cta, fill=accent + (255,))

    footer_y = 1720
    font_url = ImageFont.truetype(font_bold_path, 42)
    bolt = render_bolt_mini(54, bolt_png_path)
    bw = bolt.size[0]
    gap = 14
    url = "rechenfix.de"
    uw, _uh = measure(draw, url, font_url)
    group_w = bw + gap + uw
    group_x = (CANVAS_V_W - group_w) // 2
    img.alpha_composite(bolt, dest=(group_x, footer_y - 8))
    draw.text((group_x + bw + gap, footer_y), url, font=font_url, fill=text_color + (255,))

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
    parser.add_argument(
        "--vertical",
        action="store_true",
        help="1080×1920-Hochformat (TikTok 9:16) → public/social-videos-src/. "
        "Ohne dieses Flag: 1080×1080-Default → public/social-posts/.",
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

    # Captions (W17A.2): socialHeadline + socialEyebrow pro Slug.
    # Bei leerem captions.json (Pre-Build-Stand) greifen sanfte Defaults
    # im build_spec — Pipeline läuft trotzdem, Bilder sehen aber dürftig
    # aus. Hinweis vor Build, damit Karsten weiß, was zu tun ist.
    captions_path = project_root / "lib" / "social" / "captions.json"
    if not captions_path.is_file():
        sys.exit(
            "FEHLER: lib/social/captions.json fehlt.\n"
            "Erst ausführen: npx tsx scripts/social-caption-builder.ts"
        )
    with open(captions_path, encoding="utf-8") as f:
        captions = json.load(f).get("captions") or {}

    # Drift-Check
    if not verify_repo_state(queue, farben, snapshot):
        sys.exit("Drift erkannt — Build abgebrochen.")

    # Caption-Coverage-Report (informativ, kein exit)
    missing_caption = [s for s in queue["queue"] if s not in captions]
    if missing_caption:
        print(
            f"  ℹ {len(missing_caption)} von {len(queue['queue'])} Slugs ohne Caption — "
            f"diese Bilder bekommen Default-Eyebrow + keinen Highlight-Block. "
            f"Caption-Build laufen lassen: npx tsx scripts/social-caption-builder.ts"
        )

    # Fonts + Bolt-PNG (Bolt wird einmalig pillow-only erzeugt, falls fehlt)
    try:
        fonts = get_fonts()
        bolt_png = get_bolt_png()
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

    # W18.3a — Format-Weiche. Default (kein --vertical) unverändert:
    # 1080×1080 → public/social-posts/. Vertical: 1080×1920 → social-videos-src/.
    if args.vertical:
        out_dir = project_root / "public" / "social-videos-src"
        renderer = render_post_vertical
    else:
        out_dir = project_root / "public" / "social-posts"
        renderer = render_post
    out_dir.mkdir(parents=True, exist_ok=True)

    ok = 0
    skipped = 0
    failed: list[str] = []

    for slug in targets:
        out_path = out_dir / f"{slug}.png"
        if args.skip_existing and out_path.is_file():
            skipped += 1
            continue
        spec = build_spec(slug, snapshot, farben, captions)
        if spec is None:
            failed.append(slug)
            continue
        try:
            img = renderer(spec, fonts, bolt_png)
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

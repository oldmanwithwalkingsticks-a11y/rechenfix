"""
Phase 0 Content Generator — 10 Instagram posts (1080×1080)
Each post = 1 calculator, branded, consistent serial design.
"""

from PIL import Image, ImageDraw, ImageFont
import io
import cairosvg

# ============================================================
# Brand constants
# ============================================================
SLATE_900 = (15, 23, 42)
WHITE = (255, 255, 255)

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
EMOJI_FONT = "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf"
BOLT_SVG = "/home/claude/bolt-original.svg"

CANVAS = 1080

# ============================================================
# Post specifications
# ============================================================
POSTS = [
    # 1
    {
        "id": "01-brutto-netto",
        "emoji": "💶",
        "bg": (232, 245, 233),
        "accent": (46, 125, 50),
        "eyebrow": "Wusstest du?",
        "lines": ["Bei 3.000 € brutto", "bleiben dir netto"],
        "highlight": "nur 2.085 €",
    },
    # 2
    {
        "id": "02-mwst",
        "emoji": "🧾",
        "bg": (232, 245, 233),
        "accent": (46, 125, 50),
        "eyebrow": "Schnell-Test",
        "lines": ["100 €", "+ 19 % MwSt"],
        "highlight": "= 119 €",
    },
    # 3
    {
        "id": "03-zinsen",
        "emoji": "📈",
        "bg": (232, 245, 233),
        "accent": (46, 125, 50),
        "eyebrow": "Zinseszins-Magie",
        "lines": ["10.000 € · 4 % p. a.", "in 10 Jahren"],
        "highlight": "= 14.802 €",
    },
    # 4
    {
        "id": "04-bmi",
        "emoji": "⚖️",
        "bg": (252, 228, 236),
        "accent": (194, 24, 91),
        "eyebrow": "Selbst-Check",
        "lines": ["1,80 m · 80 kg"],
        "highlight": "BMI = 24,7",
    },
    # 5
    {
        "id": "05-stundenlohn",
        "emoji": "⏱️",
        "bg": (232, 245, 233),
        "accent": (46, 125, 50),
        "eyebrow": "Mal nachgerechnet",
        "lines": ["3.000 € brutto", "÷ 173 Std / Monat"],
        "highlight": "= 17,34 €/Std",
    },
    # 6
    {
        "id": "06-spritkosten",
        "emoji": "⛽",
        "bg": (236, 239, 241),
        "accent": (55, 71, 79),
        "eyebrow": "Pendler-Realität",
        "lines": ["50 km · 220 Tage", "7,5 L / 100 km"],
        "highlight": "= 1.815 € / Jahr",
    },
    # 7
    {
        "id": "07-tagerechner",
        "emoji": "📅",
        "bg": (255, 248, 225),
        "accent": (245, 124, 0),
        "eyebrow": "Wusstest du?",
        "lines": ["01.01.1990", "bis heute"],
        "highlight": "= 13.293 Tage",
    },
    # 8
    {
        "id": "08-dreisatz",
        "emoji": "➗",
        "bg": (243, 229, 245),
        "accent": (106, 27, 154),
        "eyebrow": "Klassiker",
        "lines": ["3 Bäcker → 5 Std", "6 Bäcker → ?"],
        "highlight": "= 2,5 Std",
    },
    # 9
    {
        "id": "09-miete",
        "emoji": "🏠",
        "bg": (227, 242, 253),
        "accent": (21, 101, 192),
        "eyebrow": "Rechenbeispiel",
        "lines": ["75 m² · 12,50 €/m²", "+ 180 € NK"],
        "highlight": "= 1.117,50 € warm",
    },
    # 10
    {
        "id": "10-stromkosten",
        "emoji": "⚡",
        "bg": (227, 242, 253),
        "accent": (21, 101, 192),
        "eyebrow": "Jahres-Bilanz",
        "lines": ["3.500 kWh · 38 ct/kWh"],
        "highlight": "= 1.330 € / Jahr",
    },
]


# ============================================================
# Helpers
# ============================================================
def measure(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def render_emoji(emoji_char, target_size):
    """Render a color emoji at the given pixel size."""
    font = ImageFont.truetype(EMOJI_FONT, 109)
    tile = Image.new("RGBA", (140, 140), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    td.text((0, 0), emoji_char, font=font, embedded_color=True)
    bbox = tile.getbbox()
    if bbox:
        tile = tile.crop(bbox)
    # Resize keeping aspect ratio so the longer side equals target_size
    w, h = tile.size
    scale = target_size / max(w, h)
    new_w = int(w * scale)
    new_h = int(h * scale)
    return tile.resize((new_w, new_h), Image.LANCZOS)


def render_bolt_mini(size):
    """Tiny bolt for footer logo."""
    png_bytes = cairosvg.svg2png(
        url=BOLT_SVG,
        output_width=size,
        output_height=size,
    )
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


# ============================================================
# Post renderer
# ============================================================
def render_post(spec):
    """Render a single 1080×1080 post."""
    img = Image.new("RGBA", (CANVAS, CANVAS), spec["bg"] + (255,))
    draw = ImageDraw.Draw(img)

    accent = spec["accent"]
    dark = SLATE_900

    # ---- Emoji top ----
    emoji_target_h = 200
    emoji_tile = render_emoji(spec["emoji"], emoji_target_h)
    ew, eh = emoji_tile.size
    emoji_x = (CANVAS - ew) // 2
    emoji_y = 110
    img.alpha_composite(emoji_tile, dest=(emoji_x, emoji_y))

    # Cursor for text placement
    cursor_y = emoji_y + eh + 40

    # ---- Eyebrow ----
    font_eyebrow = ImageFont.truetype(FONT_BOLD, 42)
    eyebrow = spec["eyebrow"].upper()
    # Letter-spaced look
    spaced = "  ".join(list(eyebrow))
    sw, sh = measure(draw, spaced, font_eyebrow)
    draw.text(((CANVAS - sw) // 2, cursor_y), spaced, font=font_eyebrow, fill=accent + (255,))
    cursor_y += sh + 60

    # ---- Normal lines ----
    font_line = ImageFont.truetype(FONT_BOLD, 72)
    for line in spec["lines"]:
        lw, lh = measure(draw, line, font_line)
        draw.text(((CANVAS - lw) // 2, cursor_y), line, font=font_line, fill=dark + (255,))
        cursor_y += lh + 14

    # ---- Highlight (big, accent color) ----
    cursor_y += 50
    font_highlight = ImageFont.truetype(FONT_BOLD, 110)
    hw, hh = measure(draw, spec["highlight"], font_highlight)
    # If too wide, shrink
    if hw > CANVAS - 100:
        for try_size in [100, 92, 84, 78]:
            font_highlight = ImageFont.truetype(FONT_BOLD, try_size)
            hw, hh = measure(draw, spec["highlight"], font_highlight)
            if hw <= CANVAS - 100:
                break
    draw.text(((CANVAS - hw) // 2, cursor_y), spec["highlight"],
              font=font_highlight, fill=accent + (255,))

    # ---- Footer: rechenfix.de + mini bolt logo ----
    footer_y = CANVAS - 90
    font_url = ImageFont.truetype(FONT_BOLD, 42)
    # Mini bolt icon left of URL, both centered as a group
    bolt = render_bolt_mini(54)
    bw = bolt.size[0]
    gap = 14
    url = "rechenfix.de"
    uw, uh = measure(draw, url, font_url)
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
# Build all 10
# ============================================================
if __name__ == "__main__":
    import os
    out_dir = "/home/claude/phase0-posts"
    os.makedirs(out_dir, exist_ok=True)

    for spec in POSTS:
        img = render_post(spec)
        path = f"{out_dir}/{spec['id']}.png"
        img.save(path, "PNG", optimize=True)
        print(f" → {path}")

    print(f"\nDone — {len(POSTS)} posts generated.")

"""Gera public/og-image.png (1200x630) a partir de scripts/og/og-image.html.

Uso: python3 scripts/og_render.py   (precisa do Playwright com o Chromium instalado)
Edite o HTML quando o título ou a chamada do site mudar.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "og" / "og-image.html"
OUT = ROOT / "public" / "og-image.png"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    page.goto(SRC.as_uri(), wait_until="networkidle")
    page.wait_for_timeout(400)
    page.screenshot(path=str(OUT))
    browser.close()
print(f"og-image gerada: {OUT.relative_to(ROOT)}")

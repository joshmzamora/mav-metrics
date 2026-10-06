"""Download real presentation images into presentation/assets/.

Run from the repo root:
    python scripts/download_assets.py

The deck should still work if downloads fail; the generated PowerPoint script uses
text placeholders when assets are missing.
"""

from __future__ import annotations

from pathlib import Path
import requests

ASSET_DIR = Path("presentation/assets")
ASSET_DIR.mkdir(parents=True, exist_ok=True)

ASSETS = {
    "stephen_curry.png": "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
    "luka_doncic.png": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png",
    "shai_gilgeous_alexander.png": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png",
    "anthony_edwards.png": "https://cdn.nba.com/headshots/nba/latest/1040x760/1630162.png",
    "victor_wembanyama.png": "https://cdn.nba.com/headshots/nba/latest/1040x760/1641705.png",
    "dereck_lively_ii.png": "https://cdn.nba.com/headshots/nba/latest/1040x760/1641726.png",
    "mavericks_logo.svg": "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg",
}


def download(name: str, url: str) -> None:
    path = ASSET_DIR / name
    try:
        response = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        path.write_bytes(response.content)
        print(f"saved {path}")
    except Exception as exc:  # keep setup forgiving for presentation work
        print(f"skipped {name}: {exc}")


if __name__ == "__main__":
    for filename, asset_url in ASSETS.items():
        download(filename, asset_url)

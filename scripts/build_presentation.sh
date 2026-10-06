#!/usr/bin/env bash
set -euo pipefail
mkdir -p .build presentation presentation/assets

# Real player photography: official NBA headshots. Download before the deck
# generator runs so the slide-building code embeds photos instead of fallbacks.
curl -L --fail --silent --show-error "https://cdn.nba.com/headshots/nba/latest/1040x760/1642843.png" -o presentation/assets/cooper.png || true
curl -L --fail --silent --show-error "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" -o presentation/assets/curry.png || true
curl -L --fail --silent --show-error "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png" -o presentation/assets/luka.png || true

: > .build/build_presentation.js
for f in scripts/presentation_parts/part*.b64; do
  base64 -d "$f" >> .build/build_presentation.js
done
node .build/build_presentation.js
echo "Built presentation/Mav_Metrics_Final.pptx"

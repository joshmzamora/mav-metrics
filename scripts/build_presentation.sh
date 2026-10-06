#!/usr/bin/env bash
set -euo pipefail
mkdir -p .build presentation
: > .build/build_presentation.js
for f in scripts/presentation_parts/part*.b64; do
  base64 -d "$f" >> .build/build_presentation.js
done
node .build/build_presentation.js
echo "Built presentation/Mav_Metrics_Final.pptx"

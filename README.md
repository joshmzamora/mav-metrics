# Mav Metrics

Mav Metrics is a public-data NBA player marketability project for the 2026 Sports Analytics Case.

The goal is to help teams, agents, players, and brands identify players with strong current marketability, rising momentum, or underpriced commercial upside.

## Core idea

Do not only rank famous players. Find the **marketability gap**.

```text
Marketability Gap = Actual Marketability - Expected Marketability
```

A negative gap means basketball production is ahead of commercial marketability. That is the useful opportunity signal.

## Final deliverables

- `presentation/Mav_Metrics_Final.pptx` — final PowerPoint deck with detailed speaker notes
- `dashboard/` — lightweight Player Marketability Explorer
- `data/processed/player_scores.csv` — 2025-26 benchmark cohort
- `scripts/` — reproducible scoring / presentation build helpers

The separate presentation docs were removed on purpose. The methodology, assumptions, Q&A prep, and speaking script live inside the PowerPoint speaker notes so the visible slides stay clean.

## Benchmark data

The current dashboard is a proof-of-concept benchmark built from selected public signals. The production workflow is designed to expand to the full player pool on a fixed collection date.

Public sources include:

- Official NBA/NBPA jersey-sales rankings
- Official NBA social + digital view rankings
- NBA.com player statistics

## Scoring formula

```text
Marketability Score =
  25% Basketball Performance
+ 20% Reach
+ 20% Attention
+ 15% Engagement
+ 10% Momentum
+ 10% Brand
```

```text
Expected Marketability = f(Basketball Performance)
Marketability Gap = Marketability Score - Expected Marketability
```

## Quick start

```bash
pip install -r requirements.txt
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/dashboard/
```

## Presentation focus

The deck is designed as a Mavericks-style analytics briefing: clear story, official public data, transparent model, sanity-check validation, sensitivity testing, dashboard screenshot, and specific Dallas recommendations.

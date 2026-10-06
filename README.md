# Mav Metrics

A simple analytics project for the 2026 Sports Analytics Case: **Player Marketability Model**.

The goal is to create a public-data framework that helps teams, agents, players, and brands find NBA players with strong marketability, rising momentum, or untapped commercial value.

## What is included

- simple Python scoring model
- public-data input template
- processed demo dataset
- lightweight dashboard
- methodology docs
- presentation outline
- speaker script for 4 people
- Q&A prep
- executive summary

## Core idea

Do not only rank famous players. Find the **marketability gap**.

```text
Marketability Gap = Actual Marketability - Expected Marketability
```

A player with strong basketball performance but lower marketability than expected may be under-marketed. That is the useful business opportunity.

## Project structure

```text
mav-metrics/
├── data/
│   ├── raw/
│   └── processed/
├── dashboard/
├── docs/
├── presentation/
├── scripts/
└── src/
```

## Quick start

```bash
pip install -r requirements.txt
python scripts/build_model.py
python scripts/export_figures.py
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/dashboard/
```

## Data workflow

1. Copy `data/raw/player_inputs_template.csv` to `data/raw/player_inputs.csv`.
2. Replace placeholder rows with sourced public player data.
3. Run `python scripts/build_model.py`.
4. Use `data/processed/player_scores.csv` in the dashboard and deck.
5. Run `python scripts/export_figures.py` to export presentation charts.

## Scoring pillars

```text
Marketability Score =
  25% Performance
+ 20% Reach
+ 20% Attention
+ 15% Engagement
+ 10% Momentum
+ 10% Brand
```

All variables are converted to percentiles from 0 to 100. Large count variables use log scaling before percentile conversion.

## Presentation materials

- `presentation/deck.md` — slide-by-slide outline
- `presentation/speaker_script.md` — divided across Joshua, Shresta, Veer, and Sejal
- `presentation/qa_prep.md` — likely judge questions
- `presentation/executive_summary.md` — one-page summary
- `presentation/team_roles.md` — who owns what

## Next steps before submitting

- Replace demo rows with real sourced NBA data.
- Add citations and access dates to the deck.
- Validate against jersey sales, NBA digital views, or All-Star voting.
- Turn `presentation/deck.md` into the final slide deck.
- Keep the dashboard simple; it should support the presentation, not replace it.

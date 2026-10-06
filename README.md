# Mav Metrics

Mav Metrics is a simple public-data NBA marketability project for the 2026 Sports Analytics Case.

The goal is to help teams, agents, players, and brands identify NBA players with strong current marketability, rising momentum, or underpriced commercial upside.

## Core idea

Do not only rank famous players. Find the **marketability gap**.

```text
Marketability Gap = Actual Marketability - Expected Marketability
```

A player with strong basketball performance but lower marketability than expected may be under-marketed. That is the useful business opportunity.

## What is included

- Python scoring model
- public-data input template
- processed demo dataset
- lightweight dashboard
- PowerPoint build workflow
- presentation deck outline
- speaker notes and speaking flow inside the PowerPoint
- Q&A prep and executive summary in the presentation folder

## Quick start

```bash
pip install -r requirements.txt
python scripts/build_model.py
python scripts/export_figures.py
python scripts/build_powerpoint.py
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/dashboard/
```

## Data workflow

1. Copy `data/raw/player_inputs_template.csv` to `data/raw/player_inputs.csv`.
2. Replace demo rows with sourced public player data.
3. Run `python scripts/build_model.py`.
4. Use `data/processed/player_scores.csv` in the dashboard and deck.
5. Run `python scripts/export_figures.py` for presentation charts.

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

## Presentation focus

The deck is the main deliverable. Speaker notes should hold the detailed methodology, assumptions, and talking points so the visible slides stay clean.

## Next steps before submitting

- Replace demo values with final sourced NBA data.
- Pull official NBA/team/player imagery where usage is allowed.
- Validate against jersey sales, NBA digital views, or All-Star voting.
- Practice the speaker notes so the presentation feels natural.
- Keep the dashboard simple; it supports the presentation, not the other way around.

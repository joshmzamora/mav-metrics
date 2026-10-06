# Presentation asset source plan

Use this file to keep visual assets real, traceable, and easy to replace.

## Logo

- `presentation/logo_prompt.md` contains the prompt used to generate the Mav Metrics logo.
- Store the final exported logo as `presentation/assets/mav_metrics_logo.png`.
- Use the logo on the title slide, closing slide, README, and dashboard header.

## Official / real images to pull

The easiest real-image workflow is to use official NBA CDN URLs and keep a small local cache in `presentation/assets/`.

### Player headshots

NBA headshots usually follow this pattern:

```text
https://cdn.nba.com/headshots/nba/latest/1040x760/{PLAYER_ID}.png
```

Starter IDs:

| Player | ID | URL |
|---|---:|---|
| Stephen Curry | 201939 | https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png |
| Luka Doncic | 1629029 | https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png |
| Shai Gilgeous-Alexander | 1628983 | https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png |
| Anthony Edwards | 1630162 | https://cdn.nba.com/headshots/nba/latest/1040x760/1630162.png |
| Victor Wembanyama | 1641705 | https://cdn.nba.com/headshots/nba/latest/1040x760/1641705.png |
| Dereck Lively II | 1641726 | https://cdn.nba.com/headshots/nba/latest/1040x760/1641726.png |

### Team assets

| Asset | URL |
|---|---|
| Dallas Mavericks primary logo | https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg |
| NBA stats advanced players | https://www.nba.com/stats/players/advanced |
| NBA Communications social / jersey sales release | https://pr.nba.com/2024-25-season-social-media-merchandise/ |
| NBA Communications 2025-26 jersey sales release | https://pr.nba.com/stephen-curry-knicks-sales-2025-26-season/ |

## Deck image rules

- Use player headshots only where they support analysis; do not make the deck a collage.
- Use charts generated from the dataset for the main evidence.
- Put source names in small text at the bottom of relevant slides.
- Do not depend on a live demo; export screenshots or charts before presenting.

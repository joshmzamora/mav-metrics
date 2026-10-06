# Methodology

## Goal

Build a simple, explainable framework for measuring a player's marketability using public data.

## Core outputs

1. **Marketability Score**: current commercial appeal from performance, reach, attention, engagement, momentum, and brand fit.
2. **Momentum Score**: how quickly attention is rising.
3. **Marketability Gap**: actual marketability minus expected marketability based on performance.

The gap is the main insight. A negative gap means a player may be under-marketed compared with his basketball value. A positive gap means the player is drawing more attention than performance alone would predict.

## Scoring formula

All raw variables are converted to percentiles from 0 to 100. Large count variables use `log(1 + value)` before percentile scoring.

```text
Marketability Score =
  25% Performance
+ 20% Reach
+ 20% Attention
+ 15% Engagement
+ 10% Momentum
+ 10% Brand
```

## Pillars

- **Performance**: BPM, minutes, usage rate.
- **Reach**: public follower count.
- **Attention**: Google Trends, Wikipedia pageviews, media mentions.
- **Engagement**: engagement rate and posting frequency.
- **Momentum**: recent growth rate in attention or followers.
- **Brand**: endorsements, brand fit, and risk adjustment.

## Validation plan

Do not use validation variables as model inputs. After the score is built, compare it against outside reality:

- jersey-sales rankings
- official NBA digital view rankings
- All-Star voting or fan-vote signals
- sponsor/endorsement presence

Report simple validation checks:

- top-15 hit rate
- rank correlation
- biggest outliers

## Sensitivity check

Change each pillar weight by about 5-10 percentage points and see whether the top recommendations stay similar. If the recommendations stay stable, the model is more defensible.

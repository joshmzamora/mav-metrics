# Model Card

## Intended use

Mav Metrics helps compare public marketability signals for NBA players and identify players who may be under-marketed or gaining momentum.

## Not intended for

- making contract decisions by itself
- replacing scouting or marketing judgment
- evaluating personal worth or character
- using private or sensitive data

## Inputs

Public basketball statistics, public social metrics, public attention metrics, and a small manually documented brand rubric.

## Outputs

- Marketability Score
- Performance Score
- Momentum Score
- Marketability Gap
- recommended action

## Assumptions

- Public attention is a useful proxy for commercial opportunity.
- Performance explains some, but not all, brand value.
- Percentile scoring is easier to explain than raw units.
- Log scaling prevents very famous players from overwhelming the model.

## Limits

- Social follower data can be noisy.
- Google Trends uses relative scaling.
- Manual brand/risk scores need a clear rubric.
- Small datasets can make gaps unstable.
- Public data misses internal sponsor revenue and fan segmentation.

## Update cycle

Update monthly during the season, then run a larger refresh before playoffs, free agency, and major partnership decisions.

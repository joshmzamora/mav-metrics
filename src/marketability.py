"""Simple player marketability scoring utilities."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import numpy as np
import pandas as pd


@dataclass(frozen=True)
class Weights:
    performance: float = 0.25
    reach: float = 0.20
    attention: float = 0.20
    engagement: float = 0.15
    momentum: float = 0.10
    brand: float = 0.10


def percentile(series: pd.Series) -> pd.Series:
    """Return percentile ranks from 0 to 100."""
    return series.rank(pct=True, method="average") * 100


def log_percentile(series: pd.Series) -> pd.Series:
    """Use log scaling before percentiles so giant follower counts do not dominate."""
    return percentile(np.log1p(series.astype(float)))


def load_inputs(path: str | Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    required = {
        "player", "team", "age", "position", "minutes", "bpm", "usage_rate",
        "social_followers", "engagement_rate", "posting_rate", "google_trend",
        "wiki_views", "media_mentions", "momentum_growth", "endorsement_count",
        "brand_fit", "risk_score",
    }
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")
    return df


def score_players(df: pd.DataFrame, weights: Weights = Weights()) -> pd.DataFrame:
    out = df.copy()

    performance = (
        percentile(out["bpm"]) * 0.50
        + percentile(out["minutes"]) * 0.25
        + percentile(out["usage_rate"]) * 0.25
    )

    reach = log_percentile(out["social_followers"])

    attention = (
        percentile(out["google_trend"]) * 0.40
        + log_percentile(out["wiki_views"]) * 0.30
        + log_percentile(out["media_mentions"]) * 0.30
    )

    engagement = (
        percentile(out["engagement_rate"]) * 0.65
        + percentile(out["posting_rate"]) * 0.35
    )

    momentum = percentile(out["momentum_growth"])

    brand = (
        percentile(out["endorsement_count"]) * 0.35
        + percentile(out["brand_fit"]) * 0.45
        + (100 - percentile(out["risk_score"])) * 0.20
    )

    out["performance_score"] = performance.round(1)
    out["momentum_score"] = momentum.round(1)
    out["marketability_score"] = (
        performance * weights.performance
        + reach * weights.reach
        + attention * weights.attention
        + engagement * weights.engagement
        + momentum * weights.momentum
        + brand * weights.brand
    ).round(1)

    if len(out) >= 2:
        slope, intercept = np.polyfit(out["performance_score"], out["marketability_score"], 1)
        expected = slope * out["performance_score"] + intercept
    else:
        expected = out["marketability_score"]

    out["expected_marketability"] = expected.round(1)
    out["marketability_gap"] = (out["marketability_score"] - expected).round(1)

    strengths = []
    weaknesses = []
    actions = []
    for _, row in out.iterrows():
        factors = {
            "Performance": row["performance_score"],
            "Momentum": row["momentum_score"],
            "Current marketability": row["marketability_score"],
        }
        strength = max(factors, key=factors.get)
        weakness = min(factors, key=factors.get)
        strengths.append(strength)
        weaknesses.append(weakness)
        if row["marketability_gap"] < -8:
            actions.append("Invest in player-led content; profile is behind performance.")
        elif row["momentum_score"] > 75:
            actions.append("Move quickly on partnerships while momentum is rising.")
        elif row["marketability_score"] > 75:
            actions.append("Use as premium brand-safe sponsor inventory.")
        else:
            actions.append("Build consistent short-form content before major sponsor push.")

    out["primary_strength"] = strengths
    out["primary_weakness"] = weaknesses
    out["recommended_action"] = actions

    columns = [
        "player", "team", "age", "position", "performance_score", "marketability_score",
        "momentum_score", "expected_marketability", "marketability_gap",
        "primary_strength", "primary_weakness", "recommended_action",
    ]
    return out[columns].sort_values("marketability_score", ascending=False)

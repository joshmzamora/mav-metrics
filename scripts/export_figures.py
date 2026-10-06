"""Export simple figures for the presentation."""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SCORES = ROOT / "data" / "processed" / "player_scores.csv"
FIGURES = ROOT / "figures"


def main() -> None:
    df = pd.read_csv(SCORES)
    FIGURES.mkdir(parents=True, exist_ok=True)

    plt.figure(figsize=(8, 5))
    plt.scatter(df["performance_score"], df["marketability_score"], s=90)
    for _, row in df.iterrows():
        plt.text(row["performance_score"] + 1, row["marketability_score"] + 1, row["player"], fontsize=8)
    plt.xlabel("Performance Score")
    plt.ylabel("Marketability Score")
    plt.title("Performance vs. Marketability")
    plt.tight_layout()
    plt.savefig(FIGURES / "performance_vs_marketability.png", dpi=200)
    plt.close()

    top_gap = df.sort_values("marketability_gap", ascending=False).head(6)
    plt.figure(figsize=(8, 5))
    plt.barh(top_gap["player"], top_gap["marketability_gap"])
    plt.xlabel("Marketability Gap")
    plt.title("Largest Positive Marketability Gaps")
    plt.tight_layout()
    plt.savefig(FIGURES / "marketability_gap.png", dpi=200)
    plt.close()

    print(f"Exported figures to {FIGURES}")


if __name__ == "__main__":
    main()

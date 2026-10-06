"""Build player marketability scores from a CSV input file."""

from pathlib import Path

from src.marketability import load_inputs, score_players

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data" / "raw" / "player_inputs.csv"
TEMPLATE = ROOT / "data" / "raw" / "player_inputs_template.csv"
OUTPUT = ROOT / "data" / "processed" / "player_scores.csv"


def main() -> None:
    source = INPUT if INPUT.exists() else TEMPLATE
    df = load_inputs(source)
    scores = score_players(df)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    scores.to_csv(OUTPUT, index=False)
    print(f"Built {len(scores)} player scores from {source}")
    print(f"Saved {OUTPUT}")


if __name__ == "__main__":
    main()

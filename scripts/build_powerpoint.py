"""Build the final Mav Metrics PowerPoint.

The polished deck should keep slides simple and put detailed methodology in speaker notes.
This file is intentionally a lightweight placeholder because the final designed deck is easiest
for the team to polish manually after the data is final.

Recommended deck structure:
1. Title / thesis
2. Why a ranking is not enough
3. Decision users: team, agent, sponsor
4. Six public-data pillars
5. Model formula and marketability gap
6. Opportunity map
7. External validation
8. Sensitivity testing
9. Dashboard workflow
10. Mavericks quarterly watchlist
11. Player examples
12. Recommendations
13. Limitations
14. Close / Q&A

Speaker notes should explain the details so the visible deck stays clean.
"""

from pathlib import Path

OUT = Path("presentation/generated")
OUT.mkdir(parents=True, exist_ok=True)
print("Use the polished PPTX deck with built-in speaker notes as the final presentation draft.")

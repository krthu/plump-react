import type { Round } from "../types/game";

export function createRounds(max = 10, players = 3, oneCard = false): Round[] {
  const r: Round[] = [];

  for (let i = max; i >= 1; i--) r.push({ cards: i, dir: "⬇" });

  if (oneCard) {
    for (let i = 0; i < players - 1; i++) r.push({ cards: 1, dir: "⬇" });
  }

  for (let i = 2; i <= max; i++) r.push({ cards: i, dir: "⬆" });

  return r;
}

export function checkBids(bids: number[], maxCards: number): boolean {
  const total = bids.reduce((a, b) => a + b, 0);

  return total !== maxCards;
}

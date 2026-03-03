import { useEffect, useState } from "react";
import type { Game } from "../types/game";

function normalizeLoadedGame(raw: unknown): Game | null {
  if (!raw || typeof raw !== "object") return null;

  const g = raw as Partial<Game> & Record<string, unknown>;

  if (!Array.isArray(g.players)) return null;
  const players = g.players as string[];

  const history = Array.isArray(g.history) ? (g.history as Game["history"]) : [];
  const phase = g.phase === "results" ? "results" : "bidding";

  const order =
    Array.isArray(g.order) &&
    (g.order as unknown[]).length === players.length &&
    (g.order as unknown[]).every((n) => Number.isInteger(n))
      ? (g.order as number[])
      : players.map((_, i) => i);

  const orderLocked =
    typeof g.orderLocked === "boolean"
      ? g.orderLocked
      : history.length > 0 || phase === "results";

  return {
    ...(g as Game),
    players,
    history,
    phase,
    order,
    orderLocked,
  };
}

export function useGame() {
  const [game, setGame] = useState<Game | null>(() => {
    const saved = localStorage.getItem("plumpGame");
    return saved ? normalizeLoadedGame(JSON.parse(saved)) : null;
  });

  useEffect(() => {
    if (game) {
      localStorage.setItem("plumpGame", JSON.stringify(game));
    }
  }, [game]);

  return { game, setGame };
}

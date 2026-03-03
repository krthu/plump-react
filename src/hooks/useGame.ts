import { useEffect, useState } from "react";
import type { Game } from "../types/game";

export function useGame() {
  const [game, setGame] = useState<Game | null>(() => {
    const saved = localStorage.getItem("plumpGame");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (game) {
      localStorage.setItem("plumpGame", JSON.stringify(game));
    }
  }, [game]);

  return { game, setGame };
}

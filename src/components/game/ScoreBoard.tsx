import { useEffect, useMemo, useRef } from "react";
import type { Game } from "../../types/game";

interface Props {
  game: Game;
  lastRoundPoints: number[] | null;
  isScoringAnimationActive: boolean;
}

export default function ScoreBoard({
  game,
  lastRoundPoints,
  isScoringAnimationActive,
}: Props) {
  const prevRanksRef = useRef<Map<number, number>>(new Map());

  const sortedPlayers = useMemo(
    () =>
      game.players
        .map((player, index) => ({
          name: player,
          score: game.scores[index],
          index,
        }))
        .sort((a, b) => b.score - a.score), // högst först
    [game.players, game.scores],
  );

  useEffect(() => {
    const next = new Map<number, number>();
    sortedPlayers.forEach((p, rank) => {
      next.set(p.index, rank);
    });
    prevRanksRef.current = next;
  }, [sortedPlayers]);

  return (
    <div className="scoreBoard">
      {sortedPlayers.map((p) => {
        const gained =
          lastRoundPoints && lastRoundPoints[p.index]
            ? lastRoundPoints[p.index]!
            : 0;
        const showGain = isScoringAnimationActive && gained > 0;

        const prevRank = prevRanksRef.current.get(p.index);
        const rankChange =
          prevRank !== undefined ? prevRank - sortedPlayers.indexOf(p) : 0;
        const rankUp = rankChange > 0;
        const rankDown = rankChange < 0;

        return (
          <div
            key={p.index}
            className={`scoreRow ${showGain ? "scoreRowGain" : ""} ${
              rankUp ? "scoreRowRankUp" : ""
            } ${rankDown ? "scoreRowRankDown" : ""}`}
          >
            <span className="scoreName">{p.name}</span>
            <span className="scoreValue">{p.score}</span>
            <span
              className={`scoreDelta ${showGain ? "scoreDeltaVisible" : ""}`}
            >
              {showGain ? `+${gained}` : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

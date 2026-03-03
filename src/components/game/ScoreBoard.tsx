import type { Game } from "../../types/game";

interface Props {
  game: Game;
}

export default function ScoreBoard({ game }: Props) {
  const sortedPlayers = game.players
    .map((player, index) => ({
      name: player,
      score: game.scores[index],
    }))
    .sort((a, b) => b.score - a.score); // högst först

  return (
    <div className="scoreBoard">
      {sortedPlayers.map((p, i) => (
        <div key={i}>
          {p.name}: {p.score}
        </div>
      ))}
    </div>
  );
}

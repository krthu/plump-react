import type { Game } from "../../types/game";

interface Props {
  game: Game;
}

export default function RoundCard({ game }: Props) {
  const round = game.rounds[game.roundIndex];

  if (!round)
    return (
      <div className="roundCard">
        <div id="roundBig">🎉 KLART</div>
      </div>
    );

  return (
    <div className="roundCard">
      <div id="roundBig">
        {round.cards} KORT {round.dir}
      </div>

      <div>Given: {game.players[game.dealerIndex]}</div>
    </div>
  );
}

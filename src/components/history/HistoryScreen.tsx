import type { Game } from "../../types/game";

interface Props {
  game: Game;
  close: () => void;
}

export default function HistoryScreen({ game, close }: Props) {
  return (
    <div id="historyView">
      <button onClick={close}>← Tillbaka</button>

      <div id="historyTable">
        {game.history.map((round, i) => (
          <div key={i}>
            {round.data.map((player, j) => (
              <div key={j}>
                {player.bid}/{player.got} {player.points}p
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

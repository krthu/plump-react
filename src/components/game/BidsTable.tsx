import type { Game } from "../../types/game";
import PlayerRow from "./PlayerRow";

interface Props {
  game: Game;
  bids: number[];
  results: number[];
  setBids: (bids: number[]) => void;
  setResults: (res: number[]) => void;

  order: number[];
  setOrder: (o: number[]) => void;
  lastRoundPoints: number[] | null;
  isScoringAnimationActive: boolean;
}

export default function BidsTable({
  game,
  bids,
  results,
  setBids,
  setResults,
  order,
  setOrder,
  lastRoundPoints,
  isScoringAnimationActive,
}: Props) {
  const canReorder = !game.orderLocked;

  function movePlayer(from: number, to: number) {
    if (!canReorder) return;
    if (to < 0 || to >= order.length) return;

    const newOrder = [...order];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);

    setOrder(newOrder);
  }

  return (
    <div className="bidsContainer">
      {order.map((playerIndex, visualIndex) => {
        const player = game.players[playerIndex];
        const isDealer = visualIndex === order.length - 1;
        const gainedPoints =
          lastRoundPoints && lastRoundPoints[playerIndex]
            ? lastRoundPoints[playerIndex]
            : 0;

        return (
          <PlayerRow
            key={playerIndex}
            name={player}
            phase={game.phase}
            bid={bids[playerIndex]}
            result={results[playerIndex]}
            isDealer={isDealer}
            showMoveButtons={canReorder}
            gainedPoints={gainedPoints}
            highlightPoints={isScoringAnimationActive}
            setBid={(v) => {
              const b = [...bids];
              b[playerIndex] = v;
              setBids(b);
            }}
            setResult={(v) => {
              const r = [...results];
              r[playerIndex] = v;
              setResults(r);
            }}
            moveUp={() => movePlayer(visualIndex, visualIndex - 1)}
            moveDown={() => movePlayer(visualIndex, visualIndex + 1)}
          />
        );
      })}
    </div>
  );
}

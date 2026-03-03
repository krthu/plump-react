interface Props {
  name: string;
  phase: "bidding" | "results";

  bid: number;
  result: number;

  setBid: (v: number) => void;
  setResult: (v: number) => void;

  moveUp?: () => void;
  moveDown?: () => void;

  showMoveButtons?: boolean;
  isDealer?: boolean;
}

export default function PlayerRow({
  name,
  phase,
  bid,
  result,
  setBid,
  setResult,
  moveUp,
  moveDown,
  showMoveButtons,
  isDealer,
}: Props) {
  return (
    <div className={`playerRow ${isDealer ? "dealer" : ""}`}>
      <div className="playerName">
        {name}
        {isDealer && <span className="dealerBadge">🎴 Given</span>}
      </div>

      <input
        type="number"
        value={bid}
        min={0}
        onChange={(e) => setBid(Number(e.target.value))}
        disabled={phase === "results" ? true : false}
      />

      <input
        type="number"
        value={result}
        min={0}
        onChange={(e) => setResult(Number(e.target.value))}
        disabled={phase === "bidding" ? true : false}
      />

      {showMoveButtons && (
        <div className="moveButtons">
          <button onClick={moveUp}>↑</button>
          <button onClick={moveDown}>↓</button>
        </div>
      )}
    </div>
  );
}

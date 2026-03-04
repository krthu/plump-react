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
  gainedPoints?: number;
  highlightPoints?: boolean;
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
  gainedPoints = 0,
  highlightPoints = false,
}: Props) {
  return (
    <div
      className={`playerRow ${isDealer ? "dealer" : ""} ${
        highlightPoints && gainedPoints > 0 ? "gotPoints" : ""
      }`}
    >
      <div className="playerName">
        {name}
        {isDealer && <span className="dealerBadge">🎴 Given</span>}
      </div>

      <div className="bidCell">
        <input
          type="number"
          value={bid}
          min={0}
          onChange={(e) => setBid(Number(e.target.value))}
          disabled={phase === "results" ? true : false}
        />
      </div>

      <div className="resultCell">
        <input
          type="number"
          value={result}
          min={0}
          onChange={(e) => setResult(Number(e.target.value))}
          disabled={phase === "bidding" ? true : false}
        />

        {highlightPoints && gainedPoints > 0 && (
          <div className="pointsPopup">+{gainedPoints}</div>
        )}
      </div>

      {showMoveButtons && (
        <div className="moveButtons">
          <button onClick={moveUp}>↑</button>
          <button onClick={moveDown}>↓</button>
        </div>
      )}
    </div>
  );
}

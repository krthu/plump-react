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
  bidRef?: (el: HTMLInputElement | null) => void;
  resultRef?: (el: HTMLInputElement | null) => void;
  onBidEnter?: () => void;
  onResultEnter?: () => void;
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
  bidRef,
  resultRef,
  onBidEnter,
  onResultEnter,
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
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onBidEnter?.();
            }
          }}
          ref={bidRef}
        />
      </div>

      <div className="resultCell">
        <input
          type="number"
          value={result}
          min={0}
          onChange={(e) => setResult(Number(e.target.value))}
          disabled={phase === "bidding" ? true : false}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onResultEnter?.();
            }
          }}
          ref={resultRef}
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

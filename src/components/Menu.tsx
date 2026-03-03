import "../styles/components/Menu.css";

interface Props {
  close: () => void;
  showHistory: () => void;
  resetGame: () => void;
}

export default function Menu({ close, showHistory, resetGame }: Props) {
  return (
    <div className="menuOverlay" onClick={close}>
      <div id="menuPanel" onClick={(e) => e.stopPropagation()}>
        <div className="menuItem" onClick={showHistory}>
          📊 Resultat
        </div>

        <div className="menuItem" onClick={resetGame}>
          🔄 Starta om spel
        </div>
      </div>
    </div>
  );
}

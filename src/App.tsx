import { useState } from "react";
import { useGame } from "./hooks/useGame";

import SetupScreen from "./components/setup/SetupScreen";
import GameScreen from "./components/game/GameScreen";
import HistoryScreen from "./components/history/HistoryScreen";
import Menu from "./components/Menu";
import Notification from "./components/Notification";

import "./styles/global.css";
import "./styles/layout.css";
// import "./styles/components.css";

export default function App() {
  const { game, setGame } = useGame();

  const [view, setView] = useState<"setup" | "game" | "history">(
    game ? "game" : "setup",
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  function resetGame() {
    localStorage.removeItem("plumpGame");
    location.reload();
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="appHeader">
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </div>

      {/* Main screen */}
      <main className="screen">
        {view === "setup" && (
          <SetupScreen setGame={setGame} setView={setView} />
        )}

        {view === "game" && game && (
          <GameScreen game={game} setGame={setGame} notify={setNotification} />
        )}

        {view === "history" && game && (
          <HistoryScreen game={game} close={() => setView("game")} />
        )}
      </main>

      {/* Overlay layer */}
      {menuOpen && (
        <Menu
          close={() => setMenuOpen(false)}
          showHistory={() => setView("history")}
          resetGame={resetGame}
        />
      )}

      {notification && (
        <Notification
          msg={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

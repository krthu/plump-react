import { useState } from "react";
import type { Game } from "../../types/game";
import { createRounds } from "../../utils/gameLogic";
import "../../styles/components/SetupScreen.css";
import Button from "../Button/Button";

interface Props {
  setGame: (g: Game) => void;
  setView: (v: "game") => void;
}

export default function SetupScreen({ setGame, setView }: Props) {
  const [numPlayers, setNumPlayers] = useState(3);

  const [names, setNames] = useState<string[]>([]);

  const [oneCard, setOneCard] = useState(false);

  function startGame() {
    const players = Array.from(
      { length: numPlayers },
      (_, i) => names[i] || `Spelare ${i + 1}`,
    );

    const game: Game = {
      players,
      scores: players.map(() => 0),
      rounds: createRounds(10, players.length, oneCard),
      history: [],
      roundIndex: 0,
      dealerIndex: 0,
      phase: "bidding",
    };

    setGame(game);
    setView("game");
  }

  return (
    <div className="card">
      <h2>Antal spelare</h2>

      <input
        type="number"
        value={numPlayers}
        min={2}
        max={8}
        onChange={(e) => setNumPlayers(Number(e.target.value))}
      />

      <label className="checkboxWrapper" htmlFor="oneCardCheckbox">
        <input
          type="checkbox"
          checked={oneCard}
          onChange={(e) => setOneCard(e.target.checked)}
        />
        Extra 1 korts omgång
      </label>

      <div className="playerList">
        {Array.from({
          length: numPlayers,
        }).map((_, i) => (
          <input
            key={i}
            placeholder={`Spelare ${i + 1}`}
            onChange={(e) => {
              const n = [...names];
              n[i] = e.target.value;
              setNames(n);
            }}
          />
        ))}
      </div>

      <Button
        label={"Starta spel"}
        onClick={startGame}
        fullWidth={false}
      ></Button>
    </div>
  );
}

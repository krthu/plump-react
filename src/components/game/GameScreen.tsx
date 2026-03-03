import { useState } from "react";
import type { Game } from "../../types/game";
import RoundCard from "./RoundCard";
import BidsTable from "./BidsTable";
import ScoreBoard from "./ScoreBoard";
import { checkBids } from "../../utils/gameLogic";
import Button from "../Button/Button";
import "../../styles/components/GameScreen.css";

interface Props {
  game: Game;
  setGame: (g: Game) => void;
  notify: (msg: string) => void;
}

export default function GameScreen({ game, setGame, notify }: Props) {
  const [bids, setBids] = useState<number[]>(game.players.map(() => 0));

  const [results, setResults] = useState<number[]>(game.players.map(() => 0));

  // ✅ sittordning
  const [order, setOrder] = useState<number[]>(game.players.map((_, i) => i));

  const round = game.rounds[game.roundIndex];

  function continueRound() {
    if (!round) return;

    // ===== BUD =====
    if (game.phase === "bidding") {
      if (!checkBids(bids, round.cards)) {
        notify("Summan av bud får ej bli lika med antal kort");
        return;
      }

      setGame({
        ...game,
        phase: "results",
      });

      return;
    }

    // ===== RÄTTNING =====
    const scores = [...game.scores];

    const roundData = game.players.map((name, i) => {
      let pts = 0;

      if (results[i] === bids[i]) {
        pts = 10 * results[i];
        scores[i] += pts;
      }

      return {
        name,
        bid: bids[i],
        got: results[i],
        points: pts,
      };
    });

    // ✅ flytta första spelaren längst ned
    const newOrder = [...order];
    const first = newOrder.shift();
    newOrder.push(first!);

    setOrder(newOrder);

    setGame({
      ...game,
      scores,
      history: [...game.history, { round, data: roundData }],
      roundIndex: game.roundIndex + 1,
      phase: "bidding",
    });

    // reset inputs
    setBids(game.players.map(() => 0));
    setResults(game.players.map(() => 0));
  }

  return (
    <>
      <RoundCard game={game} />

      <BidsTable
        game={game}
        bids={bids}
        results={results}
        setBids={setBids}
        setResults={setResults}
        order={order}
        setOrder={setOrder}
      />

      <Button
        label={game.phase === "bidding" ? "Spara bud" : "Rätta"}
        onClick={continueRound}
        fullWidth
      />

      <h3>Poäng</h3>
      <ScoreBoard game={game} />
    </>
  );
}

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

  const [lastRoundPoints, setLastRoundPoints] = useState<number[] | null>(null);
  const [isScoringAnimationActive, setIsScoringAnimationActive] =
    useState(false);

  const order = game.order;

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
        orderLocked: game.orderLocked || game.roundIndex === 0,
      });

      return;
    }

    // ===== RÄTTNING =====
    const scores = [...game.scores];

    const gainedPoints: number[] = game.players.map(() => 0);

    const roundData = game.players.map((name, i) => {
      let pts = 0;

      if (results[i] === bids[i]) {
        if (bids[i] === 10) {
          pts = 100 + results[i];
        } else {
          pts = 10 + results[i];
        }
        scores[i] += pts;
      }

      gainedPoints[i] = pts;

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

    setGame({
      ...game,
      scores,
      history: [...game.history, { round, data: roundData }],
      roundIndex: game.roundIndex + 1,
      phase: "bidding",
      order: newOrder,
    });

    setLastRoundPoints(gainedPoints);
    setIsScoringAnimationActive(true);
    setTimeout(() => {
      setIsScoringAnimationActive(false);
    }, 2000);

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
        setOrder={(o) => setGame({ ...game, order: o })}
        lastRoundPoints={lastRoundPoints}
        isScoringAnimationActive={isScoringAnimationActive}
      />

      <Button
        label={game.phase === "bidding" ? "Spara bud" : "Rätta"}
        onClick={continueRound}
        fullWidth
      />

      <h3>Poäng</h3>
      <ScoreBoard
        game={game}
        lastRoundPoints={lastRoundPoints}
        isScoringAnimationActive={isScoringAnimationActive}
      />
    </>
  );
}

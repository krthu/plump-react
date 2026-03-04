import type { Game } from "../../types/game";
import Button from "../Button/Button";

interface Props {
  game: Game;
  close: () => void;
}

export default function HistoryScreen({ game, close }: Props) {
  const { history, players } = game;

  if (history.length === 0) {
    return (
      <div id="historyView">
        <Button label="← Tillbaka" onClick={close} fullWidth={false} />
        <div className="historyEmpty">Inga rundor spelade ännu.</div>
      </div>
    );
  }

  return (
    <div id="historyView">
      <Button label="← Tillbaka" onClick={close} fullWidth={false} />

      <div className="historyCard">
        <h2>Resultat</h2>

        <div className="historyTableWrapper">
          <table className="historyTable">
            <thead>
              <tr>
                <th className="historyRoundHeader">Kort</th>
                {players.map((name, i) => (
                  <th key={i} className="historyPlayerHeader">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((hr, roundIndex) => (
                <tr key={roundIndex}>
                  <td className="historyRoundCell">
                    <span className="historyRoundCards">{hr.round.cards}</span>
                    <span className="historyRoundDir">{hr.round.dir}</span>
                  </td>

                  {players.map((_, playerIndex) => {
                    const pdata = hr.data[playerIndex];
                    const hasPoints = pdata.points > 0;

                    return (
                      <td
                        key={playerIndex}
                        className={`historyCell ${
                          hasPoints ? "historyCellWin" : "historyCellLose"
                        }`}
                      >
                        <div className="historyBidGot">
                          {pdata.bid}/{pdata.got}
                        </div>
                        <div className="historyPoints">
                          {hasPoints ? `+${pdata.points}` : "0p"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="historyTotalRow">
                <th className="historyRoundHeader">Totalt</th>
                {players.map((_, i) => (
                  <td key={i} className="historyCell historyTotalCell">
                    {game.scores[i]}p
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

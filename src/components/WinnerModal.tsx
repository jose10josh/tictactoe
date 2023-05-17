import { GameState } from "../constants/gameElements";

type Props = {
  gameState: GameState;
  handleReset: () => void;
  turn: string;
};
const WinnerModal = ({ gameState, handleReset, turn }: Props) => {
  if (gameState === GameState.IN_PROGRESS) return null;
  return (
    <section className="winner">
      <div className="text">
        <h2>{gameState === GameState.WON ? <p>{turn} wins!</p> : "Draw"}</h2>
        <button onClick={handleReset}>Reset</button>
      </div>
    </section>
  );
};

export { WinnerModal };

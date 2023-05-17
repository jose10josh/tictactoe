import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { GameState, Turn } from "./constants/gameElements";
import { checkEndGame, checkWinner } from "./utils/gameStatus";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./utils/storage/index.js";
import "./App.css";

function App() {
  const [board, setBoard] = useState<string[]>(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState<string>(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? Turn.x;
  });
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);

  const updateBoard = (index: number) => {
    if (
      board[index] ||
      gameState === GameState.DRAW ||
      gameState === GameState.WON
    )
      return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameState(GameState.WON);
      confetti();
      resetGameStorage();
      return;
    } else if (checkEndGame(newBoard)) {
      setGameState(GameState.DRAW);
      resetGameStorage();
      return;
    }

    const newTurn = turn === Turn.x ? Turn.o : Turn.x;
    setTurn(newTurn);

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turn.x);
    setGameState(GameState.IN_PROGRESS);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((item: string, index: number) => (
          <Square index={index} key={index} updateBoard={updateBoard}>
            <span className="cell__content">{item}</span>
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === Turn.x}>{Turn.x}</Square>
        <Square isSelected={turn === Turn.o}>{Turn.o}</Square>
      </section>
      <WinnerModal
        gameState={gameState}
        handleReset={handleReset}
        turn={turn}
      />
    </main>
  );
}

export default App;

import { WinningCombinations } from "../constants/gameElements";

export const checkWinner = (boardToCheck: string[]) => {
  for (const option of WinningCombinations) {
    const [a, b, c] = option;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck: string[]) => {
  return boardToCheck.every((square) => square !== null);
};
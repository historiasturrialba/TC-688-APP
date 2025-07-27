import { useState } from "react";

export type Direction = "horizontal" | "vertical" | "diagonal";

export interface Cell {
  letter: string;
  selected: boolean;
  partOfWord: boolean;
  blocked: boolean;
}

export default function useWordSearchGenerator() {
  const size = 12;
  const maxWords = 11;

  const [board, setBoard] = useState<Cell[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Record<string, [number, number][]>>({});
  const [currentWords, setCurrentWords] = useState<string[]>([]);

  const canPlace = (
    word: string,
    row: number,
    col: number,
    direction: Direction,
    board: Cell[][],
    size: number
  ) => {
    if (direction === "horizontal") {
      if (col + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        const cell = board[row][col + i];
        if (cell.letter && cell.letter !== word[i]) return false;
      }
    } else if (direction === "vertical") {
      if (row + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        const cell = board[row + i][col];
        if (cell.letter && cell.letter !== word[i]) return false;
      }
    } else if (direction === "diagonal") {
      if (row + word.length > size || col + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        const cell = board[row + i][col + i];
        if (cell.letter && cell.letter !== word[i]) return false;
      }
    }
    return true;
  };

  const generateBoard = (inputWords: string[]) => {
    const selectedWords = [...inputWords]
      .filter((w) => w.length <= size)
      .slice(0, maxWords);

    let attempts = 0;
    let placedAll = false;

    while (!placedAll && attempts < 10) {
      attempts++;

      const emptyBoard: Cell[][] = Array(size)
        .fill(null)
        .map(() =>
          Array(size)
            .fill(null)
            .map(() => ({
              letter: "",
              selected: false,
              partOfWord: false,
              blocked: false,
            }))
        );

      const positionsMap: Record<string, [number, number][]> = {};
      placedAll = true;

      const placeWord = (word: string) => {
        const direction: Direction = ["horizontal", "vertical", "diagonal"][
          Math.floor(Math.random() * 3)
        ] as Direction;

        let placed = false;
        let innerAttempts = 0;

        while (!placed && innerAttempts < 100) {
          innerAttempts++;
          const row = Math.floor(Math.random() * size);
          const col = Math.floor(Math.random() * size);
          const positions: [number, number][] = [];

          if (canPlace(word, row, col, direction, emptyBoard, size)) {
            for (let i = 0; i < word.length; i++) {
              let r = row;
              let c = col;

              if (direction === "horizontal") c += i;
              if (direction === "vertical") r += i;
              if (direction === "diagonal") {
                r += i;
                c += i;
              }

              emptyBoard[r][c].letter = word[i];
              emptyBoard[r][c].partOfWord = true;
              positions.push([r, c]);
            }

            positionsMap[word] = positions;
            placed = true;
          }
        }

        if (!placed) placedAll = false;
      };

      selectedWords.forEach((word) => placeWord(word));

      if (placedAll) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            if (!emptyBoard[r][c].letter) {
              emptyBoard[r][c].letter =
                letters[Math.floor(Math.random() * letters.length)];
            }
          }
        }

        setBoard(emptyBoard);
        setWordPositions(positionsMap);
        setFoundWords([]);
        setCurrentWords(selectedWords);
      }
    }

    if (!placedAll) {
      console.error("No se pudieron colocar todas las palabras después de varios intentos.");
    }
  };

  const toggleCell = (r: number, c: number) => {
    const cell = board[r][c];
    if (cell.blocked) return;

    const updated = board.map((row, rowIndex) =>
      row.map((cellItem, colIndex) =>
        rowIndex === r && colIndex === c
          ? { ...cellItem, selected: !cellItem.selected }
          : cellItem
      )
    );

    setBoard(updated);
    checkForCompletedWords(updated);
  };

  const checkForCompletedWords = (updatedBoard: Cell[][]) => {
    currentWords.forEach((word) => {
      const positions = wordPositions[word];
      if (!positions) return;

      const isFound = positions.every(
        ([r, c]) => updatedBoard[r][c].selected
      );

      if (isFound && !foundWords.includes(word)) {
        setFoundWords((prev) => [...prev, word]);

        const blockedBoard = updatedBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            positions.some(([r, c]) => r === rowIndex && c === colIndex)
              ? { ...cell, selected: true, blocked: true }
              : cell
          )
        );
        setBoard(blockedBoard);
      }
    });
  };

  return { board, toggleCell, foundWords, generateBoard, currentWords };
}


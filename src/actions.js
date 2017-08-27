import Chance from 'chance';
import { getAdjacentCells } from './utils';

export const ActionTypes = {
  CREATE_GAME: 'CREATE_GAME',
  OPEN_CELL: 'OPEN_CELL',
  FLAG_CELL: 'FLAG_CELL',
};

export const createGame = (numRows, numCols, numBombs) => {
  const chance = new Chance();
  const boardValues = [];

  for (let i = 0; i < numRows; i = i + 1) {
    boardValues[i] = [];
    for (let j = 0; j < numCols; j = j + 1) {
      boardValues[i][j] = 0;
    }
  }

  const bombPositions = chance.unique(
    chance.integer,
    numBombs,
    { min: 0, max: (numRows * numCols) - 1 }
  );

  bombPositions.forEach((position) => {
    const row = parseInt(position / numCols, 10);
    const col = position % numCols;
    boardValues[row][col] = -1;
  });

  bombPositions.forEach((position) => {
    const row = parseInt(position / numCols, 10);
    const col = position % numCols;
    getAdjacentCells(row, col, numRows, numCols).forEach((cell) => {
      if (boardValues[cell.row][cell.col] !== -1) {
        boardValues[cell.row][cell.col] += 1;
      }
    });
  });

  const board = boardValues.map((row, i) => {
    return row.map((cellValue, j) => {
      return {
        value: cellValue,
        isOpen: false,
        isFlagged: false,
        row: i,
        col: j,
      };
    });
  });
  
  return {
    type: ActionTypes.CREATE_GAME,
    numRows,
    numCols,
    numBombs,
    board,
  };
};

export const openCell = (cell) => {
  return {
    type: ActionTypes.OPEN_CELL,
    isBomb: cell.value === -1,
    cell,
  };
};

export const flagCell = (cell) => {
  return {
    type: ActionTypes.FLAG_CELL,
    isBomb: cell.value === -1,
    cell,
  };
};

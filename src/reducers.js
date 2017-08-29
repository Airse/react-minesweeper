import { combineReducers } from 'redux';

import { ActionTypes } from './actions';
import { getAdjacentCells } from './utils';

const floodBoard = (board, numRows, numCols, cell) => {
  if (board[cell.row][cell.col].isOpen) {
    return;
  }
  board[cell.row][cell.col].isOpen = true;
  if (board[cell.row][cell.col].value === 0) {
    getAdjacentCells(cell.row, cell.col, numRows, numCols).forEach((adjCell) => {
      floodBoard(board, numRows, numCols, adjCell);
    });
  }
};

const checkGameComplete = (board, numRows, numCols, numBombs) => {
  let cellsLeft = numRows * numCols;
  let bombsLeft = numBombs;

  for (let i = 0; i < numRows; i = i + 1) {
    for (let j = 0; j < numRows; j = j + 1) {
      const cell = board[i][j];
      if (cell.isOpen)
        cellsLeft -= 1;
      if (cell.isFlagged) {
        cellsLeft -= 1;
        if (cell.value !== -1) {
          // cell wrongly flagged
          return false;
        }
        bombsLeft -= 1;
      }
    }
  }

  return cellsLeft === bombsLeft;
};

const defaultGameState = {
  status: 'NOT_STARTED', startTime: null, numRows: 0, numCols: 0, numBombs: 0, board: [],
};
const game = (state = defaultGameState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_GAME:
      return Object.assign({}, state, {
        status: 'NOT_STARTED',
        startTime: null,
        numRows: action.numRows,
        numCols: action.numCols,
        numBombs: action.numBombs,
        board: action.board,
      });

    case ActionTypes.OPEN_CELL: {
      const newStatus = {};
      if (action.isBomb) {
        Object.assign(newStatus, {
          status: 'GAME_OVER',
        });
      } else if (state.startTime === null) {
        Object.assign(newStatus, {
          status: 'STARTED',
          startTime: action.time,
        });
      }

      const newBoard = [...state.board];
      floodBoard(newBoard, state.numRows, state.numCols, action.cell);
      const gameComplete = checkGameComplete(newBoard, state.numRows,
        state.numCols, state.numBombs);

      if (gameComplete) {
        Object.assign(newStatus, {
          status: 'GAME_WON',
        });
      }

      return Object.assign({}, state, newStatus, {
        board: newBoard,
      });
    }
    case ActionTypes.FLAG_CELL: {
      const newBoard = [...state.board];
      const cell = newBoard[action.cell.row][action.cell.col];
      cell.isFlagged = !cell.isFlagged;

      const newStatus = {};
      if (state.startTime === null) {
        Object.assign(newStatus, {
          status: 'STARTED',
          startTime: action.time,
        });
      }

      return Object.assign({}, state, newStatus, {
        board: newBoard,
      });
    }
    default:
      return state;
  }
};

const bombsLeft = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_GAME:
      return action.numBombs;
    case ActionTypes.FLAG_CELL: {
      const bombsChange = (action.cell.isFlagged) ? 1 : -1;
      return state + bombsChange;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  game,
  bombsLeft,
});

export default rootReducer;

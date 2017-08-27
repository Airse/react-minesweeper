import { connect } from 'react-redux';

import { createGame, openCell, flagCell } from '../actions';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    board: state.game.board,
    bombsLeft: state.bombsLeft,
    status: state.game.status,
    startTime: state.game.startTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: (numRows, numCols, numBombs) => {
      dispatch(createGame(numRows, numCols, numBombs));
    },
    openCell: (cell) => {
      dispatch(openCell(cell));
    },
    flagCell: (cell) => {
      dispatch(flagCell(cell));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



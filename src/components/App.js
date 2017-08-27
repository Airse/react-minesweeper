import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameBoard from './GameBoard';
import GameHeader from './GameHeader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: 'easy',
    };

    this.onCreateGame = this.onCreateGame.bind(this);
    this.onDifficultyOptionChange = this.onDifficultyOptionChange.bind(this);
  }

  componentDidMount() {
    this.onCreateGame(this.state.difficulty);
  }

  onCreateGame() {
    switch (this.state.difficulty) {
      case 'easy':
        this.props.createGame(9, 9, 10);
        break;
      case 'medium':
        this.props.createGame(16, 16, 40);
        break;
      case 'hard':
        this.props.createGame(16, 30, 99);
        break;
      default:
        this.props.createGame(9, 9, 10);
        break;
    }
  }

  onDifficultyOptionChange(e) {
    this.setState({ difficulty: e.target.value }, () => {
      this.onCreateGame();
    });
  }

  render() {
    return (
      <div className="App">
        <div className="game-wrapper">
          <div className="game-options">
            <select value={this.state.difficulty} onChange={this.onDifficultyOptionChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <GameHeader
            bombsLeft={this.props.bombsLeft}
            startTime={this.props.startTime}
            gameStatus={this.props.status}
            onCreateGame={this.onCreateGame} />
          <GameBoard
            gameStatus={this.props.status}
            board={this.props.board}
            onOpenCell={this.props.openCell}
            onFlagCell={this.props.flagCell} />
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  startTime: null,
};

App.propTypes = {
  board: PropTypes.array.isRequired,
  bombsLeft: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  startTime: PropTypes.object,

  createGame: PropTypes.func.isRequired,
  openCell: PropTypes.func.isRequired,
  flagCell: PropTypes.func.isRequired,
};

export default App;

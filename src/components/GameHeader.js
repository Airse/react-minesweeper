import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Emojify from 'react-emojione';
import moment from 'moment';

class GameHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeElasped: 0,
    };

    this.onSmileyClick = this.onSmileyClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime === null) {
      this.setState({ timeElasped : 0 });
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.props.startTime && this.props.gameStatus !== 'GAME_OVER'
        && this.props.gameStatus !== 'GAME_WON') {
        const timeElasped = (moment() - this.props.startTime);
        this.setState({ timeElasped });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onSmileyClick(e) {
    e.preventDefault();

    this.props.onCreateGame();
  }

  render() {
    return (
      <div className="game-header">
        <div className="game-flags-left">
          <Emojify style={{ top: 0 }}>
            🚩
          </Emojify>
          {this.props.bombsLeft}
        </div>
        <div className="game-smiley">
          <button onClick={this.onSmileyClick}>
            {this.props.gameStatus === 'GAME_OVER' ? <Emojify style={{ top: 0 }}>😵</Emojify> : ''}
            {this.props.gameStatus === 'GAME_WON' ? <Emojify style={{ top: 0 }}>😎</Emojify> : ''}
            {this.props.gameStatus === 'NOT_STARTED' ? <Emojify style={{ top: 0 }}>😐</Emojify> : ''}
            {this.props.gameStatus === 'STARTED' ? <Emojify style={{ top: 0 }}>🙂</Emojify> : ''}
          </button>
        </div>
        <div className="game-time">
          {Math.min(parseInt(this.state.timeElasped / 1000 , 10) , 999)}
          <Emojify style={{ top: 0 }}>
            ⌛
          </Emojify>
        </div>
      </div>
    );
  }
}

GameHeader.propTypes = {
  bombsLeft: PropTypes.number.isRequired,
  onCreateGame: PropTypes.func.isRequired,
  startTime: PropTypes.object,
  gameStatus: PropTypes.string.isRequired,
};

export default GameHeader;

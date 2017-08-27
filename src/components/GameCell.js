import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FaFlag, FaBomb } from 'react-icons/lib/fa';

class GameCell extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
    this.onCellFlag = this.onCellFlag.bind(this);
  }

  onCellFlag(e) {
    e.preventDefault();

    this.props.onFlagCell(this.props.cell);
  }

  onCellClick(e) {
    e.preventDefault();

    this.props.onOpenCell(this.props.cell);
  }

  render() {
    if (this.props.cell.isOpen) {
      let cellContent = this.props.cell.value;
      if (cellContent === 0) {
        cellContent = '';
      } else if (cellContent === -1) {
        cellContent = <FaBomb />;
      }
      return (
        <td className="game-cell game-cell-open">
          <div className={`game-number-${this.props.cell.value}`}>
            {cellContent}
          </div>
        </td>
      );
    }

    return (
      <td className="game-cell">
        <div>
          <button onClick={this.onCellClick} onContextMenu={this.onCellFlag}>
            {this.props.cell.isFlagged ? <FaFlag /> : ''}
          </button>
        </div>
      </td>
    );
  }
}

GameCell.propTypes = {
  cell: PropTypes.object.isRequired,
  onOpenCell: PropTypes.func.isRequired,
  onFlagCell: PropTypes.func.isRequired,
};

export default GameCell;

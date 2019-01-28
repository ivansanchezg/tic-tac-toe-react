import * as React from 'react';
import Square from './Square';

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const size = 9;
const squaresPerRow = 3;
export const X = 'X';
export const O = 'O';

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(size).fill(null),
      xIsNext: true,
      message: `${X}'s turn`,
      isGameOver: false,
    };
  }

  getWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  isBoardFull(squares) {
    return !squares.some((square) => !square);
  }

  handleClick(index) {
    const squares = this.state.squares.slice();
    if (squares[index] || this.state.isGameOver) {
      return;
    }

    squares[index] = this.state.xIsNext ? X : O;
    const winner = this.getWinner(squares);
    
    const newState = {
      squares,
    };

    if (winner) {
      this.props.setWinner(winner);
      newState.message = winner === X ? `${X} wins` : `${O} wins`;
      newState.isGameOver = true;
    } else if (this.isBoardFull(squares)) {
      this.props.setWinner(null);
      newState.message = "Draw";
    } else if (!winner) {
      newState.xIsNext = !this.state.xIsNext;
      newState.message = this.state.xIsNext ? `${O}'s turn` : `${X}'s turn`;
    }
    
    this.setState(newState);
  }

  newGame() {
    const squares = this.state.squares.slice();
    const winner = this.getWinner(squares);

    let xIsNext = true;
    if (winner && winner === X) {
      xIsNext = false;
    } else if (!winner) {
      xIsNext = !this.state.xIsNext;
    }

    const message = xIsNext ? `${X}'s turn` : `${O}'s turn`;

    this.setState({
      isGameOver: false,
      message,
      squares: Array(size).fill(null),
      xIsNext,
    });
  }

  renderSquare(index) {
    return (
      <Square
        key={index}
        value={this.state.squares[index]}
        onClick={() => this.handleClick(index)}
      />
    );
  }

  renderRow(startingIndex) {
    const rows = [];
    for (let index = startingIndex; index < startingIndex + squaresPerRow; index += 1) {
      rows.push(this.renderSquare(index));
    }

    return (
      <div key={startingIndex} className="board-row">
        {rows}
      </div>
    );
  }

  renderBoard() {
    const board = [];
    for (let row = 0; row < squaresPerRow; row += 1) {
      board.push(this.renderRow((row * squaresPerRow)));
    }
    return board;
  }

  render() {
    return (
      <div className="board">
        <div className="message">{this.state.message}</div>
        <div>
          <button className="new-game-button" onClick={() => this.newGame()}>New Game</button>
        </div>
        <div className="rows">
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

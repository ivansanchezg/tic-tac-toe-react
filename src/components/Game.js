import * as React from 'react';
import { Board, O, X } from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xWins: 0,
      oWins: 0,
      draws: 0,
    };
    this.setWinner = this.setWinner.bind(this);
  }

  setWinner(winner) {
    if (winner === X) {
      this.setState({
        xWins: this.state.xWins + 1,
      });
    } else if (winner === O) {
      this.setState({
        oWins: this.state.oWins + 1,
      });
    } else {
      this.setState({
        draws: this.state.draws + 1,
      });
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div className="scores">
            <div className="scores" >{X} Wins: {this.state.xWins} - </div>
            <div className="scores">Draws: {this.state.draws}</div>
            <div className="scores"> - {O} Wins: {this.state.oWins}</div>
          </div>
          <Board setWinner={this.setWinner} />
        </div>
      </div>
    );
  }
}

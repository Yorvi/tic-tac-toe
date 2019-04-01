import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Parent Component = Board
// -> Child Component = Square

// Lone Square Component
//  - This square component renders a single button, where the X or O will go.
function Square(props) {
  // // Components use "state" to remember things... React components can have state by setting this.state in their constructors. this.state should be considered as private to a React component that it’s defined in.
  // constructor(props) {
  //   super(props);
  //   // In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.

  //   this.state = {
  //     value: null
  //   };
  //   // this.state will store the current value of the square and change it when the Square is clicked.
  // }

  return (
    <button 
      className="square" 
      onClick={props.onClick}>
        {props.value}
    </button>
    // Passed in prop ( {this.props.value} ) from parent component ( value={i} )
    // Passing in props is how information flows in React Apps, fromparents to children.
  );
};

// Entire Board Component
//  - This board component renders 9 squares (3 in each row).
class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: [
  //       null, null, null, 
  //       null, null, null, 
  //       null, null, null
  //     ],
  //     xIsNext: true,
  //   };
  // };

  // handleClick(i) {
  //   let squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // };

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      /> /* value = prop, can pass this to the child component */
    )
  };

  render() {
    // let winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // };

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  };
};


// Game Mechanics Components
//  - This game component renders the board with values in the placeholder that we'll modify.
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: [
            null, null, null, 
            null, null, null, 
            null, null, null
          ],
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    let history = this.state.history;
    let current = history[this.state.stepNumber];
    let winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      let desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
      alert("Winner: " + winner);
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    };
  };
  return null;
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

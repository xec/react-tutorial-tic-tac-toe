import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
  return (
    <button
      className={'square ' + (props.isWinningSquare ? 'winningSquare' : '')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  render () {
    const boardRows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]
    return (
      <div>
        {boardRows.map((row, index) => (
          <div key={index} className='board-row'>
            {row.map(square => (
              <Square
                key={square}
                value={this.props.squares[square]}
                onClick={() => this.props.onClick(square)}
                isWinningSquare={(this.props.winningLine || []).includes(square)}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const initialGameState = {
  history: [{
    squares: Array(9).fill(null),
    xIsNext: true
  }],
  stepNumber: 0
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialGameState
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = current.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        changedSquare: i,
        xIsNext: !current.xIsNext
      }]),
      stepNumber: history.length
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step
    })
  }

  reverseHistory () {
    this.setState({
      reverseHistory: !this.state.reverseHistory
    })
  }

  resetGame () {
    this.setState(initialGameState)
  }

  render () {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winningLine = calculateWinner(current.squares)
    const winner = winningLine && current.squares[winningLine[0]]
    const status = winner
      ? 'Winner: ' + winner
      : this.state.stepNumber > 8
        ? 'The game is a draw :('
        : 'Next player: ' + (current.xIsNext ? 'X' : 'O')

    const moves = history.map((step, moveIndex) => {
      const col = (step.changedSquare % 3) + 1
      const row = Math.floor(step.changedSquare / 3) + 1
      const desc = moveIndex
        ? `Go to move #${moveIndex} at (${col}, ${row})`
        : 'Go to game start'
      return (
        <li key={moveIndex}>
          <button
            onClick={() => this.jumpTo(moveIndex)}
            className={this.state.stepNumber === moveIndex ? 'current-history-item' : ''}
          >
            {desc}
          </button>
        </li>
      )
    })
    if (this.state.reverseHistory) moves.reverse()

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            winningLine={winningLine}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <button onClick={() => this.reverseHistory()}>Reverse history</button>
          <button onClick={() => this.resetGame()}>Reset game</button>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  return lines.find(([a, b, c]) =>
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  )
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

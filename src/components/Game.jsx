import React, { useState } from 'react'
import Board from './Board'

const initialHistory = [{
  squares: Array(9).fill(null),
  xIsNext: true
}]

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
  // return the first matching line with three equal non-null values, if any
  return lines.find(([a, b, c]) =>
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  )
}

function Game () {
  function handleClick (i) {
    // "historyCopy" feels awkward
    const historyCopy = history.slice(0, stepNumber + 1)
    const current = historyCopy[historyCopy.length - 1]
    const squares = current.squares.slice()
    // stop if we already have a winner or the square is already taken
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = current.xIsNext ? 'X' : 'O'
    setHistory(historyCopy.concat([{
      squares: squares,
      changedSquare: i,
      xIsNext: !current.xIsNext
    }]))
    setStepNumber(historyCopy.length)
  }

  function resetGame () {
    setHistory(initialHistory)
    setStepNumber(0)
  }

  // trying hooks - naming? multiple useStats is overkill?
  const [history, setHistory] = useState(initialHistory)
  const [reverseHistory, setReverseHistory] = useState(false)
  const [stepNumber, setStepNumber] = useState(0)

  // this next part was previously in render() method, maybe move or wrap somehow?
  // since the code appears to work fine like this, it means this code re-runs each click.
  // how does the history const (initialized a few lines above) not get overwritten with a new state instance
  // or in other words - how does useState work?
  const current = history[stepNumber]
  const winningLine = calculateWinner(current.squares)
  const winner = winningLine && current.squares[winningLine[0]]
  const status = winner
    ? 'Winner: ' + winner
    : stepNumber > 8
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
          onClick={() => setStepNumber(moveIndex)}
          className={stepNumber === moveIndex ? 'current-history-item' : ''}
        >
          {desc}
        </button>
      </li>
    )
  })
  if (reverseHistory) moves.reverse()
  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          winningLine={winningLine}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <button onClick={() => setReverseHistory(!reverseHistory)}>Reverse history</button>
        <button onClick={() => resetGame()}>Reset game</button>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game

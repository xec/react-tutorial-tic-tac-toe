import React from 'react'
// import Square from './Square'

const boardRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]

const Board = (props) =>
  <div>
    {boardRows.map((row, index) =>
      <div key={index} className='board-row'>
        {row.map(square => {
          const isWinningSquare = (props.winningLine || []).includes(square)
          return (
            <button
              key={square}
              className={'square' + (isWinningSquare ? ' winningSquare' : '')}
              onClick={() => props.onClick(square)}
            >
              {props.squares[square]}
            </button>
          )
        })}
      </div>
    )}
  </div>

export default Board

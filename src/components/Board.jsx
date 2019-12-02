import React from 'react'
import Square from './Square'

const boardRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]

const Board = (props) =>
  <div>
    {boardRows.map((row, index) =>
      <div key={index} className='board-row'>
        {row.map(square =>
          <Square
            key={square}
            value={props.squares[square]}
            onClick={() => props.onClick(square)}
            isWinningSquare={(props.winningLine || []).includes(square)}
          />
        )}
      </div>
    )}
  </div>

export default Board

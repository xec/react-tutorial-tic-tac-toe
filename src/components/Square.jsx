import React from 'react'

const Square = (props) =>
  <button
    className={'square ' + (props.isWinningSquare ? 'winningSquare' : '')}
    onClick={props.onClick}
  >
    {props.value}
  </button>

export default Square

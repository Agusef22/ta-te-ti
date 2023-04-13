import { Square } from './Square'
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { calculateWinner } from '../logic/logicWinner'

export function Board() {
  const initialBoard = Array(9).fill(null)
  const [squares, setSquares] = useState(
    JSON.parse(localStorage.getItem('board')) || initialBoard // mira si lo de la izquierda es falso
  )
  const [xIsNext, setXIsNext] = useState(
    JSON.parse(localStorage.getItem('xIsNext')) ?? true // mira si lo de la izquierda es null o undifined
  )

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(squares))
    localStorage.setItem('xIsNext', JSON.stringify(xIsNext))
  }, [squares, xIsNext])

  function handleClick(i) {
    const newSquares = squares.slice()
    if (calculateWinner(squares) || newSquares[i]) {
      return
    }
    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    confetti()
    status = `Winner: ${winner}`
  } else if (!squares.includes(null)) {
    status = 'Draw'
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        className='reset-button'
        onClick={() => setSquares(Array(9).fill(null))}
      >
        Reset
      </button>
    </div>
  )
}

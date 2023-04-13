import { Board } from './components/Board'
import './App.css'

function Game() {
  return (
    <div className='game'>
      <div className='game-board'>
        <h1 className='title-app'>Ta-Te-Ti</h1>
        <Board />
      </div>
    </div>
  )
}

export default Game

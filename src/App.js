import Board from './components/Board'
import './App.css';
import React, { useState , createContext, useEffect } from 'react';
import Header from './components/Header';

export const AppContext = createContext();

function App() {
  const emptyGame = [["", "", ""], ["", "", ""], ["", "", ""]]
  const [cells, setCells] = useState(emptyGame)
  const [winnerCells, setWinnerCells] = useState([[],[],[]])

  const X = "X"
  const O = "O"
  const [currentChar, setCurrentChar] = useState(X);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false)

  useEffect(function() {
    isGameOver()
  }, [cells])

  function cellClick(row, column) {
    if (gameOver || winner) {
      return;
    }

    if (cells[row][column] != "") {
      return;
    }

    const newBoard = {...cells}
    newBoard[row][column] = currentChar
    setCells(newBoard)
    changeChar()
  }

  function changeChar() {
    if (currentChar == X) {
      setCurrentChar(O)
    } else {
      setCurrentChar(X)
    }
  }

  function reset() {
    setCells(emptyGame)
    setWinner("")
    setGameOver(false)
    setWinnerCells([[],[],[]])
  }

  function isGameOver() {
    switch (true) {
      case areTheSameInRow(0): return
      case areTheSameInRow(1): return
      case areTheSameInRow(2): return
      case areTheSameInColumn(0): return
      case areTheSameInColumn(1): return
      case areTheSameInColumn(2): return
      case areTheSameInDiagonal(): return
    }

    if (!cells[0].includes("") && !cells[1].includes("") && !cells[2].includes("")) {
      endGame("")
    }
  }

  function endGame(winner) {
    if (winner != "") setWinner(winner)
    setGameOver(true)
  }

  function areTheSameInRow(row) {
    if (cells[row][0] !== "" && cells[row][0] === cells[row][1] && cells[row][0] === cells[row][2]) {
      endGame(cells[row][0])
      
      const newWinner = [[],[],[]]
      newWinner[row][0] = true
      newWinner[row][1] = true
      newWinner[row][2] = true
      setWinnerCells(newWinner)
      return true
    }
    return false
  }

  function areTheSameInColumn(column) {
    if (cells[0][column] !== "" && cells[0][column] === cells[1][column] && cells[2][column] == cells[0][column]) {
      endGame(cells[0][column])
      
      const newWinner = [[],[],[]]
      newWinner[0][column] = true
      newWinner[1][column] = true
      newWinner[2][column] = true
      setWinnerCells(newWinner)
      return true
    }
    return false
  }

  function areTheSameInDiagonal() {
    if (cells[1][1] != "" && (cells[0][0] === cells[1][1] && cells[0][0] == cells[2][2])) {
      endGame(cells[1][1])
      const newWinner = [[],[],[]]
      newWinner[0][0] = true
      newWinner[1][1] = true
      newWinner[2][2] = true
      setWinnerCells(newWinner)
      return true
    }

    if (cells[1][1] != "" && (cells[2][0] === cells[1][1] && cells[2][0] == cells[0][2])) {
      endGame(cells[1][1])
      const newWinner = [[],[],[]]
      newWinner[0][2] = true
      newWinner[1][1] = true
      newWinner[2][0] = true
      setWinnerCells(newWinner)
      return true
    }
    return false
  }

  return (
    <div className="App">
      <header className="App-header">
        <AppContext.Provider value={{cells, setCells, cellClick, currentChar, winner, gameOver, winnerCells}}>
          <Header />
          <Board />
        </AppContext.Provider>

        <button className='btn-reset' onClick={() => reset()}>Reset</button>
      </header>
    </div>
  );
}

export default App;

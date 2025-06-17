import React, { useState } from 'react';
import './App.css';

/**
 * Main container for the WebTicTacToe game.
 * Handles board rendering, game logic, and minimal UI.
 */
function App() {
  // Board state ('X', 'O', or null for blank)
  const [board, setBoard] = useState(Array(9).fill(null));
  // true: X's turn, false: O's turn
  const [xIsNext, setXIsNext] = useState(true);
  // Stores winner when detected ('X', 'O', 'Draw', or null)
  const winner = calculateWinner(board);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return; // Ignore played or finished
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner === 'Draw') {
      return "It's a draw!";
    }
    if (winner) {
      return `Winner: ${winner}`;
    }
    return `Next: ${xIsNext ? 'X' : 'O'}`;
  }

  // Board cell rendering
  function renderSquare(idx) {
    // Decide accent color for X/O
    let color = board[idx] === 'X'
      ? 'var(--color-primary)' // X: green
      : board[idx] === 'O'
      ? 'var(--color-accent)'  // O: blue
      : 'var(--color-secondary)';
    return (
      <button
        key={idx}
        className="tictactoe-square"
        style={{
          color,
          cursor: board[idx] || winner ? 'default' : 'pointer',
        }}
        onClick={() => handleSquareClick(idx)}
        aria-label={`Board cell ${idx + 1} ${board[idx] ? board[idx] : ''}`}
        disabled={!!board[idx] || !!winner}
        tabIndex={0}
      >
        {board[idx]}
      </button>
    );
  }

  return (
    <div className="app" style={{ background: 'var(--ttt-bg, #fff)', color: '#181818' }}>
      <nav className="navbar" style={{ background: '#fdfdfd', color: '#181818', borderBottom: '1px solid #ececec' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: '#333' }}>
              <span className="logo-symbol" style={{ color: 'var(--color-primary)' }}>#</span>
              WebTicTacToe
            </div>
            <a
              className="btn"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontWeight: 500,
                minWidth: 44,
                textDecoration: 'none'
              }}
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
      <main>
        <div className="ttt-centered-container">
          <h2 className="ttt-app-title">Tic Tac Toe</h2>
          <div className="ttt-status">{renderStatus()}</div>
          <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
            {[0, 1, 2].map((row) => (
              <div className="ttt-row" key={row} role="row">
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </div>
            ))}
          </div>
          {(winner || board.every((cell) => cell)) && (
            <button
              className="ttt-restart-btn"
              onClick={handleRestart}
              aria-label="Restart Game"
            >
              Restart
            </button>
          )}
          <div className="ttt-hint">
            X = <span style={{ color: 'var(--color-primary)' }}>Green</span> &nbsp; &nbsp;
            O = <span style={{ color: 'var(--color-accent)' }}>Blue</span>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Calculate winner or draw from board
 * @param {Array} squares
 * @returns {'X' | 'O' | 'Draw' | null}
 */
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every(cell => cell)) return 'Draw';
  return null;
}

export default App;
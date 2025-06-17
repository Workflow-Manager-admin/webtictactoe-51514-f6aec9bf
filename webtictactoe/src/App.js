import React, { useState } from 'react';
import './App.css';

/**
 * Main container for the WebTicTacToe game.
 * Handles board rendering, game logic, and enhanced minimal-modern UI.
 */
// PUBLIC_INTERFACE
function App() {
  // State management: 3x3 grid and turn
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return;
    const updated = [...board];
    updated[idx] = xIsNext ? 'X' : 'O';
    setBoard(updated);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner) return (
      <span>
        <span style={{
          color: winner === 'X'
            ? 'var(--color-primary)'
            : 'var(--color-accent)',
          fontWeight: 700,
        }}>
          {winner}
        </span>
        &nbsp;wins! 🎉
      </span>
    );
    if (isDraw) {
      return <>It's a draw!</>;
    }
    return (
      <>
        Next:&nbsp;
        <span style={{
          color: xIsNext ? 'var(--color-primary)' : 'var(--color-accent)',
          fontWeight: 700,
          fontSize: '1.16em',
        }}>{xIsNext ? 'X' : 'O'}</span>
      </>
    );
  }

  // Highlight winning squares if game is won
  const winnerLine = getWinningLine(board);

  // Modern and minimal board cell rendering
  function renderSquare(idx) {
    const value = board[idx];
    let color;
    if (value === 'X') color = 'var(--color-primary)';
    else if (value === 'O') color = 'var(--color-accent)';
    else color = 'var(--color-secondary)';

    const highlight = winnerLine && winnerLine.includes(idx);

    return (
      <button
        key={idx}
        className="tictactoe-square"
        type="button"
        style={{
          color,
          background: highlight ? 'rgba(76,175,80,0.13)' : undefined,
          borderColor: highlight ? 'var(--color-primary)' : undefined,
          fontWeight: highlight ? 800 : 700,
          boxShadow: highlight ? '0 0 14px rgba(76,175,80,0.08)' : undefined,
          cursor: value || winner ? 'default' : 'pointer'
        }}
        onClick={() => handleSquareClick(idx)}
        aria-label={`Board cell ${idx + 1} ${value ?? ''}`}
        disabled={Boolean(value) || Boolean(winner)}
        tabIndex={0}
        autoFocus={idx === 0}
      >
        {value}
      </button>
    );
  }

  return (
    <div className="app" style={{
      background: 'var(--ttt-bg, #fff)',
      color: '#212121',
      minHeight: '100vh',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Minimal, subtle topnav */}
      <nav className="navbar" style={{
        background: 'rgba(255,255,255,0.96)',
        color: '#222',
        borderBottom: '1.5px solid #ececec',
        position: 'fixed',
        width: '100vw',
        left: 0,
        top: 0,
        boxSizing: 'border-box',
        zIndex: 5,
        padding: 0
      }}>
        <div className="container" style={{
          maxWidth: 850, margin: '0 auto', width: '100%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            width: '100%'
          }}>
            <div className="logo" style={{
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-.03rem',
              gap: 9
            }}>
              <svg height="28" width="28" viewBox="0 0 28 28" style={{ marginRight: 8 }}>
                <circle cx="14" cy="14" r="10" fill="var(--color-secondary)" opacity="0.40"/>
                <text x="14" y="20" textAnchor="middle" fontSize="20" fontWeight="bold" fill="var(--color-primary)">⨉</text>
              </svg>
              <span style={{ color: '#263028' }}>WebTicTacToe</span>
            </div>
            <a
              className="btn"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 7,
                marginLeft: 18,
                letterSpacing: '0.02em',
                transition: 'background 0.13s',
                minWidth: 46,
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
      <main style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <div className="ttt-centered-container" style={{ marginTop: 130, minWidth: 0 }}>
          <h2 className="ttt-app-title" style={{
            fontFamily: 'inherit',
            letterSpacing: '-0.04em',
            paddingBottom: 2,
            marginBottom: 13,
          }}>
            Tic Tac Toe
          </h2>
          <div className="ttt-status">
            {renderStatus()}
          </div>
          <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board" style={{
            margin: '0 auto', boxSizing: 'border-box'
          }}>
            {[0, 1, 2].map((row) => (
              <div className="ttt-row" key={row} role="row">
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </div>
            ))}
          </div>
          {(winner || isDraw) && (
            <button
              className="ttt-restart-btn"
              onClick={handleRestart}
              aria-label="Restart Game"
              style={{
                fontWeight: 600,
                marginTop: 28,
                fontSize: '1.14rem',
                boxShadow: '0 3px 11px rgba(33,150,243,0.12)'
              }}
            >
              <span role="img" aria-label="circular arrow" style={{ marginRight: 6 }}>🔄</span>
              Restart
            </button>
          )}
          <div className="ttt-hint" style={{ marginTop: 23, fontSize: '1.04rem' }}>
            <span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>X</span> (green) &nbsp;|&nbsp; <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>O</span> (blue)
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Returns the line (array of indices) if there is a winner, else null.
 * @param {Array} squares
 * @returns {Array|null}
 */
function getWinningLine(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
}

/**
 * Calculate winner or draw from board
 * @param {Array} squares
 * @returns {'X' | 'O' | 'Draw' | null}
 */
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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

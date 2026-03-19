import { WIN_PATTERNS, DIFFICULTY } from '../constants'

// ─────────────────────────────────────────────────────────
// Bot AI — three difficulty levels
//
//  EASY   → picks a random empty cell
//  MEDIUM → wins if possible, blocks if needed, else random
//  HARD   → minimax algorithm (unbeatable)
// ─────────────────────────────────────────────────────────

function checkWinner(board) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c])
      return board[a]
  }
  return null
}

function getEmpty(board) {
  return board.reduce((acc, v, i) => (v === null ? [...acc, i] : acc), [])
}

// ── Minimax (used by HARD) ────────────────────────────────
function minimax(board, isMaximising, botSymbol, humanSymbol) {
  const winner = checkWinner(board)
  if (winner === botSymbol)   return  10
  if (winner === humanSymbol) return -10
  if (board.every(Boolean))   return   0

  const empty = getEmpty(board)
  const scores = empty.map((idx) => {
    const next = [...board]
    next[idx] = isMaximising ? botSymbol : humanSymbol
    return minimax(next, !isMaximising, botSymbol, humanSymbol)
  })

  return isMaximising ? Math.max(...scores) : Math.min(...scores)
}

// ── Public: getBotMove ────────────────────────────────────
// board      — current board array (null | 'X' | 'O')
// botSymbol  — the symbol the bot is playing ('X' or 'O')
// difficulty — 'easy' | 'medium' | 'hard'
// Returns the index (0-8) the bot wants to play
export function getBotMove(board, botSymbol, difficulty) {
  const humanSymbol = botSymbol === 'X' ? 'O' : 'X'
  const empty = getEmpty(board)
  if (empty.length === 0) return -1

  // ── EASY: pure random ──
  if (difficulty === DIFFICULTY.EASY) {
    return empty[Math.floor(Math.random() * empty.length)]
  }

  // ── MEDIUM: win > block > random ──
  if (difficulty === DIFFICULTY.MEDIUM) {
    // Can the bot win this move?
    for (const idx of empty) {
      const test = [...board]; test[idx] = botSymbol
      if (checkWinner(test)) return idx
    }
    // Must the bot block the human this move?
    for (const idx of empty) {
      const test = [...board]; test[idx] = humanSymbol
      if (checkWinner(test)) return idx
    }
    // Take center if free
    if (board[4] === null) return 4
    // Take a corner
    const corners = [0, 2, 6, 8].filter(i => board[i] === null)
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)]
    // Else random
    return empty[Math.floor(Math.random() * empty.length)]
  }

  // ── HARD: minimax ──
  let bestScore = -Infinity
  let bestMove  = empty[0]

  for (const idx of empty) {
    const next = [...board]
    next[idx]  = botSymbol
    const score = minimax(next, false, botSymbol, humanSymbol)
    if (score > bestScore) {
      bestScore = score
      bestMove  = idx
    }
  }
  return bestMove
}

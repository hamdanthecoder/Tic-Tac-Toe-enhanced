import { useState, useCallback, useRef, useEffect } from 'react'
import { WIN_PATTERNS, MODES, DIFFICULTY } from '../constants'
import { audio } from '../audio'
import { getBotMove } from './botAI'

// ── Derive emoji for a player given current board state ──
function computeEmoji(symbol, board, winInfo, isDraw) {
  if (winInfo) return winInfo.winner === symbol ? '🥳' : '😭'
  if (isDraw)  return '😤'
  const opp = symbol === 'X' ? 'O' : 'X'
  let myBest = 0, gotBlocked = false
  for (const pattern of WIN_PATTERNS) {
    const cells  = pattern.map(i => board[i])
    const mine   = cells.filter(c => c === symbol).length
    const theirs = cells.filter(c => c === opp).length
    if (mine > myBest) myBest = mine
    if (theirs === 2 && mine === 1) gotBlocked = true
  }
  if (gotBlocked) return '😡'
  if (myBest >= 2) return '😎'
  if (board.every(c => !c)) return '😐'
  return '😊'
}

// ── Find winner from board ──
function findWinner(board) {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[b] === board[c])
      return { winner: board[a], pattern }
  }
  return null
}

// ─────────────────────────────────────────────────────────
export function useGame(sfxOn, mode = MODES.PVP, difficulty = DIFFICULTY.MEDIUM) {
  const [board,      setBoard]    = useState(Array(9).fill(null))
  const [isX,        setIsX]      = useState(true)
  const [scores,     setScores]   = useState({ X: 0, O: 0 })
  const [winInfo,    setWinInfo]  = useState(null)
  const [isDraw,     setIsDraw]   = useState(false)
  const [botThinking,setBotThink] = useState(false)  // shows "thinking" state

  // Bot always plays as 'O', human always plays as 'X'
  const isBot       = mode === MODES.BOT
  const botSymbol   = 'O'
  const humanSymbol = 'X'

  const prevEmojis = useRef({ X: '😐', O: '😐' })

  // ── Emoji sound triggers ──
  const triggerEmojiSounds = useCallback((nextBoard, nextWinInfo, nextIsDraw) => {
    audio.sfxEnabled = sfxOn
    ;['X', 'O'].forEach(sym => {
      const newEmoji = computeEmoji(sym, nextBoard, nextWinInfo, nextIsDraw)
      if (newEmoji !== prevEmojis.current[sym]) {
        prevEmojis.current[sym] = newEmoji
        setTimeout(() => audio.playEmojiSound(newEmoji), 120)
      }
    })
  }, [sfxOn])

  // ── Core: apply a move and check for win/draw ──
  const applyMove = useCallback((board, index, symbol) => {
    const next = [...board]
    next[index] = symbol
    const result = findWinner(next)
    const draw   = !result && next.every(Boolean)
    return { next, result, draw }
  }, [])

  // ── Bot makes its move (called after human plays) ──
  const doBotMove = useCallback((boardAfterHuman) => {
    setBotThink(true)
    // Small delay so it feels like the bot is "thinking"
    const delay = difficulty === DIFFICULTY.HARD ? 500 : 350
    setTimeout(() => {
      setBotThink(false)
      const idx = getBotMove(boardAfterHuman, botSymbol, difficulty)
      if (idx === -1) return

      audio.sfxEnabled = sfxOn
      audio.click()

      const { next, result, draw } = applyMove(boardAfterHuman, idx, botSymbol)
      setBoard(next)
      setIsX(true)  // after bot plays, it's human's turn again

      if (result) {
        setWinInfo(result)
        setScores(s => ({ ...s, [result.winner]: s[result.winner] + 1 }))
        setTimeout(() => audio.win(), 80)
        triggerEmojiSounds(next, result, false)
      } else if (draw) {
        setIsDraw(true)
        setTimeout(() => audio.draw(), 80)
        triggerEmojiSounds(next, null, true)
      } else {
        triggerEmojiSounds(next, null, false)
      }
    }, delay)
  }, [difficulty, sfxOn, applyMove, triggerEmojiSounds])

  // ── Human plays ──
  const play = useCallback((index) => {
    if (board[index] || winInfo || isDraw) return
    // In bot mode, block input when it's the bot's turn
    if (isBot && !isX) return
    if (isBot && botThinking) return

    audio.sfxEnabled = sfxOn
    audio.click()

    const symbol = isX ? 'X' : 'O'
    const { next, result, draw } = applyMove(board, index, symbol)
    setBoard(next)
    setIsX(prev => !prev)

    if (result) {
      setWinInfo(result)
      setScores(s => ({ ...s, [result.winner]: s[result.winner] + 1 }))
      setTimeout(() => audio.win(), 80)
      triggerEmojiSounds(next, result, false)
    } else if (draw) {
      setIsDraw(true)
      setTimeout(() => audio.draw(), 80)
      triggerEmojiSounds(next, null, true)
    } else {
      triggerEmojiSounds(next, null, false)
      // In bot mode, trigger bot move after human plays
      if (isBot) doBotMove(next)
    }
  }, [board, isX, winInfo, isDraw, isBot, botThinking, sfxOn, applyMove, triggerEmojiSounds, doBotMove])

  const nextRound = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsX(true)
    setWinInfo(null)
    setIsDraw(false)
    setBotThink(false)
    prevEmojis.current = { X: '😐', O: '😐' }
    audio.resetEmojiState()
  }, [])

  const resetAll = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsX(true)
    setWinInfo(null)
    setIsDraw(false)
    setBotThink(false)
    setScores({ X: 0, O: 0 })
    prevEmojis.current = { X: '😐', O: '😐' }
    audio.resetEmojiState()
  }, [])

  const getEmoji = useCallback((symbol) =>
    computeEmoji(symbol, board, winInfo, isDraw),
  [board, winInfo, isDraw])

  return {
    board, isX, scores, winInfo, isDraw, botThinking,
    play, nextRound, resetAll, getEmoji,
    isBot, botSymbol, humanSymbol,
  }
}

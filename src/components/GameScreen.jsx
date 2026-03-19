import { useGame } from '../hooks/useGame'
import PlayerCard from './PlayerCard'
import Cell from './Cell'
import Confetti from './Confetti'
import MusicBars from './MusicBars'
import { MODES } from '../constants'

const STATUS_STYLES = {
  X:    { bg: 'rgba(255,107,107,0.14)', border: '#ff6b6b', color: '#ff6b6b', shadow: 'rgba(255,107,107,0.22)' },
  O:    { bg: 'rgba(78,205,196,0.14)',  border: '#4ecdc4', color: '#4ecdc4', shadow: 'rgba(78,205,196,0.22)'  },
  draw: { bg: 'rgba(247,201,72,0.11)',  border: '#f7c948', color: '#f7c948', shadow: 'rgba(247,201,72,0.18)'  },
}

export default function GameScreen({ onBack, musicOn, onMusicToggle, sfxOn, confOn, mode, difficulty }) {
  const {
    board, isX, scores, winInfo, isDraw, botThinking,
    play, nextRound, resetAll, getEmoji,
    isBot,
  } = useGame(sfxOn, mode, difficulty)

  const confettiC1 = winInfo?.winner === 'X' ? '#ff6b6b' : '#4ecdc4'
  const confettiC2 = winInfo?.winner === 'X' ? '#ffaa6b' : '#6bffee'
  const stKey      = winInfo ? winInfo.winner : isDraw ? 'draw' : null
  const st         = stKey ? STATUS_STYLES[stKey] : null

  // Winner message — personalised for bot mode
  const stMsg = winInfo
    ? (isBot
        ? (winInfo.winner === 'X' ? '🎉 You Win!' : '🤖 Bot Wins!')
        : `Player ${winInfo.winner} Wins! 🎉`)
    : isDraw ? "It's a Draw!" : null

  // Turn indicator text
  const turnText = isBot
    ? (botThinking ? '🤖 Bot is thinking...' : "Your turn (✗)")
    : `Player ${isX ? 'X' : 'O'}'s turn`

  // Player labels
  const labelX = isBot ? 'You'       : 'Player X'
  const labelO = isBot ? '🤖 Bot'    : 'Player O'

  // Subtitle
  const subtitle = isBot
    ? `vs Bot · ${difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}`
    : '✦ Two Player Game ✦'

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-4 relative z-10 overflow-y-auto">
      {confOn && winInfo && <Confetti active color1={confettiC1} color2={confettiC2} />}

      <div className="w-full max-w-[480px]">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-[18px]">
          <button
            onClick={onBack}
            className="font-mono flex items-center gap-[6px] px-[14px] py-[6px] rounded-full
                       text-[11px] text-white/42 transition-all duration-200
                       hover:text-white hover:border-white/20"
            style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)' }}
          >
            ← Menu
          </button>

          <button
            onClick={() => onMusicToggle(!musicOn)}
            className="font-mono flex items-center gap-[7px] px-[14px] py-[6px] rounded-full
                       text-[11px] transition-all duration-200"
            style={{
              border:     `1.5px solid ${musicOn ? 'rgba(78,205,196,0.5)' : 'rgba(255,255,255,0.08)'}`,
              background: 'rgba(18,18,26,0.95)',
              color:      musicOn ? '#4ecdc4' : 'rgba(240,240,248,0.42)',
            }}
          >
            <MusicBars on={musicOn} />
            {musicOn ? 'Music On' : 'Music Off'}
          </button>
        </div>

        {/* ── Header ── */}
        <div className="text-center mb-[22px]">
          <h1 className="gradient-text text-[clamp(2rem,7vw,2.8rem)] font-black tracking-tight leading-none">
            TIC TAC TOE
          </h1>
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mt-1">
            {subtitle}
          </p>
        </div>

        {/* ── Player cards ── */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-[10px] items-center mb-[18px]">
          <PlayerCard
            symbol="X"
            label={labelX}
            score={scores.X}
            emoji={getEmoji('X')}
            active={!winInfo && !isDraw && isX && !botThinking}
          />
          <div className="font-mono text-center text-[12px] font-bold text-white/28 tracking-widest">
            VS
          </div>
          <PlayerCard
            symbol="O"
            label={labelO}
            score={scores.O}
            emoji={getEmoji('O')}
            active={!winInfo && !isDraw && !isX && !botThinking}
            isBot={isBot}
            botThinking={botThinking}
          />
        </div>

        {/* ── Turn indicator ── */}
        <div className="text-center mb-[14px] min-h-[30px] flex items-center justify-center">
          {!winInfo && !isDraw && (
            <div
              className="font-mono inline-flex items-center gap-[7px] px-4 py-[5px]
                         rounded-full text-[12px] text-white/42 transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)' }}
            >
              {!botThinking && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: isX ? '#ff6b6b' : '#4ecdc4',
                    boxShadow:  isX ? '0 0 8px rgba(255,107,107,0.6)' : '0 0 8px rgba(78,205,196,0.6)',
                    animation:  'pulseDot 1.5s ease-in-out infinite',
                  }}
                />
              )}
              {botThinking && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#4ecdc4', animation: 'pulseDot 0.6s ease-in-out infinite' }}
                />
              )}
              {turnText}
            </div>
          )}
        </div>

        {/* ── Board ── */}
        <div
          className="rounded-[22px] p-[18px] mb-4"
          style={{
            border:     '1.5px solid rgba(255,255,255,0.08)',
            background: 'rgba(18,18,26,0.95)',
            boxShadow:  '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            opacity:    botThinking ? 0.7 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div className="grid grid-cols-3 gap-[10px]">
            {board.map((val, i) => (
              <Cell
                key={i}
                value={val}
                onClick={() => play(i)}
                isWinner={winInfo?.pattern?.includes(i) ?? false}
                disabled={botThinking || !!winInfo || isDraw}
              />
            ))}
          </div>
        </div>

        {/* ── Status banner ── */}
        <div className="text-center min-h-[52px] flex items-center justify-center mb-4">
          {st && stMsg && (
            <div
              className="inline-flex items-center gap-[10px] px-6 py-[10px]
                         rounded-full font-bold text-[14px] border"
              style={{
                background:  st.bg,
                borderColor: st.border,
                color:       st.color,
                boxShadow:   `0 0 25px ${st.shadow}`,
                animation:   'bounceWin 0.6s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <span className="text-xl">🏆</span>
              {stMsg}
            </div>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="grid grid-cols-2 gap-[10px]">
          <button
            onClick={nextRound}
            className="py-[13px] rounded-2xl font-bold text-[14px] text-white
                       transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              border:     '1.5px solid rgba(255,255,255,0.08)',
              background: 'rgba(26,26,40,0.95)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            ↩ Next Round
          </button>
          <button
            onClick={resetAll}
            className="py-[13px] rounded-2xl font-bold text-[14px]
                       transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              border:     '1.5px solid rgba(255,107,107,0.35)',
              background: 'transparent',
              color:      '#ff6b6b',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            ✕ Reset All
          </button>
        </div>
      </div>
    </div>
  )
}

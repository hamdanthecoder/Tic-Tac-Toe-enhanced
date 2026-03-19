import { useState } from 'react'
import { MODES, DIFFICULTY } from '../constants'
import PanelHeader from './PanelHeader'

const DIFF_OPTIONS = [
  {
    key:   DIFFICULTY.EASY,
    label: 'Easy',
    icon:  '😊',
    desc:  'Bot plays randomly — great for beginners',
    color: '#4ecdc4',
    glow:  'rgba(78,205,196,0.3)',
    border:'rgba(78,205,196,0.35)',
    bg:    'rgba(78,205,196,0.08)',
  },
  {
    key:   DIFFICULTY.MEDIUM,
    label: 'Medium',
    icon:  '😐',
    desc:  'Bot blocks & attacks — a fair challenge',
    color: '#f7c948',
    glow:  'rgba(247,201,72,0.3)',
    border:'rgba(247,201,72,0.35)',
    bg:    'rgba(247,201,72,0.08)',
  },
  {
    key:   DIFFICULTY.HARD,
    label: 'Hard',
    icon:  '😈',
    desc:  'Perfect minimax AI — can you draw?',
    color: '#ff6b6b',
    glow:  'rgba(255,107,107,0.3)',
    border:'rgba(255,107,107,0.35)',
    bg:    'rgba(255,107,107,0.08)',
  },
]

export default function ModeSelectScreen({ onBack, onStartGame }) {
  const [selectedDiff, setSelectedDiff] = useState(DIFFICULTY.MEDIUM)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-8 relative z-10">
      <div className="w-full max-w-sm">
        <PanelHeader title="Select Mode" onBack={onBack} />

        {/* ── PvP Card ── */}
        <button
          onClick={() => onStartGame(MODES.PVP, null)}
          className="w-full p-5 rounded-[18px] text-left mb-3 group
                     transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            border:     '1.5px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(135deg, rgba(255,107,107,0.10), rgba(78,205,196,0.10))',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)' }}
            >
              👥
            </div>
            <div className="flex-1">
              <div className="font-black text-[17px] text-white mb-[2px]">
                Player vs Player
              </div>
              <div className="font-mono text-[11px] text-white/40">
                Two players on the same device
              </div>
            </div>
            <span className="text-white/28 text-xl group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-200">›</span>
          </div>

          {/* Player icons row */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.25)' }}>
              <span className="font-black text-[13px]" style={{ color: '#ff6b6b' }}>✗</span>
              <span className="font-mono text-[10px] text-white/50">Player X</span>
            </div>
            <span className="font-mono text-[11px] text-white/25">vs</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(78,205,196,0.12)', border: '1px solid rgba(78,205,196,0.25)' }}>
              <span className="font-black text-[13px]" style={{ color: '#4ecdc4' }}>○</span>
              <span className="font-mono text-[10px] text-white/50">Player O</span>
            </div>
          </div>
        </button>

        {/* ── Bot Card ── */}
        <div
          className="w-full p-5 rounded-[18px] mb-3"
          style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)' }}
            >
              🤖
            </div>
            <div>
              <div className="font-black text-[17px] text-white mb-[2px]">
                Player vs Bot
              </div>
              <div className="font-mono text-[11px] text-white/40">
                You play ✗ — Bot plays ○
              </div>
            </div>
          </div>

          {/* Difficulty picker */}
          <div className="mb-4">
            <div className="font-mono text-[10px] text-white/35 uppercase tracking-[0.15em] mb-2">
              Select Difficulty
            </div>
            <div className="flex flex-col gap-2">
              {DIFF_OPTIONS.map((opt) => {
                const active = selectedDiff === opt.key
                return (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedDiff(opt.key)}
                    className="w-full px-4 py-3 rounded-2xl flex items-center gap-3
                               text-left transition-all duration-200 active:scale-[0.98]"
                    style={{
                      border:     `1.5px solid ${active ? opt.border : 'rgba(255,255,255,0.07)'}`,
                      background: active ? opt.bg : 'rgba(255,255,255,0.03)',
                      boxShadow:  active ? `0 0 14px ${opt.glow}` : 'none',
                    }}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1">
                      <div
                        className="font-bold text-[13px]"
                        style={{ color: active ? opt.color : 'rgba(240,240,248,0.7)' }}
                      >
                        {opt.label}
                      </div>
                      <div className="font-mono text-[10px] text-white/35 mt-[1px]">
                        {opt.desc}
                      </div>
                    </div>
                    {/* Radio dot */}
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 transition-all duration-200"
                      style={{
                        border:     `2px solid ${active ? opt.color : 'rgba(255,255,255,0.2)'}`,
                        background: active ? opt.color : 'transparent',
                        boxShadow:  active ? `0 0 8px ${opt.glow}` : 'none',
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Start Bot Game button */}
          <button
            onClick={() => onStartGame(MODES.BOT, selectedDiff)}
            className="w-full py-[13px] rounded-2xl font-bold text-[14px]
                       transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,107,0.18), rgba(247,201,72,0.18))',
              border:     '1.5px solid rgba(255,107,107,0.4)',
              color:      '#f0f0f8',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff6b6b' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,107,107,0.4)' }}
          >
            🤖 Play vs Bot ({DIFF_OPTIONS.find(d => d.key === selectedDiff)?.label})
          </button>
        </div>
      </div>
    </div>
  )
}

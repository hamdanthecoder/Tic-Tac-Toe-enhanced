import { memo } from 'react'

const PlayerCard = memo(function PlayerCard({ symbol, label, score, emoji, active, isBot, botThinking }) {
  const isX    = symbol === 'X'
  const color  = isX ? '#ff6b6b' : '#4ecdc4'
  const glow   = isX ? 'rgba(255,107,107,0.42)' : 'rgba(78,205,196,0.42)'
  const glowBg = isX ? 'rgba(255,107,107,0.12)' : 'rgba(78,205,196,0.12)'
  const border = isX ? 'rgba(255,107,107,0.2)'  : 'rgba(78,205,196,0.2)'
  const displayLabel = label || `Player ${symbol}`

  return (
    <div
      className="relative overflow-hidden rounded-[18px] text-center px-3 py-[13px] transition-all duration-300"
      style={{
        background:   'rgba(18,18,26,0.95)',
        border:       `1.5px solid ${active ? color : border}`,
        transform:    active ? 'translateY(-3px) scale(1.03)' : 'none',
        boxShadow:    active ? `0 0 20px ${glow}, 0 8px 28px rgba(0,0,0,0.38)` : 'none',
      }}
    >
      {/* Active glow overlay */}
      {active && (
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${glowBg}, transparent 70%)` }}
        />
      )}

      {/* Emoji or thinking dots */}
      <span
        className="relative block text-[28px] mb-[3px] transition-transform duration-300"
        style={{ transform: active ? 'scale(1.15)' : 'scale(1)' }}
      >
        {isBot && botThinking ? '🤔' : emoji}
      </span>

      {/* Label */}
      <span className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 leading-tight">
        {displayLabel}
      </span>

      {/* Symbol */}
      <span className="block text-xl font-black mt-[2px]" style={{ color }}>
        {isX ? '✗' : '○'}
      </span>

      {/* Score */}
      <span className="block font-mono text-[22px] font-bold mt-[5px]" style={{ color }}>
        {score}
      </span>

      {/* Bot thinking indicator bar */}
      {isBot && botThinking && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[18px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation:  'shimmer 1s ease-in-out infinite',
          }}
        />
      )}
    </div>
  )
})

export default PlayerCard

import { memo } from 'react'

const Cell = memo(function Cell({ value, onClick, isWinner }) {
  const isX = value === 'X'
  const isO = value === 'O'

  // CSS classes carry color, border, glow & animation — no inline color override
  let cellClass = ''
  if (isWinner && isX)    cellClass = 'cell-win-x'
  else if (isWinner && isO) cellClass = 'cell-win-o'
  else if (isX)           cellClass = 'cell-x'
  else if (isO)           cellClass = 'cell-o'

  return (
    <button
      onClick={onClick}
      disabled={!!value}
      className={`
        aspect-square rounded-[14px] border border-white/[0.08]
        text-[clamp(1.8rem,7vw,2.5rem)] font-black font-syne
        flex items-center justify-center
        transition-all duration-200 active:scale-95
        relative overflow-hidden group
        ${value ? 'cursor-default' : 'cursor-pointer hover:border-white/20 hover:scale-[1.04]'}
        ${cellClass}
      `}
      style={{
        background: 'rgba(26,26,40,0.9)',
        // color is intentionally NOT set here — CSS classes handle it with !important
      }}
    >
      {/* Hover shimmer — only on empty cells */}
      {!value && (
        <div
          className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 60%)' }}
        />
      )}

      {isX ? '✗' : isO ? '○' : ''}
    </button>
  )
})

export default Cell

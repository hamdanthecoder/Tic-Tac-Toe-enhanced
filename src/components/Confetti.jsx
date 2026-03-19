import { useMemo } from 'react'

const EXTRA = ['#f7c948', '#ffffff', '#a855f7']

export default function Confetti({ active, color1, color2 }) {
  const pieces = useMemo(() => {
    if (!active) return []
    const palette = [color1, color2, ...EXTRA]
    return Array.from({ length: 68 }, (_, i) => ({
      id:     i,
      left:   Math.random() * 100,
      color:  palette[i % palette.length],
      size:   6 + Math.random() * 8,
      circle: Math.random() < 0.5,
      dur:    1.4 + Math.random() * 1.2,
      delay:  Math.random() * 0.5,
    }))
  }, [active, color1, color2])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute -top-5"
          style={{
            left:         `${p.left}%`,
            width:        p.size,
            height:       p.size,
            background:   p.color,
            borderRadius: p.circle ? '50%' : '2px',
            animation:    `confettiFall ${p.dur}s ${p.delay}s linear forwards`,
          }}
        />
      ))}
    </div>
  )
}

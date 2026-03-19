import { useMemo } from 'react'

const COLORS = ['#ff6b6b', '#4ecdc4', '#f7c948', '#a855f7', '#3b82f6']

export default function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id:    i,
      size:  4 + Math.random() * 8,
      left:  Math.random() * 100,
      color: COLORS[i % COLORS.length],
      dur:   8 + Math.random() * 14,
      delay: -Math.random() * 18,
    }))
  , [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-0"
          style={{
            width:     p.size,
            height:    p.size,
            left:      `${p.left}%`,
            background: p.color,
            animation: `floatP ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}

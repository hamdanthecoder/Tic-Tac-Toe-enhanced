import PanelHeader from './PanelHeader'

const STEPS = [
  { n: 1, title: 'Player X always goes first.', desc: 'Click any empty cell to place your mark on the 3×3 board.' },
  { n: 2, title: 'Players alternate turns.',    desc: 'After X plays, O goes — back and forth until the game ends.' },
  { n: 3, title: 'Win by connecting 3.',        desc: 'Get 3 marks in a row — horizontal, vertical, or diagonal — and the cells glow!' },
  { n: 4, title: 'Draw if the board fills.',    desc: "If all 9 cells are taken with no winner, it's a draw. Use Next Round or Reset All." },
]

const EMOJIS = [
  '😐  Neutral — game just started',
  '😊  Happy — placed a mark',
  '😎  Confident — 2 in a row!',
  '😡  Angry — just got blocked',
  '🥳  Winner!',
  '😭  Loser — hang in there',
  '😤  Draw — stubborn standoff',
]

function Card({ children, accent = false }) {
  return (
    <div
      className="rounded-[18px] p-5 mb-3"
      style={{
        border:     `1.5px solid ${accent ? 'rgba(247,201,72,0.28)' : 'rgba(255,255,255,0.08)'}`,
        background: accent
          ? 'linear-gradient(135deg, rgba(247,201,72,0.07), rgba(255,107,107,0.05))'
          : 'rgba(18,18,26,0.95)',
      }}
    >
      {children}
    </div>
  )
}

export default function HowScreen({ onBack }) {
  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-8 relative z-10 overflow-y-auto">
      <div className="w-full max-w-sm">
        <PanelHeader title="How to Play" onBack={onBack} />

        {/* Objective */}
        <Card>
          <h3 className="font-bold text-[14px] text-white mb-2">🎯 Objective</h3>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Be the first player to get{' '}
            <strong className="text-white">3 of your marks in a row</strong>{' '}
            — horizontally, vertically, or diagonally.
          </p>
        </Card>

        {/* Steps */}
        <Card>
          <h3 className="font-bold text-[14px] text-white mb-3">📋 Steps</h3>
          <div className="flex flex-col gap-3">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-3 items-start">
                <div
                  className="w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center
                             text-[11px] font-black text-[#0a0a0f]"
                  style={{ background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)' }}
                >
                  {s.n}
                </div>
                <p className="text-[13px] text-white/50 leading-relaxed pt-[3px]">
                  <strong className="text-white">{s.title}</strong>{' '}{s.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Emoji Reactions */}
        <Card>
          <h3 className="font-bold text-[14px] text-white mb-2">😄 Emoji Reactions</h3>
          <ul className="pl-4 flex flex-col gap-1 list-disc">
            {EMOJIS.map((e) => (
              <li key={e} className="text-[13px] text-white/50">{e}</li>
            ))}
          </ul>
        </Card>

        {/* Strategy tip */}
        <Card accent>
          <h3 className="font-bold text-[14px] text-white mb-2">💡 Strategy Tip</h3>
          <p className="text-[13px] text-white/50 leading-relaxed">
            The <strong className="text-white">center cell</strong> is the strongest position — grab it
            first! Corners are second best. Always block when your opponent has 2-in-a-row.
          </p>
        </Card>
      </div>
    </div>
  )
}

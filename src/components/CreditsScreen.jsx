import { useState } from 'react'
import PanelHeader from './PanelHeader'

function TechPill({ label, teal = false }) {
  return (
    <span
      className="px-3 py-[3px] rounded-full text-[11px] font-mono"
      style={{
        border:     `1px solid ${teal ? 'rgba(78,205,196,0.35)' : 'rgba(255,255,255,0.1)'}`,
        background: teal ? 'rgba(78,205,196,0.05)' : 'rgba(255,255,255,0.03)',
        color:      teal ? 'rgba(78,205,196,0.7)'  : 'rgba(240,240,248,0.38)',
      }}
    >
      {label}
    </span>
  )
}

function SocialLink({ href, label, icon, hoverColor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-4 py-[9px] rounded-xl font-bold text-[13px]
                 transition-all duration-200 no-underline"
      style={{
        border:     `1px solid ${hovered ? hoverColor : 'rgba(255,255,255,0.1)'}`,
        background: hovered ? `${hoverColor}18` : 'rgba(26,26,40,0.9)',
        color:      hovered ? hoverColor        : 'rgba(240,240,248,0.6)',
      }}
    >
      <span className="text-base">{icon}</span>
      {label}
    </a>
  )
}

const DEV_PILLS  = ['React 18', 'Tailwind CSS','Javascript','Web Audio API', 'Vite']
const MUS_PILLS  = ['Web Audio API', 'Procedural Gen', 'Royalty-Free', 'Am Pentatonic']

export default function CreditsScreen({ onBack }) {
  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen px-5 py-8 overflow-y-auto">
      <div className="w-full max-w-sm">
        <PanelHeader title="Credits" onBack={onBack} />

         <div
          className="rounded-[18px] p-6 mb-3 text-center"
          style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)' }}
        >
          <div className="text-[44px] mb-[10px]">👨‍💻</div>
          <div className="font-black text-[18px] text-white">Shah Hamdan</div>
          <div className="font-mono text-[11px] text-white/38 mt-[3px]">
            Game Designer &amp; Developer
          </div>
 
          <div className="h-px my-4" style={{ background: 'rgba(255,255,255,0.07)' }} />
 
          <p className="text-[13px] text-white/48 leading-[1.75] mb-[14px]">
            A fully-featured Tic Tac Toe built with{' '}
            <span className="font-bold text-white/80">React 18</span> +{' '}
            <span className="font-bold text-white/80">Tailwind CSS</span>.
            Play <span className="font-bold text-white/80">2-Player local</span> or challenge the{' '}
            <span className="font-bold text-white/80">Bot AI</span> on Easy, Medium, or Hard (minimax).
            Includes live emoji reactions, win confetti, background music, SFX,
            score tracking, and a smooth dark neon UI with screen transitions.
          </p>
 

          {/* Tech pills */}
          <div className="flex flex-wrap gap-[7px] justify-center mb-4">
            {DEV_PILLS.map((t) => <TechPill key={t} label={t} />)}
          </div>

          {/* Social links */}
          <div className="flex gap-[10px] justify-center">
            <SocialLink
              href="https://instagram.com/shah.hamdan_"
              icon="📸"
              label="Instagram"
              hoverColor="#e1306c"
            />
            <SocialLink
              href="https://github.com/shahhamdan"
              icon="💻"
              label="GitHub"
              hoverColor="#e0e0e0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

import { SCREENS } from '../constants'
import Toggle from './Toggle'

const MENU_ITEMS = [
  { icon: '🎮', label: 'Play Game',   sub: 'PvP or vs Bot',          screen: SCREENS.MODE_SELECT, primary: true },
  { icon: '📖', label: 'How to Play', sub: 'Rules & game guide',     screen: SCREENS.HOW },
  { icon: '⚙️', label: 'Settings',   sub: 'Sound, music & options', screen: SCREENS.SETTINGS },
  { icon: '🏅', label: 'Credits',     sub: 'Built by shah hamdan',   screen: SCREENS.CREDITS },
]

export default function HomeScreen({ onNavigate, musicOn, onMusicToggle }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-8 relative z-10">

      {/* ── Logo ── */}
      <div className="text-center mb-9" style={{ animation: 'logoIn 0.8s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span
            className="text-5xl font-black leading-none"
            style={{ color: '#ff6b6b', textShadow: '0 0 30px rgba(255,107,107,0.55)' }}
          >✗</span>
          <span className="text-3xl text-white/25">·</span>
          <span
            className="text-5xl font-black leading-none"
            style={{ color: '#4ecdc4', textShadow: '0 0 30px rgba(78,205,196,0.55)' }}
          >○</span>
        </div>
        <h1 className="gradient-text text-[clamp(2rem,8vw,2.8rem)] font-black tracking-tight leading-none">
          TIC TAC TOE
        </h1>
        <p className="font-mono text-[11px] tracking-[0.25em] text-white/38 uppercase mt-[5px]">
          ✦ The Classic Game ✦
        </p>
      </div>

      {/* ── Menu items ── */}
      <div className="w-full max-w-sm flex flex-col gap-3" style={{ animation: 'fadeUp 0.6s ease 0.18s both' }}>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className="w-full px-6 py-4 rounded-2xl flex items-center gap-4 text-left
                       transition-all duration-200 active:scale-[0.98] group
                       hover:translate-x-1 hover:scale-[1.02]"
            style={{
              border:     `1.5px solid ${item.primary ? 'rgba(255,107,107,0.42)' : 'rgba(255,255,255,0.08)'}`,
              background: item.primary
                ? 'linear-gradient(135deg, rgba(255,107,107,0.13), rgba(78,205,196,0.13))'
                : 'rgba(18,18,26,0.95)',
            }}
          >
            <span className="text-[22px] w-7 text-center flex-shrink-0">{item.icon}</span>
            <div className="flex-1">
              <div className="font-bold text-[15px] text-white">{item.label}</div>
              <div className="font-mono text-[11px] text-white/38 mt-[2px]">{item.sub}</div>
            </div>
            <span className="text-white/28 text-xl group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-200">›</span>
          </button>
        ))}

        {/* ── Music row ── */}
        <div
          className="w-full px-5 py-[14px] rounded-2xl flex items-center justify-between"
          style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)', animation: 'fadeUp 0.6s ease 0.32s both' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[22px]">🎵</span>
            <div>
              <div className="font-bold text-[14px] text-white">Background Music</div>
              <div className="font-mono text-[11px] text-white/38 mt-[2px]">
                {musicOn ? '♪ Now playing' : 'Tap to enable'}
              </div>
            </div>
          </div>
          <Toggle on={musicOn} onChange={onMusicToggle} />
        </div>
      </div>
    </div>
  )
}

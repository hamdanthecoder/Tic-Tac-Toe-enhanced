import PanelHeader from './PanelHeader'
import Toggle from './Toggle'

export default function SettingsScreen({
  onBack,
  musicOn, onMusicToggle,
  sfxOn,   onSfxToggle,
  confOn,  onConfettiToggle,
  volume,  onVolume,
}) {
  const rows = [
    {
      icon:  '🎵',
      label: 'Background Music',
      sub:   'Ambient lo-fi loop — royalty-free',
      ctrl:  <Toggle on={musicOn} onChange={onMusicToggle} />,
    },
    {
      icon:  '🔔',
      label: 'Sound Effects',
      sub:   'Click, win & draw sounds',
      ctrl:  <Toggle on={sfxOn} onChange={onSfxToggle} />,
    },
    {
      icon:  '✨',
      label: 'Confetti Effects',
      sub:   'Celebrate wins with confetti',
      ctrl:  <Toggle on={confOn} onChange={onConfettiToggle} />,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-8 relative z-10">
      <div className="w-full max-w-sm">
        <PanelHeader title="Settings" onBack={onBack} />

        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-[18px] px-5 py-[17px] mb-[10px] flex items-center justify-between"
            style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{row.icon}</span>
              <div>
                <div className="font-bold text-[14px] text-white">{row.label}</div>
                <div className="font-mono text-[11px] text-white/38 mt-[2px]">{row.sub}</div>
              </div>
            </div>
            {row.ctrl}
          </div>
        ))}

        {/* Volume slider */}
        <div
          className="rounded-[18px] px-5 py-[17px] flex items-center justify-between"
          style={{ border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,26,0.95)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🔊</span>
            <div>
              <div className="font-bold text-[14px] text-white">Music Volume</div>
              <div className="font-mono text-[11px] text-white/38 mt-[2px]">Adjust loudness</div>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => onVolume(Number(e.target.value) / 100)}
            className="w-28 cursor-pointer accent-[#4ecdc4]"
          />
        </div>
      </div>
    </div>
  )
}

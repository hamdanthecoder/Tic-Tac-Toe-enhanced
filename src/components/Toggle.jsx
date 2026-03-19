export default function Toggle({ on, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative w-[52px] h-[28px] rounded-full cursor-pointer ${on ? 'toggle-on' : ''}`}
    >
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </button>
  )
}

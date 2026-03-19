export default function PanelHeader({ title, onBack }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-xl surface-card flex items-center justify-center
                   text-white/60 hover:text-white hover:border-white/20
                   hover:scale-105 transition-all duration-200 text-base"
      >
        ←
      </button>
      <h2 className="text-xl font-extrabold text-white">{title}</h2>
    </div>
  )
}

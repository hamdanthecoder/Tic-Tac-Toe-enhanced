export default function MusicBars({ on }) {
  return (
    <div className="flex items-end gap-[2px] h-[14px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-current"
          style={{
            height: on ? undefined : '4px',
            animation: on
              ? `musicBar 0.7s ${i * 0.15}s ease-in-out infinite alternate`
              : 'none',
          }}
        />
      ))}
    </div>
  )
}

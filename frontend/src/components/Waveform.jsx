// Abstract visual suggesting a voice waveform. Static, no fake product UI or data.
const BAR_HEIGHTS = [22, 38, 30, 52, 40, 64, 44, 56, 34, 48, 28, 40, 24];

export default function Waveform({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-end justify-center gap-[6px] sm:gap-2 ${className}`}
    >
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="w-[5px] sm:w-1.5 rounded-full bg-accent"
          style={{ height: `${h}%`, opacity: 0.35 + (h / 64) * 0.5 }}
        />
      ))}
    </div>
  );
}

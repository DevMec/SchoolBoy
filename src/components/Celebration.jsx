import CarSvg from './CarSvg.jsx'

const CONFETTI_COLORS = ['#F95738', '#FFD23F', '#4A90D9', '#7BC950', '#E63946', '#B8B8D1']

export default function Celebration({ car, onDone }) {
  const confetti = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i % 10) * 0.25}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 8 + (i % 3) * 5,
  }))

  return (
    <div className="celebration-overlay" onClick={onDone}>
      {confetti.map((c, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: c.left,
            animationDelay: c.delay,
            background: c.color,
            width: c.size,
            height: c.size,
          }}
        />
      ))}
      <div className="celebration-card">
        <h1>🎉 Nieuwe auto! 🎉</h1>
        <CarSvg car={car} size={240} className="celebrate-car" />
        <div className="celebration-name">{car.name}</div>
        <button className="big-btn play-btn" onClick={onDone}>
          🚗 Geweldig!
        </button>
      </div>
    </div>
  )
}

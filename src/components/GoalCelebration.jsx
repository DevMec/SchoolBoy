// Groot feest als het dagelijkse leerdoel is gehaald.
// De ouder ziet dit ook: tijd om de tablet te ontgrendelen!

const CONFETTI_COLORS = ['#F95738', '#FFD23F', '#4A90D9', '#7BC950', '#E63946', '#B8B8D1']

export default function GoalCelebration({ goalMinutes, onDone }) {
  const confetti = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i % 10) * 0.25}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 8 + (i % 3) * 5,
  }))

  return (
    <div className="celebration-overlay">
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
        <div className="goal-medal">🏅</div>
        <h1>Leerdoel gehaald!</h1>
        <p className="goal-text">
          Je hebt {goalMinutes} {goalMinutes === 1 ? 'minuut' : 'minuten'} geleerd.
          <br />
          Goed gewerkt! 🎉
          <br />
          <b>Laat het aan papa of mama zien!</b>
        </p>
        <button className="big-btn play-btn" onClick={onDone}>
          👍 Oké!
        </button>
      </div>
    </div>
  )
}

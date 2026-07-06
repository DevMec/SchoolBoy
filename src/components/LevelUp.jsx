// Feest bij het bereiken van een nieuw niveau.

const CONFETTI_COLORS = ['#F95738', '#FFD23F', '#4A90D9', '#7BC950', '#E63946', '#B8B8D1']

export default function LevelUp({ level, onDone }) {
  const confetti = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i % 10) * 0.25}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 8 + (i % 3) * 5,
  }))
  const isChampion = level.lessons === null

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
        <div className="goal-medal">{level.emoji}</div>
        <h1>{isChampion ? 'KAMPIOEN!' : `Niveau ${level.nr}!`}</h1>
        <p className="goal-text">
          {isChampion ? (
            <>Je hebt alle niveaus gehaald! Wat knap! 🏆</>
          ) : (
            <>
              Goed gewerkt! Nu ga je verder met:
              <br />
              <b>{level.name}</b>
            </>
          )}
        </p>
        <button className="big-btn play-btn" onClick={onDone}>
          🚀 Verder!
        </button>
      </div>
    </div>
  )
}

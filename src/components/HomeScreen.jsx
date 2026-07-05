import { currentCar } from '../data/cars.js'
import CarSvg from './CarSvg.jsx'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function HomeScreen({
  state,
  remainingSeconds,
  nextCar,
  onStartLesson,
  onOpenGarage,
  onOpenAdmin,
}) {
  const { lessonsCompleted } = state.progress
  const car = currentCar(lessonsCompleted)

  // Voortgang naar de volgende auto
  let progressPct = 100
  let lessonsToGo = 0
  if (nextCar) {
    const prevThreshold = car.lessons
    const span = nextCar.lessons - prevThreshold
    progressPct = Math.min(100, Math.round(((lessonsCompleted - prevThreshold) / span) * 100))
    lessonsToGo = nextCar.lessons - lessonsCompleted
  }

  return (
    <div className="screen home-screen">
      <header className="home-header">
        <div className="time-pill" title="Speeltijd over">
          ⏰ {formatTime(remainingSeconds)}
        </div>
        <button className="admin-link" onClick={onOpenAdmin} aria-label="Ouders">
          👨‍👩‍👦
        </button>
      </header>

      <h1 className="home-title">🚗 Auto Garage</h1>

      <div className="current-car" onClick={onOpenGarage}>
        <CarSvg car={car} size={220} className="bounce" />
        <div className="car-name">{car.name}</div>
      </div>

      {nextCar ? (
        <div className="next-car-panel">
          <div className="next-car-row">
            <span className="next-label">Volgende:</span>
            <CarSvg car={nextCar} size={70} locked />
            <span className="next-name">{nextCar.name}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="next-hint">
            Nog {lessonsToGo} {lessonsToGo === 1 ? 'les' : 'lessen'}!
          </div>
        </div>
      ) : (
        <div className="next-car-panel all-done">🏆 Alle auto's verdiend! Kampioen!</div>
      )}

      <button className="big-btn play-btn" onClick={onStartLesson}>
        ▶️ Spelen!
      </button>
      <button className="big-btn garage-btn" onClick={onOpenGarage}>
        🏠 Garage
      </button>
    </div>
  )
}

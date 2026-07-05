import { CARS } from '../data/cars.js'
import CarImage from './CarImage.jsx'

function CarSlot({ car, unlocked, lessonsCompleted }) {
  return (
    <div className={`garage-slot ${unlocked ? 'unlocked' : 'locked'}`}>
      <CarImage car={car} size="100%" locked={!unlocked} />
      <div className="garage-car-name">{unlocked ? car.name : '???'}</div>
      {!unlocked && (
        <div className="garage-need">nog {car.lessons - lessonsCompleted} lessen</div>
      )}
      {unlocked && <div className="garage-got">⭐</div>}
    </div>
  )
}

export default function GarageScreen({ lessonsCompleted, onBack }) {
  const normal = CARS.filter((c) => !c.super)
  const supers = CARS.filter((c) => c.super)

  return (
    <div className="screen garage-screen">
      <header className="lesson-header">
        <button className="quit-btn" onClick={onBack} aria-label="Terug">⬅️</button>
        <div className="lesson-title">🏠 Mijn Garage</div>
      </header>

      <div className="garage-grid">
        {normal.map((car) => (
          <CarSlot
            key={car.id}
            car={car}
            unlocked={lessonsCompleted >= car.lessons}
            lessonsCompleted={lessonsCompleted}
          />
        ))}
      </div>

      <div className="super-header">🏆 SUPER AUTO'S 🏆</div>
      <div className="garage-grid super-grid">
        {supers.map((car) => (
          <CarSlot
            key={car.id}
            car={car}
            unlocked={lessonsCompleted >= car.lessons}
            lessonsCompleted={lessonsCompleted}
          />
        ))}
      </div>
    </div>
  )
}

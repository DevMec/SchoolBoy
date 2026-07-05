import { CARS } from '../data/cars.js'
import CarImage from './CarImage.jsx'

export default function GarageScreen({ lessonsCompleted, onBack }) {
  return (
    <div className="screen garage-screen">
      <header className="lesson-header">
        <button className="quit-btn" onClick={onBack} aria-label="Terug">⬅️</button>
        <div className="lesson-title">🏠 Mijn Garage</div>
      </header>

      <div className="garage-grid">
        {CARS.map((car) => {
          const unlocked = lessonsCompleted >= car.lessons
          return (
            <div key={car.id} className={`garage-slot ${unlocked ? 'unlocked' : 'locked'}`}>
              <CarImage car={car} size="100%" locked={!unlocked} />
              <div className="garage-car-name">{unlocked ? car.name : '???'}</div>
              {!unlocked && (
                <div className="garage-need">
                  nog {car.lessons - lessonsCompleted} lessen
                </div>
              )}
              {unlocked && <div className="garage-got">⭐</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

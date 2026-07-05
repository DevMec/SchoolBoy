// Echte foto's van de auto's. Vergrendelde auto's zijn grijs met een slot.
import kever from '../assets/cars/kever.webp'
import mini from '../assets/cars/mini.webp'
import golf from '../assets/cars/golf.webp'
import jeep from '../assets/cars/jeep.webp'
import porsche from '../assets/cars/porsche.webp'
import ferrari from '../assets/cars/ferrari.webp'
import lambo from '../assets/cars/lambo.webp'

const PHOTOS = { kever, mini, golf, jeep, porsche, ferrari, lambo }

export default function CarImage({ car, size = 220, locked = false, className = '' }) {
  const width = typeof size === 'number' ? `${size}px` : size
  return (
    <div className={`car-photo ${locked ? 'locked' : ''} ${className}`} style={{ width }}>
      <img src={PHOTOS[car.id] || kever} alt={car.name} draggable="false" />
      {locked && <span className="car-lock">🔒</span>}
    </div>
  )
}

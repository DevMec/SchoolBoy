// Echte foto's van de auto's. Vergrendelde auto's zijn grijs met een slot.
import kever from '../assets/cars/kever.webp'
import citroen from '../assets/cars/citroen.webp'
import renault from '../assets/cars/renault.webp'
import peugeot from '../assets/cars/peugeot.webp'
import mini from '../assets/cars/mini.webp'
import skoda from '../assets/cars/skoda.webp'
import golf from '../assets/cars/golf.webp'
import jeep from '../assets/cars/jeep.webp'
import sealu from '../assets/cars/sealu.webp'
import porsche from '../assets/cars/porsche.webp'
import bmw from '../assets/cars/bmw.webp'
import audi from '../assets/cars/audi.webp'
import zeekr from '../assets/cars/zeekr.webp'
import xiaomi from '../assets/cars/xiaomi.webp'
import ferrari from '../assets/cars/ferrari.webp'
import u9 from '../assets/cars/u9.webp'
import lambo from '../assets/cars/lambo.webp'

const PHOTOS = {
  kever, citroen, renault, peugeot, mini, skoda, golf, jeep, sealu,
  porsche, bmw, audi, zeekr, xiaomi, ferrari, u9, lambo,
}

export default function CarImage({ car, size = 220, locked = false, className = '' }) {
  const width = typeof size === 'number' ? `${size}px` : size
  return (
    <div className={`car-photo ${locked ? 'locked' : ''} ${className}`} style={{ width }}>
      <img src={PHOTOS[car.id] || kever} alt={`${car.brand} ${car.name}`} draggable="false" />
      {locked && <span className="car-lock">🔒</span>}
    </div>
  )
}

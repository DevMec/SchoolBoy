// De auto-garage: 7 auto's die je verdient door lessen af te maken.
// 'lessons' = totaal aantal afgeronde lessen dat nodig is om deze auto te krijgen.

export const CARS = [
  {
    id: 'kever',
    name: 'VW Kever',
    lessons: 0,
    color: '#7BC950',
    accent: '#5CA13A',
    body: 'beetle',
    cheer: 'Je eerste auto! De groene Kever!',
  },
  {
    id: 'mini',
    name: 'Mini',
    lessons: 3,
    color: '#F95738',
    accent: '#C93A20',
    body: 'mini',
    cheer: 'Hoera! Je hebt de rode Mini verdiend!',
  },
  {
    id: 'golf',
    name: 'VW Golf',
    lessons: 7,
    color: '#4A90D9',
    accent: '#2F6CB0',
    body: 'hatch',
    cheer: 'Super! De blauwe Golf is van jou!',
  },
  {
    id: 'jeep',
    name: 'Jeep',
    lessons: 12,
    color: '#F4A259',
    accent: '#C77F35',
    body: 'jeep',
    cheer: 'Wauw! Een stoere Jeep!',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    lessons: 18,
    color: '#B8B8D1',
    accent: '#8E8EAF',
    body: 'sport',
    cheer: 'Geweldig! Een zilveren Porsche!',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    lessons: 25,
    color: '#E63946',
    accent: '#B02733',
    body: 'super',
    cheer: 'Fantastisch! De rode Ferrari!',
  },
  {
    id: 'lambo',
    name: 'Lamborghini',
    lessons: 35,
    color: '#FFD23F',
    accent: '#D9AC1E',
    body: 'super',
    cheer: 'JE HEBT HET GEHAALD! De gele Lamborghini is van jou! Kampioen!',
  },
]

export function unlockedCars(lessonsCompleted) {
  return CARS.filter((c) => lessonsCompleted >= c.lessons)
}

export function currentCar(lessonsCompleted) {
  const cars = unlockedCars(lessonsCompleted)
  return cars[cars.length - 1] || CARS[0]
}

export function nextCar(lessonsCompleted) {
  return CARS.find((c) => lessonsCompleted < c.lessons) || null
}

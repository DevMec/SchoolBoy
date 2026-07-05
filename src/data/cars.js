// De auto-garage: 7 auto's die je verdient door lessen af te maken.
// 'lessons' = totaal aantal afgeronde lessen dat nodig is om deze auto te krijgen.

export const CARS = [
  {
    id: 'kever',
    name: 'VW Kever',
    lessons: 0,
    cheer: 'Je eerste auto! De rode Kever!',
  },
  {
    id: 'mini',
    name: 'Mini',
    lessons: 3,
    cheer: 'Hoera! Je hebt de stoere Mini verdiend!',
  },
  {
    id: 'golf',
    name: 'VW Golf',
    lessons: 7,
    cheer: 'Super! De gele Golf is van jou!',
  },
  {
    id: 'jeep',
    name: 'Jeep',
    lessons: 12,
    cheer: 'Wauw! Een grote blauwe Jeep!',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    lessons: 18,
    cheer: 'Geweldig! Een zwarte Porsche racewagen!',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    lessons: 25,
    cheer: 'Fantastisch! De rode Ferrari!',
  },
  {
    id: 'lambo',
    name: 'Lamborghini',
    lessons: 35,
    cheer: 'JE HEBT HET GEHAALD! De groene Lamborghini is van jou! Kampioen!',
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

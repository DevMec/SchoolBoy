// De auto-garage: 11 auto's die je verdient door lessen af te maken.
// 'lessons' = totaal aantal afgeronde lessen dat nodig is om deze auto te krijgen.
// De super auto's (Porsche, Ferrari, Lamborghini) komen pas op het eind:
// de eerste als je alle 24 lessen (niveau 1-3) hebt gehaald.

export const CARS = [
  { id: 'kever',   name: 'VW Kever',    lessons: 0,  cheer: 'Je eerste auto! De rode Kever!' },
  { id: 'citroen', name: 'Citroën C3',  lessons: 3,  cheer: 'Hoera! De witte Citroën is van jou!' },
  { id: 'renault', name: 'Renault 5',   lessons: 6,  cheer: 'Super! De gele Renault!' },
  { id: 'peugeot', name: 'Peugeot 208', lessons: 9,  cheer: 'Knap hoor! De groene Peugeot! Niveau 1 gehaald — jij kent de letters!' },
  { id: 'mini',    name: 'Mini',        lessons: 12, cheer: 'Hoera! Je hebt de stoere Mini verdiend!' },
  { id: 'skoda',   name: 'Škoda',       lessons: 14, cheer: 'Wauw! De zilveren Škoda! Niveau 2 gehaald — jij kunt klanken plakken!' },
  { id: 'golf',    name: 'VW Golf',     lessons: 18, cheer: 'Super! De gele Golf is van jou!' },
  { id: 'jeep',    name: 'Jeep',        lessons: 21, cheer: 'Wauw! Een grote blauwe Jeep!' },
  { id: 'porsche', name: 'Porsche',     lessons: 24, super: true, cheer: 'SUPER AUTO! De zwarte Porsche racewagen! Niveau 3 gehaald — jij kunt lezen!' },
  { id: 'ferrari', name: 'Ferrari',     lessons: 30, super: true, cheer: 'SUPER AUTO! De rode Ferrari!' },
  { id: 'lambo',   name: 'Lamborghini', lessons: 38, super: true, cheer: 'JE HEBT HET GEHAALD! De groene Lamborghini is van jou! Kampioen!' },
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

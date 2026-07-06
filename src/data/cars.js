// De auto-garage: 17 auto's die je verdient door lessen af te maken.
// 'lessons' = totaal aantal afgeronde lessen dat nodig is voor deze auto.
// Gewone auto's tijdens niveau 1-4; de super auto's zijn voor kampioenen.

export const CARS = [
  { id: 'kever',   brand: 'Volkswagen',  name: 'Kever',     lessons: 0,  cheer: 'Je eerste auto! De rode Volkswagen Kever!' },
  { id: 'citroen', brand: 'Citroën',     name: 'C3',        lessons: 3,  cheer: 'Hoera! De witte Citroën is van jou!' },
  { id: 'renault', brand: 'Renault',     name: 'R5',        lessons: 6,  cheer: 'Super! De gele Renault!' },
  { id: 'peugeot', brand: 'Peugeot',     name: '208',       lessons: 9,  cheer: 'Knap hoor! De groene Peugeot is van jou!' },
  { id: 'mini',    brand: 'MINI',        name: 'Cooper',    lessons: 12, cheer: 'Hoera! Je hebt de stoere Mini verdiend!' },
  { id: 'skoda',   brand: 'Škoda',       name: 'Karoq',     lessons: 15, cheer: 'Wauw! De zilveren Škoda is van jou!' },
  { id: 'golf',    brand: 'Volkswagen',  name: 'Golf',      lessons: 18, cheer: 'Super! De gele Golf is van jou!' },
  { id: 'jeep',    brand: 'Jeep',        name: 'Commander', lessons: 21, cheer: 'Wauw! Een grote blauwe Jeep!' },
  { id: 'sealu',   brand: 'BYD',         name: 'Seal U',    lessons: 25, cheer: 'Geweldig! De grote BYD is van jou!' },

  // ── Super auto's ──
  { id: 'porsche', brand: 'Porsche',     name: '911 GT3',   lessons: 30, super: true, cheer: 'SUPER AUTO! De zwarte Porsche racewagen is van jou!' },
  { id: 'bmw',     brand: 'BMW',         name: 'M4',        lessons: 34, super: true, cheer: 'SUPER AUTO! De grijze BMW M4!' },
  { id: 'audi',    brand: 'Audi',        name: 'RS6',       lessons: 38, super: true, cheer: 'SUPER AUTO! De snelle Audi RS6!' },
  { id: 'zeekr',   brand: 'Zeekr',       name: '001 FR',    lessons: 42, super: true, cheer: 'SUPER AUTO! De supersnelle Zeekr!' },
  { id: 'xiaomi',  brand: 'Xiaomi',      name: 'SU7 Ultra', lessons: 46, super: true, cheer: 'SUPER AUTO! De gele Xiaomi racewagen!' },
  { id: 'ferrari', brand: 'Ferrari',     name: 'SF90',      lessons: 50, super: true, cheer: 'SUPER AUTO! De rode Ferrari!' },
  { id: 'u9',      brand: 'Yangwang',    name: 'U9',        lessons: 55, super: true, cheer: 'WAUW! De Yangwang U9 met vleugeldeuren!' },
  { id: 'lambo',   brand: 'Lamborghini', name: 'Aventador', lessons: 60, super: true, cheer: 'JE HEBT HET GEHAALD! De groene Lamborghini is van jou! Kampioen!' },
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

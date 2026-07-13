// Bepaalt alle teksten waarvoor we audio genereren (met edge-tts in CI).
// Uitvoer: JSON-lijst [{ key, text, rate }] op stdout.
import { LESSONS, LEVELS, KAMPIOEN } from '../src/data/content.js'
import { CARS } from '../src/data/cars.js'

const VOWELS = 'aeiou'
function syllableSpeechForm(s) {
  const low = s.toLowerCase()
  if (low.length === 2 && !VOWELS.includes(low[0]) && VOWELS.includes(low[1])) {
    const v = low[1]
    return low[0] + (v === 'i' ? 'ie' : v + v)
  }
  return low
}

export function slug(t) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

const texts = []
const seen = new Set()
function add(key, text, rate) {
  if (seen.has(key)) return
  seen.add(key)
  texts.push({ key, text, rate })
}

// Losse letters: expliciete Nederlandse letternamen, anders leest de stem
// een kale 'a' of 'e' verkeerd voor (klonk als 'é').
const LETTER_NAMES = {
  a: 'aa', b: 'bee', c: 'cee', d: 'dee', e: 'ee', f: 'ef', g: 'gee',
  h: 'haa', i: 'ie', j: 'jee', k: 'kaa', l: 'el', m: 'em', n: 'en',
  o: 'oo', p: 'pee', q: 'kuu', r: 'er', s: 'es', t: 'tee', u: 'uu',
  v: 'vee', w: 'wee', x: 'iks', y: 'ypsilon', z: 'zet',
}
for (const [ch, name] of Object.entries(LETTER_NAMES)) {
  add(`l-${ch}`, name, '-40%')
}

// Handmatig vastgezette spreekvormen voor koppige clips: als een lettergreep
// verkeerd blijft klinken, zet hier de tekst die de stem WEL goed leest.
const OVERRIDES = {
  // 's-va': 'vaa',
}

// Lettergrepen en klankcombinaties uit de lessen.
// De stem spelt onbekende lettergrepen als afkorting ("maa" → "m, a, a").
// Daarom krijgen ze meerdere kandidaat-spellingen; de workflow checkt met
// spraakherkenning (Whisper) welke kandidaat echt als één klank wordt gelezen.
for (const lesson of LESSONS) {
  if (lesson.type === 'syllables') {
    for (const item of lesson.items) {
      const s = item.toLowerCase()
      const key = `s-${s}`
      if (seen.has(key)) continue
      seen.add(key)
      if (OVERRIDES[key]) {
        texts.push({ key, text: OVERRIDES[key], rate: '-35%' })
        continue
      }
      const base = syllableSpeechForm(s)
      const candidates = [...new Set([`${base}.`, base, s, `${s}!`])]
      texts.push({ key, candidates, target: s, rate: '-35%' })
    }
  }
  if (lesson.type === 'words') {
    for (const { word } of lesson.items) {
      add(`w-${slug(word)}`, word, '-25%')
    }
  }
}

// Vaste zinnetjes uit de app
const PHRASES = [
  'Goed zo!',
  'Super!',
  'Knap hoor!',
  'Heel goed!',
  'Top!',
  'Probeer nog een keer!',
  'Bijna! Probeer nog een keer.',
  'Lees het woord hardop!',
  'Lees dit hardop!',
  'Bijna goed! We oefenen deze les nog een keer.',
  'Hoera! Je leerdoel is gehaald! Ga het maar aan papa of mama laten zien!',
  'Jij bent een kampioen! Je hebt alle niveaus gehaald!',
]
for (const level of LEVELS) {
  PHRASES.push(`Super! Jij bent nu op niveau ${level.nr}: ${level.name}!`)
}
for (const car of CARS) {
  PHRASES.push(car.cheer)
}
for (const p of PHRASES) {
  add(`p-${slug(p)}`, p, '-15%')
}

process.stdout.write(JSON.stringify(texts, null, 1))

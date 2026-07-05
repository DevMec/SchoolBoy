// Leerinhoud: letters, klanken samenvoegen (b + a = ba) en woorden.
// Lestypes:
//  - 'letters':   letters herkennen. Eerst een korte check: kent hij de letter
//                 al (in één keer goed), dan wordt die als 'gekend' geteld en
//                 niet meer geoefend. Fout? Dan uitleg + extra oefening.
//  - 'syllables': klanken plakken: hoor "b", "a" ... "ba" en tik de juiste.
//                 Dit is de kern van leren lezen.
//  - 'words':     woorden met plaatje (hoor het woord, tik het / vul de letter in)

export const LESSONS = [
  // ══ NIVEAU 1: eerst alle letters leren ══
  { id: 'let-1', type: 'letters', title: 'Letters: A · O · E', emoji: '🅰️', items: ['A', 'O', 'E'] },
  { id: 'let-2', type: 'letters', title: 'Letters: I · U', emoji: '✏️', items: ['I', 'U', 'A'] },
  { id: 'let-3', type: 'letters', title: 'Letters: M · P · S', emoji: '📚', items: ['M', 'P', 'S'] },
  { id: 'let-4', type: 'letters', title: 'Letters: K · T · N', emoji: '🔤', items: ['K', 'T', 'N'] },
  { id: 'let-5', type: 'letters', title: 'Letters: B · D · R', emoji: '🖍️', items: ['B', 'D', 'R'] },
  { id: 'let-6', type: 'letters', title: 'Letters: V · W · H', emoji: '📖', items: ['V', 'W', 'H'] },
  { id: 'let-7', type: 'letters', title: 'Letters: G · J · L', emoji: '🎨', items: ['G', 'J', 'L'] },
  { id: 'let-8', type: 'letters', title: 'Letters: F · Z · C', emoji: '🧸', items: ['F', 'Z', 'C'] },
  { id: 'let-9', type: 'letters', title: 'Letters: X · Y · Q', emoji: '🌟', items: ['X', 'Y', 'Q'] },

  // ══ NIVEAU 2: klanken plakken (b + a = ba) ══
  { id: 'syl-1', type: 'syllables', title: 'Plakken: ma · po · sa', emoji: '🧲', items: ['ma', 'po', 'sa', 'mo'] },
  { id: 'syl-2', type: 'syllables', title: 'Plakken: ka · to · nu', emoji: '🧩', items: ['ka', 'to', 'nu', 'ta'] },
  { id: 'syl-3', type: 'syllables', title: 'Plakken: ba · do · re', emoji: '🚗', items: ['ba', 'do', 're', 'bo'] },
  { id: 'syl-4', type: 'syllables', title: 'Plakken: va · wo · ha', emoji: '🎈', items: ['va', 'wo', 'ha', 'we'] },
  { id: 'syl-5', type: 'syllables', title: 'Plakken: ga · jo · la', emoji: '⭐', items: ['ga', 'jo', 'la', 'lo'] },

  // ══ NIVEAU 3: woorden lezen ══

  // ── woorden met plaatjes ──
  {
    id: 'wrd-1', type: 'words', title: 'Woorden: dieren', emoji: '🐱',
    items: [
      { word: 'kat', image: '🐱' },
      { word: 'vis', image: '🐟' },
      { word: 'koe', image: '🐮' },
      { word: 'aap', image: '🐵' },
    ],
  },
  {
    id: 'wrd-2', type: 'words', title: 'Woorden: thuis', emoji: '🏠',
    items: [
      { word: 'huis', image: '🏠' },
      { word: 'bed', image: '🛏️' },
      { word: 'deur', image: '🚪' },
      { word: 'stoel', image: '🪑' },
    ],
  },
  {
    id: 'wrd-3', type: 'words', title: "Woorden: auto's", emoji: '🚗',
    items: [
      { word: 'auto', image: '🚗' },
      { word: 'bus', image: '🚌' },
      { word: 'fiets', image: '🚲' },
      { word: 'boot', image: '⛵' },
    ],
  },
  {
    id: 'wrd-4', type: 'words', title: 'Woorden: kleuren', emoji: '🌈',
    items: [
      { word: 'rood', image: '🔴' },
      { word: 'blauw', image: '🔵' },
      { word: 'groen', image: '🟢' },
      { word: 'geel', image: '🟡' },
    ],
  },
  {
    id: 'wrd-5', type: 'words', title: 'Woorden: eten', emoji: '🍎',
    items: [
      { word: 'appel', image: '🍎' },
      { word: 'kaas', image: '🧀' },
      { word: 'brood', image: '🍞' },
      { word: 'ei', image: '🥚' },
    ],
  },
  {
    id: 'wrd-6', type: 'words', title: 'Woorden: familie', emoji: '👨‍👩‍👦',
    items: [
      { word: 'mama', image: '👩' },
      { word: 'papa', image: '👨' },
      { word: 'opa', image: '👴' },
      { word: 'oma', image: '👵' },
    ],
  },
  {
    id: 'wrd-7', type: 'words', title: 'Woorden: buiten', emoji: '☀️',
    items: [
      { word: 'zon', image: '☀️' },
      { word: 'maan', image: '🌙' },
      { word: 'boom', image: '🌳' },
      { word: 'ster', image: '⭐' },
    ],
  },
  {
    id: 'wrd-8', type: 'words', title: 'Woorden: lichaam', emoji: '👀',
    items: [
      { word: 'oog', image: '👁️' },
      { word: 'oor', image: '👂' },
      { word: 'neus', image: '👃' },
      { word: 'hand', image: '✋' },
    ],
  },
  {
    id: 'wrd-9', type: 'words', title: 'Woorden: groot & klein', emoji: '🐘',
    items: [
      { word: 'groot', image: '🐘' },
      { word: 'klein', image: '🐭' },
      { word: 'snel', image: '🏎️' },
      { word: 'hond', image: '🐶' },
    ],
  },
  {
    id: 'wrd-10', type: 'words', title: 'Woorden: dieren 2', emoji: '🦁',
    items: [
      { word: 'leeuw', image: '🦁' },
      { word: 'beer', image: '🐻' },
      { word: 'kip', image: '🐔' },
      { word: 'eend', image: '🦆' },
    ],
  },
]

export const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// ── Niveaus ──
// Niveau 1: lessen 0-8 (letters), niveau 2: 9-13 (plakken),
// niveau 3: 14-23 (woorden), daarna: kampioen (herhalen + super auto's).
export const LEVELS = [
  { nr: 1, name: 'Letters', emoji: '🔤', endAt: 9 },
  { nr: 2, name: 'Plakken', emoji: '🧲', endAt: 14 },
  { nr: 3, name: 'Woorden', emoji: '📖', endAt: 24 },
  { nr: 4, name: 'Kampioen', emoji: '🏆', endAt: Infinity },
]

export function levelFor(lessonsCompleted) {
  return LEVELS.find((l) => lessonsCompleted < l.endAt) || LEVELS[LEVELS.length - 1]
}

// Welke les is nu aan de beurt? Na alle lessen: herhalen (blijft leuk & telt mee).
export function lessonForIndex(index) {
  if (index < LESSONS.length) return LESSONS[index]
  // Herhaalronde: wissel af tussen alle lessen
  return LESSONS[index % LESSONS.length]
}

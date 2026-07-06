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

  // ══ NIVEAU 2: klanken plakken (b + a = ba, en andersom: i + k = ik) ══
  { id: 'syl-1', type: 'syllables', title: 'Plakken: ma · po · sa', emoji: '🧲', items: ['ma', 'po', 'sa', 'mo'] },
  { id: 'syl-2', type: 'syllables', title: 'Plakken: ka · to · nu', emoji: '🧩', items: ['ka', 'to', 'nu', 'ta'] },
  { id: 'syl-3', type: 'syllables', title: 'Plakken: ba · do · re', emoji: '🚗', items: ['ba', 'do', 're', 'bo'] },
  { id: 'syl-4', type: 'syllables', title: 'Plakken: va · wo · ha', emoji: '🎈', items: ['va', 'wo', 'ha', 'we'] },
  { id: 'syl-5', type: 'syllables', title: 'Plakken: ga · jo · la', emoji: '⭐', items: ['ga', 'jo', 'la', 'lo'] },
  { id: 'syl-6', type: 'syllables', title: 'Plakken: ik · op · an', emoji: '🎯', items: ['ik', 'op', 'an', 'us'] },

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

  // ══ NIVEAU 3: samengestelde klanken — twee letters samen, één klank ══
  // oe klinkt als "oe" (boek), ij klinkt als "ei", ui/eu zijn eigen klanken.
  { id: 'kmb-1', type: 'syllables', title: 'Samen: oe · ie · aa · ee', emoji: '🔗', items: ['oe', 'ie', 'aa', 'ee'] },
  { id: 'kmb-2', type: 'syllables', title: 'Samen: ij · ui · eu · ou', emoji: '🪄', items: ['ij', 'ui', 'eu', 'ou'] },
  { id: 'kmb-3', type: 'syllables', title: 'Samen: au · ei · oo · uu', emoji: '🎵', items: ['au', 'ei', 'oo', 'uu'] },

  // ══ NIVEAU 5: moeilijkere woorden (met samengestelde klanken en langer) ══
  {
    id: 'hrd-1', type: 'words', title: 'Woorden met oe', emoji: '📖',
    items: [
      { word: 'boek', image: '📖' },
      { word: 'broek', image: '👖' },
      { word: 'voet', image: '🦶' },
      { word: 'bloem', image: '🌸' },
    ],
  },
  {
    id: 'hrd-2', type: 'words', title: 'Woorden met ij en ui', emoji: '🍦',
    items: [
      { word: 'ijs', image: '🍦' },
      { word: 'muis', image: '🐭' },
      { word: 'ui', image: '🧅' },
      { word: 'duim', image: '👍' },
    ],
  },
  {
    id: 'hrd-3', type: 'words', title: 'Moeilijke woorden', emoji: '🚂',
    items: [
      { word: 'trein', image: '🚂' },
      { word: 'kleur', image: '🎨' },
      { word: 'vuur', image: '🔥' },
      { word: 'zeep', image: '🧼' },
    ],
  },
  {
    id: 'hrd-4', type: 'words', title: 'Lange woorden', emoji: '🦋',
    items: [
      { word: 'schoen', image: '👟' },
      { word: 'vogel', image: '🐦' },
      { word: 'water', image: '💧' },
      { word: 'vlinder', image: '🦋' },
    ],
  },
  {
    id: 'hrd-5', type: 'words', title: 'Lange woorden 2', emoji: '🐘',
    items: [
      { word: 'olifant', image: '🐘' },
      { word: 'banaan', image: '🍌' },
      { word: 'tomaat', image: '🍅' },
      { word: 'wortel', image: '🥕' },
    ],
  },
]

export const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// ── Niveaus op basis van beheersing ──
// Je gaat pas naar het volgende niveau als elke les van het niveau één keer
// FOUTLOOS is gemaakt ('gemeesterd'). Fouten? Dan komt die les later terug.
// Zo blijft een kind vanzelf langer oefenen, of gaat snel door als het al kan.
export const LEVELS = [
  { nr: 1, name: 'Letters', emoji: '🔤', lessons: ['let-1', 'let-2', 'let-3', 'let-4', 'let-5', 'let-6', 'let-7', 'let-8', 'let-9'] },
  { nr: 2, name: 'Plakken', emoji: '🧲', lessons: ['syl-1', 'syl-2', 'syl-3', 'syl-4', 'syl-5', 'syl-6'] },
  { nr: 3, name: 'Klanken', emoji: '🪄', lessons: ['kmb-1', 'kmb-2', 'kmb-3'] },
  { nr: 4, name: 'Woorden', emoji: '📖', lessons: ['wrd-1', 'wrd-2', 'wrd-3', 'wrd-4', 'wrd-5', 'wrd-6', 'wrd-7', 'wrd-8', 'wrd-9', 'wrd-10'] },
  { nr: 5, name: 'Moeilijke woorden', emoji: '🚀', lessons: ['hrd-1', 'hrd-2', 'hrd-3', 'hrd-4', 'hrd-5'] },
]

export const KAMPIOEN = { nr: 6, name: 'Kampioen', emoji: '🏆', lessons: null }

// Huidig niveau: het eerste niveau met nog niet-gemeesterde lessen.
export function levelFor(masteredLessons) {
  return (
    LEVELS.find((l) => l.lessons.some((id) => !masteredLessons.includes(id))) ||
    KAMPIOEN
  )
}

// Welke les is nu aan de beurt? Binnen het niveau wisselen we tussen de
// nog niet-gemeesterde lessen. Kampioen? Dan alles blijven herhalen.
export function selectLesson(masteredLessons, lessonsCompleted) {
  const level = levelFor(masteredLessons)
  if (!level.lessons) {
    return LESSONS[lessonsCompleted % LESSONS.length]
  }
  const pool = level.lessons.filter((id) => !masteredLessons.includes(id))
  const id = pool[lessonsCompleted % pool.length]
  return LESSONS.find((l) => l.id === id) || LESSONS[0]
}

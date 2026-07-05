// Leerinhoud: letters en woorden voor een kind van 5 jaar.
// Elke les heeft een titel, een emoji en een lijst items.
// Lestypes:
//  - 'letters': letters leren herkennen (hoor de letter, tik de juiste)
//  - 'words':   woorden met plaatje (hoor het woord, tik het / vul de letter in)

export const LESSONS = [
  // ── Fase 1: klinkers eerst, dan medeklinkers in kleine groepjes ──
  { id: 'let-1', type: 'letters', title: 'Letters: A · O · E', emoji: '🅰️', items: ['A', 'O', 'E'] },
  { id: 'let-2', type: 'letters', title: 'Letters: I · U', emoji: '✏️', items: ['I', 'U', 'A'] },
  { id: 'let-3', type: 'letters', title: 'Letters: M · P · S', emoji: '📚', items: ['M', 'P', 'S'] },
  { id: 'let-4', type: 'letters', title: 'Letters: K · T · N', emoji: '🔤', items: ['K', 'T', 'N'] },
  { id: 'let-5', type: 'letters', title: 'Letters: B · D · R', emoji: '🖍️', items: ['B', 'D', 'R'] },
  { id: 'let-6', type: 'letters', title: 'Letters: V · W · H', emoji: '📖', items: ['V', 'W', 'H'] },
  { id: 'let-7', type: 'letters', title: 'Letters: G · J · L', emoji: '🎨', items: ['G', 'J', 'L'] },
  { id: 'let-8', type: 'letters', title: 'Letters: F · Z · C', emoji: '🧩', items: ['F', 'Z', 'C'] },
  { id: 'let-9', type: 'letters', title: 'Letters: X · Y · Q', emoji: '⭐', items: ['X', 'Y', 'Q'] },

  // ── Fase 2: korte woorden met plaatjes ──
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

// Nederlandse uitspraak van losse letters (voor tekst-naar-spraak).
export const LETTER_SOUNDS = {
  A: 'aa', B: 'bee', C: 'see', D: 'dee', E: 'ee', F: 'ef', G: 'gee',
  H: 'haa', I: 'ie', J: 'jee', K: 'kaa', L: 'el', M: 'em', N: 'en',
  O: 'oo', P: 'pee', Q: 'kuu', R: 'er', S: 'es', T: 'tee', U: 'uu',
  V: 'vee', W: 'wee', X: 'iks', Y: 'griekse ei', Z: 'zet',
}

// Welke les is nu aan de beurt? Na alle lessen: herhalen (blijft leuk & telt mee).
export function lessonForIndex(index) {
  if (index < LESSONS.length) return LESSONS[index]
  // Herhaalronde: wissel af tussen alle lessen
  return LESSONS[index % LESSONS.length]
}

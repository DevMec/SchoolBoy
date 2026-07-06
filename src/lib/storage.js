// Alles wordt lokaal opgeslagen (LocalStorage) — werkt offline, geen account nodig.

const KEY = 'schoolboy-v1'

const DEFAULTS = {
  settings: {
    pin: '1234',
    dailyLimitMin: 45, // dagelijkse speeltijd in minuten
    bonusPerLessonMin: 10, // extra minuten per afgeronde les
    goalMinutes: 15, // dagelijks leerdoel in minuten (0 = uit)
  },
  progress: {
    lessonsCompleted: 0,
    totalSeconds: 0,
    celebratedCars: ['kever'], // starterauto is al gevierd
    knownLetters: [], // letters die hij al kent (in één keer goed beantwoord)
    masteredLessons: [], // lessen die één keer foutloos zijn gemaakt
  },
  today: {
    date: '', // 'YYYY-MM-DD'
    secondsUsed: 0,
    bonusSeconds: 0,
    lessonsToday: 0,
    goalDone: false, // leerdoel van vandaag gehaald (en gevierd)?
  },
}

export function todayKey() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function loadState() {
  let saved = {}
  try {
    saved = JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    saved = {}
  }
  const state = {
    settings: { ...DEFAULTS.settings, ...saved.settings },
    progress: { ...DEFAULTS.progress, ...saved.progress },
    today: { ...DEFAULTS.today, ...saved.today },
  }
  // Nieuwe dag? Teller op nul.
  if (state.today.date !== todayKey()) {
    state.today = { ...DEFAULTS.today, date: todayKey() }
  }
  return state
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // opslag vol of niet beschikbaar — stil negeren
  }
}

export function resetAllProgress() {
  const state = loadState()
  state.progress = { ...DEFAULTS.progress }
  state.today = { ...DEFAULTS.today, date: todayKey() }
  saveState(state)
  return state
}

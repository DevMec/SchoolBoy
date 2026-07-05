import { useEffect, useMemo, useRef, useState } from 'react'
import { ALL_LETTERS } from '../data/content.js'
import {
  speak,
  speakLetter,
  speakBlend,
  speakSyllable,
  playCorrect,
  playWrong,
} from '../lib/audio.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickDistractors(pool, exclude, count) {
  return shuffle(pool.filter((x) => !exclude.includes(x))).slice(0, count)
}

const PRAISE = ['Goed zo!', 'Super!', 'Knap hoor!', 'Heel goed!', 'Top!']
function praise() {
  speak(PRAISE[Math.floor(Math.random() * PRAISE.length)], { rate: 0.85 })
}

/*
 * Stappen-model: elke les is een rijtje stappen dat tijdens de les kan
 * groeien (adaptief).
 *  - { kind: 'learn-letter', letter }          uitlegkaart: dit is de letter X
 *  - { kind: 'quiz-letter', letter, placement } hoor de letter, tik hem aan
 *  - { kind: 'learn-syllable', syl }           uitlegkaart: b + a = ba
 *  - { kind: 'quiz-syllable', syl }            hoor "ba", tik hem aan
 *  - { kind: 'intro-word', item }              kijk & luister: woord + plaatje
 *  - { kind: 'quiz-word', item }               welk woord hoort bij het plaatje
 *  - { kind: 'quiz-blank', item }              welke letter mist er
 *
 * Letters starten met een korte check (placement): in één keer goed = letter
 * gekend, klaar. Fout = uitlegkaart + extra herhaling achteraan.
 */
function initialSteps(lesson, knownLetters) {
  if (lesson.type === 'letters') {
    // Al gekende letters maar één keer kort herhalen, de rest checken we ook —
    // maar elke letter begint gewoon met een vraag (geen les vooraf).
    return shuffle(lesson.items).map((letter) => ({
      kind: 'quiz-letter',
      letter,
      placement: true,
      known: knownLetters.includes(letter),
    }))
  }

  if (lesson.type === 'syllables') {
    const steps = []
    for (const syl of lesson.items.slice(0, 2)) steps.push({ kind: 'learn-syllable', syl })
    for (const syl of shuffle(lesson.items)) steps.push({ kind: 'quiz-syllable', syl })
    return steps
  }

  // words
  const steps = lesson.items.map((item) => ({ kind: 'intro-word', item }))
  shuffle(lesson.items).forEach((item, i) => {
    steps.push(i % 2 === 0 ? { kind: 'quiz-word', item } : { kind: 'quiz-blank', item })
  })
  for (const item of shuffle(lesson.items).slice(0, 2)) steps.push({ kind: 'quiz-word', item })
  return steps
}

// Opties voor een quizstap
function buildOptions(step, lesson) {
  if (step.kind === 'quiz-letter') {
    return shuffle([step.letter, ...pickDistractors(ALL_LETTERS, [step.letter], 2)])
  }
  if (step.kind === 'quiz-syllable') {
    return shuffle([step.syl, ...pickDistractors(lesson.items, [step.syl], 2)])
  }
  if (step.kind === 'quiz-word') {
    const words = lesson.items.map((w) => w.word)
    return shuffle([step.item.word, ...pickDistractors(words, [step.item.word], 2)])
  }
  if (step.kind === 'quiz-blank') {
    const pos = step.pos
    const missing = step.item.word[pos].toUpperCase()
    return shuffle([missing, ...pickDistractors(ALL_LETTERS, [missing], 2)])
  }
  return []
}

export default function LessonScreen({ lesson, knownLetters, onLetterKnown, onComplete, onQuit }) {
  const [steps, setSteps] = useState(() => {
    const s = initialSteps(lesson, knownLetters)
    // vul quiz-blank posities alvast in
    return s.map((st) =>
      st.kind === 'quiz-blank'
        ? { ...st, pos: Math.floor(Math.random() * st.item.word.length) }
        : st
    )
  })
  const [idx, setIdx] = useState(0)
  const [wrongPicks, setWrongPicks] = useState([])
  const [solved, setSolved] = useState(false)
  const madeErrorRef = useRef(false)

  const step = steps[idx]
  const options = useMemo(
    () => (step ? buildOptions(step, lesson) : []),
    // nieuwe opties per stap
    [idx, steps.length] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const totalQuiz = steps.length

  // Spreek de opdracht uit bij elke nieuwe stap
  useEffect(() => {
    if (!step) return
    const t = setTimeout(() => {
      if (step.kind === 'quiz-letter') speakLetter(step.letter)
      if (step.kind === 'quiz-syllable') speakSyllable(step.syl)
      if (step.kind === 'quiz-word') speak(step.item.word, { rate: 0.6 })
      if (step.kind === 'quiz-blank') speak(step.item.word, { rate: 0.6 })
      if (step.kind === 'learn-letter') speakLetter(step.letter)
      if (step.kind === 'learn-syllable') speakBlend(step.syl)
      if (step.kind === 'intro-word') speak(step.item.word, { rate: 0.6 })
    }, 350)
    return () => clearTimeout(t)
  }, [idx]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!step) return null

  function goNext(extraSteps = null) {
    const nextSteps = extraSteps || steps
    if (idx + 1 >= nextSteps.length) {
      onComplete()
      return
    }
    if (extraSteps) setSteps(extraSteps)
    setIdx(idx + 1)
    setWrongPicks([])
    setSolved(false)
    madeErrorRef.current = false
  }

  function target() {
    if (step.kind === 'quiz-letter') return step.letter
    if (step.kind === 'quiz-syllable') return step.syl
    if (step.kind === 'quiz-word') return step.item.word
    if (step.kind === 'quiz-blank') return step.item.word[step.pos].toUpperCase()
    return null
  }

  function pick(option) {
    if (solved) return
    if (option === target()) {
      setSolved(true)
      playCorrect()
      praise()

      let nextSteps = steps
      if (step.kind === 'quiz-letter' && step.placement) {
        if (!madeErrorRef.current) {
          // In één keer goed: deze letter is gekend — niet meer oefenen.
          onLetterKnown(step.letter)
        } else {
          // Fout gehad: uitlegkaart direct erna + extra vraag aan het eind.
          nextSteps = [...steps]
          nextSteps.splice(idx + 1, 0, { kind: 'learn-letter', letter: step.letter })
          nextSteps.push({ kind: 'quiz-letter', letter: step.letter, placement: false })
        }
      }
      setTimeout(() => goNext(nextSteps), 1100)
    } else {
      madeErrorRef.current = true
      playWrong()
      setWrongPicks((w) => [...w, option])
      speak('Probeer nog een keer!', { rate: 0.85 })
    }
  }

  const isQuiz = step.kind.startsWith('quiz')

  return (
    <div className="screen lesson-screen">
      <header className="lesson-header">
        <button className="quit-btn" onClick={onQuit} aria-label="Stoppen">✖️</button>
        <div className="quiz-progress">
          {steps.map((_, i) => (
            <span key={i} className={`dot ${i < idx ? 'done' : i === idx ? 'active' : ''}`} />
          ))}
        </div>
      </header>

      {/* ── Uitlegkaarten ── */}
      {step.kind === 'learn-letter' && (
        <>
          <div className="intro-card" onClick={() => speakLetter(step.letter)}>
            <div className="intro-letter">{step.letter}</div>
            <div className="intro-hint">🔊 Tik om te horen</div>
          </div>
          <button className="big-btn play-btn" onClick={() => goNext()}>✔️ Verder</button>
        </>
      )}

      {step.kind === 'learn-syllable' && (
        <>
          <div className="intro-card" onClick={() => speakBlend(step.syl)}>
            <div className="blend-row">
              <span className="blend-letter">{step.syl[0].toUpperCase()}</span>
              <span className="blend-plus">+</span>
              <span className="blend-letter">{step.syl[1].toUpperCase()}</span>
              <span className="blend-plus">=</span>
              <span className="blend-result">{step.syl}</span>
            </div>
            <div className="intro-hint">🔊 Tik om te horen</div>
          </div>
          <button className="big-btn play-btn" onClick={() => goNext()}>✔️ Verder</button>
        </>
      )}

      {step.kind === 'intro-word' && (
        <>
          <div className="intro-card" onClick={() => speak(step.item.word, { rate: 0.6 })}>
            <div className="intro-image">{step.item.image}</div>
            <div className="intro-word">{step.item.word}</div>
            <div className="intro-hint">🔊 Tik om te horen</div>
          </div>
          <button className="big-btn play-btn" onClick={() => goNext()}>✔️ Verder</button>
        </>
      )}

      {/* ── Quizstappen ── */}
      {step.kind === 'quiz-letter' && (
        <>
          <button className="hear-btn" onClick={() => speakLetter(step.letter)}>
            🔊 Luister
          </button>
          <div className="quiz-prompt">Welke letter hoor je?</div>
        </>
      )}

      {step.kind === 'quiz-syllable' && (
        <>
          <button className="hear-btn" onClick={() => speakSyllable(step.syl)}>
            🔊 Luister
          </button>
          <div className="quiz-prompt">Wat hoor je? Plak de klanken!</div>
        </>
      )}

      {step.kind === 'quiz-word' && (
        <>
          <div className="quiz-image" onClick={() => speak(step.item.word, { rate: 0.6 })}>
            {step.item.image}
          </div>
          <div className="quiz-prompt">Welk woord is dit?</div>
        </>
      )}

      {step.kind === 'quiz-blank' && (
        <>
          <div className="quiz-image" onClick={() => speak(step.item.word, { rate: 0.6 })}>
            {step.item.image}
          </div>
          <div className="blank-word">
            {step.item.word.split('').map((ch, i) => (
              <span key={i} className={`blank-char ${i === step.pos ? 'missing' : ''}`}>
                {i === step.pos ? (solved ? ch : '_') : ch}
              </span>
            ))}
          </div>
          <div className="quiz-prompt">Welke letter mist er?</div>
        </>
      )}

      {isQuiz && (
        <div className={`options ${step.kind === 'quiz-word' ? 'word-options' : ''}`}>
          {options.map((option) => {
            const wrong = wrongPicks.includes(option)
            const correct = solved && option === target()
            return (
              <button
                key={option}
                className={`option-btn ${wrong ? 'wrong' : ''} ${correct ? 'correct' : ''}`}
                disabled={wrong}
                onClick={() => pick(option)}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}

      {solved && <div className="praise">🌟 Goed zo! 🌟</div>}
    </div>
  )
}

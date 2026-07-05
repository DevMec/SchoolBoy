import { useEffect, useMemo, useState } from 'react'
import { ALL_LETTERS } from '../data/content.js'
import { speak, speakLetter, playCorrect, playWrong } from '../lib/audio.js'

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

// Bouw de vragen voor een les
function buildQuestions(lesson) {
  const questions = []
  if (lesson.type === 'letters') {
    // 2 rondes over de letters van deze les
    for (let round = 0; round < 2; round++) {
      for (const letter of shuffle(lesson.items)) {
        questions.push({
          kind: 'tap-letter',
          target: letter,
          options: shuffle([letter, ...pickDistractors(ALL_LETTERS, [letter], 2)]),
        })
      }
    }
  } else {
    // woorden: afwisselend "tik het woord" en "vul de letter in"
    const words = shuffle(lesson.items)
    words.forEach((item, i) => {
      if (i % 2 === 0) {
        const others = pickDistractors(
          lesson.items.map((w) => w.word),
          [item.word],
          2
        )
        questions.push({
          kind: 'tap-word',
          target: item.word,
          image: item.image,
          options: shuffle([item.word, ...others]),
        })
      } else {
        const pos = Math.floor(Math.random() * item.word.length)
        const missing = item.word[pos].toUpperCase()
        questions.push({
          kind: 'fill-blank',
          target: missing,
          word: item.word,
          pos,
          image: item.image,
          options: shuffle([missing, ...pickDistractors(ALL_LETTERS, [missing], 2)]),
        })
      }
    })
    // nog 2 extra tik-vragen zodat elke les ~6 vragen heeft
    for (const item of shuffle(lesson.items).slice(0, 2)) {
      const others = pickDistractors(
        lesson.items.map((w) => w.word),
        [item.word],
        2
      )
      questions.push({
        kind: 'tap-word',
        target: item.word,
        image: item.image,
        options: shuffle([item.word, ...others]),
      })
    }
  }
  return questions
}

function speakPrompt(q) {
  if (q.kind === 'tap-letter') speak(`Tik op de letter ... `)
  if (q.kind === 'tap-word') speak(`Tik op het woord ${q.target}`)
  if (q.kind === 'fill-blank') speak(`Welke letter mist er in ${q.word}?`)
}

export default function LessonScreen({ lesson, onComplete, onQuit }) {
  const [phase, setPhase] = useState('intro') // intro | quiz
  const [introIndex, setIntroIndex] = useState(0)
  const questions = useMemo(() => buildQuestions(lesson), [lesson])
  const [qIndex, setQIndex] = useState(0)
  const [wrongPicks, setWrongPicks] = useState([])
  const [solved, setSolved] = useState(false)

  const q = questions[qIndex]

  // Spreek de opdracht uit bij elke nieuwe vraag
  useEffect(() => {
    if (phase !== 'quiz' || !q) return
    const t = setTimeout(() => {
      if (q.kind === 'tap-letter') {
        speak('Tik op de letter')
        setTimeout(() => speakLetter(q.target), 1100)
      } else {
        speakPrompt(q)
      }
    }, 300)
    return () => clearTimeout(t)
  }, [phase, qIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Intro: items één voor één bekijken en beluisteren ──
  if (phase === 'intro') {
    const isLetters = lesson.type === 'letters'
    const items = lesson.items
    const item = items[introIndex]
    const label = isLetters ? item : item.word
    const image = isLetters ? null : item.image

    return (
      <div className="screen lesson-screen">
        <header className="lesson-header">
          <button className="quit-btn" onClick={onQuit} aria-label="Stoppen">✖️</button>
          <div className="lesson-title">{lesson.emoji} {lesson.title}</div>
        </header>

        <div
          className="intro-card"
          onClick={() => (isLetters ? speakLetter(item) : speak(item.word))}
        >
          {image && <div className="intro-image">{image}</div>}
          <div className={isLetters ? 'intro-letter' : 'intro-word'}>{label}</div>
          <div className="intro-hint">🔊 Tik om te horen</div>
        </div>

        <div className="intro-nav">
          {introIndex > 0 && (
            <button className="big-btn nav-btn" onClick={() => setIntroIndex(introIndex - 1)}>
              ⬅️
            </button>
          )}
          {introIndex < items.length - 1 ? (
            <button className="big-btn nav-btn next" onClick={() => setIntroIndex(introIndex + 1)}>
              ➡️
            </button>
          ) : (
            <button
              className="big-btn play-btn"
              onClick={() => {
                setPhase('quiz')
              }}
            >
              🎮 Start!
            </button>
          )}
        </div>

        <div className="dots">
          {items.map((_, i) => (
            <span key={i} className={`dot ${i === introIndex ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    )
  }

  // ── Quiz ──
  function pick(option) {
    if (solved) return
    if (option === q.target) {
      setSolved(true)
      playCorrect()
      const praise = ['Goed zo!', 'Super!', 'Knap hoor!', 'Heel goed!', 'Top!']
      speak(praise[Math.floor(Math.random() * praise.length)])
      setTimeout(() => {
        if (qIndex + 1 >= questions.length) {
          onComplete()
        } else {
          setQIndex(qIndex + 1)
          setWrongPicks([])
          setSolved(false)
        }
      }, 1200)
    } else {
      playWrong()
      setWrongPicks((w) => [...w, option])
      speak('Probeer nog een keer!')
    }
  }

  return (
    <div className="screen lesson-screen">
      <header className="lesson-header">
        <button className="quit-btn" onClick={onQuit} aria-label="Stoppen">✖️</button>
        <div className="quiz-progress">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`dot ${i < qIndex ? 'done' : i === qIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </header>

      {q.kind === 'tap-letter' && (
        <>
          <button className="hear-btn" onClick={() => speakLetter(q.target)}>
            🔊 Luister
          </button>
          <div className="quiz-prompt">Tik op de letter!</div>
        </>
      )}

      {q.kind === 'tap-word' && (
        <>
          <div className="quiz-image" onClick={() => speak(q.target)}>{q.image}</div>
          <div className="quiz-prompt">Welk woord is dit?</div>
        </>
      )}

      {q.kind === 'fill-blank' && (
        <>
          <div className="quiz-image" onClick={() => speak(q.word)}>{q.image}</div>
          <div className="blank-word">
            {q.word.split('').map((ch, i) => (
              <span key={i} className={`blank-char ${i === q.pos ? 'missing' : ''}`}>
                {i === q.pos ? (solved ? ch : '_') : ch}
              </span>
            ))}
          </div>
          <div className="quiz-prompt">Welke letter mist er?</div>
        </>
      )}

      <div className={`options ${q.kind === 'tap-word' ? 'word-options' : ''}`}>
        {q.options.map((option) => {
          const wrong = wrongPicks.includes(option)
          const correct = solved && option === q.target
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

      {solved && <div className="praise">🌟 Goed zo! 🌟</div>}
    </div>
  )
}

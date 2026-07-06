import { useEffect, useRef, useState } from 'react'
import { loadState, saveState, todayKey, resetAllProgress } from './lib/storage.js'
import { CARS, nextCar } from './data/cars.js'
import { selectLesson, levelFor } from './data/content.js'
import { playFanfare, speak } from './lib/audio.js'
import HomeScreen from './components/HomeScreen.jsx'
import LessonScreen from './components/LessonScreen.jsx'
import GarageScreen from './components/GarageScreen.jsx'
import AdminScreen from './components/AdminScreen.jsx'
import BlockedScreen from './components/BlockedScreen.jsx'
import Celebration from './components/Celebration.jsx'
import GoalCelebration from './components/GoalCelebration.jsx'
import LevelUp from './components/LevelUp.jsx'

export default function App() {
  const [state, setState] = useState(loadState)
  const [screen, setScreen] = useState('home') // home | lesson | garage | admin
  const [celebration, setCelebration] = useState(null)
  const [goalCelebration, setGoalCelebration] = useState(false)
  const [levelUp, setLevelUp] = useState(null)
  const pendingLevelUpRef = useRef(null)
  const stateRef = useRef(state)
  stateRef.current = state

  // Opslaan bij elke wijziging
  useEffect(() => {
    saveState(state)
  }, [state])

  const limitSeconds =
    state.settings.dailyLimitMin * 60 + state.today.bonusSeconds
  const remainingSeconds = Math.max(0, limitSeconds - state.today.secondsUsed)
  const isBlocked = remainingSeconds <= 0 && screen !== 'admin'

  // Tijd tikt alleen op kinder-schermen (niet in het ouderpaneel of als geblokkeerd)
  const ticking = !isBlocked && screen !== 'admin'
  useEffect(() => {
    if (!ticking) return
    const id = setInterval(() => {
      setState((s) => {
        // Nieuwe dag? Teller resetten.
        if (s.today.date !== todayKey()) {
          return {
            ...s,
            today: { date: todayKey(), secondsUsed: 0, bonusSeconds: 0, lessonsToday: 0, goalDone: false },
          }
        }
        return {
          ...s,
          today: { ...s.today, secondsUsed: s.today.secondsUsed + 1 },
          progress: { ...s.progress, totalSeconds: s.progress.totalSeconds + 1 },
        }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [ticking])

  // Leerdoel van vandaag gehaald? Eén keer per dag groot vieren.
  const goalSeconds = (state.settings.goalMinutes || 0) * 60
  useEffect(() => {
    if (goalSeconds > 0 && !state.today.goalDone && state.today.secondsUsed >= goalSeconds) {
      setState((s) => ({ ...s, today: { ...s.today, goalDone: true } }))
      setGoalCelebration(true)
      playFanfare()
      speak('Hoera! Je leerdoel is gehaald! Ga het maar aan papa of mama laten zien!')
    }
  }, [state.today.secondsUsed, goalSeconds]) // eslint-disable-line react-hooks/exhaustive-deps

  // De les die nu aan de beurt is (op basis van beheersing)
  const masteredLessons = state.progress.masteredLessons || []
  const currentLesson = selectLesson(masteredLessons, state.progress.lessonsCompleted)

  function handleLessonComplete(flawless) {
    setState((s) => {
      const lessonsCompleted = s.progress.lessonsCompleted + 1
      const prevMastered = s.progress.masteredLessons || []
      // Foutloos afgerond? Dan is deze les gemeesterd.
      const newMastered =
        flawless && !prevMastered.includes(currentLesson.id)
          ? [...prevMastered, currentLesson.id]
          : prevMastered

      const next = {
        ...s,
        progress: { ...s.progress, lessonsCompleted, masteredLessons: newMastered },
        today: {
          ...s.today,
          lessonsToday: s.today.lessonsToday + 1,
          bonusSeconds: s.today.bonusSeconds + s.settings.bonusPerLessonMin * 60,
        },
      }

      // Niveau omhoog?
      const before = levelFor(prevMastered)
      const after = levelFor(newMastered)
      const leveledUp = after.nr !== before.nr ? after : null

      // Nieuwe auto verdiend?
      const earned = CARS.find(
        (c) => lessonsCompleted >= c.lessons && !s.progress.celebratedCars.includes(c.id)
      )
      if (earned) {
        next.progress.celebratedCars = [...s.progress.celebratedCars, earned.id]
        if (leveledUp) pendingLevelUpRef.current = leveledUp // na de auto vieren
        setTimeout(() => {
          setCelebration(earned)
          playFanfare()
          speak(earned.cheer)
        }, 400)
      } else if (leveledUp) {
        setTimeout(() => {
          setLevelUp(leveledUp)
          playFanfare()
          speak(
            leveledUp.lessons === null
              ? 'Jij bent een kampioen! Je hebt alle niveaus gehaald!'
              : `Super! Jij bent nu op niveau ${leveledUp.nr}: ${leveledUp.name}!`
          )
        }, 400)
      }
      return next
    })
    setScreen('home')
  }

  function handleCelebrationDone() {
    setCelebration(null)
    if (pendingLevelUpRef.current) {
      const lvl = pendingLevelUpRef.current
      pendingLevelUpRef.current = null
      setLevelUp(lvl)
      playFanfare()
      speak(
        lvl.lessons === null
          ? 'Jij bent een kampioen! Je hebt alle niveaus gehaald!'
          : `Super! Jij bent nu op niveau ${lvl.nr}: ${lvl.name}!`
      )
    }
  }

  function handleLetterKnown(letter) {
    setState((s) =>
      s.progress.knownLetters.includes(letter)
        ? s
        : {
            ...s,
            progress: {
              ...s.progress,
              knownLetters: [...s.progress.knownLetters, letter],
            },
          }
    )
  }

  function updateSettings(patch) {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
  }

  function grantExtraTime(minutes) {
    setState((s) => ({
      ...s,
      today: { ...s.today, bonusSeconds: s.today.bonusSeconds + minutes * 60 },
    }))
  }

  // Voor testen vanuit het ouderpaneel: spring naar een niveau door de
  // eerdere niveaus als gemeesterd te markeren.
  function setProgressTo(masteredIds) {
    setState((s) => ({
      ...s,
      progress: {
        ...s.progress,
        masteredLessons: masteredIds,
        lessonsCompleted: masteredIds.length,
        // auto's tot hier gelden als al gevierd (geen feestjes-inhaalslag)
        celebratedCars: CARS.filter((c) => c.lessons <= masteredIds.length).map((c) => c.id),
      },
    }))
  }

  function resetToday() {
    setState((s) => ({
      ...s,
      today: { date: todayKey(), secondsUsed: 0, bonusSeconds: 0, lessonsToday: 0, goalDone: false },
    }))
  }

  function handleResetAll() {
    setState(resetAllProgress())
  }

  const shared = {
    state,
    remainingSeconds,
    nextCar: nextCar(state.progress.lessonsCompleted),
  }

  return (
    <div className="app">
      {celebration && (
        <Celebration car={celebration} onDone={handleCelebrationDone} />
      )}
      {levelUp && <LevelUp level={levelUp} onDone={() => setLevelUp(null)} />}
      {goalCelebration && (
        <GoalCelebration
          goalMinutes={state.settings.goalMinutes}
          onDone={() => setGoalCelebration(false)}
        />
      )}

      {isBlocked ? (
        <BlockedScreen onOpenAdmin={() => setScreen('admin')} />
      ) : screen === 'home' ? (
        <HomeScreen
          {...shared}
          onStartLesson={() => setScreen('lesson')}
          onOpenGarage={() => setScreen('garage')}
          onOpenAdmin={() => setScreen('admin')}
        />
      ) : screen === 'lesson' ? (
        <LessonScreen
          key={`${currentLesson.id}-${state.progress.lessonsCompleted}`}
          lesson={currentLesson}
          knownLetters={state.progress.knownLetters || []}
          onLetterKnown={handleLetterKnown}
          onComplete={handleLessonComplete}
          onQuit={() => setScreen('home')}
        />
      ) : screen === 'garage' ? (
        <GarageScreen
          lessonsCompleted={state.progress.lessonsCompleted}
          onBack={() => setScreen('home')}
        />
      ) : (
        <AdminScreen
          state={state}
          remainingSeconds={remainingSeconds}
          onUpdateSettings={updateSettings}
          onGrantTime={grantExtraTime}
          onResetToday={resetToday}
          onResetAll={handleResetAll}
          onSetProgress={setProgressTo}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  )
}

import { useState } from 'react'
import { CARS, unlockedCars } from '../data/cars.js'
import { LEVELS, levelFor } from '../data/content.js'

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}u ${m}m` : `${m} min`
}

// Springen naar niveau X = alle lessen van de niveaus ervoor als
// gemeesterd markeren.
const LEVEL_JUMPS = [
  ...LEVELS.map((level, i) => ({
    label: `${level.emoji} Niveau ${level.nr} · ${level.name}`,
    mastered: LEVELS.slice(0, i).flatMap((l) => l.lessons),
  })),
  { label: '🏆 Kampioen (alles af)', mastered: LEVELS.flatMap((l) => l.lessons) },
]

export default function AdminScreen({
  state,
  remainingSeconds,
  onUpdateSettings,
  onGrantTime,
  onResetToday,
  onResetAll,
  onSetProgress,
  onBack,
}) {
  const [entered, setEntered] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const [newPin, setNewPin] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  // ── PIN-scherm ──
  if (!unlocked) {
    function press(digit) {
      const next = entered + digit
      if (next.length < 4) {
        setEntered(next)
        setError(false)
        return
      }
      if (next === state.settings.pin) {
        setUnlocked(true)
      } else {
        setError(true)
        setEntered('')
      }
    }

    return (
      <div className="screen pin-screen">
        <header className="lesson-header">
          <button className="quit-btn" onClick={onBack} aria-label="Terug">⬅️</button>
          <div className="lesson-title">🔒 Voor ouders</div>
        </header>
        <p className="pin-hint">Voer de pincode in</p>
        <div className={`pin-dots ${error ? 'pin-error' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`pin-dot ${i < entered.length ? 'filled' : ''}`} />
          ))}
        </div>
        {error && <p className="pin-wrong">Verkeerde code, probeer opnieuw</p>}
        <div className="pin-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((key, i) =>
            key === '' ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                className="pin-key"
                onClick={() =>
                  key === '⌫' ? setEntered(entered.slice(0, -1)) : press(String(key))
                }
              >
                {key}
              </button>
            )
          )}
        </div>
      </div>
    )
  }

  // ── Ouderpaneel ──
  const { settings, progress, today } = state
  const cars = unlockedCars(progress.lessonsCompleted)

  return (
    <div className="screen admin-screen">
      <header className="lesson-header">
        <button className="quit-btn" onClick={onBack} aria-label="Terug">⬅️</button>
        <div className="lesson-title">⚙️ Ouderpaneel</div>
      </header>

      <section className="admin-section">
        <h2>📊 Vandaag</h2>
        <div className="stat-row"><span>Gespeeld</span><b>{formatDuration(today.secondsUsed)}</b></div>
        <div className="stat-row"><span>Nog over</span><b>{formatDuration(remainingSeconds)}</b></div>
        <div className="stat-row"><span>Lessen vandaag</span><b>{today.lessonsToday}</b></div>
        <div className="stat-row"><span>Bonustijd verdiend</span><b>{formatDuration(today.bonusSeconds)}</b></div>
      </section>

      <section className="admin-section">
        <h2>🏆 Totaal</h2>
        <div className="stat-row"><span>Lessen afgerond</span><b>{progress.lessonsCompleted}</b></div>
        <div className="stat-row"><span>Totale speeltijd</span><b>{formatDuration(progress.totalSeconds)}</b></div>
        <div className="stat-row"><span>Auto's verdiend</span><b>{cars.length} van {CARS.length}</b></div>
      </section>

      <section className="admin-section">
        <h2>⏰ Tijdslimiet</h2>
        <label className="admin-label">Dagelijkse speeltijd: <b>{settings.dailyLimitMin} min</b></label>
        <input
          type="range"
          min="10"
          max="120"
          step="5"
          value={settings.dailyLimitMin}
          onChange={(e) => onUpdateSettings({ dailyLimitMin: Number(e.target.value) })}
        />
        <label className="admin-label">Bonus per les: <b>{settings.bonusPerLessonMin} min</b></label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={settings.bonusPerLessonMin}
          onChange={(e) => onUpdateSettings({ bonusPerLessonMin: Number(e.target.value) })}
        />
        <label className="admin-label">
          Leerdoel per dag: <b>{settings.goalMinutes > 0 ? `${settings.goalMinutes} min` : 'uit'}</b>
        </label>
        <input
          type="range"
          min="0"
          max="60"
          step="5"
          value={settings.goalMinutes ?? 15}
          onChange={(e) => onUpdateSettings({ goalMinutes: Number(e.target.value) })}
        />
        <p className="admin-note">
          Tip: zet de tablet vast op deze app (Instellingen → Beveiliging →
          App vastzetten). Als het leerdoel is gehaald, verschijnt er een
          grote medaille — dan mag de tablet weer los.
        </p>
        <div className="admin-buttons">
          <button className="admin-btn" onClick={() => onGrantTime(15)}>➕ 15 min extra vandaag</button>
          <button className="admin-btn" onClick={onResetToday}>🔓 Timer vandaag resetten</button>
        </div>
      </section>

      <section className="admin-section">
        <h2>🧪 Niveau kiezen (voor testen)</h2>
        <p className="admin-note">
          Nu: niveau {levelFor(progress.masteredLessons || []).nr} ·{' '}
          {(progress.masteredLessons || []).length} lessen gemeesterd,{' '}
          {progress.lessonsCompleted} lessen gedaan. Spring naar het begin van
          een niveau om het uit te proberen:
        </p>
        <div className="admin-buttons">
          {LEVEL_JUMPS.map((jump) => (
            <button
              key={jump.label}
              className="admin-btn"
              onClick={() => onSetProgress(jump.mastered)}
            >
              {jump.label}
            </button>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>🔑 Pincode wijzigen</h2>
        <div className="pin-change">
          <input
            type="tel"
            inputMode="numeric"
            maxLength={4}
            placeholder="Nieuwe pincode (4 cijfers)"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          />
          <button
            className="admin-btn"
            disabled={newPin.length !== 4}
            onClick={() => {
              onUpdateSettings({ pin: newPin })
              setNewPin('')
            }}
          >
            Opslaan
          </button>
        </div>
      </section>

      <section className="admin-section danger">
        <h2>⚠️ Opnieuw beginnen</h2>
        {confirmReset ? (
          <div className="admin-buttons">
            <button className="admin-btn danger-btn" onClick={() => { onResetAll(); setConfirmReset(false) }}>
              Ja, wis alle voortgang
            </button>
            <button className="admin-btn" onClick={() => setConfirmReset(false)}>Annuleren</button>
          </div>
        ) : (
          <button className="admin-btn danger-btn" onClick={() => setConfirmReset(true)}>
            🗑️ Alle voortgang wissen
          </button>
        )}
      </section>
    </div>
  )
}

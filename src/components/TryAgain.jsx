// De les had foutjes: bemoedigend scherm, daarna dezelfde les opnieuw.
export default function TryAgain({ onRetry, onQuit }) {
  return (
    <div className="celebration-overlay">
      <div className="celebration-card">
        <div className="goal-medal">💪</div>
        <h1>Bijna!</h1>
        <p className="goal-text">
          Je had een paar foutjes.
          <br />
          We oefenen deze les <b>nog een keer</b> — jij kan het!
        </p>
        <button className="big-btn play-btn" onClick={onRetry}>
          🔁 Nog een keer!
        </button>
        <button className="skip-btn" onClick={onQuit}>
          Stoppen voor nu
        </button>
      </div>
    </div>
  )
}

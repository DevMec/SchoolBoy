export default function BlockedScreen({ onOpenAdmin }) {
  return (
    <div className="screen blocked-screen">
      <div className="blocked-emoji">😴</div>
      <h1>Tijd om te rusten!</h1>
      <p className="blocked-text">
        De speeltijd is op voor vandaag.
        <br />
        Morgen mag je weer spelen! 🌙
      </p>
      <button className="admin-link blocked-admin" onClick={onOpenAdmin}>
        👨‍👩‍👦 Ouders
      </button>
    </div>
  )
}

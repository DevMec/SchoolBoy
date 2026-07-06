// Spraakherkenning: het kind leest hardop, wij checken of het klopt.
// Werkt in Chrome op Android/desktop (heeft microfoon + internet nodig).

function Recognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

export function canRecognize() {
  return !!Recognition()
}

// Luister één keer en geef de gehoorde tekst terug (lowercase).
export function listenOnce({ timeoutMs = 7000 } = {}) {
  return new Promise((resolve, reject) => {
    const R = Recognition()
    if (!R) {
      reject(new Error('geen spraakherkenning'))
      return
    }
    const rec = new R()
    rec.lang = 'nl-NL'
    rec.interimResults = false
    rec.maxAlternatives = 5
    let done = false
    const timer = setTimeout(() => {
      if (!done) {
        done = true
        try { rec.abort() } catch { /* al gestopt */ }
        reject(new Error('timeout'))
      }
    }, timeoutMs)

    rec.onresult = (e) => {
      if (done) return
      done = true
      clearTimeout(timer)
      const alternatives = []
      for (const alt of e.results[0]) alternatives.push(alt.transcript.toLowerCase().trim())
      resolve(alternatives)
    }
    rec.onerror = (e) => {
      if (done) return
      done = true
      clearTimeout(timer)
      reject(new Error(e.error || 'fout'))
    }
    rec.onend = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      reject(new Error('niets gehoord'))
    }
    try {
      rec.start()
    } catch (err) {
      done = true
      clearTimeout(timer)
      reject(err)
    }
  })
}

// Is het doelwoord (ongeveer) gezegd?
export function matches(alternatives, target) {
  const t = target.toLowerCase()
  return alternatives.some((a) => {
    if (a.includes(t)) return true
    // kleine afwijking toestaan (1 letter verschil)
    return a.split(/\s+/).some((w) => levenshtein(w, t) <= 1)
  })
}

function levenshtein(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 99
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
  return dp[a.length][b.length]
}

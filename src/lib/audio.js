// Geluid: Nederlandse tekst-naar-spraak + vrolijke toontjes via WebAudio.

let dutchVoice = null

function pickDutchVoice() {
  if (dutchVoice) return dutchVoice
  const voices = window.speechSynthesis?.getVoices() || []
  dutchVoice =
    voices.find((v) => v.lang === 'nl-NL') ||
    voices.find((v) => v.lang?.startsWith('nl')) ||
    null
  return dutchVoice
}

// Stemmen laden soms pas na een event
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    dutchVoice = null
    pickDutchVoice()
  }
}

function utter(text, rate, pitch = 1.05) {
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'nl-NL'
  u.rate = rate
  u.pitch = pitch
  const voice = pickDutchVoice()
  if (voice) u.voice = voice
  return u
}

// Zinnen: rustig tempo voor een kind van 5
export function speak(text, { rate = 0.72 } = {}) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter(text, rate))
}

// Losse letter: laat de stem de letter zelf uitspreken (geen fonetische
// omspelling meer — dat klonk dubbel, "oo" i.p.v. "o"). Extra langzaam.
export function speakLetter(letter) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter(letter.toLowerCase(), 0.55))
}

// Klanken plakken: "b" ... "a" ... "ba" na elkaar
export function speakBlend(syllable) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const [first, second] = syllable.split('')
  window.speechSynthesis.speak(utter(first, 0.5))
  window.speechSynthesis.speak(utter(second, 0.5))
  window.speechSynthesis.speak(utter(syllable, 0.55))
}

export function speakSyllable(syllable) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter(syllable, 0.55))
}

// ── Vrolijke geluidjes ──
let audioCtx = null
function ctx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function tone(freq, start, duration, type = 'sine', volume = 0.25) {
  const ac = ctx()
  if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, ac.currentTime + start)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + duration)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(ac.currentTime + start)
  osc.stop(ac.currentTime + start + duration)
}

export function playCorrect() {
  tone(523, 0, 0.15, 'sine')
  tone(659, 0.12, 0.15, 'sine')
  tone(784, 0.24, 0.25, 'sine')
}

export function playWrong() {
  tone(220, 0, 0.25, 'triangle', 0.15)
}

export function playFanfare() {
  const notes = [523, 659, 784, 1047, 784, 1047]
  notes.forEach((f, i) => tone(f, i * 0.14, 0.2, 'square', 0.12))
}

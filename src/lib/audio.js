// Geluid: eerst vooraf gegenereerde audio (hoge kwaliteit, altijd hetzelfde),
// anders tekst-naar-spraak van het apparaat als reserve.
// Vrolijke toontjes via WebAudio.

import manifest from '../audio-manifest.json'

const AUDIO_BASE = `${import.meta.env.BASE_URL}audio/`

export function slug(t) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

let currentAudio = null
function stopAll() {
  if (currentAudio) {
    currentAudio.onended = null
    currentAudio.pause()
    currentAudio = null
  }
  window.speechSynthesis?.cancel()
}

// Speel één opgenomen clip; bij mislukking: reserve-functie uitvoeren.
function playKey(key, fallback) {
  if (!manifest[key]) {
    fallback?.()
    return
  }
  stopAll()
  const audio = new Audio(`${AUDIO_BASE}${key}.mp3`)
  currentAudio = audio
  audio.onerror = () => fallback?.()
  audio.play().catch(() => fallback?.())
}

// Speel clips na elkaar (voor b ... a ... ba); alles moet bestaan.
function playKeys(keys, fallback, gapMs = 350) {
  if (!keys.every((k) => manifest[k])) {
    fallback?.()
    return
  }
  stopAll()
  let i = 0
  const playNext = () => {
    if (i >= keys.length) return
    const audio = new Audio(`${AUDIO_BASE}${keys[i]}.mp3`)
    currentAudio = audio
    i += 1
    audio.onended = () => setTimeout(playNext, gapMs)
    audio.onerror = () => fallback?.()
    audio.play().catch(() => fallback?.())
  }
  playNext()
}

/* ── Tekst-naar-spraak (reserve) ── */
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

function tts(text, rate) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter(text, rate))
}

// Spreekvorm van een lettergreep: letterlijk voorlezen, niet interpreteren.
const VOWELS = 'aeiou'
export function syllableSpeechForm(s) {
  const low = s.toLowerCase()
  if (low.length === 2 && !VOWELS.includes(low[0]) && VOWELS.includes(low[1])) {
    const v = low[1]
    return low[0] + (v === 'i' ? 'ie' : v + v)
  }
  return low
}

/* ── Openbare spreekfuncties ── */

// Zinnen en losse woorden
export function speak(text, { rate = 0.72 } = {}) {
  const s = slug(text)
  const key = manifest[`w-${s}`] ? `w-${s}` : `p-${s}`
  playKey(key, () => tts(text, rate))
}

export function speakLetter(letter) {
  const l = letter.toLowerCase()
  playKey(`l-${l}`, () => tts(l, 0.55))
}

export function speakSyllable(syllable) {
  const s = syllable.toLowerCase()
  playKey(`s-${s}`, () => tts(syllableSpeechForm(s), 0.55))
}

// Klanken plakken: "b" ... "a" ... "ba" na elkaar
export function speakBlend(syllable) {
  const s = syllable.toLowerCase()
  playKeys([`l-${s[0]}`, `l-${s[1]}`, `s-${s}`], () => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter(s[0], 0.5))
    window.speechSynthesis.speak(utter(s[1], 0.5))
    window.speechSynthesis.speak(utter(syllableSpeechForm(s), 0.55))
  })
}

/* ── Vrolijke geluidjes ── */
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

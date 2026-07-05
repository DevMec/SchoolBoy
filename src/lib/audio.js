// Geluid: Nederlandse tekst-naar-spraak + vrolijke toontjes via WebAudio.

import { LETTER_SOUNDS } from '../data/content.js'

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

export function speak(text, { rate = 0.85 } = {}) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'nl-NL'
  utter.rate = rate
  utter.pitch = 1.1
  const voice = pickDutchVoice()
  if (voice) utter.voice = voice
  window.speechSynthesis.speak(utter)
}

export function speakLetter(letter) {
  speak(LETTER_SOUNDS[letter.toUpperCase()] || letter, { rate: 0.8 })
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

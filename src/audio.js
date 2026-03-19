// ═══════════════════════════════════════════════════════════
//  AudioEngine
//
//  Background music  → HTML5 Audio element (<audio> tag)
//    • Plays your real downloaded audio file
//    • Seamless loop, volume control, tab-resume built-in
//    • Supports MP3, OGG, WAV — any format the browser plays
//
//  SFX + emoji sounds → Web Audio API (oscillators)
//    • Click, win, draw, and 6 emoji reactions
//    • Lightweight, no extra files needed
// ═══════════════════════════════════════════════════════════

// ── SFX gain constants ────────────────────────────────────
const SG = {
  click : 0.22,
  win   : 0.24,
  draw  : 0.15,
  emoji : 0.18,
  noise : 0.13,
}

class AudioEngine {
  constructor () {
    // ── Music (HTML5 Audio) ──
    this._music        = null   // HTMLAudioElement
    this._musicSrc     = null   // last src we tried to load
    this.volume        = 0.50   // music volume  0–1
    this._musicReady   = false  // true once canplaythrough fires

    // ── SFX (Web Audio API) ──
    this.ac            = null
    this.sfxGain       = null
    this.limiter       = null
    this._noiseBuffer  = null
    this.sfxEnabled    = true

    // ── State ──
    this.playing          = false
    this._lastEmoji       = null
    this._ready           = false   // SFX context built
    this._visibilityBound = false
  }

  // ─────────────────────────────────────────────────────────
  //  MUSIC — HTML5 Audio
  // ─────────────────────────────────────────────────────────

  // Call this once with the path to your audio file, e.g.
  //   audio.setMusicSrc('/music/background.mp3')
  // Supported formats: .mp3  .ogg  .wav  .m4a  .aac
  setMusicSrc (src) {
    this._musicSrc = src
    if (this._music) {
      this._music.src = src
      this._music.load()
    }
  }

  _buildMusic () {
    if (this._music) return
    const el       = new Audio()
    el.loop        = true
    el.volume      = this.volume
    el.preload     = 'auto'
    // Use the src set externally, or default path
    el.src         = this._musicSrc || '/music/background.mp3'

    el.addEventListener('canplaythrough', () => {
      this._musicReady = true
      // If start() was called before the file was ready, play now
      if (this.playing) el.play().catch(() => {})
    })

    el.addEventListener('error', (e) => {
      console.warn(
        '[AudioEngine] Could not load music file:', el.src,
        '\nMake sure you placed your audio file in:  public/music/background.mp3',
        '\n(or call audio.setMusicSrc("/music/yourfile.mp3") with the correct name)',
        e
      )
    })

    this._music = el
  }

  _resumeMusic () {
    if (!this._music || !this.playing) return
    // Browsers require a user gesture before playing audio.
    // We catch the rejection silently — music will start on next interaction.
    this._music.play().catch(() => {})
  }

  // ─────────────────────────────────────────────────────────
  //  SFX — Web Audio API
  // ─────────────────────────────────────────────────────────

  _buildSfx () {
    if (this._ready) return
    this._ready = true
    try {
      this.ac = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      this._ready = false
      return
    }

    // Hard limiter → destination
    this.limiter = this.ac.createDynamicsCompressor()
    this.limiter.threshold.value = -3
    this.limiter.knee.value      = 0
    this.limiter.ratio.value     = 20
    this.limiter.attack.value    = 0.001
    this.limiter.release.value   = 0.08
    this.limiter.connect(this.ac.destination)

    // SFX gain bus
    this.sfxGain = this.ac.createGain()
    this.sfxGain.gain.value = 0.90
    this.sfxGain.connect(this.limiter)

    // Pre-built noise buffer (shared by all noise-based SFX)
    const sr  = this.ac.sampleRate
    const len = sr * 1
    this._noiseBuffer = this.ac.createBuffer(1, len, sr)
    const d = this._noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  }

  _resumeSfx () {
    if (this.ac && this.ac.state === 'suspended')
      this.ac.resume().catch(() => {})
  }

  // 10ms fade-in + fade-out on every SFX tone — eliminates clicks
  _env (g, vol, t, dur) {
    const F = 0.010
    g.gain.setValueAtTime(0,      t)
    g.gain.linearRampToValueAtTime(vol,    t + F)
    g.gain.setValueAtTime(vol,             t + Math.max(dur - F, F))
    g.gain.linearRampToValueAtTime(0.0001, t + dur)
  }

  _tone (freq, endFreq, dur, vol, type = 'sine', delayS = 0) {
    if (!this.ac || !this.sfxGain) return
    try {
      this._resumeSfx()
      const t = this.ac.currentTime + delayS
      const o = this.ac.createOscillator()
      const g = this.ac.createGain()
      o.type = type
      o.frequency.setValueAtTime(freq, t)
      if (endFreq && endFreq !== freq)
        o.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 20), t + dur)
      this._env(g, vol, t, dur)
      o.connect(g)
      g.connect(this.sfxGain)
      o.start(t)
      o.stop(t + dur + 0.015)
    } catch (_) {}
  }

  _noiseBurst (dur, vol, hpFreq, delayS = 0) {
    if (!this.ac || !this._noiseBuffer || !this.sfxGain) return
    try {
      this._resumeSfx()
      const t   = this.ac.currentTime + delayS
      const src = this.ac.createBufferSource()
      src.buffer = this._noiseBuffer
      const hp  = this.ac.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = hpFreq
      const g = this.ac.createGain()
      this._env(g, vol, t, dur)
      src.connect(hp)
      hp.connect(g)
      g.connect(this.sfxGain)
      src.start(t, 0, dur)
    } catch (_) {}
  }

  // ─────────────────────────────────────────────────────────
  //  TAB VISIBILITY — resume music when user comes back
  // ─────────────────────────────────────────────────────────

  _watchVisibility () {
    if (this._visibilityBound) return
    this._visibilityBound = true

    const onVisible = () => {
      if (document.hidden) return
      // Resume SFX context
      if (this.ac && this.ac.state === 'suspended')
        this.ac.resume().catch(() => {})
      // Resume music
      if (this.playing && this._music && this._music.paused)
        this._music.play().catch(() => {})
    }

    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus',    onVisible)
    window.addEventListener('pageshow', onVisible)
  }

  // ═════════════════════════════════════════════════════════
  //  PUBLIC API
  // ═════════════════════════════════════════════════════════

  start () {
    if (this.playing) return
    this.playing = true
    this._buildMusic()
    this._buildSfx()
    this._watchVisibility()
    this._resumeMusic()
  }

  stop () {
    this.playing = false
    if (this._music) {
      this._music.pause()
      this._music.currentTime = 0
    }
  }

  setVolume (v) {
    this.volume = Math.max(0, Math.min(1, v))
    if (this._music) this._music.volume = this.volume
  }

  // ── SFX: cell click ──
  click () {
    if (!this.sfxEnabled) return
    this._buildSfx()
    this._tone(560, 300, 0.07, SG.click, 'sine')
  }

  // ── SFX: win fanfare ──
  win () {
    if (!this.sfxEnabled) return
    this._buildSfx()
    this._tone(440, 554, 0.15, SG.win, 'triangle', 0.00)
    this._tone(554, 659, 0.15, SG.win, 'triangle', 0.16)
    this._tone(659, 880, 0.20, SG.win, 'triangle', 0.32)
  }

  // ── SFX: draw ──
  draw () {
    if (!this.sfxEnabled) return
    this._buildSfx()
    this._tone(300, 100, 0.35, SG.draw, 'sawtooth')
  }

  // ── SFX: emoji reactions ──
  playEmojiSound (emoji) {
    if (!this.sfxEnabled) return
    if (emoji === this._lastEmoji) return
    this._lastEmoji = emoji
    this._buildSfx()

    switch (emoji) {
      case '😊':
        this._tone(784, 1047, 0.14, SG.emoji, 'sine')
        break
      case '😎':
        this._tone(523, 659, 0.13, SG.emoji, 'triangle', 0.00)
        this._tone(659, 784, 0.13, SG.emoji, 'triangle', 0.14)
        break
      case '😡':
        this._tone(220, 180, 0.17, SG.emoji, 'sawtooth')
        this._noiseBurst(0.13, SG.noise, 500)
        break
      case '😭':
        this._tone(392, 246, 0.40, SG.emoji, 'sine')
        this._tone(293, 196, 0.34, SG.emoji * 0.7, 'triangle', 0.14)
        break
      case '😤':
        this._tone(300, 240, 0.17, SG.emoji, 'sawtooth')
        break
      case '😐':
        this._tone(440, 432, 0.06, SG.emoji * 0.6, 'sine')
        break
      case '🥳':
        break
      default:
        break
    }
  }

  resetEmojiState () {
    this._lastEmoji = null
  }
}

export const audio = new AudioEngine()

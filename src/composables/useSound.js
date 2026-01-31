// Global sound state management
import { ref } from 'vue'
import ButtonSound from '../assets/sounds/ButtonSound.mp3'

import Track1 from '../assets/sounds/soundtrack 1.mp3'
import Track2 from '../assets/sounds/soundtrack 2.mp3'
import Track3 from '../assets/sounds/soundtrack 3.mp3'
import Track4 from '../assets/sounds/soundtrack 4.mp3'
import Track5 from '../assets/sounds/soundtrack 5.mp3'

// Global sound state
const soundEnabled = ref(false)

// Audio instances pool to avoid delays and allow overlapping sounds
let audioPool = []
const POOL_SIZE = 5
let audioReady = false

// ===== Soundtrack playlist system =====
const tracks = [Track1, Track2, Track3, Track4, Track5]

let playlist = []
let currentTrackIndex = -1
let soundtrackAudio = null
let soundtrackReady = false
let delayTimeout = null

const VOLUME = 0.4

// Fisher–Yates shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Create a new shuffled playlist
const resetPlaylist = () => {
  playlist = shuffle([...tracks])
  currentTrackIndex = -1
}

// Prepare audio element for soundtrack
const initSoundtrackAudio = () => {
  if (!soundtrackAudio) {
    soundtrackAudio = new Audio()
    soundtrackAudio.preload = 'auto'
    soundtrackAudio.volume = VOLUME

    soundtrackAudio.addEventListener('ended', () => {
      if (!soundEnabled.value) return

      delayTimeout = setTimeout(() => {
        playNextTrack()
      }, 5000) // 5 second pause between tracks
    })

    soundtrackReady = true
  }
}

// Play next track in shuffled playlist
const playNextTrack = () => {
  if (!soundEnabled.value) return

  currentTrackIndex++

  // If we reached the end → reshuffle
  if (currentTrackIndex >= playlist.length) {
    resetPlaylist()
    currentTrackIndex = 0
  }

  const nextTrack = playlist[currentTrackIndex]

  soundtrackAudio.src = nextTrack
  soundtrackAudio.currentTime = 0
  soundtrackAudio.play().catch(err => {
    console.warn('Failed to play soundtrack:', err)
  })
}

// Initialize audio pool immediately
const initAudioPool = () => {
  if (audioPool.length === 0) {
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio(ButtonSound)
      audio.preload = 'auto'
      audio.volume = 0.3

      audio.addEventListener(
        'canplaythrough',
        () => {
          audioReady = true
        },
        { once: true }
      )

      audioPool.push(audio)
    }
  }
}

// Initialize both systems when module loads
initAudioPool()
initSoundtrackAudio()
resetPlaylist()

// Get next available audio instance from pool
const getNextAudio = () => {
  for (const audio of audioPool) {
    if (audio.paused || audio.ended || audio.currentTime === 0) {
      return audio
    }
  }
  return audioPool[0]
}

// Control soundtrack based on sound state
const updateSoundtrack = () => {
  if (!soundtrackReady) return

  if (soundEnabled.value) {
    playNextTrack()
  } else {
    if (delayTimeout) clearTimeout(delayTimeout)
    soundtrackAudio.pause()
    soundtrackAudio.currentTime = 0
  }
}

// Toggle sound state
export const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  updateSoundtrack()
}

// Get current sound state
export const getSoundEnabled = () => {
  return soundEnabled.value
}

// Play button sound effect with immediate playback
export const playButtonSound = () => {
  if (soundEnabled.value && audioReady) {
    const audio = getNextAudio()
    audio.currentTime = 0
    audio.play().catch(error => {
      console.warn('Failed to play button sound:', error)
    })
  }
}

// Reactive sound state for components
export const useSound = () => {
  return {
    soundEnabled,
    toggleSound,
    getSoundEnabled,
    playButtonSound
  }
}

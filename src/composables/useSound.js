// Global sound state management
import { ref } from 'vue'
import ButtonSound from '../assets/sounds/ButtonSound.mp3'
import BackgroundMusic from '../assets/sounds/Background.mp3'

// Global sound state
const soundEnabled = ref(false)

// Audio instances pool to avoid delays and allow overlapping sounds
let audioPool = []
const POOL_SIZE = 5 // Keep multiple instances ready
let audioReady = false

// Background music instance
let backgroundAudio = null
let backgroundReady = false

// Initialize audio pool immediately
const initAudioPool = () => {
  if (audioPool.length === 0) {
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio(ButtonSound)
      audio.preload = 'auto'
      audio.volume = 0.3 // 50% less volume (70% quieter than original)

      // Mark as ready when loaded
      audio.addEventListener('canplaythrough', () => {
        audioReady = true
      }, { once: true })

      audioPool.push(audio)
    }
  }
}

// Initialize background music
const initBackgroundMusic = () => {
  if (!backgroundAudio) {
    backgroundAudio = new Audio(BackgroundMusic)
    backgroundAudio.preload = 'auto'
    backgroundAudio.volume = 0.3 // Much quieter than button sounds
    backgroundAudio.loop = false // We'll handle looping manually

    // Mark as ready when loaded
    backgroundAudio.addEventListener('canplaythrough', () => {
      backgroundReady = true
    }, { once: true })

    // Handle music ending - wait 10 seconds then restart
    backgroundAudio.addEventListener('ended', () => {
      if (soundEnabled.value) {
        setTimeout(() => {
          if (soundEnabled.value && backgroundReady) {
            backgroundAudio.currentTime = 0
            backgroundAudio.play().catch(error => {
              console.warn('Failed to restart background music:', error)
            })
          }
        }, 10000) // 10 seconds delay
      }
    })
  }
}

// Initialize both audio systems immediately when module loads
initAudioPool()
initBackgroundMusic()

// Get next available audio instance from pool
const getNextAudio = () => {
  // Find an audio that's not currently playing
  for (const audio of audioPool) {
    if (audio.paused || audio.ended || audio.currentTime === 0) {
      return audio
    }
  }
  // If all are playing, return the first one (it will restart)
  return audioPool[0]
}

// Control background music based on sound state
const updateBackgroundMusic = () => {
  if (!backgroundAudio || !backgroundReady) return

  if (soundEnabled.value) {
    // Start background music
    backgroundAudio.currentTime = 0
    backgroundAudio.play().catch(error => {
      console.warn('Failed to play background music:', error)
    })
  } else {
    // Stop background music
    backgroundAudio.pause()
    backgroundAudio.currentTime = 0
  }
}

// Toggle sound state
export const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  updateBackgroundMusic()
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

// Reactive sound state for components that need to watch it
export const useSound = () => {
  return {
    soundEnabled,
    toggleSound,
    getSoundEnabled,
    playButtonSound
  }
}
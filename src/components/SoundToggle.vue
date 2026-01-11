<script setup>
import SoundOn from '../assets/SoundOn.webp'
import SoundOff from '../assets/SoundOff.webp'
import { useSound } from '../composables/useSound.js'

// Use global sound state
const { soundEnabled, toggleSound } = useSound()
</script>

<template>
  <button
    class="sound-toggle"
    @click="toggleSound"
    :title="soundEnabled ? 'Disable Sound' : 'Enable Sound'"
  >
    <img
      :src="soundEnabled ? SoundOn : SoundOff"
      alt="Sound Toggle"
      class="sound-icon"
    />
  </button>
</template>

<style scoped>
.sound-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.sound-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sound-icon {
  width: 64px;
  height: 64px;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>
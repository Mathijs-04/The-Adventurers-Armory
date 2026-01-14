<script setup>
import ButtonNA from '../assets/Button-NA.webp'
import ButtonA from '../assets/Button-A.webp'
import { ref } from 'vue'
import { playButtonSound } from '../composables/useSound.js'

const props = defineProps({
  text: {
    type: String,
    default: 'Button'
  },
  action: {
    type: Function,
    default: () => {}
  }
})

const isHovered = ref(false)

const handleClick = () => {
  playButtonSound()
  props.action()
}
</script>

<template>
  <button 
    class="custom-button"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img 
      :src="isHovered ? ButtonA : ButtonNA" 
      alt="" 
      class="button-image"
    />
    <span class="button-text" :class="{ 'hovered': isHovered }">{{ text }}</span>
  </button>
</template>

<style scoped>
.custom-button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
  clip-path: inset(29% 29% 29% 29%);
}

.button-image {
  display: block;
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  transform: scale(0.42);
  transform-origin: center center;
}

.button-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: 'Firlest', Arial, sans-serif;
  font-size: 25px;
  font-weight: normal;
  letter-spacing: 2px;
  pointer-events: none;
  white-space: nowrap;
}

.button-text.hovered {
  color: transparent;
  background: linear-gradient(45deg, #ffd700 0%, #ffed4a 50%, #ffd700 100%);
  background-clip: text;
  -webkit-background-clip: text;
}
</style>

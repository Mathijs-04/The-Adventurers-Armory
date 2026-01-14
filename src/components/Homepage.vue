<script setup>
import LogoImage from '../assets/logo.webp'
import FlameGif from '../assets/flame.gif'
import CustomButton from './CustomButton.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['navigateToStore'])

const flamePositions = ref({
  flame1: { top: '30%', left: '80.5%' },
  flame2: { top: '30%', left: '94%' },
  flame3: { top: '30%', left: '19.5%' },
  flame4: { top: '30%', left: '6%' }
})

const goToStore = () => {
  emit('navigateToStore')
}

const flameConfigs = {
  windowed: {
    flame1: { top: '30%', left: '80.5%' },
    flame2: { top: '30%', left: '94%' },
    flame3: { top: '30%', left: '19.5%' },
    flame4: { top: '30%', left: '6%' }
  },
  fullscreen: {
    flame1: { top: '32.2%', left: '80.3%' },
    flame2: { top: '32.2%', left: '93.8%' },
    flame3: { top: '32.2%', left: '19.7%' },
    flame4: { top: '32.2%', left: '6.2%' }
  },
  laptop: {
    flame1: { top: '29.8%', left: '81.7%' },
    flame2: { top: '29.8%', left: '96.2%' },
    flame3: { top: '29.8%', left: '18.3%' },
    flame4: { top: '29.8%', left: '3.8%' }
  }
}

const updateFlamePosition = () => {
  // Check if in fullscreen
  if (document.fullscreenElement) {
    flamePositions.value = flameConfigs.fullscreen
  }
  // Check for laptop screen size (adjust breakpoint as needed)
  else if (window.innerWidth <= 1440) {
    flamePositions.value = flameConfigs.laptop
  }
  // Default windowed mode
  else {
    flamePositions.value = flameConfigs.windowed
  }
}

onMounted(() => {
  updateFlamePosition()
  // Update position when entering/exiting fullscreen
  document.addEventListener('fullscreenchange', updateFlamePosition)
  // Update on resize for different devices
  window.addEventListener('resize', updateFlamePosition)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateFlamePosition)
  window.removeEventListener('resize', updateFlamePosition)
})
</script>

<template>
  <div class="homepage">
    <div class="background-container">
      <img :src="FlameGif" alt="Flame 1" class="flame-gif flame-1" />
      <img :src="FlameGif" alt="Flame 2" class="flame-gif flame-2" />
      <img :src="FlameGif" alt="Flame 3" class="flame-gif flame-3" />
      <img :src="FlameGif" alt="Flame 4" class="flame-gif flame-4" />
    </div>
    <img :src="LogoImage" alt="Logo" class="logo" />
    <CustomButton
      text="Enter Store"
      :action="goToStore"
      class="custom-button"
    />
  </div>
</template>

<style scoped>
.homepage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding-top: 15vh;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/HomeViewV2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  pointer-events: none;
  z-index: 1;
}

.logo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  margin-top: -1svh;
  z-index: 10;
  position: relative;
}

.custom-button {
  margin-top: -20svh;
  z-index: 10;
  position: relative;
}

.flame-gif {
  /* Easy size adjustments - change these values */
  width: 100px;   /* Flame width */
  height: 130px;  /* Flame height */

  /* Other properties */
  position: absolute;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%); /* Center on the specified position */
}

/* Individual flame positioning */
.flame-1 {
  top: v-bind('flamePositions.flame1.top');
  left: v-bind('flamePositions.flame1.left');
}

.flame-2 {
  top: v-bind('flamePositions.flame2.top');
  left: v-bind('flamePositions.flame2.left');
}

.flame-3 {
  top: v-bind('flamePositions.flame3.top');
  left: v-bind('flamePositions.flame3.left');
}

.flame-4 {
  top: v-bind('flamePositions.flame4.top');
  left: v-bind('flamePositions.flame4.left');
}

/* Hide flames on very small screens (mobile phones) */
@media (max-width: 767px) {
  .flame-gif {
    display: none !important;
  }
}

/* Hide flames on very large screens (1920px+, TVs, school boards, etc.) */
@media (min-width: 1921px) {
  .flame-gif {
    display: none !important;
  }
}


</style>

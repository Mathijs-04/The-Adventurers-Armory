<script setup>
import { ref } from 'vue'
import Homepage from './components/Homepage.vue'
import Store from './components/Store.vue'
import Details from './components/Details.vue'
import SoundToggle from './components/SoundToggle.vue'
import ArrowBack from './assets/ArrowBack.webp'
import ArrowBackHover from './assets/ArrowBackHover.webp'
import FullscreenNA from './assets/Fullscreen-NA.webp'
import FullscreenA from './assets/Fullscreen-A.webp'

const currentView = ref('homepage')
const selectedProduct = ref(null)
const isArrowHovered = ref(false)
const isFullscreenHovered = ref(false)

const navigateToStore = () => {
  currentView.value = 'store'
}

const navigateBack = () => {
  if (currentView.value === 'details') {
    currentView.value = 'store'
  } else if (currentView.value === 'store') {
    currentView.value = 'homepage'
  }
}

const viewDetails = (product) => {
  selectedProduct.value = product
  currentView.value = 'details'
}

// Toggle fullscreen mode
const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      await document.documentElement.requestFullscreen()
    } else {
      // Exit fullscreen
      await document.exitFullscreen()
    }
  } catch (error) {
    console.warn('Fullscreen toggle failed:', error)
  }
}
</script>

<template>
  <div id="app">
    <button
      v-if="currentView !== 'homepage'"
      @click="navigateBack"
      @mouseenter="isArrowHovered = true"
      @mouseleave="isArrowHovered = false"
      class="back-button"
    >
      <img
        :src="isArrowHovered ? ArrowBackHover : ArrowBack"
        alt="Back"
        class="back-arrow"
      />
    </button>
    <button
      @click="toggleFullscreen"
      @mouseenter="isFullscreenHovered = true"
      @mouseleave="isFullscreenHovered = false"
      class="fullscreen-toggle"
    >
      <img
        :src="isFullscreenHovered ? FullscreenA : FullscreenNA"
        alt="Fullscreen Toggle"
        class="fullscreen-icon"
      />
    </button>
    <SoundToggle />
    <Homepage
      v-if="currentView === 'homepage'"
      @navigate-to-store="navigateToStore"
    />
    <Store
      v-if="currentView === 'store'"
      @view-details="viewDetails"
    />
    <Details
      v-if="currentView === 'details' && selectedProduct"
      :product="selectedProduct"
    />
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 8px;
  margin-top: -3svh;
  cursor: pointer;
  border: none;
  background: transparent;
  border-radius: 50%;
  z-index: 1000;
  transition: background-color 0.2s ease;
}

.fullscreen-toggle {
  position: fixed;
  top: 27px;
  right: 100px;
  background-color: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.fullscreen-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.fullscreen-icon {
  width: 58px;
  height: 58px;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}


.back-arrow {
  width: 128px;
  height: 128px;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>

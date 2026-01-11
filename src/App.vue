<script setup>
import { ref } from 'vue'
import Homepage from './components/Homepage.vue'
import Store from './components/Store.vue'
import Details from './components/Details.vue'
import SoundToggle from './components/SoundToggle.vue'
import ArrowBack from './assets/ArrowBack.webp'
import ArrowBackHover from './assets/ArrowBackHover.webp'

const currentView = ref('homepage')
const selectedProduct = ref(null)
const isArrowHovered = ref(false)

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
    <SoundToggle />
    <Homepage
      v-if="currentView === 'homepage'"
      @navigate-to-store="navigateToStore"
    />
    <Store
      v-if="currentView === 'store'"
    />
    <Details
      v-if="currentView === 'details' && selectedProduct"
      :name="selectedProduct.name"
      :description="selectedProduct.description"
      :price="selectedProduct.price"
      :image="selectedProduct.image"
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


.back-arrow {
  width: 128px;
  height: 128px;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>

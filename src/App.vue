<script setup>
import { ref } from 'vue'
import Homepage from './components/Homepage.vue'
import Store from './components/Store.vue'
import Details from './components/Details.vue'

const currentView = ref('homepage')
const selectedProduct = ref(null)

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
      class="back-button"
    >
      ←
    </button>
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
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  z-index: 1000;
}
</style>

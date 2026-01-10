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

const viewDetails = (product) => {
  selectedProduct.value = product
  currentView.value = 'details'
}
</script>

<template>
  <div id="app">
    <Homepage v-if="currentView === 'homepage'" @navigate-to-store="navigateToStore" />
    <Store v-if="currentView === 'store'" @view-details="viewDetails" />
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
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}
</style>

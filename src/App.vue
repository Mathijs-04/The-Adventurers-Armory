<script setup>
import { ref, computed } from 'vue'
import Homepage from './components/Homepage.vue'
import Store from './components/Store.vue'
import Details from './components/Details.vue'

const currentView = ref('homepage')
const selectedProduct = ref(null)
const cartItems = ref([])

const cartCount = computed(() => cartItems.value.length)

const navigateToStore = () => {
  currentView.value = 'store'
}

const navigateToHome = () => {
  currentView.value = 'homepage'
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

const addToCart = (product) => {
  if (!cartItems.value.find(item => item.name === product.name)) {
    cartItems.value.push(product)
  }
}

const removeFromCart = (product) => {
  cartItems.value = cartItems.value.filter(item => item.name !== product.name)
}
</script>

<template>
  <div id="app">
    <button 
      v-if="currentView !== 'homepage'" 
      @click="navigateBack" 
      class="back-button"
    >
      Back
    </button>
    <div class="cart-counter">{{ cartCount }}</div>
    <Homepage v-if="currentView === 'homepage'" @navigate-to-store="navigateToStore" />
    <Store 
      v-if="currentView === 'store'" 
      :cart-items="cartItems"
      @view-details="viewDetails" 
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
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
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
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
}

.cart-counter {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 10px 15px;
  border-radius: 50%;
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}
</style>

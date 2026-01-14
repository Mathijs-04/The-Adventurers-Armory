<script setup>
import ProductCard from './ProductCard.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="details">
    <div class="product-detail">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<style scoped>
.details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/DetailView.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-detail {
  max-width: 400px;
  width: 100%;
  z-index: 10;
}
</style>

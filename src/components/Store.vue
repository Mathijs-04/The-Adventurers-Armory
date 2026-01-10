<script setup>
import ProductCard from './ProductCard.vue'
</script>

<template>
  <div class="store">
    <div class="store-header">
      <h1>Store Page</h1>
      <p>Placeholder text for store description</p>
    </div>

    <div class="products-container">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
</template>

<style scoped>
.store {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
}

.store-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.store-header h1 {
  margin-bottom: 10px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

</style>
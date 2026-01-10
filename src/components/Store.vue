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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 18px;
  color: #666;
}
</style>
<script setup>
import Button from './Button.vue'
</script>

<template>
  <div class="product-card">
    <div class="product-image">
      <div>Image Placeholder</div>
    </div>

    <div class="product-info">
      <h3>Product Name</h3>
      <p>Product description placeholder text</p>
      <p>$99.99</p>
    </div>

    <div class="product-buttons">
      <Button />
      <Button />
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  background: #f9f9f9;
  gap: 15px;
}

.product-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  border: 1px dashed #999;
  border-radius: 4px;
  background: white;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.product-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.product-info p {
  margin: 0;
  color: #666;
}

.product-buttons {
  display: flex;
  gap: 10px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 40px;
  border: 2px dashed #999;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}
</style>
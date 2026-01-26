<script setup>
import ProductCard from './ProductCard.vue'
import FlameGif from '../assets/flame.gif'
import DetailBackground from '../assets/DetailBackground.webp'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="details">
    <img :src="FlameGif" alt="Detail Flame 1" class="detail-flame detail-flame-1" />
    <img :src="FlameGif" alt="Detail Flame 2" class="detail-flame detail-flame-2" />
    <div class="product-detail">
      <ProductCard :product="product" :disable-hover="true" />
      <div class="product-info">
        <img :src="DetailBackground" alt="Detail Background" class="detail-background-image" />
        <div class="text-overlay">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-description">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fixed canvas coordinate system: 1920x1080px */
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.product-info {
  position: relative;
  text-align: center;
  width: 100%;
  border-radius: 10px;
}

.detail-background-image {
  width: 100%;
  height: auto;
  transform: scale(1.3);
  transform-origin: center;
  display: block;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  z-index: 2;
}

.product-title {
  font-family: 'Firlest', Arial, sans-serif;
  font-size: 24px;
  font-weight: 100;
  color: white;
  margin: 0 0 15px 0;
  letter-spacing: 2px;
  text-shadow:
    -1px -1px 0 #8B4513,
    1px -1px 0 #8B4513,
    -1px 1px 0 #8B4513,
    1px 1px 0 #8B4513,
    -1px -1px 0 #654321,
    1px -1px 0 #654321,
    -1px 1px 0 #654321,
    1px 1px 0 #654321,
    0 0 2px rgba(139, 69, 19, 0.8),
    0 0 4px rgba(139, 69, 19, 0.6);
}

.product-description {
  font-family: 'Firlest', Arial, sans-serif;
  font-size: 16px;
  font-weight: 100;
  color: white;
  margin: 0;
  line-height: 1.4;
  letter-spacing: 2px;
  text-shadow:
    -1px -1px 0 #8B4513,
    1px -1px 0 #8B4513,
    -1px 1px 0 #8B4513,
    1px 1px 0 #8B4513,
    -1px -1px 0 #654321,
    1px -1px 0 #654321,
    -1px 1px 0 #654321,
    1px 1px 0 #654321,
    0 0 2px rgba(139, 69, 19, 0.8),
    0 0 4px rgba(139, 69, 19, 0.6);
}

/* Detail flame styling - fixed pixel positions for 1920x1080 canvas */
.detail-flame {
  position: absolute;
  width: 100px;
  height: 130px;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.detail-flame-1 {
  top: 381px;
  left: 1762px;
}

.detail-flame-2 {
  top: 381px;
  left: 163px;
}
</style>

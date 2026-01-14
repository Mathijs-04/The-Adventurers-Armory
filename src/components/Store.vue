<script setup>
import Parchment from '../assets/Parchment.webp'
import ProductCard from './ProductCard.vue'

const emit = defineEmits(['viewDetails'])

// Sample product data
const products = [
  {
    id: 1,
    name: 'Enchanted Sword',
    description: 'A legendary blade forged in dragonfire, imbued with ancient magic that never dulls.',
    price: '500 Gold Coins'
  },
  {
    id: 2,
    name: 'Mystic Potion',
    description: 'An elixir of rejuvenation that restores vitality and grants temporary invulnerability.',
    price: '200 Gold Coins'
  },
  {
    id: 3,
    name: 'Wizard\'s Tome',
    description: 'An ancient spellbook containing forbidden knowledge and powerful incantations.',
    price: '750 Gold Coins'
  }
]

const handleProductSelect = (product) => {
  emit('viewDetails', product)
}
</script>

<template>
  <div class="store">
    <div class="parchment-banner">
      <img :src="Parchment" alt="Parchment" class="parchment-image" />
      <h1 class="banner-text">Featured Items</h1>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @select-product="handleProductSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.store {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/StoreView.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parchment-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  margin-top: -12svh;
}

.parchment-image {
  max-width: 48vw;
  max-height: 36vh;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}

.banner-text {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: transparent;
  background: linear-gradient(45deg, #8B4513 0%, #654321 50%, #8B4513 100%);
  background-clip: text;
  -webkit-background-clip: text;
  font-family: 'Firlest', Arial, sans-serif;
  font-size: clamp(1.2rem, 3vw, 2.4rem);
  font-weight: normal;
  letter-spacing: 3px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  pointer-events: none;
  white-space: nowrap;
  margin: 0;
  margin-top: -20px;
}

.products-grid {
  position: absolute;
  top: 55vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6vw;
  justify-content: center;
  align-items: center;
  z-index: 15;
  max-width: 95vw;
}

.products-grid :deep(.product-card) {
  flex: 1;
  max-width: 450px;
  min-width: 300px;
}
</style>

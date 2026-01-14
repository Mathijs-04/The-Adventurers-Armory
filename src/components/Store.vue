<script setup>
import Parchment from '../assets/Parchment.webp'
import FlameGif from '../assets/flame.gif'
import ProductCard from './ProductCard.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { playButtonSound } from '../composables/useSound.js'

const emit = defineEmits(['viewDetails'])

const storeFlamePositions = ref({
  flame1: { top: '16%', left: '88.0%' },
  flame2: { top: '16%', left: '11.0%' }
})

const storeFlameConfigs = {
  windowed: {
    flame1: { top: '16%', left: '88.0%' },
    flame2: { top: '16%', left: '11.0%' }
  },
  laptop: {
    flame1: { top: '16%', left: '90.0%' },
    flame2: { top: '16%', left: '9.0%' }
  },
  fullscreen: {
    flame1: { top: '19%', left: '88.0%' },
    flame2: { top: '19%', left: '11.0%' }
  }
}

// Sample product data
const products = [
  {
    id: 1,
    name: 'Enchanted Sword',
    description: 'A legendary blade forged in dragonfire, imbued with ancient magic that never dulls.',
    price: 1250
  },
  {
    id: 2,
    name: 'Mystic Potion',
    description: 'An elixir of rejuvenation that restores vitality and grants temporary invulnerability.',
    price: 450
  },
  {
    id: 3,
    name: 'Wizard\'s Tome',
    description: 'An ancient spellbook containing forbidden knowledge and powerful incantations.',
    price: 3200
  }
]

const handleProductSelect = (product) => {
  playButtonSound()
  emit('viewDetails', product)
}

const updateStoreFlamePosition = () => {
  // Check if in fullscreen mode
  if (document.fullscreenElement) {
    storeFlamePositions.value = storeFlameConfigs.fullscreen
  }
  // Check for laptop screen size (≤1440px)
  else if (window.innerWidth <= 1440) {
    storeFlamePositions.value = storeFlameConfigs.laptop
  }
  // Default windowed mode for larger screens
  else {
    storeFlamePositions.value = storeFlameConfigs.windowed
  }
}

onMounted(() => {
  updateStoreFlamePosition()
  document.addEventListener('fullscreenchange', updateStoreFlamePosition)
  window.addEventListener('resize', updateStoreFlamePosition)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateStoreFlamePosition)
  window.removeEventListener('resize', updateStoreFlamePosition)
})
</script>

<template>
  <div class="store">
    <img :src="FlameGif" alt="Store Flame 1" class="store-flame store-flame-1" />
    <img :src="FlameGif" alt="Store Flame 2" class="store-flame store-flame-2" />

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
  top: 50vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3vw;
  justify-content: center;
  align-items: center;
  z-index: 15;
  max-width: 95vw;
}

.products-grid :deep(.product-card) {
  flex: 1;
  max-width: 585px; /* 450px * 1.3 = 585px (30% bigger) */
  min-width: 390px; /* 300px * 1.3 = 390px (30% bigger) */
}

/* Store flame styling */
.store-flame {
  position: absolute;
  width: 100px;
  height: 130px;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.store-flame-1 {
  top: v-bind('storeFlamePositions.flame1.top');
  left: v-bind('storeFlamePositions.flame1.left');
}

.store-flame-2 {
  top: v-bind('storeFlamePositions.flame2.top');
  left: v-bind('storeFlamePositions.flame2.left');
}

/* Hide store flames on small and large screens (same as homepage) */
@media (max-width: 767px) {
  .store-flame {
    display: none !important;
  }
}

@media (min-width: 1921px) {
  .store-flame {
    display: none !important;
  }
}
</style>

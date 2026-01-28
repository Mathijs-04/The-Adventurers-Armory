<script setup>
import Parchment from '../assets/Parchment.webp'
import FlameGif from '../assets/flame.gif'
import ArrowNormal from '../assets/Arrow-NA.webp'
import ArrowActive from '../assets/Arrow-A.webp'
import ProductCard from './ProductCard.vue'
import { ref, computed } from 'vue'
import { playButtonSound } from '../composables/useSound.js'

const emit = defineEmits(['viewDetails'])

// Available item images
const itemImages = [
  'Item (1).png',
  'Item (2).png',
  'Item (3).png',
  'Item (4).png',
  'Item (5).png',
  'Item (6).png',
  'Item (7).png',
  'Item (8).png',
  'Item (9).png',
  'Item (10).png',
  'Item (11).png',
  'Item (12).png',
  'Item (13).png',
  'Item (14).png',
  'Item (15).png',
  'Item (16).png',
  'Item (17).png',
  'Item (18).png',
  'Item (19).png',
  'Item (20).png',
  'Item (21).png',
  'Item (22).png',
  'Item (23).png',
  'Item (24).png',
  'Item (25).png',
  'Item (26).png',
  'Item (27).png',
  'Item (28).png',
  'Item (29).png',
  'Item (30).png',
  'Item (31).png',
  'Item (32).png',
  'Item (33).png',
  'Item (34).png'
]

// Item data with names, descriptions, and prices
const itemData = [
  {
    name: 'Placeholder Title Item 1',
    description: 'This text is the placeholder description for item 1',
    price: 1250
  },
  {
    name: 'Placeholder Title Item 2',
    description: 'This text is the placeholder description for item 2',
    price: 450
  },
  {
    name: 'Placeholder Title Item 3',
    description: 'This text is the placeholder description for item 3',
    price: 3200
  },
  {
    name: 'Placeholder Title Item 4',
    description: 'This text is the placeholder description for item 4',
    price: 2800
  },
  {
    name: 'Placeholder Title Item 5',
    description: 'This text is the placeholder description for item 5',
    price: 1950
  },
  {
    name: 'Placeholder Title Item 6',
    description: 'This text is the placeholder description for item 6',
    price: 3400
  },
  {
    name: 'Placeholder Title Item 7',
    description: 'This text is the placeholder description for item 7',
    price: 1800
  },
  {
    name: 'Placeholder Title Item 8',
    description: 'This text is the placeholder description for item 8',
    price: 950
  },
  {
    name: 'Placeholder Title Item 9',
    description: 'This text is the placeholder description for item 9',
    price: 1100
  },
  {
    name: 'Placeholder Title Item 10',
    description: 'This text is the placeholder description for item 10',
    price: 650
  },
  {
    name: 'Placeholder Title Item 11',
    description: 'This text is the placeholder description for item 11',
    price: 1350
  },
  {
    name: 'Placeholder Title Item 12',
    description: 'This text is the placeholder description for item 12',
    price: 2200
  },
  {
    name: 'Placeholder Title Item 13',
    description: 'This text is the placeholder description for item 13',
    price: 750
  },
  {
    name: 'Placeholder Title Item 14',
    description: 'This text is the placeholder description for item 14',
    price: 1650
  },
  {
    name: 'Placeholder Title Item 15',
    description: 'This text is the placeholder description for item 15',
    price: 2900
  },
  {
    name: 'Placeholder Title Item 16',
    description: 'This text is the placeholder description for item 16',
    price: 1400
  },
  {
    name: 'Placeholder Title Item 17',
    description: 'This text is the placeholder description for item 17',
    price: 1700
  },
  {
    name: 'Placeholder Title Item 18',
    description: 'This text is the placeholder description for item 18',
    price: 2500
  },
  {
    name: 'Placeholder Title Item 19',
    description: 'This text is the placeholder description for item 19',
    price: 3100
  },
  {
    name: 'Placeholder Title Item 20',
    description: 'This text is the placeholder description for item 20',
    price: 2750
  },
  {
    name: 'Placeholder Title Item 21',
    description: 'This text is the placeholder description for item 21',
    price: 1850
  },
  {
    name: 'Placeholder Title Item 22',
    description: 'This text is the placeholder description for item 22',
    price: 1200
  },
  {
    name: 'Placeholder Title Item 23',
    description: 'This text is the placeholder description for item 23',
    price: 3600
  },
  {
    name: 'Placeholder Title Item 24',
    description: 'This text is the placeholder description for item 24',
    price: 2400
  },
  {
    name: 'Placeholder Title Item 25',
    description: 'This text is the placeholder description for item 25',
    price: 2100
  },
  {
    name: 'Placeholder Title Item 26',
    description: 'This text is the placeholder description for item 26',
    price: 1950
  },
  {
    name: 'Placeholder Title Item 27',
    description: 'This text is the placeholder description for item 27',
    price: 800
  },
  {
    name: 'Placeholder Title Item 28',
    description: 'This text is the placeholder description for item 28',
    price: 2300
  },
  {
    name: 'Placeholder Title Item 29',
    description: 'This text is the placeholder description for item 29',
    price: 1600
  },
  {
    name: 'Placeholder Title Item 30',
    description: 'This text is the placeholder description for item 30',
    price: 900
  },
  {
    name: 'Placeholder Title Item 31',
    description: 'This text is the placeholder description for item 31',
    price: 1900
  },
  {
    name: 'Placeholder Title Item 32',
    description: 'This text is the placeholder description for item 32',
    price: 1450
  },
  {
    name: 'Placeholder Title Item 33',
    description: 'This text is the placeholder description for item 33',
    price: 1150
  },
  {
    name: 'Placeholder Title Item 34',
    description: 'This text is the placeholder description for item 34',
    price: 1300
  }
]

// Function to get or create session-persistent random sequence
// Get or create sequence from sessionStorage
const getSessionSequence = () => {
  const sessionKey = 'fantasy-shop-sequence'

  // Check if we already have a sequence for this session
  let storedSequence = sessionStorage.getItem(sessionKey)
  if (storedSequence) {
    return JSON.parse(storedSequence)
  }

  // Create new shuffled sequence of all items (only on first load/reload)
  const shuffled = [...itemImages].sort(() => Math.random() - 0.5)

  // Create full product sequence
  const sequence = shuffled.map((image, index) => ({
    id: index + 1,
    image: image,
    ...itemData.find((_, dataIndex) => dataIndex === itemImages.indexOf(image))
  }))

  // Store in sessionStorage for persistence during navigation
  sessionStorage.setItem(sessionKey, JSON.stringify(sequence))
  return sequence
}

// Get or create navigation position from sessionStorage
const getSessionIndex = () => {
  const indexKey = 'fantasy-shop-index'
  let storedIndex = sessionStorage.getItem(indexKey)
  return storedIndex ? parseInt(storedIndex, 10) : 0
}

// Save navigation position to sessionStorage
const saveSessionIndex = (index) => {
  const indexKey = 'fantasy-shop-index'
  sessionStorage.setItem(indexKey, index.toString())
}

// Full product sequence - persists across navigation within session
const fullSequence = ref(getSessionSequence())

// Current index for navigation - restores position from session
const currentIndex = ref(getSessionIndex())

// Computed property for visible products (3 items starting from current index)
const products = computed(() => {
  const start = currentIndex.value
  const end = Math.min(start + 3, fullSequence.value.length)
  return fullSequence.value.slice(start, end)
})

// Arrow hover states
const leftArrowHovered = ref(false)
const rightArrowHovered = ref(false)

const handleProductSelect = (product) => {
  playButtonSound()
  emit('viewDetails', product)
}

// Navigation functions with looping
const navigateLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
  } else {
    // Loop to the end (showing last 3 items)
    currentIndex.value = fullSequence.value.length - 3
  }
  saveSessionIndex(currentIndex.value)
}

const navigateRight = () => {
  if (currentIndex.value < fullSequence.value.length - 3) {
    currentIndex.value += 1
  } else {
    // Loop back to the beginning
    currentIndex.value = 0
  }
  saveSessionIndex(currentIndex.value)
}
</script>

<template>
  <div class="store">
    <img :src="FlameGif" alt="Store Flame 1" class="store-flame store-flame-1" />
    <img :src="FlameGif" alt="Store Flame 2" class="store-flame store-flame-2" />

    <div class="parchment-banner">
      <img :src="Parchment" alt="Parchment" class="parchment-image" />
      <h1 class="banner-text">Featured Items</h1>
    </div>

    <!-- Left Navigation Arrow -->
    <button
      class="nav-arrow nav-arrow-left"
      @click="navigateLeft"
      @mouseenter="leftArrowHovered = true"
      @mouseleave="leftArrowHovered = false"
    >
      <img
        :src="leftArrowHovered ? ArrowActive : ArrowNormal"
        alt="Previous items"
        class="arrow-image arrow-left"
      />
    </button>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @select-product="handleProductSelect"
      />
    </div>

    <!-- Right Navigation Arrow -->
    <button
      class="nav-arrow nav-arrow-right"
      @click="navigateRight"
      @mouseenter="rightArrowHovered = true"
      @mouseleave="rightArrowHovered = false"
    >
      <img
        :src="rightArrowHovered ? ArrowActive : ArrowNormal"
        alt="Next items"
        class="arrow-image arrow-right"
      />
    </button>
  </div>
</template>

<style scoped>
/* Fixed canvas coordinate system: 1920x1080px */
.store {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
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
  margin-top: -130px;
}

.parchment-image {
  max-width: 920px;
  max-height: 390px;
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
  font-size: 46px;
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
  top: 540px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 58px;
  justify-content: center;
  align-items: center;
  z-index: 15;
  max-width: 1824px;
}

.products-grid :deep(.product-card) {
  flex: 1;
  max-width: 585px;
  min-width: 390px;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 734px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 15;
  transition: opacity 0.2s ease;
  padding: 15px;
}

.nav-arrow:hover {
  opacity: 0.8;
}

.nav-arrow-left {
  left: 250px;
}

.nav-arrow-right {
  right: 250px;
}

.arrow-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: filter 0.2s ease;
}

.arrow-left {
  transform: scaleX(-1); /* Flip horizontally for left arrow */
}

.nav-arrow:hover .arrow-image {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.7));
}

/* Store flame styling - fixed pixel positions for 1920x1080 canvas */
.store-flame {
  position: absolute;
  width: 100px;
  height: 130px;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.store-flame-1 {
  top: 173px;
  left: 1690px;
}

.store-flame-2 {
  top: 173px;
  left: 211px;
}
</style>

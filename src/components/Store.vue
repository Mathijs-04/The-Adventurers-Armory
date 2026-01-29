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
    name: 'Frostbite Axe',
    description: 'This text is the placeholder description for item 1',
    price: 1850
  },
  {
    name: 'Burning Battleaxe',
    description: 'This text is the placeholder description for item 2',
    price: 1950
  },
  {
    name: 'Burning Barbute',
    description: 'This text is the placeholder description for item 3',
    price: 1200
  },
  {
    name: 'Sky Blade',
    description: 'This text is the placeholder description for item 4',
    price: 900
  },
  {
    name: 'Jade Dagger',
    description: 'This text is the placeholder description for item 5',
    price: 1450
  },
  {
    name: 'Ember Knife',
    description: 'This text is the placeholder description for item 6',
    price: 750
  },
  {
    name: 'Book of Beasts',
    description: 'This text is the placeholder description for item 7',
    price: 1700
  },
  {
    name: 'Tome of Stars',
    description: 'This text is the placeholder description for item 8',
    price: 2100
  },
  {
    name: 'Curses for Dummies',
    description: 'This text is the placeholder description for item 9',
    price: 450
  },
  {
    name: 'Tome of Heavens',
    description: 'This text is the placeholder description for item 10',
    price: 3400
  },
  {
    name: 'Rootbound Tome',
    description: 'This text is the placeholder description for item 11',
    price: 1350
  },
  {
    name: 'Chronicles of the Oracle',
    description: 'This text is the placeholder description for item 12',
    price: 2200
  },
  {
    name: 'Plate of the Paladin',
    description: 'This text is the placeholder description for item 13',
    price: 3400
  },
  {
    name: 'Mantle of the Ranger',
    description: 'This text is the placeholder description for item 14',
    price: 2840
  },
  {
    name: 'Armor of the Chosen',
    description: 'This text is the placeholder description for item 15',
    price: 6500
  },
  {
    name: 'Mysterious Treasure',
    description: 'This text is the placeholder description for item 16',
    price: 4500
  },
  {
    name: 'The Queens Locket',
    description: 'This text is the placeholder description for item 17',
    price: 2170
  },
  {
    name: 'The Cup of Kings',
    description: 'This text is the placeholder description for item 18',
    price: 890
  },
  {
    name: 'Crown of the fallen King',
    description: 'This text is the placeholder description for item 19',
    price: 4535
  },
  {
    name: 'Dragons Gem',
    description: 'This text is the placeholder description for item 20',
    price: 1400
  },
  {
    name: 'Blight Poison',
    description: 'This text is the placeholder description for item 21',
    price: 640
  },
  {
    name: 'Everburn Concoction',
    description: 'This text is the placeholder description for item 22',
    price: 520
  },
  {
    name: 'Love Potion',
    description: 'This text is the placeholder description for item 23',
    price: 1100
  },
  {
    name: 'Pixie Potion',
    description: 'This text is the placeholder description for item 24',
    price: 1020
  },
  {
    name: 'Moonbrew',
    description: 'This text is the placeholder description for item 25',
    price: 710
  },
  {
    name: 'Ring of Magica',
    description: 'This text is the placeholder description for item 26',
    price: 1950
  },
  {
    name: 'Dragonblade',
    description: 'This text is the placeholder description for item 27',
    price: 2800
  },
  {
    name: 'Trollslayers Hammer',
    description: 'This text is the placeholder description for item 28',
    price: 2300
  },
  {
    name: 'Axe of the Frostsworn',
    description: 'This text is the placeholder description for item 29',
    price: 3600
  },
  {
    name: 'The Grim Reaper™',
    description: 'This text is the placeholder description for item 30',
    price: 6000
  },
  {
    name: 'Tomb of Giants Map',
    description: 'This text is the placeholder description for item 31',
    price: 350
  },
  {
    name: 'Reapers Cove Map',
    description: 'This text is the placeholder description for item 32',
    price: 480
  },
  {
    name: 'Elven Shoes of Speed',
    description: 'This text is the placeholder description for item 33',
    price: 1710
  },
  {
    name: 'Barbarians Boots',
    description: 'This text is the placeholder description for item 34',
    price: 280
  }
]

// Function to get or create session-persistent random sequence
// Get or create sequence from sessionStorage
const getSessionSequence = () => {
  const sessionKey = 'fantasy-shop-sequence'
  const versionKey = 'fantasy-shop-version'
  const currentVersion = 2 // Increment when data structure changes

  // Check if we have a valid cached sequence with correct version
  let storedSequence = sessionStorage.getItem(sessionKey)
  let storedVersion = sessionStorage.getItem(versionKey)
  
  if (storedSequence && storedVersion === currentVersion.toString()) {
    return JSON.parse(storedSequence)
  }

  // Create new shuffled sequence of all items
  const shuffled = itemImages.map((image, index) => ({ image, originalIndex: index }))
    .sort(() => Math.random() - 0.5)

  // Create full product sequence
  const sequence = shuffled.map((item, newIndex) => ({
    id: newIndex + 1,
    image: item.image,
    ...itemData[item.originalIndex]
  }))

  // Store in sessionStorage with version for persistence during navigation
  sessionStorage.setItem(sessionKey, JSON.stringify(sequence))
  sessionStorage.setItem(versionKey, currentVersion.toString())
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

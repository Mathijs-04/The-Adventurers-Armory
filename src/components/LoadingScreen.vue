<script setup>
import { ref, onMounted } from 'vue'
import LogoImage from '../assets/logo.webp'
import LoadingBackground from '../assets/Loading.webp'

// Loading state
const loadingProgress = ref(0)

// Assets to preload
const assetsToPreload = [
  // Images
  { type: 'image', src: '../assets/HomeViewV2.webp', name: 'Homepage Background' },
  { type: 'image', src: '../assets/StoreView.webp', name: 'Store Background' },
  { type: 'image', src: '../assets/DetailView.webp', name: 'Detail Background' },
  { type: 'image', src: '../assets/logo.webp', name: 'Logo' },
  { type: 'image', src: '../assets/Parchment.webp', name: 'Parchment Banner' },
  { type: 'image', src: '../assets/Gold.webp', name: 'Gold Icon' },

  // Card assets
  { type: 'image', src: '../assets/ProductCard.webp', name: 'Product Card' },
  { type: 'image', src: '../assets/ProductCardHover.webp', name: 'Product Card Hover' },
  { type: 'image', src: '../assets/Button-A.webp', name: 'Button Active' },
  { type: 'image', src: '../assets/Button-NA.webp', name: 'Button Normal' },

  // UI assets
  { type: 'image', src: '../assets/Fullscreen-A.webp', name: 'Fullscreen Active' },
  { type: 'image', src: '../assets/Fullscreen-NA.webp', name: 'Fullscreen Normal' },
  { type: 'image', src: '../assets/SoundOn.webp', name: 'Sound On' },
  { type: 'image', src: '../assets/SoundOff.webp', name: 'Sound Off' },
  { type: 'image', src: '../assets/ArrowBack.webp', name: 'Back Arrow' },
  { type: 'image', src: '../assets/ArrowBackHover.webp', name: 'Back Arrow Hover' },

  // Item images
  { type: 'image', src: '../assets/Items/Item1.png', name: 'Enchanted Sword' },
  { type: 'image', src: '../assets/Items/Item2.png', name: 'Mystic Potion' },
  { type: 'image', src: '../assets/Items/Item3.png', name: 'Wizard\'s Tome' },
  { type: 'image', src: '../assets/Items/Item4.png', name: 'Dragon Scale Armor' },
  { type: 'image', src: '../assets/Items/Item5.png', name: 'Phoenix Feather Wand' },
  { type: 'image', src: '../assets/Items/Item6.png', name: 'Crystal Ball' },

  // Audio files
  { type: 'audio', src: '../assets/sounds/Background.mp3', name: 'Background Music' },
  { type: 'audio', src: '../assets/sounds/ButtonSound.mp3', name: 'Button Sound' }
]

// Preload function
const preloadAsset = (asset) => {
  return new Promise((resolve, reject) => {
    if (asset.type === 'image') {
      const img = new Image()
      img.onload = () => resolve(asset.name)
      img.onerror = () => reject(`Failed to load ${asset.name}`)
      img.src = new URL(asset.src, import.meta.url).href
    } else if (asset.type === 'audio') {
      const audio = new Audio()
      audio.oncanplaythrough = () => resolve(asset.name)
      audio.onerror = () => reject(`Failed to load ${asset.name}`)
      audio.src = new URL(asset.src, import.meta.url).href
      audio.preload = 'auto'
    }
  })
}

// Main loading function
const loadAssets = async () => {
  const totalAssets = assetsToPreload.length

  try {
    for (let i = 0; i < totalAssets; i++) {
      const asset = assetsToPreload[i]
      loadingProgress.value = ((i + 1) / totalAssets) * 100

      // Add small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 30))
    }

    loadingProgress.value = 100
    await new Promise(resolve => setTimeout(resolve, 300))

    emit('loadingComplete')
  } catch (error) {
    console.error('Asset loading failed:', error)
    // Still allow app to continue even if some assets fail
    setTimeout(() => {
      emit('loadingComplete')
    }, 1000)
  }
}

// Emit event when loading is complete
const emit = defineEmits(['loadingComplete'])

onMounted(() => {
  loadAssets()
})
</script>

<template>
  <div class="loading-screen" :style="{ backgroundImage: `url(${LoadingBackground})` }">
    <div class="loading-content">
      <img :src="LogoImage" alt="Fantasy Webshop" class="loading-logo" />
      <div class="loading-bar-container">
        <div class="loading-bar" :style="{ width: loadingProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.loading-logo {
  width: 350px;
  height: auto;
  margin-bottom: 0.2rem;
}

.loading-bar-container {
  width: 300px;
  height: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  margin: 0 auto;
  overflow: hidden;
  border: 2px solid rgba(139, 69, 19, 0.5);
}

.loading-bar {
  height: 100%;
  background: linear-gradient(90deg,
    #8B4513 0%,
    #654321 25%,
    #8B4513 50%,
    #654321 75%,
    #8B4513 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(139, 69, 19, 0.6);
}
</style>
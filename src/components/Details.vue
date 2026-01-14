<script setup>
import ProductCard from './ProductCard.vue'
import FlameGif from '../assets/flame.gif'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const detailFlamePositions = ref({
  flame1: { top: '35.25%', left: '91.75%' },
  flame2: { top: '35.25%', left: '8.5%' }
})

const detailFlameConfigs = {
  windowed: {
    flame1: { top: '35.25%', left: '91.75%' },
    flame2: { top: '35.25%', left: '8.5%' }
  },
  fullscreen: {
    flame1: { top: '37.25%', left: '91.75%' },
    flame2: { top: '37.25%', left: '8.5%' }
  },
  laptop: {
    flame1: { top: '35.25%', left: '93.75%' },
    flame2: { top: '35.25%', left: '6.5%' }
  }
}

const updateDetailFlamePosition = () => {
  // Check if in fullscreen mode
  if (document.fullscreenElement) {
    detailFlamePositions.value = detailFlameConfigs.fullscreen
  }
  // Check for laptop screen size (≤1440px)
  else if (window.innerWidth <= 1440) {
    detailFlamePositions.value = detailFlameConfigs.laptop
  }
  // Default windowed mode
  else {
    detailFlamePositions.value = detailFlameConfigs.windowed
  }
}

onMounted(() => {
  updateDetailFlamePosition()
  document.addEventListener('fullscreenchange', updateDetailFlamePosition)
  window.addEventListener('resize', updateDetailFlamePosition)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateDetailFlamePosition)
  window.removeEventListener('resize', updateDetailFlamePosition)
})
</script>

<template>
  <div class="details">
    <img :src="FlameGif" alt="Detail Flame 1" class="detail-flame detail-flame-1" />
    <img :src="FlameGif" alt="Detail Flame 2" class="detail-flame detail-flame-2" />
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

/* Detail flame styling */
.detail-flame {
  position: absolute;
  width: 100px;
  height: 130px;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.detail-flame-1 {
  top: v-bind('detailFlamePositions.flame1.top');
  left: v-bind('detailFlamePositions.flame1.left');
}

.detail-flame-2 {
  top: v-bind('detailFlamePositions.flame2.top');
  left: v-bind('detailFlamePositions.flame2.left');
}

/* Hide detail flames on small and large screens */
@media (max-width: 767px) {
  .detail-flame {
    display: none !important;
  }
}

@media (min-width: 1921px) {
  .detail-flame {
    display: none !important;
  }
}
</style>

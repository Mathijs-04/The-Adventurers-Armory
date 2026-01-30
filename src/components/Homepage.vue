<script setup>
import LogoImage from '../assets/logo.webp'
import FlameGif from '../assets/flame.gif'
import HomeBackground from '../assets/HomeViewV2.webp'
import CustomButton from './CustomButton.vue'

const emit = defineEmits(['navigateToStore'])

const goToStore = () => {
  emit('navigateToStore')
}
</script>

<template>
  <div class="homepage">
    <div class="background-container" :style="{ backgroundImage: `url(${HomeBackground})` }">
      <img :src="FlameGif" alt="Flame 1" class="flame-gif flame-1" />
      <img :src="FlameGif" alt="Flame 2" class="flame-gif flame-2" />
      <img :src="FlameGif" alt="Flame 3" class="flame-gif flame-3" />
      <img :src="FlameGif" alt="Flame 4" class="flame-gif flame-4" />
    </div>
    <img :src="LogoImage" alt="Logo" class="logo" />
    <CustomButton
      text="Enter Store"
      :action="goToStore"
      class="custom-button"
    />
  </div>
</template>

<style scoped>
/* Fixed canvas coordinate system: 1920x1080px */
.homepage {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding-top: 160px;
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 1;
}

.logo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  margin-top: -10px;
  z-index: 10;
  position: relative;
}

.custom-button {
  margin-top: -220px;
  z-index: 10;
  position: relative;
}

.flame-gif {
  /* Easy size adjustments - change these values */
  width: 100px;   /* Flame width */
  height: 130px;  /* Flame height */

  /* Other properties */
  position: absolute;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%); /* Center on the specified position */
}

/* Fixed pixel positions for 1920x1080 canvas */
.flame-1 {
  top: 324px;
  left: 1546px;
}

.flame-2 {
  top: 324px;
  left: 1805px;
}

.flame-3 {
  top: 324px;
  left: 374px;
}

.flame-4 {
  top: 324px;
  left: 115px;
}
</style>

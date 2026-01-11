<script setup>
import LogoImage from '../assets/logo.webp'
import CustomButton from './CustomButton.vue'

const emit = defineEmits(['navigateToStore'])

const goToStore = () => {
  emit('navigateToStore')
}
</script>

<template>
  <div class="homepage">
    <img :src="LogoImage" alt="Logo" class="logo" />
    <CustomButton 
      text="Enter Store" 
      :action="goToStore"
      class="custom-button"
    />
  </div>
</template>

<style scoped>
.homepage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/HomeView.webp');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding-top: 15vh;
}

.logo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  margin-top: -1svh;
}

.custom-button {
  margin-top: -8svh;
}


</style>

<script setup>
const emit = defineEmits(['navigateToStore'])

const goToStore = () => {
  emit('navigateToStore')
}
</script>

<template>
  <div class="homepage">
    <div class="hero">
      <img src="../assets/logo.webp" /> 
      <p class="hero-description">Homepage description text placeholder</p>
      <button @click="goToStore" class="hero-button">Go to Store</button>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
}

.hero-title {
  margin: 0 0 10px 0;
}

.hero-subtitle {
  margin: 0 0 20px 0;
}

.hero-description {
  margin: 0 0 30px 0;
}

.hero-button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
</style>

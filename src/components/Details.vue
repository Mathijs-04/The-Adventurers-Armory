<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'Product'
  },
  description: {
    type: String,
    default: 'Description placeholder text'
  },
  price: {
    type: Number,
    default: 100
  },
  image: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="details"></div>
</template>

<style scoped>
.details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/DetailView.webp');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}
</style>

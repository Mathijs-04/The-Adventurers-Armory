<script setup>
const emit = defineEmits(['navigateToStore'])

const goToStore = () => {
  emit('navigateToStore')
}
</script>

<template>
  <div>
    <h1>Homepage Title</h1>
    <button @click="goToStore">Go to Store</button>
  </div>
</template>

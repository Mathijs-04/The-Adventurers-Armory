<script setup>
import ProductCardDefault from '../assets/ProductCard.webp'
import ProductCardHover from '../assets/ProductCardHover.webp'
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['selectProduct'])

const isHovered = ref(false)

const handleClick = () => {
  emit('selectProduct', props.product)
}
</script>

<template>
  <div
    class="product-card"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img
      :src="isHovered ? ProductCardHover : ProductCardDefault"
      alt="Product Card"
      class="card-image"
    />
  </div>
</template>

<style scoped>
.product-card {
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>
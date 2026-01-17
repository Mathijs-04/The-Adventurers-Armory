<script setup>
import ProductCardDefault from '../assets/ProductCard.webp'
import ProductCardHover from '../assets/ProductCardHover.webp'
import GoldIcon from '../assets/Gold.webp'
import { ref, computed } from 'vue'

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

// Computed property for the item image path
const itemImagePath = computed(() => {
  return new URL(`../assets/Items/${props.product.image}`, import.meta.url).href
})
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
    <img
      :src="itemImagePath"
      alt="Item"
      class="item-image"
    />
    <div class="price-tag">
      <span class="price-number">{{ product.price }}</span>
      <img :src="GoldIcon" alt="Gold" class="gold-icon" />
    </div>
  </div>
</template>

<style scoped>
.product-card {
  cursor: pointer;
  position: relative;
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}

.item-image {
  position: absolute;
  top: 22%;
  left: 20.5%;
  width: 59%;
  height: 46%;
  object-fit: contain;
  pointer-events: none;
  z-index: 2;
  transform: scale(1);
  transition: transform 0.25s ease-in-out;
}

.product-card:hover .item-image {
  transform: scale(1.2);
}

.price-tag {
  position: absolute;
  bottom: 21%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 4px;
  z-index: 10;
}

.price-number {
  color: white;
  font-family: 'Firlest', Arial, sans-serif;
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 2px;
  margin-bottom: -3px;
  text-shadow:
    -1px -1px 0 #8B4513,
    1px -1px 0 #8B4513,
    -1px 1px 0 #8B4513,
    1px 1px 0 #8B4513,
    -1px -1px 0 #654321,
    1px -1px 0 #654321,
    -1px 1px 0 #654321,
    1px 1px 0 #654321,
    0 0 2px rgba(139, 69, 19, 0.8),
    0 0 4px rgba(139, 69, 19, 0.6);
}

.gold-icon {
  width: 25px;
  height: 25px;
  display: block;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  margin-bottom: -4.5px;
}
</style>
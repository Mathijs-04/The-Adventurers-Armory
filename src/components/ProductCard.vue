<script setup>
import Card from 'primevue/card'
import DetailsButton from './DetailsButton.vue'
import CartButton from './CartButton.vue'
import PlaceholderImage from '../assets/Placeholder.png'

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
    inStock: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: '../src/assets/Placeholder.png'
    }
})
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img alt="product image" :src="image" style="width: 100%; height: auto; display: block;" />
    </template>
    <template #title>{{ name }}</template>
    <template #subtitle>{{ Price }} Gold</template>
    <template #content>
      <p class="m-0">
       {{ description }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <DetailsButton />
        <CartButton />
      </div>
    </template>
  </Card>
</template>
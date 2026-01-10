<script setup>
import Card from 'primevue/card'
import DetailsButton from './DetailsButton.vue'
import CartButton from './CartButton.vue'
import PlaceholderImage from '../assets/Placeholder.png'
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img alt="product image" :src="PlaceholderImage" style="width: 100%; height: auto; display: block;" />
    </template>
    <template #title>Product Name</template>
    <template #subtitle>$99.99</template>
    <template #content>
      <p class="m-0">
        Product description placeholder text
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
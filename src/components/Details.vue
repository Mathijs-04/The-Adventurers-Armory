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
  <div class="details">
    <h1>{{ name }}</h1>
    <img :src="image" :alt="name" class="product-image" />
    <p class="price">{{ price }} Gold</p>
    <p class="description">{{ description }}</p>
  </div>
</template>

<style scoped>
.details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.product-image {
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto 20px;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
}

.description {
  line-height: 1.6;
}
</style>

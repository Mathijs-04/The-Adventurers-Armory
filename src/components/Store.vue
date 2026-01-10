<script setup>
import ProductCard from './ProductCard.vue'
import PlaceholderImage from '../assets/Placeholder.png'

const emit = defineEmits(['viewDetails'])

const handleProductDetails = (product) => {
  emit('viewDetails', product)
}

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 1,
    description: 'Product Description 1',
    image: PlaceholderImage
  },
  {
    id: 2,
    name: 'Product 2',
    price: 2,
    description: 'Product Description 2',
    image: PlaceholderImage
  },
  {
    id: 3,
    name: 'Product 3',
    price: 3,
    description: 'Product Description 3',
    image: PlaceholderImage
  },
  {
    id: 4,
    name: 'Product 4',
    price: 4,
    description: 'Product Description 4',
    image: PlaceholderImage
  },
  {
    id: 5,
    name: 'Product 5',
    price: 5,
    description: 'Product Description 5',
    image: PlaceholderImage
  },
  {
    id: 6,
    name: 'Product 6',
    price: 6,
    description: 'Product Description 6',
    image: PlaceholderImage
  }
]
</script>

<template>
  <div class="store">
    <div class="store-header">
      <h1>Store Page</h1>
      <p>Placeholder text for store description</p>
    </div>

    <div class="products-container">
        <ProductCard 
        v-for="product in products"
        :key="product.id"
        :name="product.name"
        :price="product.price"
        :description="product.description"
        :image="product.image"
        @view-details="handleProductDetails"
      />
    </div>
  </div>
</template>

<style scoped>
.store {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
}

.store-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.store-header h1 {
  margin-bottom: 10px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

</style>
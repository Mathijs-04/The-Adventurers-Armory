<script setup>
import Button from 'primevue/button'

const props = defineProps({
  isInCart: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <Button 
    :label="isInCart ? 'Remove from cart' : 'Add to cart'" 
    severity="secondary"
    variant="outlined"
    class="w-full" 
    @click="handleClick" 
  />
</template>
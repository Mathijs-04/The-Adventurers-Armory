<script setup>
import Button from 'primevue/button'

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <Button label="View Details" severity="secondary" variant="outlined" class="w-full" @click="handleClick" />
</template>
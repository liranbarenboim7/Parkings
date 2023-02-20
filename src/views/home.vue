<template>
    
</template>
<script setup>import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useGeolocation } from './src/geo/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))

</script>
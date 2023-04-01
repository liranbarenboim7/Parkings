import { onUnmounted, onMounted, reactive,ref } from 'vue'
import { useStore } from "vuex";
export async function useGeolocation() {
  const coords = ref({ latitude: 0, longitude: 0 })
  const isSupported = 'navigator' in window && 'geolocation' in navigator
  const store = useStore();

  let watcher = null
  onMounted(async  () => {
    if (isSupported)
      watcher = await navigator.geolocation.watchPosition(
        async (position) => {
          coords.value = position.coords
          await store.dispatch("gMapModule/UpdateLocation", {
            currLocation: coords.value,
          });
        }
      )
  })
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, isSupported }
}
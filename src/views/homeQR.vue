<template>
     <header class="header-area header-sticky">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="main-nav">
                        <!-- ***** Logo Start ***** -->
                        <a href="#" class="logo">
                            <img src="../assets/images/work-process-item-01.png" alt="Softy Pinko"/>
                        </a>
                        <!-- ***** Logo End ***** -->
                        <!-- ***** Menu Start ***** -->
                        <ul class="nav">
                            <li><a href="#welcome" class="active">דף בית</a></li>
                            <li><a href="#contact">צור קשר</a></li>
                            <li><a href="#pricing-plans">שלם חניה</a></li>
                        </ul>
                        <a class='menu-trigger'>
                            <span>Menu</span>
                        </a>
                        <!-- ***** Menu End ***** -->
                    </nav>
                </div>
            </div>
        </div>
    </header>
<div class="container" style="position:relative;left:8vw;top:22vh;width:180% ; max-height: 90vh">
  <div class="row">
    <div class="col md-6">

  

      <table style="width:100%">
 
 <tr v-for="category in parkingCategories.value" v-bind:key="category.id">

   <td class="right">מחירון: {{ category.price }}</td>
   <td class="right">עד שעה: {{category.to}}</td>
   <td class="right">משעה : {{category.from}}</td>
   <td class="right"> {{category.category}} : {{ category.action }}</td>
 </tr>
</table>
    </div>
    <div class="col md-6">
    <div ref="mapDiv" style="position relative;width: 100%; height: 70vh" />
    </div>
    </div>
  

  </div>
  </template>
<script setup>import { computed, ref, onMounted, onUnmounted, watch,reactive } from 'vue'
import { useGeolocation } from '../geo/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router'
/////////////////////////////////////Parkings-take it to component//////////////////////
const store = useStore();
const isConnectedArray = reactive([])
const formParking = computed(() => store.state.parkingModule.selectedParking);
const formParkingId = computed(() => store.state.parkingModule.selectedParking.id);
const parkings = computed(() => store.state.parkingModule.parkingsData);
const categories = computed(() => store.state.categoryModule.categoryData);

const urlId = ref('')
const parkingCategories = reactive([])
function isValidFirestoreId(id) {
  return id.match(/^[a-zA-Z0-9\-_]+$/)
}
const route = useRoute()
const router = useRouter()
//https://medium.com/geekculture/vue-js-parameters-of-router-are-undefined-a21accc23c2e
onMounted(async () => {
  urlId.value = route.query.id;
  console.log('Before Router Preparation', route.name);
  await router.isReady();
  console.log('After Router Preparation', route.name + route.query.id);
  await getParkings()
  await getCategories()
  await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7
      })
      clickListener = map.value.addListener(
        'click',
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = { lat: lat(), lng: lng() })
      )
  //select parki
})

// watch(() => formParkingId.value, async (newA, prevA) => {
//   await store.dispatch('parkingCategoryModule/getParkingCategory', { parkingId: formParkingId })
//   isConnectedArray.value = await store.dispatch('parkingCategoryModule/IsConnectedArray', { parkingId: formParkingId.value })
// });

watch(() => parkings.value, async (newA, prevA) => {
  await store.dispatch("parkingModule/SelectParking", {
    selectedParkingId: urlId.value,
  });
});
watch(() => categories.value, async (newA, prevA) => {
  if (categories && categories.value) {
    isConnectedArray.value = await store.dispatch('parkingCategoryModule/IsConnectedArray', { parkingId: urlId.value })
    const connectedCategories = categories.value.filter(category => isConnectedArray.value.includes(category.id))
    parkingCategories.value = connectedCategories

  }
  
  
});



async function getParkings() {

  await store.dispatch("parkingModule/getParkings", {});


}

async function getCategories() {

  await store.dispatch("categoryModule/getCategories", {});


}


///////////////////////////////////////////////////////////////////
const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const otherPos = ref(null)
    const loader = new Loader({ apiKey: 'AIzaSyAmIvnZ49fJwnY0xYQmwbv0hebHejPnFPE' })
    const mapDiv = ref(null)
    let map = ref(null)
    let clickListener = null
    // onMounted(async () => {
    //   await loader.load()
    //   map.value = new google.maps.Map(mapDiv.value, {
    //     center: currPos.value,
    //     zoom: 7
    //   })
    //   clickListener = map.value.addListener(
    //     'click',
    //     ({ latLng: { lat, lng } }) =>
    //       (otherPos.value = { lat: lat(), lng: lng() })
    //   )
    // })
    onUnmounted(async () => {
      if (clickListener) clickListener.remove()
    })
    let line = null
    watch([map, currPos, otherPos], () => {
      if (line) line.setMap(null)
      if (map.value && otherPos.value != null)
        line = new google.maps.Polyline({
          path: [currPos.value, otherPos.value],
          map: map.value
        })
    })
    const haversineDistance = (pos1, pos2) => {
      const R = 3958.8 // Radius of the Earth in miles
      const rlat1 = pos1.lat * (Math.PI / 180) // Convert degrees to radians
      const rlat2 = pos2.lat * (Math.PI / 180) // Convert degrees to radians
      const difflat = rlat2 - rlat1 // Radian difference (latitudes)
      const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180) // Radian difference (longitudes)
      const d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        )
      return d
    }
    const distance = computed(() =>
      otherPos.value === null
        ? 0
        : haversineDistance(currPos.value, otherPos.value)
    )

</script>
<style scoped>
.right {
  text-align: right;
  height: 50px;
  vertical-align: bottom;
}
</style>
<template>
  <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <!-- ***** Logo Start ***** -->
            <a href="#" class="logo">
              <img src="../assets/logo.png" width="50" height="50" style="position:relative;left:3px;top:-20px" alt="Softy Pinko" />
            </a>
            <!-- ***** Logo End ***** -->
            <!-- ***** Menu Start ***** -->
            <ul class="nav">
              <li><a href="\">צור קשר</a></li>
              <li><a href="\">שלם חניה</a></li>
              <li><a href="\" class="active">דף בית</a></li>

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



        <div class="text-left" style="position:relative;top:200px;height: 20vh">
          <div class="m-auto">
            <h4>Your Position</h4>
            Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
            {{ currPos.lng.toFixed(2) }}
          </div>
          <div class="m-auto">
            <h4>Distance</h4>
            {{ distance.toFixed(2) }} miles
          </div>
          <div class="m-auto">
            <h4>Clicked Position</h4>
            <span v-if="otherPos">
              Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
              {{ otherPos.lng.toFixed(2) }}
            </span>
            <span v-else>Click the map to select a position</span>
          </div>
        </div>
      </div>
      <div class="col md-6">
        <div ref="mapDiv" style="position relative;width: 100%; height: 70vh" />
      </div>
    </div>


  </div>
</template>
<script setup>
import { computed, ref, onMounted, onUnmounted, watch,toRaw } from 'vue'
import { useGeolocation } from '../geo/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
const { coords } = useGeolocation()
const currPos = computed(() => ({
  lat: coords?.value?.latitude,
  lng: coords?.value?.longitude
}))
const otherPos = ref(null)
const loader = new Loader({ apiKey: 'AIzaSyDxIpixajq0g7z7NGtftVelLoSeTLtWQc0' })
const mapDiv = ref(null)
const marker = ref(null)
let markers = ref([]);

let map = ref(null)
let clickListener = null
onMounted(async () => {
  await loader.load()
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 12
  })
 
  clickListener = map.value.addListener(
    'click',
    ({ latLng: { lat, lng } }) =>
      (otherPos.value = { lat: lat(), lng: lng() })
  )
})
onUnmounted(async () => {
  if (clickListener) clickListener.remove()
})
let line = null
watch([  currPos, otherPos],async () => {
  await loader.load()
  if(currPos.value)
  {
    // map.value = new google.maps.Map(mapDiv.value, {
    // center: currPos.value,
    // zoom: 12
  //})
  }
 // if (line) line.setMap(null)
  if (map.value && otherPos.value != null)
  {
      deleteMarkers()
      addMarker(otherPos.value,map.value)
      // The marker, positioned at Uluru
 
  }
    // line = new google.maps.Polyline({
    //   path: [currPos.value, otherPos.value],
    //   map: map.value
    // })
})
function setMapOnAll() {
  for (let i = 0; i < markers.value.length; i++) 
  {
    toRaw(markers.value[i]).setMap(map.value);
  }
}
function hideMarkers(){
  setMapOnAll(null);
}
function addMarker(position,map) {
  const marker = new google.maps.Marker({
    position,
    map
  });

  markers.value.push(marker);
}
function deleteMarkers() {
  for (let i = 0; i < markers.value.length; i++) 
  {
    toRaw(markers.value[i]).setMap(null);
  }
  markers.value = [];
}
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

//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
</script>


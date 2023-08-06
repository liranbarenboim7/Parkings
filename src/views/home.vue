<template>
  <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <!-- ***** Logo Start ***** -->
            <a href="#" class="logo">
              <img src="../assets/logo.png" width="50" height="50" style="position:relative;left:3px;top:-20px"
                alt="Softy Pinko" />
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
  <section id="service" class="our_services">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12" style="height:75vh;overflow-y:hidden">
          <!-- <div class="map" style="width:100%;height:100%" id="map"> -->
          <div ref="mapDiv" style="width:100%;height: 40vh">

          </div>
          <div id="streetDev" ref="streetDiv" style="width: 100%; height: 35vh" />
        </div><!-- END col -->
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12" style="height:70vh;overflow-y:auto">
          <div class="row" v-for="parking in parkings" v-bind:key=parking.id>
            <div class="col-lg-12 col-sm-12 col-xs-12 " >
              <div :class="{active: parking.id == formParkingId }" class="service border" v-on:click="selectParking(parking.id)">
                <div class="icon"><i class="fa fa-home" @click="selectParking(parking.id)"></i></div>
                <h4>Parking</h4>
                <p> {{ parking.address }}</p>
              </div>
            </div><!-- END COL -->

          </div>
        </div>
      </div><!-- END MAIN ROW -->

    </div><!-- END CONTAINER -->
  </section>
</template>
<script setup>
import { computed, ref, onMounted, onUnmounted, watch, toRaw } from 'vue'
import { useGeolocation } from '../geo/useGeolocation'
import { loader } from '../firebaseDB/index'
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router'
const isSupported = 'navigator' in window && 'geolocation' in navigator
const route = useRoute();
const store = useStore()
// const currPos = computed(() => ({
//   lat: coords?.value?.latitude,
//   lng: coords?.value?.longitude
// }))
const currPos = computed(() => store.state.gMapModule.currentCoords);
const parkings = computed(() => store.state.parkingModule.parkingsData);

const otherPos = ref(null)
//const loader = new Loader({ apiKey: 'AIzaSyDxIpixajq0g7z7NGtftVelLoSeTLtWQc0' })

const marker = ref(null)
let markers = ref([]);
const formParkingId = computed(() => store.state.parkingModule.selectedParking.id);
const formParking = computed(() => store.state.parkingModule.selectedParking);
let myLatlng = { lat: 31.85, lng: 34.76 };

let clickListener = null
const mapDiv = ref(null)
const panorama = ref(null)
const streetDiv = ref(null)
let map = ref(null)
let mapZoom = ref(15)
onMounted(async () => {
  await store.dispatch("parkingModule/getParkings", {});
  await loader.load()
  map.value = new google.maps.Map(mapDiv.value, {
    center: myLatlng,
    zoom: 14
  })

  clickListener = map.value.addListener(
    'click',
    ({ latLng: { lat, lng } }) =>
      (otherPos.value = { lat: lat(), lng: lng() })
  )
  setTimeout(() => {
    const fenway = { lat: 32.09, lng: 34.81 };
    updateStreet(fenway)
  }, 1000);
})
onUnmounted(async () => {
  if (clickListener) clickListener.remove()
})
const selectParking = async (id) => {
  await store.dispatch("parkingModule/SelectParking", {
    selectedParkingId: id,
  });
};
watch(() => formParkingId.value, async () => {
  deleteMarkers()
  const pos = { lat: parseFloat(formParking.value.latitude), lng: parseFloat(formParking.value.longitude) }
  addMarker(pos, map.value)

  // map.value.setZoom(12);
  map.value.setCenter(pos);
  updateStreet(pos)
});
let line = null
function updateStreet(pos) {
  const fenway = { lat: 32.09, lng: 34.81 };
  panorama.value = new google.maps.StreetViewPanorama(
    document.getElementById("streetDev"),
    {
      position: pos,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );

  map.value.setStreetView(panorama.value);

}


watch([parkings], async () => {
  //await loader.load()
  if (parkings && parkings.value) {
    parkings.value.forEach(prk => {
      addMarker({ lat: parseFloat(prk.latitude), lng: parseFloat(prk.longitude) }, map.value)
    });
    myLatlng.lat = currPos.value.latitude
    myLatlng.lng = currPos.value.longitude
    // map.value.setZoom(12);
    //map.value.setCenter(myLatlng);

  }

  // line = new google.maps.Polyline({
  //   path: [currPos.value, otherPos.value],
  //   map: map.value
  // })
})

function setMapOnAll() {
  for (let i = 0; i < markers.value.length; i++) {
    toRaw(markers.value[i]).setMap(map.value);
  }
}
function hideMarkers() {
  setMapOnAll(null);
}
function addMarker(position, map) {
  const marker = new google.maps.Marker({
    position,
    map
  });

  markers.value.push(marker);
}
function deleteMarkers() {
  for (let i = 0; i < markers.value.length; i++) {
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
<style scoped>
.icon {
  pointer-events: all;
  cursor: -webkit-grab;
  cursor: grab;
}
.active
{
  background-color:yellow;
  color:blue;
}
</style>


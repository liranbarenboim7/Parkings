<template>
  <div class="logo two-col" style="height:180px;width:20%">
    <a style="float:left" href="#" target="_blank"><img src="../assets/logo.png" alt=""></a>
  </div>
<div class="two-col" style="height:180px;width:60%">

  <div class="pac-card " id="pac-card">
   
      <div id="title">Search the place</div>


    <div id="pac-container" style="padding:10px">

      <div class="form-outline">
        <input type="search" id="pac-input" class="form-control" placeholder="Enter a location" style="width:100%"/>

      </div>

    </div>

  </div>
</div>

 
  <div class="banner">
    <div ref="mapDiv" style="width:100%;height: 40vh">

    </div>
  </div>

  <div class="two-col">
    <div id="streetDev" ref="streetDiv" style="width: 100%; height: 35vh">
    </div><!-- END col -->
  </div>

  <div class="two-col">
    <h2>{{formParking?.value?.address}}</h2>
    <p dir="rtl"  style="white-space: pre-line;text-align: right;">{{formParking?.value?.descr}}</p>
    <div class="button-holder">
      <a class="button" href="https://responsivehtmlemail.com/html-email-course/" target="_blank">Get Started</a>
    </div>
  </div>

  <div class="line"></div>

  <div class="three-col">
    <h2>Ecommerce</h2>
    <a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"></a>
    <p>There are many different email clients to consider when determining the width of your design.</p>
    <div class="button-holder">
      <a class="button" href="https://responsivehtmlemail.com/html-email-course/" target="_blank">Email Course</a>
    </div>
  </div>

  <div class="three-col">
    <h2>Web Design</h2>
    <a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"></a>
    <p>There are many different email clients to consider when determining the width of your design.</p>
    <div class="button-holder">
      <a class="button" href="https://responsivehtmlemail.com/html-email-course/" target="_blank">Learn More</a>
    </div>
  </div>

  <div class="three-col">
    <h2>Email Dev</h2>
    <a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"></a>
    <p>There are many different email clients to consider when determining the width of your design.</p>
    <div class="button-holder">
      <a class="button" href="https://responsivehtmlemail.com/html-email-course/" target="_blank">HTML Email</a>
    </div>
  </div>

  <div class="line"></div>

  <p class="contact">
    <a href="https://responsivehtmlemail.com/html-email-course/" target="_blank">www.responsivehtmlemail.com</a><br>
    1 (800) 555-5555<br>
    2 Town Road - City - State 99999<br>
    test@responsivehtmlemail.com
  </p>
</template>
<script setup>
import { computed, ref, onMounted, onUnmounted, watch, toRaw } from 'vue'
import { useGeolocation } from '../geo/useGeolocation'
import { loader } from '../firebaseDB/index'
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router'
import router from '../router'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import NavBar from "../components/NavBar.vue";
const isSupported = 'navigator' in window && 'geolocation' in navigator
const route = useRoute();
const store = useStore()
const auth = getAuth();
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
let myLatlng = { lat: 32.0831, lng: 34.9030 };

let clickListener = null
const mapDiv = ref(null)
const panorama = ref(null)
const streetDiv = ref(null)
let map = ref(null)
let mapZoom = ref(15)
const isAuth = ref(false);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    isAuth.value = true;
    // ...
  } else {
    isAuth.value = false;
    // User is signed out
    router.push('/signin')

  }
});

onMounted(async () => {
 // await store.dispatch("parkingModule/getParkings", {});
  await loader.load()
  map.value = new google.maps.Map(mapDiv.value, {
    center: myLatlng,
    zoom: 14
  })


  setTimeout(async () => {
    // map.value = new google.maps.Map(mapDiv.value, {
    //   center: myLatlng,
    //   zoom: 14
    // })


    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    //map.value.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input, options);
    // autocomplete.bindTo("bounds", map);

    
    const marker = new google.maps.Marker({
      map:map.value,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
    
      marker.setVisible(false);

      const place = autocomplete.getPlace();


      map.value.setCenter(place.geometry.location);
      map.value.setZoom(17);


      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      // infowindowContent.children["place-name"].textContent = place.name;
      // infowindowContent.children["place-address"].textContent =
      //   place.formatted_address;
      // infowindow.open(map.value, marker);
      updateStreet(place.geometry.location)
    });


    await store.dispatch("parkingModule/getParkings", {});
    updateStreet(myLatlng)
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
//  deleteMarkers()
  const pos = { lat: parseFloat(formParking.value.latitude), lng: parseFloat(formParking.value.longitude) }
 // addMarker(pos,formParking.value.id, map.value)

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
      addMarker({ lat: parseFloat(prk.latitude), lng: parseFloat(prk.longitude) },prk.id, map.value)
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
  // marker.addListener("click", () => {
  //   map.value.setZoom(8);
  //   map.value.setCenter(marker.getPosition());
  // });

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

.active {
  background-color: yellow;
  color: blue;
}


/* 
 * Optional: Makes the sample page fill the window. 
 */


#description {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
}

#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}

.pac-card {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  font-family: Roboto;
  padding: 0;
}

#pac-container {
  padding-bottom: 12px;
  margin-right: 12px;
}

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
}

#pac-input {
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

#pac-input:focus {
  border-color: #4d90fe;
}

#title {
  color: #fff;
  background-color: #4d90fe;
  font-size: 25px;
  font-weight: 500;
  padding: 6px 12px;
}
</style>


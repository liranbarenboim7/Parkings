<template>
 <div class="banner">
    <div ref="mapDiv" style="width:100%;height: 40vh">

    </div>
  </div>

  <div class="two-col">
    <div id="streetDev" ref="streetDiv" style="width: 100%; height: 35vh">
    </div><!-- END col -->
  </div>

  <div class="two-col" :key="address" dir="auto" style="white-space: pre-wrap;">
  
            <div class="m-auto" v-if="currPos ">
              <h4>Your Position</h4>
              Latitude: {{ currPos.latitude.toFixed(2) }}, Longitude:
              {{ currPos.longitude.toFixed(2) }}
            </div>
            <div class="m-auto">
              <h4>Distance</h4>
              {{ distance.toFixed(2) }} miles
            </div>
            <div class="m-auto">
              <h4>Clicked Position</h4>
              <span v-if="otherPos">
                Latitude: {{ otherPos.lat.toFixed(4) }}, Longitude:
                {{ otherPos.lng.toFixed(4) }}
              </span>
              <span v-else>Click the map to select a position</span>
            </div>
   
  </div>
  
  
    <!-- <div class="container" style="position:relative;left:8vw;top:22vh;width:180% ; max-height: 90vh">
  
      <div class="row">
        <div class="col md-6">
          <div  v-for="parking in parkings">
       
     
    
                <div class="column">
                  {{ parking.address }}
                </div>
  
  
  
          </div>
  
  
  
          <div class="text-left" style="position:relative;top:200px;height: 20vh">
            <div class="m-auto" v-if="currPos ">
              <h4>Your Position</h4>
              Latitude: {{ currPos.latitude.toFixed(2) }}, Longitude:
              {{ currPos.longitude.toFixed(2) }}
            </div>
            <div class="m-auto">
              <h4>Distance</h4>
              {{ distance.toFixed(2) }} miles
            </div>
            <div class="m-auto">
              <h4>Clicked Position</h4>
              <span v-if="otherPos">
                Latitude: {{ otherPos.lat.toFixed(4) }}, Longitude:
                {{ otherPos.lng.toFixed(4) }}
              </span>
              <span v-else>Click the map to select a position</span>
            </div>
          </div>
        </div>
        <div class="col md-6">
          <div ref="mapDiv" style="position relative;width: 100%; height: 70vh" />
        </div>
      </div>
  
    </div> -->
  
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
  const mapDiv = ref(null)
  const marker = ref(null)
  let markers = ref([]);
  let myLatlng = { lat: 31.85, lng: 34.76 };
  let map = ref(null)
  let clickListener = null
  
  onMounted(async () => {
    await store.dispatch("parkingModule/getParkings", {});
    await loader.load()
    map.value = new google.maps.Map(mapDiv.value, {
      center: myLatlng,
      zoom: 12
    })
  
    clickListener = map.value.addListener(
      'click',
      ({ latLng: { lat, lng } }) =>
        (otherPos.value = { lat: lat(), lng: lng() })
    )
    if (isSupported)
    {
        var watcher = await navigator.geolocation.watchPosition(
          async (position) => {
            var coords = position.coords
            await store.dispatch("gMapModule/UpdateLocation", {
              currLocation: coords,
            });
          })
    }
  })
  onUnmounted(async () => {
    if (clickListener) clickListener.remove()
  })
  let line = null
  watch([otherPos], async () => {
    //await loader.load()
    // if(currPos.value && map && map.value)
    // {
    //   myLatlng.lat = currPos.value.latitude
    //   myLatlng.lng = currPos.value.longitude
    //  // map.value.setZoom(12);
    //   map.value.setCenter(myLatlng );
  
    // }
    // if (line) line.setMap(null)
    if (map.value && otherPos.value != null) {
      deleteMarkers()
      addMarker(otherPos.value, map.value)
      // The marker, positioned at Uluru
  
    }
    // line = new google.maps.Polyline({
    //   path: [currPos.value, otherPos.value],
    //   map: map.value
    // })
  })
  
  watch([parkings], async () => {
    //await loader.load()
    if (parkings && parkings.value) {
      parkings.value.forEach(prk => {
        addMarker({lat:parseFloat(prk.latitude),lng:parseFloat(prk.longitude)}, map.value)
      });
      myLatlng.lat = currPos.value.latitude
      myLatlng.lng = currPos.value.longitude
      // map.value.setZoom(12);
      map.value.setCenter(myLatlng);
  
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


<template>
  <div class="app-pages">
    <div class="row main">
      <div class="col md-4">
        <div ref="mapDiv" style="position relative;width: 100%; height: 70vh" />
      </div>
 

      <div class="col md-4 details">
        <div class="row parkingdetailes">
          <ParkingDetails :parkingid="currentParking" />
        </div>
        <div class="row parkingcategories">
          <ParkingCategory />
        </div>
      </div>
      <div class="col md-4 parkings">
        <ParkingList />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, reactive,computed,watch } from 'vue'
import { db } from '@/firebaseDB'
import {
  collection, onSnapshot,
  addDoc, doc, deleteDoc, updateDoc,
  query, orderBy, limit, setDoc
} from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import router from '../router'
import ParkingDetails from "../components/ParkingDetails.vue"
import ParkingList from "../components/parkinglist.vue"
import ParkingCategory from "../components/parkingcategory.vue"
import { loader } from '../firebaseDB/index'
import { useStore } from "vuex";

const parkings = ref([

])
const store = useStore()
const mapDiv = ref(null)
let map = ref(null)
let mapZoom = ref(15)
let clickListener = null

const buttonText = ref('add')

const auth = getAuth();
const otherPos = ref(null)
function isValidFirestoreId(id) {
  return id.match(/^[a-zA-Z0-9\-_]+$/)
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    router.push('SignIn')
  }
});

const categories = ref([])
const parkingCategories = ref([])
const currPos = computed(() => store.state.gMapModule.currentCoords);
let myLatlng = { lat: 31.85, lng: 34.76 };
let line = null
watch([map,  otherPos], () => {

  if (line) line.setMap(null)
  if (map.value && otherPos.value != null)
    line = new google.maps.Polyline({
      path: [currPos.value, otherPos.value],
      map: map.value
    })
})
watch( currPos, () => {
  map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: mapZoom.value
      })

})
onMounted(async () => {

  if (auth.currentUser) {
   // getParkings()
   // getCategories()

  }
  else {
    router.push('/Signin')
  }
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
})



function updateSelection() {

  parkingCategories.value.Add(category)

}



</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
}

.line-through {
  text-decoration: line-through;
}
</style>
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
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '../geo/useGeolocation'
const loader = new Loader({ apiKey: 'AIzaSyAmIvnZ49fJwnY0xYQmwbv0hebHejPnFPE' })
const parkings = ref([

])

const mapDiv = ref(null)
let map = ref(null)
let mapZoom = ref(15)
let clickListener = null

const buttonText = ref('add')
const parkingsCollectionRef = collection(db, 'parkings')
const categoriesCollectionRef = collection(db, 'categories')
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
const { coords } = useGeolocation()
const currPos = computed(() => ({
  
  lat: coords?.value?.latitude,
  lng: coords?.value?.longitude
}))
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
    getParkings()
    getCategories()

  }
  else {
    router.push('/Signin')
  }
  await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: mapZoom.value
      })
      clickListener = map.value.addListener(
        'click',
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = { lat: lat(), lng: lng() })
      )
})


let address = ref('')
let side = ref('')
let category = ref('')
let newId = ref('')

// const categories = reactive([])
// const parkingCategories = reactive([])

function updateSelection() {

  parkingCategories.value.Add(category)

}

/// Getting categories for combobox
function GetCategoriesFromParking(documentId) {
  const parkingCategoriesRef = doc(collection(db, 'parkings'), documentId)
    .collection('categories');
  onSnapshot(parkingCategoriesRef, (querySnapshot) => {
    const subcollection = [];
    querySnapshot.forEach((doc) => {
      subcollection.push({ id: doc.id, ...doc.data() });
    });
    parkingCategories.value = subcollection;
  });
}
function getCategories() {
  onSnapshot(categoriesCollectionRef, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        category: doc.data().category,
      }
      fbTodos.push(todo)
    })
    categories.value = fbTodos
  })
}


//Getting parking
function getParkings() {
  onSnapshot(parkingsCollectionRef, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        address: doc.data().address,
        side: doc.data().side,
        category: doc.data().category,
      }
      fbTodos.push(todo)
    })
    parkings.value = fbTodos
  })
}


function updateParking(id) {
  const frankDocRef = doc(db, "parkings", id);
  setDoc(frankDocRef, {
    address: address.value,
    side: side.value,
    category: category.value,

  });

}



const deleteTodo = id => {
  deleteDoc(doc(parkingsCollectionRef, id))
}

const toggleDone = id => {
  const index = parkings.value.findIndex(park => park.id === id)
  category.value = parkings.value[index].category
  newId.value = id
  address.value = parkings.value[index].address
  side.value = parkings.value[index].side

  // updateDoc(doc(parkingsCollectionRef, id), {
  //    done: !parkings.value[index].done
  //  });
}

const getParking = (id) => {
  db.collection('parkings').doc(id).get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  })
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
<template>
  <div class="input-group mb-10 ">
    <span class="input-group-text" id="basic-addon1">Select categories</span>
    <select v-model="category" @change="updateSelection">
      <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}
      </option>
    </select>
  </div>

  <ul>
    <!-- <li v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</li> -->
    <div class="card parking-list">
      <div class="card" v-for="category in categories" v-bind:key="isConnectedArray.value">
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">

              <div class="column">
                <input type="checkbox"  :checked="isConnected(category.id)" 
                  @change="updateParkingCategory($event, category.id)" />
                {{ category.category }}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </ul>


</template>
<script setup>
import { ref, onMounted, onUpdated, reactive, computed,watch } from 'vue'
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
import { useStore } from "vuex";

const parkings = ref([

])
const store = useStore();
const buttonText = ref('add')
const parkingsCollectionRef = collection(db, 'parkings')
const categoriesCollectionRef = collection(db, 'categories')
const auth = getAuth();

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

const parkingCategories = computed(() => store.state.parkingCategoryModule.parkingCategoryData);
const formParkingId = computed(() => store.state.parkingModule.selectedParking.id);
const categories = computed(() => store.state.categoryModule.categoryData)
onMounted(async () => {

  if (auth.currentUser) {
    await store.dispatch('categoryModule/getCategories', {})
    await store.dispatch('parkingCategoryModule/getParkingCategory', {parkingId:formParkingId})
  }
  else {
    router.push('/Signin')
  }

})
//html items with checkbox fires change event write event handler function which checks is check box selected call to method methA else call method methB
const updateParkingCategory = (async (event, id) => {
  if (event.target.checked) {
    await store.dispatch('parkingCategoryModule/AddParkingCategory', { parkingId: formParkingId.value, categoryId: id })
  } else {
    await store.dispatch('parkingCategoryModule/DeleteParkingCategory', { parkingId: formParkingId.value, categoryId: id })
  }
})

const isConnectedArray = reactive([])


const isConnected = ((catId)=>{
  const conn = isConnectedArray.value.filter(element => element.categoryId === catId)
  return conn.length > 0
})
watch(()=>formParkingId.value, async (newA, prevA) => {
  await store.dispatch('parkingCategoryModule/getParkingCategory', {parkingId:formParkingId})
  isConnectedArray.value = await store.dispatch('parkingCategoryModule/IsConnectedArray', { parkingId: formParkingId.value })
 });

</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
}

.line-through {
  text-decoration: line-through;
}

.parking-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
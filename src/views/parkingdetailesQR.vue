<template>
  <div class="app-pages container card">

    <div class="row">
      Details
    </div>
    <div class="row">
    <div class="col md-6">
      {{ formParking.address }}
    </div>
      </div>




  </div>


</template>

<script setup>
import { ref, onMounted, onUpdated, computed, reactive , watch} from "vue";
import { useStore } from "vuex"
import {
  collection, onSnapshot,
  addDoc, doc, deleteDoc, updateDoc,
  query, orderBy, limit, setDoc, getDoc
} from "firebase/firestore"
import { useRoute, useRouter } from 'vue-router'

const store = useStore();
const isConnectedArray = reactive([])
const formParking = computed(() => store.state.parkingModule.selectedParking);
const formParkingId = computed(() => store.state.parkingModule.selectedParking.id);
const parkings = computed(() => store.state.parkingModule.parkingsData);
const urlId = ref('')
function isValidFirestoreId(id) {
  return id.match(/^[a-zA-Z0-9\-_]+$/)
}
const route = useRoute()
const router = useRouter()
//https://medium.com/geekculture/vue-js-parameters-of-router-are-undefined-a21accc23c2e
onMounted(async () => {
  console.log('Before Router Preparation', route.name);
  await router.isReady();
  console.log('After Router Preparation', route.name + route.query.id);
  await getParking(route.query.id)
  urlId.value = route.query.id;
  //select parki
})

watch(()=>formParkingId.value, async (newA, prevA) => {
  await store.dispatch('parkingCategoryModule/getParkingCategory', {parkingId:formParkingId})
  isConnectedArray.value = await store.dispatch('parkingCategoryModule/IsConnectedArray', { parkingId: formParkingId.value })
 });

 watch(()=>parkings.value, async (newA, prevA) => {
  await store.dispatch("parkingModule/SelectParking", {
    selectedParkingId: urlId.value,
  });
 });



async function getParking(id) {

  await store.dispatch("parkingModule/getParkings", {});


}


</script>

<style>



</style>
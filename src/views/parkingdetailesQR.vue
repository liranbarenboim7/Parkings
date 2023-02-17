<template>
  <div class="app-pages container card">

    <div class="row title">
      Details - {{ formParking.address }} - {{ formParking.side }}
    </div>
    <div class="row">
      <div class="col md-6">


      </div>
    </div>
    <div class="row">
      <div class="title">Categories</div>

      <div class="col md-12">
 
          <table style="width:100%">
 
            <tr v-for="category in parkingCategoriesSelect.value" v-bind:key="category.id">

              <td :class="category.isMatch ? 'match' : 'right'">מחירון: {{ category.price }}</td>
              <td :class="category.isMatch ? 'match' : 'right'">עד שעה: {{category.to}}</td>
              <td :class="category.isMatch ? 'match' : 'right'">משעה : {{category.from}}</td>
              <td :class="category.isMatch ? 'match' : 'right'"> {{category.category}} : {{ category.action }}</td>
            </tr>
          </table>
      </div>
    </div>




  </div>


</template>

<script setup>
import { ref, onMounted, onUpdated, computed, reactive, watch } from "vue";
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
const categories = computed(() => store.state.categoryModule.categoryData);

const urlId = ref('')
const parkingCategories = reactive([])
const parkingCategoriesSelect = reactive([])
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
    var today = new Date();
    const hour = today.getHours();
    const day = today.getDay();
    parkingCategoriesSelect.value = connectedCategories.map(cat =>{
      const catSelect = cat
      catSelect.isMatch = parseInt(cat.from) <= hour && parseInt(cat.to) > hour && day === cat.day
      return catSelect;
    })
    console.lod(parkingCategoriesSelect.value)
    if(parkingCategoriesSelect.length == 0)
    {
      parkingCategoriesSelect.value = connectedCategories.map(cat =>{
      const catSelect = cat
      catSelect.isMatch = parseInt(cat.from) <= hour && parseInt(cat.to) > hour && cat.day === -1
      return catSelect;
    })
    }



  }
  
  
});



async function getParkings() {

  await store.dispatch("parkingModule/getParkings", {});


}

async function getCategories() {

  await store.dispatch("categoryModule/getCategories", {});


}


</script>

<style scoped>


.badass-todo {
  height: 100%;
  border: 1px solid;
  padding: 20px;
  margin-top: 5em;

  box-shadow: 5px 5px 5px 5px #888888;

}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid black;
}
tr {
  border: 3px solid black;
}
.right {
  text-align: right;
  height: 50px;
  vertical-align: bottom;
}
.match {
  text-align: right;
  height: 50px;
  vertical-align: bottom;
  color:red;
}

.line-through {
  text-decoration: line-through;
}
</style>
<template>
<div class="app-pages">

  <div class="title has-text-centered">
    Details
  </div>
  <form
  @submit.prevent="isValidFirestoreId(newId) ?  updateParking(newId) : addToParking() "
  >
    <div class="field has-addons">
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="Add a category" v-model="newCategory">
      <input class="input" type="text" placeholder="Add a Date" v-model="newDate">
      <input class="input" type="text" placeholder="From:" v-model="newFrom">
      <input class="input" type="text" placeholder="To:" v-model="newTo">
      <input class="input" type="text" placeholder="Price:" v-model="newPrice">
      <input class="input" type="text" placeholder="Name:" v-model="newName" >
 
      {{ newId }}
      </p>
   
  </div>
  </form>
 
    
</div>
   

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import {db} from '@/firebaseDB'
  import { collection, onSnapshot,
    addDoc, doc ,deleteDoc,updateDoc,
    query, orderBy, limit,setDoc,getDoc
  } from "firebase/firestore"
  import {useRoute,useRouter} from 'vue-router'
const parkings = ref([  
])
const buttonText= ref('add')
const parkingsCollectionRef = collection(db, 'parkings')

function isValidFirestoreId(id) {
  return id.match(/^[a-zA-Z0-9\-_]+$/)
}
const route = useRoute()
const router = useRouter()
//https://medium.com/geekculture/vue-js-parameters-of-router-are-undefined-a21accc23c2e
onMounted(async () => {
  console.log('Before Router Preparation', route.name);
  await router.isReady();
  console.log('After Router Preparation', route.name+route.query.id);
  await getParking(route.query.id)
  })
 


let newCategory = ref('')
let newDate = ref('')
let newFrom = ref('')
let newTo = ref('')
let newPrice = ref('')
let newName = ref('')
let newId = ref('')


const addToParking = () => {
  addDoc(parkingsCollectionRef, {
  category: newCategory.value,
  date: newDate.value,
  from: newFrom.value,
  to: newTo.value,
  price: newPrice.value,
  name: newName.value

});
  newCategory.value = ''
  newDate.value = ''
  newFrom.value = ''
  newTo.value = ''
  newPrice.value = ''
  newName.value = ''
  newId.value = ''
}



function updateParking(id) {
  const frankDocRef = doc(db, "parkings", id);
  setDoc(frankDocRef, {
  category: newCategory.value,
  date: newDate.value,
  from: newFrom.value,
  to: newTo.value,
  price: newPrice.value,
  name: newName.value
});

}



const deleteTodo = id => {
  deleteDoc(doc(parkingsCollectionRef, id))
}

const toggleDone = id => {
  const index = parkings.value.findIndex(park => park.id === id)
  newCategory.value = parkings.value[index].category
  newId.value = id
  newFrom.value = parkings.value[index].from
  newTo.value = parkings.value[index].to
  newPrice.value = parkings.value[index].price
  newName.value = parkings.value[index].name
  
  // updateDoc(doc(parkingsCollectionRef, id), {
  //    done: !parkings.value[index].done
  //  });
}

async function getParking(id) {

  let docRef = doc(parkingsCollectionRef, id)

  try {
    const snapshot = await getDoc(docRef);
    if (snapshot.exists) {
      let doc = snapshot.data()
      newId.value = doc.id,
        newCategory.value = doc.category,
        newDate.value = doc.date,
        newFrom.value = doc.from,
        newTo.value = doc.to,
        newPrice.value = doc.price,
        newName.value = doc.name
      console.log(docSnap.data());
    }
  } catch (error) {
    console.log(error)
  }

}


</script>

<style>
@import 'bulma\css\bulma.min.css';
.badass-todo {
    height: 100%;
    border: 1px solid;
    padding: 20px;
    margin-top: 5em;

    box-shadow: 5px 5px 5px 5px #888888;

}

.line-through {
  text-decoration: line-through;
}
</style>
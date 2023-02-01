<template>
    <div class="input-group mb-10">
        <span class="input-group-text" id="basic-addon1">Select Category</span>
        <select v-model="category" @change="updateSelection">
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}
            </option>
        </select>
    </div>


    <ul>
        <li v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</li>
    </ul>
</template>
<script setup>
import { ref, onMounted,onUpdated ,reactive } from 'vue'
import {db} from '@/firebaseDB'
import { collection, onSnapshot,
  addDoc, doc ,deleteDoc,updateDoc,
  query, orderBy, limit,setDoc
} from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import router from '../router'
import ParkingDetails from "../components/ParkingDetails.vue"
import ParkingList from "../components/parkinglist.vue"
const parkings = ref([

])

const buttonText= ref('add')
const parkingsCollectionRef = collection(db, 'parkings')
const categoriesCollectionRef = collection(db,'categories')
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

const categories = ref([])
const parkingCategories = ref([])
onMounted(async() => {

if(auth.currentUser )
{
getParkings()
getCategories()

}
else
{
  router.push('/Signin')
}

})


let address = ref('')
let side = ref('')
let category = ref('')
let newId = ref('')

// const categories = reactive([])
// const parkingCategories = reactive([])

function updateSelection()
{

parkingCategories.value.Add(category)

}
const addToParking = () => {
addDoc(parkingsCollectionRef, {
address: address.value,
side: side.value,
category: category.value,

});
address.value = ''
side.value = ''
category.value = ''
}

function AddCategoriesToParking(parkingId)
{
// Reference to the parent document
const parkingDocRef = db.collection("parkings").doc(parkingId);

// Reference to the subcollection
const parkingCategoryCollectionRef = parkingDocRef.collection("categories");

// Array of data to be added to the subcollection
// const subCollectionData = [
//   { name: "Item 1", value: 1 },
//   { name: "Item 2", value: 2 },
//   { name: "Item 3", value: 3 },
// ];

// Adding the data to the subcollection
const promises = categories.map(data => {
return parkingCategoryCollectionRef.add(data);
});

// Waiting for all writes to complete
Promise.all(promises)
.then(() => {
console.log("Data added to subcollection");
// Adding the subcollection reference as a field in the parent document
parkingDocRef.update({
  categories: parkingCategoryCollectionRef

})
.then(() => {
  console.log("Subcollection reference added as field in parent document");
})
.catch(error => {
  console.error("Error adding subcollection reference: ", error);
});
})
.catch(error => {
console.error("Error adding data to subcollection: ", error);
});

}
/// Getting categories for combobox
function GetCategoriesFromParking(documentId)
{
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
function getCategories(){
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
db.collection('parkings').doc(id).get().then(function(doc) {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
})
}

</script>

<style scoped>
.main{
position:relative;
width:100%;
}

.line-through {
text-decoration: line-through;
}
</style>
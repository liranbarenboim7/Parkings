<template>
  <div class="app-pages">
  
    <div class="title has-text-centered">
      Parkings
    </div>
    <form
    @submit.prevent="isValidFirestoreId(newId) ?  updateParking(newId) : addToParking() "
    >
      <!-- <div class="field has-addons">
      <p class="control is-expanded"> -->
        <!--<input class="input" type="text" placeholder="Add Address" v-model="address">
        <input class="input" type="text" placeholder="Add side" v-model="side"> -->
        <!-- <input class="input" type="text" placeholder="Category" v-model="category" -->

        <div class="input-group mb-10">
            <span class="input-group-text" id="basic-addon1">Add side</span>
            <input type="text" class="form-control" placeholder="Add side" aria-label="Add side" aria-describedby="basic-addon1" v-model="side">
        </div>

        <div class="input-group mb-10">
            <span class="input-group-text" id="basic-addon1">Add Address</span>
            <input type="text" class="form-control" placeholder="Add address" aria-label="Add address" aria-describedby="basic-addon1" v-model="address">
        </div>

        <div class="input-group mb-10">
            <span class="input-group-text" id="basic-addon1">Select Category</span>
            <select v-model="category" @change="updateSelection">
              <option v-for="category in categories" :value="category.id">{{ category.category }}</option>
            </select>
        </div>




        <p class="control">
          <button class="button is-info" :disabled="!category">
          {{ isValidFirestoreId(newId) ? "update" : "add" }}
        </button>
        <!--{{ newId }}-->
        </p>
      <!-- </p>
    </div> -->
    </form>
  
  
    <div class="card mb-5" v-for="parking in parkings">
     <div class="card-content">
      <div class="content">
        <div class="columns 
        is-mobile is-vcentered">
          <div class="column">
            {{parking.address}}
          </div>
        <div class="column is-5 has-text-right">
          <button class="button" 
          @click="toggleDone(parking.id)"
          >
            &check;
          </button>
          <button 
          class="button is-danger ml-2"
          @click="deleteTodo(parking.id)"
          >
          &cross;
        </button>
        </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  </template>
  
  <script setup>
    import { ref, onMounted,onUpdated  } from 'vue'
    import {db} from '@/firebaseDB'
    import { collection, onSnapshot,
      addDoc, doc ,deleteDoc,updateDoc,
      query, orderBy, limit,setDoc
    } from "firebase/firestore"
    import { getAuth, signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
    import router from '../router'
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


  onMounted(() => {
    
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

  const categories = ref([])
  
  function updateSelection()
  {

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
  
  
  /// Getting categories for combobox

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
  
   
  .line-through {
    text-decoration: line-through;
  }
  </style>
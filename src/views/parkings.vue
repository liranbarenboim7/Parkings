<template>
    <div class="badass-todo">
    
      <div class="title has-text-centered">
        Parkings
      </div>
      <form
      @submit.prevent="isValidFirestoreId(newId) ?  updateParking(newId) : addToParking() "
      >
        <div class="field has-addons">
        <p class="control is-expanded">

          <div class="row">
            <div class="col-md-2">
              <label>Mikud</label>
            </div>
    
             
              <div class="col-md-10">
                <select v-model="selecteCategory" @change="updateSelection">
                  <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                </select>
              </div>
            </div>
         

          <div class="row">
            <div class="col-md-2">
              <label>Street Name</label>
            </div>
            <div class="col-md-10">
              <input class="input" type="text" placeholder="Add a Street name" v-model="newStreetName">
            </div>
          </div>   
         

          <input class="input" type="text" placeholder="Add a Date" v-model="newDate">
          <input class="input" type="text" placeholder="From:" v-model="newFrom">
          <input class="input" type="text" placeholder="To:" v-model="newTo">
          <input class="input" type="text" placeholder="Price:" v-model="newPrice">
          <input class="input" type="text" placeholder="Name:" v-model="newName" >
          <img src="https://cdn.pixabay.com/photo/2018/04/15/18/02/books-3322275__340.jpg" height="100" width="100">
          <p class="control">
            <button class="button is-info" :disabled="!newCategory">
            {{ isValidFirestoreId(newId) ? "update" : "add" }}
          </button>
          {{ newId }}
          </p>
        </p>
      </div>
      </form>
    
    
      <div class="card mb-5" v-for="parking in parkings">
       <div class="card-content">
        <div class="content">
          <div class="columns 
          is-mobile is-vcentered">
            <div class="column">
              {{parking.name}}
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
          <button
            @click="parkingDetails(parking.id)"
            >
            <i class="bi bi-pencil"></i>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    





    </template>
    
    <script setup>
      import { ref, onMounted } from 'vue'
      import {db} from '@/firebase'
      import { collection, onSnapshot,
        addDoc, doc ,deleteDoc,updateDoc,
        query, orderBy, limit,setDoc
      } from "firebase/firestore"
      import router from "../router";

    const parkings = ref([
    
    ])
    const buttonText= ref('add')
    const parkingsCollectionRef = collection(db, 'parkings')
    const categoriesCollectionRef = collection(db,'categories')
    function isValidFirestoreId(id) {
      return id.match(/^[a-zA-Z0-9\-_]+$/)
    }
    function getParkings(){
      onSnapshot(parkingsCollectionRef, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            category: doc.data().category,
            date: doc.data().date,
            from: doc.data().from,
            to :doc.data().to,
            price: doc.data().price,
            name: doc.data().name
          }
          fbTodos.push(todo)
        })
        parkings.value = fbTodos
      })
    }
    onMounted(() => {
      getParkings()
      getCategories()
    })
    
    
    let newCategory = ref('')
    const newMikud = ref('')
    const newStreetName = ref('')
    const newTo = ref('')
    const newPrice = ref('')
    const newName = ref('')
    const newId = ref('')

    const categories = ref([])
    const selecteCategory = ref('')

    function getCategories(){
        onSnapshot(categoriesCollectionRef, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            name: doc.data().name,

          }
          fbTodos.push(todo)
        })
        categories.value = fbTodos
      })
    }
 

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
    
    const parkingDetails =(id) => {
      router.push({ path: '/parking', query: { id : id } })
      
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
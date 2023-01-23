<template>
    <div class="badass-todo">
    
      <div class="title has-text-centered">
        Categories
      </div>
      <form
      @submit.prevent="isValidFirestoreId(newId) ?  updateParking(newId) : addToParking() "
      >
        <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Category:" v-model="newCategory">
          <input class="input" type="text" placeholder="Date:" v-model="newDate">
          <input class="input" type="text" placeholder="Time start:" v-model="newFrom">
          <input class="input" type="text" placeholder="Time End:" v-model="newTo">
          <input class="input" type="text" placeholder="Action:" v-model="newPrice">
          <input class="input" type="text" placeholder="Price:" v-model="newName" >
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
    
    const parkings = ref([
    
    ])
    const buttonText= ref('add')
    const parkingsCollectionRef = collection(db, 'categories')
    
    function isValidFirestoreId(id) {
      return id.match(/^[a-zA-Z0-9\-_]+$/)
    }
    
    onMounted(() => {
      onSnapshot(parkingsCollectionRef, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            category: doc.data().category,
            date: doc.data().date,
            from: doc.data().from,
            to :doc.data().to,
            action: doc.data().action,
          }
          fbTodos.push(todo)
        })
        parkings.value = fbTodos
      })
    })
    
    
    let newCategory = ref('')
    const newDate = ref('')
    const newFrom = ref('')
    const newTo = ref('')
    const newPrice = ref('')
    const action = ref('')
    const newId = ref('')
    
    const addToParking = () => {
      addDoc(parkingsCollectionRef, {
      category: newCategory.value,
      date: newDate.value,
      from: newFrom.value,
      to: newTo.value,
      price: newPrice.value,
      action: action.value
    });
      newCategory.value = ''
      newDate.value = ''
      newFrom.value = ''
      newTo.value = ''
      newPrice.value = ''
      action.value = ''
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
      action: action.value
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
      action.value = parkings.value[index].action
      
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
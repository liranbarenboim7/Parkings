<template>
    <div class="badass-todo">
    
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
      import {db} from '@/firebase'
      import { collection, onSnapshot,
        addDoc, doc ,deleteDoc,updateDoc,
        query, orderBy, limit,setDoc
      } from "firebase/firestore"
      import {useRoute} from 'vue-router'
    const parkings = ref([
    
    ])
    const buttonText= ref('add')
    const parkingsCollectionRef = collection(db, 'parkings')
    
    function isValidFirestoreId(id) {
      return id.match(/^[a-zA-Z0-9\-_]+$/)
    }
    const route = useRoute()
    onMounted(() => {
      const id = route.params.id
      getParking(newId)
    })
    
    
    let newCategory = ref('')
    const newDate = ref('')
    const newFrom = ref('')
    const newTo = ref('')
    const newPrice = ref('')
    const newName = ref('')
    const newId = ref('')

    
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
    
    const getParking = (id) => {
      parkingsCollectionRef.doc(id).get().then(function(doc) {
        if (doc.exists) {
            newId= doc.id,
            newCategory = doc.data().category,
            newDate=doc.data().date,
            newFrom=doc.data().from,
            newTo =doc.data().to,
            newPrice= doc.data().price,
            newName= doc.data().name
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
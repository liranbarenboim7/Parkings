<template>
    <div class="badass-todo">
      <div class="title has-text-centered">
        Categories
      </div>
      <form
      @submit.prevent="isValidFirestoreId(newId) ?  updateCategory(newId) : addToCategory() "
      >
        <div class="field has-addons" >
        <p class="control is-expanded">

          <div class="input-group mb-3 mr-6">
            <span class="input-group-text" id="basic-addon1">Category</span>
            <input type="text" class="form-control" placeholder="Category" aria-label="Category" aria-describedby="basic-addon1" v-model="newCategory">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Time Start</span>
            <input type="text" class="form-control" placeholder="Time start" aria-label="Time Start" aria-describedby="basic-addon1" v-model="newFrom">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Time End</span>
            <input type="text" class="form-control" placeholder="Time End" aria-label="Time End" aria-describedby="basic-addon1" v-model="newTo">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Action</span>
            <input type="text" class="form-control" placeholder="Action" aria-label="Action" aria-describedby="basic-addon1" v-model="action">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Price</span>
            <input type="text" class="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" v-model="newPrice">
          </div>
          
          <!--<input class="input" type="text" placeholder="Category:" v-model="newCategory">
          <input class="input" type="text" placeholder="Time start:" v-model="newFrom">
          <input class="input" type="text" placeholder="Time End:" v-model="newTo">
          <input class="input" type="text" placeholder="Action:" v-model="action">
          <input class="input" type="text" placeholder="Price:" v-model="newPrice" > -->


          <!--<label>Select day:</label>

          Combobox for days of the week

          <div>
            <select v-model="newDay">
              <option v-for="day in days" :value="day">{{ day }}</option>
            </select>
          </div>-->

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Select Day</span>
            <select v-model="newDay">
              <option v-for="day in days" :value="day">{{ day }}</option>
            </select>
          </div>



          <p class="control">
            <button class="button is-info" :disabled="!newCategory">
            {{ isValidFirestoreId(newId) ? "update" : "add" }}
          </button>
          <!--{{ newId }}-->
          </p>
        </p>
      </div>
      </form>
    
    
      <div class="card mb-5" v-for="category in categories">
       <div class="card-content">
        <div class="content">
          <div class="columns 
          is-mobile is-vcentered">
            <div class="column">
              {{category.category}}
            </div>
          <div class="column is-5 has-text-right">
            <button class="button" 
            @click="showCategory(category.id)"
            >
              &check;
            </button>
            <button 
            class="button is-danger ml-2"
            @click="deleteCategory(category.id)"
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
      import {db} from '@/firebaseDB'
      import { collection, onSnapshot,
        addDoc, doc ,deleteDoc,updateDoc,
        query, orderBy, limit,setDoc,Firestore
      } from "firebase/firestore"
    
    const categories = ref([
    
    ])

    const buttonText= ref('add')
    const categoriesCollectionRef = collection(db, 'categories')
    
    function isValidFirestoreId(id) {
      return id.match(/^[a-zA-Z0-9\-_]+$/)
    }
    
    function renderCategory(){
      onSnapshot(categoriesCollectionRef, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            category: doc.data().category,
            price: doc.data().price,
            day: doc.data().day,
            from: doc.data().from,
            to :doc.data().to,
            action: doc.data().action,
          }
          fbTodos.push(todo)
        })
        categories.value = fbTodos
      })
    }

    onMounted(() => {
      renderCategory()
    })
    
    
    let newCategory = ref('')
    const newDay = ref('')
    const newFrom = ref('')
    const newTo = ref('')
    const newPrice = ref('')
    const action = ref('')
    const newId = ref('')
    
    //const daySelect = ref('')
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    const  addToCategory = () => {
      addDoc(categoriesCollectionRef, {
      category: newCategory.value,     
      day: newDay.value,
      from: newFrom.value,
      to: newTo.value,
      price: newPrice.value,
      action: action.value
    });
      newCategory.value = ''
      newDay.value = ''
      newFrom.value = ''
      newTo.value = ''
      newPrice.value = ''
      action.value = ''
      newId.value = ''
      
    }
    
    
    
    function updateCategory(id) {
      const frankDocRef = doc(db, "categories", id);
      setDoc(frankDocRef, {
      category: newCategory.value,
      
      from: newFrom.value,
      to: newTo.value,
      price: newPrice.value,
      action: action.value,
      day: newDay.value
    });
    
    }
    
    
    
    const deleteCategory = id => {
      deleteDoc(doc(categoriesCollectionRef, id))
    }
    
    const showCategory= id => {
      const index = categories.value.findIndex(park => park.id === id)
      newCategory.value = categories.value[index].category
      newId.value = id
      newFrom.value = categories.value[index].from
      newTo.value = categories.value[index].to
      newPrice.value = categories.value[index].price
      action.value = categories.value[index].action
      newDay.value = categories.value[index].day
      // updateDoc(doc(parkingsCollectionRef, id), {
      //    done: !parkings.value[index].done
      //  });
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
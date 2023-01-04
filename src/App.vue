<template>
<div class="badass-todo">

  <div class="title has-text-centered">
    Parkings
  </div>
  <form
  @submit.prevent="addToParking"
  >
    <div class="field has-addons">
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="Add a category" v-model="newCategory">
      <input class="input" type="text" placeholder="Add a Date" v-model="newDate">
      <input class="input" type="text" placeholder="From:" v-model="newFrom">
      <input class="input" type="text" placeholder="To:" v-model="newTo">
      <input class="input" type="text" placeholder="Price:" v-model="newPrice">
      <input class="input" type="text" placeholder="Name:" v-model="newName">
      <p class="control">
        <button class="button is-info" :disabled="!newCategory">
        Add
      </button>
      </p>
    </p>
    <!-- <p class="control">
      <button class="button is-info" :disabled="!newTodoContent">
        Add
      </button> -->
      
    <!-- </p> -->
  </div>
  </form>


  <div class="card mb-5" v-for="todo in parkings">
   <div class="card-content">
    <div class="content">
      <div class="columns 
      is-mobile is-vcentered">
        <div class="column">
          {{todo.name}}
        </div>
      <div class="column is-5 has-text-right">
        <button class="button" :class="todo.done ? 'is-success' : 'is-light'"
        @click="toggleDone(todo.id)"
        >
          &check;
        </button>
        <button 
        class="button is-danger ml-2"
        @click="deleteTodo(todo.id)"
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
    query, orderBy, limit
  } from "firebase/firestore"

const parkings = ref([

])

const parkingsCollectionRef = collection(db, 'parkings')


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
        price: doc.data().price,
        name: doc.data().name
      }
      fbTodos.push(todo)
    })
    parkings.value = fbTodos
  })
})


const newCategory = ref('')
const newDate = ref('')
const newFrom = ref('')
const newTo = ref('')
const newPrice = ref('')
const newName = ref('')


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
}

const deleteTodo = id => {
  deleteDoc(doc(parkingsCollectionRef, id))
}

const toggleDone = id => {
  const index = parkings.value.findIndex(park => park.id === id)

  // updateDoc(doc(parkingsCollectionRef, id), {
  //   done: !parkings.value[index].done
  // });
}


</script>

<style>
@import 'bulma\css\bulma.min.css';
.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;

}

.line-through {
  text-decoration: line-through;
}
</style>
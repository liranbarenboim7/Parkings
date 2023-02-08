<template>
  <div class="main-frame container-fluid card">
    <div class="row">
      <div class="col-md-6">
        <div class="title has-text-centered">Categories</div>
      </div>
      <div class="col-md-6">
        <button type="button" class="btn btn-primary" @click="addCategory()">
          Add
        </button>
      </div>
    </div>
    <div class="row">

      <div class="col-md-6">
        <form @submit.prevent="isValidFirestoreId(formCategory.id) ? updateCategory(formCategory.id) : addToCategory()">
          <div class="card field has-addons">

            <p class="control">
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Category</span>
              <input type="text" class="form-control" placeholder="Category" aria-label="Category"
                aria-describedby="basic-addon1" v-model="formCategory.category">
            </div>
            </p>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Time Start</span>
              <input type="text" class="form-control" placeholder="Time start" aria-label="Time Start"
                aria-describedby="basic-addon1" v-model="formCategory.from">
            </div>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Time End</span>
              <input type="text" class="form-control" placeholder="Time End" aria-label="Time End"
                aria-describedby="basic-addon1" v-model="formCategory.to">
            </div>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Action</span>
              <input type="text" class="form-control" placeholder="Action" aria-label="Action"
                aria-describedby="basic-addon1" v-model="formCategory.action">
            </div>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Price</span>
              <input type="text" class="form-control" placeholder="Price" aria-label="Price"
                aria-describedby="basic-addon1" v-model="formCategory.price">
            </div>

            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Select Day</span>
              <select v-model="formCategory.day">
                <option v-for="day in days" :value="day">{{ day }}</option>
              </select>
            </div>



            <p class="control">
              <button class="button is-info" :disabled="!formCategory.id">
                {{ isValidFirestoreId(formCategory.id) ?"update": "add" }}
              </button>
              <!--{{ newId }}-->
            </p>

          </div>
        </form>
      </div>


      <div class="col-md-6 list-categories">
        <div class="card " v-for="category in categories" :key="category.id">
          <div class="card-content">
            <div class="content">
              <div class="columns 
      is-mobile is-vcentered">
                <div class="column">
                  {{ category.category }}
                </div>
                <div class="column is-5 has-text-right">
                  <button class="button" @click="showCategory(category.id)">
                    &check;
                  </button>
                  <button class="button is-danger ml-2" @click="deleteCategory(category.id)">
                    &cross;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
    
<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { db } from "@/firebaseDB";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  setDoc,
  Firestore,
} from "firebase/firestore";
import { useStore } from "vuex";

const store = useStore();
let formCategory = {};

////////////////////DATA//////////////////////////////////////
const categories = computed(() => store.state.categoryModule.categoryData);
formCategory = computed(() => store.state.categoryModule.selectedCategory);

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const buttonText = ref("add");
//const categoriesCollectionRef = collection(db, 'categories')

function isValidFirestoreId(id) {
  if (id) {
    return id.match(/^[a-zA-Z0-9\-_]+$/);
  } else {
    return false;
  }
}

onMounted(async () => {
  await store.dispatch("categoryModule/getCategories", {});
});

const addCategory = async () => {
  await store.dispatch("categoryModule/AddCategory", {});
};

const deleteCategory = async (id) => {
  await store.dispatch("categoryModule/DeleteCategory", { categoryId: id });
};

async function updateCategory(id) {
  await store.dispatch("categoryModule/UpdateCategory", {
    category: formCategory.value,
  });
}

// const deleteCategory = id => {
//   deleteDoc(doc(categoriesCollectionRef, id))
// }
//move to action
const showCategory = async (id) => {
  await store.dispatch("categoryModule/SelectCategory", {
    selectedCategoryId: id,
  });
};
</script>
    
<style>
.main-frame.container-fluid.card {
  width: 90vw;
}

.main-frame {
  height: 100%;
  border: 1px solid;
  padding: 20px;
  margin-top: 5em;

  box-shadow: 5px 5px 5px 5px #888888;
}

.line-through {
  text-decoration: line-through;
}
.list-categories {
height:80vh;
overflow-y: auto;
}
</style>
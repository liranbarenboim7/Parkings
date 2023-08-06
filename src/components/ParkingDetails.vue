<template>
  <div class="col md-6 detailes">
    <div class="row">
    <div class="col">
      <div class="title has-text-centered">Parking</div>
    </div>
    <div class="col">
      <button
        type="button"
        class="btn btn-primary"
        @click="updateParking()"
      >
        Save
      </button>
    </div>
  </div>
    <div class="row fields">
      <form
        @submit.prevent="
          isValidFirestoreId(newId) ? updateParking() : addToParking()
        "
      >
        <div class="input-group mb-10">
          <span class="input-group-text" id="basic-addon1">Add side</span>
          <input
            type="text"
            class="form-control"
            placeholder="Add side"
            aria-label="Add side"
            aria-describedby="basic-addon1"
            v-model="formParking.side"
          />
        </div>

        <div class="input-group mb-10">
          <span class="input-group-text" id="basic-addon1">Add Address</span>
          <input
            type="text"
            class="form-control"
            placeholder="Add address"
            aria-label="Add address"
            aria-describedby="basic-addon1"
            v-model="formParking.address"
          />
        </div>
        <div class="input-group mb-10">
          <span class="input-group-text" id="basic-addon1">latitude</span>
          <input
            type="text"
            class="form-control"
            placeholder="latitude"
            aria-label="latitude"
            aria-describedby="basic-addon1"
            v-model="formParking.latitude"
          />
        </div>
        <div class="input-group mb-10">
          <span class="input-group-text" id="basic-addon1">longitude</span>
          <input
            type="text"
            class="form-control"
            placeholder="longitude"
            aria-label="longitude"
            aria-describedby="basic-addon1"
            v-model="formParking.longitude"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUpdated, reactive, computed } from "vue";
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
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import router from "../router";
import { useStore } from "vuex";
const store = useStore();

////////////////////DATA//////////////////////////////////////
const parkings = computed(() => store.state.parkingModule.parkingsData);
const formParking = computed(() => store.state.parkingModule.selectedParking);

///////////////////////////////////////////PROPS/////////////////////
const props = defineProps({
  parkingId: {
    default: () => "",
  },
});
////////////////////////////////////////////////////

const buttonText = ref("add");

const auth = getAuth();

function isValidFirestoreId(id) {
  return id.match(/^[a-zA-Z0-9\-_]+$/);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    router.push("SignIn");
  }
})


onMounted(async () => {
  // if (auth.currentUser) {

  // } else {
  //   router.push("/Signin");
  // }
});



async function updateParking() {
  await store.dispatch("parkingModule/UpdateParking", {
    parking: formParking.value,
  });
}


</script>
  
  <style scoped>
.main {
  position: relative;
  width: 100%;
}

.line-through {
  text-decoration: line-through;
}
</style>
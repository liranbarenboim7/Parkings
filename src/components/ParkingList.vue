<template>
  <div class="row">
    <div class="col">
      <div class="title has-text-centered">Parkings</div>
    </div>
    <div class="col">
      <button type="button" class="btn btn-primary" @click="addParking()">
        Add
      </button>
    </div>
  </div>
  <div class="card parking-list">
    <div class="card" v-for="parking in parkings">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{ parking.address }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button" @click="selectParking(parking.id)">
                &check;
              </button>
              <button
                class="button is-danger ml-2"
                @click="deleteParking(parking.id)"
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
import { ref, onMounted, onUpdated, computed, reactive } from "vue";
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
import ParkingDetails from "../components/ParkingDetails.vue";
import { useStore } from "vuex";
const store = useStore();


////////////////////DATA//////////////////////////////////////
const parkings = computed(() => store.state.parkingModule.parkingsData);
// formCategory = computed(() => store.state.categoryModule.selectedCategory)

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
});

onMounted(async () => {
  if (auth.currentUser) {
    await store.dispatch("parkingModule/getParkings", {});
  } else {
    router.push("/Signin");
  }
});

const addParking = async () => {
  await store.dispatch("parkingModule/AddParking", {});
};

const deleteParking = async (id) => {
  await store.dispatch("parkingModule/DeleteParking", { parkingId: id });
};

const selectParking = async (id) => {
  await store.dispatch("parkingModule/SelectParking", {
    selectedParkingId: id,
  });
};


</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
}

.line-through {
  text-decoration: line-through;
}
.parking-list
{
  height:80vh;
  overflow-y: auto;
}
</style>
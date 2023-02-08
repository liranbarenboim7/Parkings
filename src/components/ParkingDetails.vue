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
//const parkingsCollectionRef = collection(db, "parkings");
//const categoriesCollectionRef = collection(db, "categories");
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

// const categories = ref([]);
// const parkingCategories = ref([]);
onMounted(async () => {
  if (auth.currentUser) {

  } else {
    router.push("/Signin");
  }
});



async function updateParking() {
  await store.dispatch("parkingModule/UpdateParking", {
    parking: formParking.value,
  });
}

// function AddCategoriesToParking(parkingId) {
//   // Reference to the parent document
//   const parkingDocRef = db.collection("parkings").doc(parkingId);

//   // Reference to the subcollection
//   const parkingCategoryCollectionRef = parkingDocRef.collection("categories");

 
//   // Adding the data to the subcollection
//   const promises = categories.map((data) => {
//     return parkingCategoryCollectionRef.add(data);
//   });

//   // Waiting for all writes to complete
//   Promise.all(promises)
//     .then(() => {
//       console.log("Data added to subcollection");
//       // Adding the subcollection reference as a field in the parent document
//       parkingDocRef
//         .update({
//           categories: parkingCategoryCollectionRef,
//         })
//         .then(() => {
//           console.log(
//             "Subcollection reference added as field in parent document"
//           );
//         })
//         .catch((error) => {
//           console.error("Error adding subcollection reference: ", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Error adding data to subcollection: ", error);
//     });
// }
/// Getting categories for combobox
// function GetCategoriesFromParking(documentId) {
//   const parkingCategoriesRef = doc(
//     collection(db, "parkings"),
//     documentId
//   ).collection("categories");
//   onSnapshot(parkingCategoriesRef, (querySnapshot) => {
//     const subcollection = [];
//     querySnapshot.forEach((doc) => {
//       subcollection.push({ id: doc.id, ...doc.data() });
//     });
//     parkingCategories.value = subcollection;
//   });
// }
// function getCategories() {
//   onSnapshot(categoriesCollectionRef, (querySnapshot) => {
//     const fbTodos = [];
//     querySnapshot.forEach((doc) => {
//       const todo = {
//         id: doc.id,
//         category: doc.data().category,
//       };
//       fbTodos.push(todo);
//     });
//     categories.value = fbTodos;
//   });
//}

//Getting parking
// function getParkings() {
//   onSnapshot(parkingsCollectionRef, (querySnapshot) => {
//     const fbTodos = [];
//     querySnapshot.forEach((doc) => {
//       const todo = {
//         id: doc.id,
//         address: doc.data().address,
//         side: doc.data().side,
//         category: doc.data().category,
//       };
//       fbTodos.push(todo);
//     });
//     parkings.value = fbTodos;
//   });
// }

// function updateParking(id) {
//   const frankDocRef = doc(db, "parkings", id);
//   setDoc(frankDocRef, {
//     address: address.value,
//     side: side.value,
//     category: category.value,
//   });
// }

// const deleteTodo = (id) => {
//   deleteDoc(doc(parkingsCollectionRef, id));
// };

// const toggleDone = (id) => {
//   const index = parkings.value.findIndex((park) => park.id === id);
//   category.value = parkings.value[index].category;
//   newId.value = id;
//   address.value = parkings.value[index].address;
//   side.value = parkings.value[index].side;

//   // updateDoc(doc(parkingsCollectionRef, id), {
//   //    done: !parkings.value[index].done
//   //  });
// };

// const getParking = (id) => {
//   db.collection("parkings")
//     .doc(id)
//     .get()
//     .then(function (doc) {
//       if (doc.exists) {
//         console.log("Document data:", doc.data());
//       } else {
//         console.log("No such document!");
//       }
//     })
//     .catch(function (error) {
//       console.log("Error getting document:", error);
//     });
// };
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
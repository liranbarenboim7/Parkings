<template>
 <div class="app-pages">
 <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
</div>
</template>
<script setup>
  import { ref } from 'vue'
  //import {auth} from '@/firebaseDB'
  import { useRouter } from 'vue-router' // import router
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



  const email = ref('')
  const password = ref('')
  const router = useRouter() // get a reference to our vue router
  const register = () => {
  
    const auth = getAuth();
createUserWithEmailAndPassword(auth,"liranbarenboim10@gmail.com", "369963Pg")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    
  })
}
</script>
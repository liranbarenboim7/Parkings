<template>
  <div class="app-pages">
    <h1>Login to Your Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="signIn">Submit</button></p>
   </div>
  </template>
  <script setup>
    import { ref } from 'vue'
    //import {auth} from '@/firebaseDB'
    import { useRouter } from 'vue-router' // import router
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    const email = ref('')
    const password = ref('')
    const errMsg = ref('') // ERROR MESSAGE
    const router = useRouter() // get a reference to our vue router
   
    const signIn = () => {
      const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    
  </script>
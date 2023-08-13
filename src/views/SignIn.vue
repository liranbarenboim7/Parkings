<template>
 <div class="two-col">
 
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <div class="button-holder">
        <button class="button" @click.prevent="signIn">Submit</button>
  </div>


    <p v-if="errMsg">{{ errMsg }}</p>
 
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
        router.push('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    
  </script>
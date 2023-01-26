<template>
    <div>
      <button @click="loginWithGoogle">Login with Google</button>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue'
  import firebase from 'firebase/app'
  import {auth} from '@/firebaseDB'
  
  export default {
    setup() {
      onMounted(() => {
        firebase.initializeApp({
          apiKey: 'YOUR_API_KEY',
          authDomain: 'YOUR_AUTH_DOMAIN',
          databaseURL: 'YOUR_DATABASE_URL',
          projectId: 'YOUR_PROJECT_ID',
          storageBucket: 'YOUR_STORAGE_BUCKET',
          messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
          appId: 'YOUR_APP_ID'
        })
      })
  
      async function loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(provider)
        this.$router.push('/dashboard')
      }
  
      return {
        loginWithGoogle
      }
    }
  }
  </script>
  
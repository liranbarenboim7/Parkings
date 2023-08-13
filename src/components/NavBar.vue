<script setup>
import { ref , reactive} from 'vue'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import router from '../router'
const auth = getAuth();
const isAuth = ref(false);
const currentuser = ref('');
defineProps({
  title: String
})

const count = ref(0)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    isAuth.value = true;//user?.email.toLowerCase() == 'liranbarenboim10@gmail.com'
    currentuser.value = user.email
    // ...
  } else {
    isAuth.value = false;
    currentuser.value  = ''
    // User is signed out
   //router.push('/SignIn')
  }
});

</script>

<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <button className="navbar-toggler" onClick='{()=>{document.body.style.zoom=0.8;}}' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="border-color:blue"/>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto ">
        <li class="nav-item">
         <router-link  v-if="isAuth" :to="'/Parkings'" custom v-slot="{ navigate, href }">
          <a :href="href" @click.stop="navigate">Parkings</a>
        </router-link>
        </li>
        <li class="nav-item">
          <router-link  v-if="isAuth" :to="'/Categories'" custom v-slot="{ navigate, href }">
            <a :href="href" @click.stop="navigate">Categories</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link  v-if="isAuth" :to="'/register'" custom v-slot="{ navigate, href }">
            <a :href="href" @click.stop="navigate">Register User</a>
          </router-link>
          </li>
          <li class="nav-item">
         <router-link v-if="isAuth" :to="'/signout'" custom v-slot="{ navigate, href }" >
            <a  :href="href" @click.stop="navigate" >Sign Out</a>         
          </router-link>
          <router-link v-else :to="'/signin'" custom v-slot="{ navigate, href }" >
            <a  :href="href" @click.stop="navigate">Sign In</a>         
          </router-link>
        </li>
        <li>
          <a  :href="href" @click.stop="navigate">{{currentuser}}</a>    
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.nav-item {
  margin-right:10%;
}
.navbar-nav{
  position:relative ;
  width:100%;
}
</style>

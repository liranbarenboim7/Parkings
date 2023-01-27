<script setup>
import { ref } from 'vue'

defineProps({
  title: String
})

const count = ref(0)
</script>

<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <button className="navbar-toggler" onClick='{()=>{document.body.style.zoom=0.8;}}' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="border-color:blue"/>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto ">
        <li class="nav-item">
         <router-link :to="'/Parkings'" custom v-slot="{ navigate, href }">
          <a :href="href" @click.stop="navigate">Parkings</a>
        </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/Categories'" custom v-slot="{ navigate, href }">
            <a :href="href" @click.stop="navigate">Categories</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/register'" custom v-slot="{ navigate, href }">
            <a :href="href" @click.stop="navigate">Register</a>
          </router-link>
          </li>
          <li class="nav-item">
         <router-link :to="'/signin'" custom v-slot="{ navigate, href }">
            <a :href="href" @click.stop="navigate">Sign In</a>
          </router-link>
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

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="top-bar">
    <NavBar title="PandoLogic"/>
  </div>
  <!-- <nav>
    <router-link to="/feed">Feed</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/sign-in">Login</router-link>
  </nav> -->
  <router-view />

</template>

<style scoped>

.top-bar {
  margin: auto;
  padding: 0px;
  position: fixed;
  top: 0px;
  width: 90%;
  background-color: blanchedalmond;
}
</style>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavBar from "./components/NavBar.vue";
import { useRoute, useRouter } from 'vue-router'
import {computed} from 'vue'
const route=useRoute();
const path = computed(() =>route.path)
</script>

<template>
  <div class="top-bar">
    <NavBar title="PandoLogic" v-if="path !=='/'"/>
  </div>

  <router-view />

</template>

<style>
@import 'bulma\css\bulma.min.css';
.top-bar {
  margin: auto;
  padding: 0px;
  position: fixed;
  top: 0px;
  width: 90%;
  background-color: blanchedalmond;
}
</style>
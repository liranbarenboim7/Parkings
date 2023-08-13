<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavBar from "./components/NavBar.vue";
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from "vuex";
const route = useRoute();
const path = computed(() => route.path)
const store = useStore()

</script>

<template>
	<div class="wrapper">
		<router-view />
		<div class="top-bar">
			<NavBar title="EasyCity" v-if="path !== '/parkingQR' && path !== '/signin'" />
		</div>
	</div>
</template>

<style></style>
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'

import router from './router';

import './assets/main.css'
createApp(App).use(router).mount('#app')

Vue.use(VueFire)

new Vue({
  el: '#app',
  data: {
    selectedId: null
  },
  firestore() {
    return {
      items: db.collection('categories')
    }
  }
})
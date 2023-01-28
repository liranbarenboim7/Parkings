import { createRouter, createWebHistory } from 'vue-router';
import Categories  from '../views/categories.vue';
import Parkings  from '../views/parkings.vue';
import Parkingdetailes  from '../views/parkingdetailes.vue';
import register  from '../views/Register.vue';
import signin  from '../views/Signin.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const routes = [
    
    { path: '/', name: 'Home', component: Parkings ,  meta: { requiresAuth: false }},
    { path: '/Parkings', name: 'Parkings', component: Parkings , meta: { requiresAuth: false }},
    { path: '/Categories', name: 'Categories', component: Categories, meta: { requiresAuth: true } },
    { path: '/parking', name: 'Parking', component: Parkingdetailes, meta: { requiresAuth: false }},
    { path: '/register', name: 'Register', component: register ,meta: { requiresAuth: false } },
    { path: '/signin', name: 'Signin', component: signin, meta: { requiresAuth: false } },
    // { path:"/feed", component: () => import("../views/Feed.vue") },
    // { path:"/sign-in", component: () => import("../views/SingIn.vue")},
    // { path:"/register", component: () => import("../views/Register.vue")},
];

  
const router = createRouter({
    history: createWebHistory(),
    routes
});
// const auth = getAuth();
// router.beforeEach((to, from, next) => {
//     const currentUser = auth.currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
//     if ( requiresAuth && !currentUser) {
//       next({ path: '/signin' });
//     } 
//   });
  
export default router;

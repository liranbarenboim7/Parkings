import { createRouter, createWebHistory } from 'vue-router';
import Categories  from '../views/categories.vue';
import Parkings  from '../views/parkings.vue';
import Parkingdetailes  from '../views/parkingdetailes.vue';
import register  from '../views/Register.vue';
import signin  from '../views/Signin.vue';

const routes = [
    
    { path: '/', name: 'Home', component: Parkings },
    { path: '/Parkings', name: 'Parkings', component: Parkings },
    { path: '/Categories', name: 'Categories', component: Categories },
    { path: '/parking', name: 'Parking', component: Parkingdetailes },
    { path: '/register', name: 'Register', component: register },
    { path: '/signin', name: 'Signin', component: signin },
    // { path:"/feed", component: () => import("../views/Feed.vue") },
    // { path:"/sign-in", component: () => import("../views/SingIn.vue")},
    // { path:"/register", component: () => import("../views/Register.vue")},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;

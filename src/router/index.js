import { createRouter, createWebHistory } from 'vue-router';
import Categories  from '../views/categories.vue';
import Parkings  from '../views/parkings.vue';

const routes = [
    
    { path: '/', name: 'Home', component: Parkings },
    { path: '/Parkings', name: 'Parkings', component: Parkings },
    { path: '/Categories', name: 'Categories', component: Categories }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;

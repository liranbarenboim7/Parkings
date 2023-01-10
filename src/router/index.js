import { createRouter, createWebHistory } from 'vue-router';
import Categories  from '../views/categories.vue';
import Parkings  from '../views/parkings.vue';
import Parkingdetailes  from '../views/parkingdetailes.vue';

const routes = [
    
    { path: '/', name: 'Home', component: Parkings },
    { path: '/Parkings', name: 'Parkings', component: Parkings },
    { path: '/Categories', name: 'Categories', component: Categories },
    { path: '/Parking', name: 'Parking', component: Parkingdetailes }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;

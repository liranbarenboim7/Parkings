import { createRouter, createWebHistory } from 'vue-router';
import Categories  from '../views/categories.vue';
import Parkings  from '../views/parkings.vue';
import Parkingdetailes  from '../views/parkingdetailes.vue';
import Register  from '../views/Register.vue';
import Signin  from '../views/Signin.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const routes = [
    
    { path: '/',
    name: 'Home',
    component: Parkings,
    meta: { requiresAuth: true }
    },
    { path: '/Parkings',
    name: 'Parkings',
    component: Parkings,
    meta: { requiresAuth: true }
    },
    { path: '/Categories',
    name: 'Categories',
    component: Categories,
    meta: { requiresAuth: true } 
    },
    { path: '/parking',
    name: 'Parking',
    component: Parkingdetailes,
    meta: { requiresAuth: true }
    },
    { path:"/Signin", component: Signin},
    { path:"/Register", component: Register}
    // {
    //     path: '/loginView',
    //     name: 'LoginView',
    //     component: () => import('../views/LoginView.vue')
    // }





    // { path: '/register', name: 'Register', component: register ,meta: { requiresAuth: false } },
    // { path: '/signin', name: 'Signin', component: signin, meta: { requiresAuth: false } },
    // { path:"/feed", component: () => import("../views/Feed.vue") },
    // { path:"/sign-in", component: () => import("../views/SingIn.vue")},
    // { path:"/register", component: () => import("../views/Register.vue")},
];

  
const router = createRouter({
    history: createWebHistory(),
    routes
});


// router.beforeEach((to,from,next) => {
//     if(to.path === '/loginView' && auth.currentUser) {
//       next('/')
//       return;
//     }
  
//     if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
//       next('/loginView');
//       return;
//     }
  
//     next();
// })
// const auth = getAuth();
// router.beforeEach((to, from, next) => {
//     const currentUser = auth.currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
//     if ( requiresAuth && !currentUser) {
//       next({ path: '/signin' });
//     } 
//   });
  
export default router;

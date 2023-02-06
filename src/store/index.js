import { createStore } from 'vuex';
import CategoryModule from './CategoryModule/index.js';
import ParkingModule from './ParkingModule/index.js';
export default createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        categoryModule: CategoryModule,
        parkingModule: ParkingModule
    }
});
// https://next.vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules
// https://stackoverflow.com/questions/63216740/use-mapactions-or-mapgetters-with-vuex-4-and-vue-3
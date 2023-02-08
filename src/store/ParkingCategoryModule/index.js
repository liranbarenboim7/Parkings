import { Actions } from './ParkingCategoryActions.js';
import { Mutations } from './ParkingCategoryMutations.js';
import { Getters } from './ParkingCategoryGetters.js';


const parkingCategoryData = [
 
];

const selectedParkingCategory = {
     id: "", 
     parkingId :"",
     categoryId :""     
}
const initState = {
    loading: true,
    error: null,
    parkingCategoryData: parkingCategoryData,
}
export default {
    namespaced: true,
    state: initState,
    mutations: Mutations,
    actions: Actions,
    getters: Getters
};
import { Actions } from './ParkingCategoryActions.js';
import { Mutations } from './ParkingCategoryMutations.js';
import { Getters } from './ParkingCategoryGetters.js';


const parkingTSData = [
 
];

const selectedParkingTS = {
     id: "", 
     parkingId :"",
     categoryId :""     
}
const initState = {
    loading: true,
    error: null,
    parkingTSData: parkingTSData,
}
export default {
    namespaced: true,
    state: initState,
    mutations: Mutations,
    actions: Actions,
    getters: Getters
};
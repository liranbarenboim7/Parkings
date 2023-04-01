import { Actions } from './MapActions.js';
import { Mutations } from './MapMutations.js';
//import { Getters } from './ParkingGetters.js';


const currentCoords = { latitude: 32.06, longitude: 34.8 }

// const selectedParking = {
//      id: "", 
//      address :"",
//      side :"",
//      latitude: 0, 
//      longitude: 0     
// }
const initState = {

    loading: true,
    error: null,
    currentCoords: currentCoords,
   
};
export default {
    namespaced: true,
    state: initState,
    mutations: Mutations,
    actions: Actions
  //  getters: Getters
};
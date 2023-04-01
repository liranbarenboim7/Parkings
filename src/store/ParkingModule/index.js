import { Actions } from './ParkingActions.js';
import { Mutations } from './ParkingMutations.js';
import { Getters } from './ParkingGetters.js';


const parkingsData = [
 
];

const selectedParking = {
     id: "", 
     address :"",
     side :"",
     latitude: 0, 
     longitude: 0    
}
const initState = {

    loading: true,
    error: null,
    parkingsData: parkingsData,
    selectedParking: selectedParking
};
export default {
    namespaced: true,
    state: initState,
    mutations: Mutations,
    actions: Actions,
    getters: Getters
};
import { Actions } from './CategoryActions.js';
import { Mutations } from './CategoryMutations.js';
import { Getters } from './CategoryGetters.js';


const categoryData = [
 
];

const selectedCategory = {
     id: "", 
     category:"please select",
     day:"",
     from:"",
     price:"",
     to: "",
     action:""
}
const initState = {

    loading: true,
    error: null,
    categoryData: categoryData,
    selectedCategory: selectedCategory
};
export default {
    namespaced: true,
    state: initState,
    mutations: Mutations,
    actions: Actions,
    getters: Getters
};
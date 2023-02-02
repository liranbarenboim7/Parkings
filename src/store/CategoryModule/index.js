import { Actions } from './CategoryActions.js';
import { Mutations } from './CategoryMutations.js';
import { Getters } from './CategoryGetters.js';

const categoryData = [
    { id: "1", category:"abc",day:"Monday",from:"8:00",price:"20",to: "17:00",action:"sds" },
    { id: "2", category:"abcd",day:"Monday",from:"8:00",price:"20",to: "17:00",action:"sds"},
    { id: "3", category:"efgh",day:"Monday",from:"8:00",price:"20",to: "17:00",action:"sds" }
];

const selectedCategory = {
     id: "1", 
     category:"abc",
     day:"Monday",
     from:"8:00",
     price:"20",
     to: "17:00",
     action:"sds"
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
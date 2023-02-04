
export const Mutations = {

    // SET_DATA(state, { searchTerm , data }) {
    //     console.log('SET_DATA : ' +  data); 
    //     state.citiesData = data;
    //     state.loading = false;
    // },
    // SET_ERROR(state, { error }) {
    //     console.log('SET_ERROR : ' + error);
    //     state.error = 'ERROR : ' + error;
    // }
    SET_SELECTED_CATEGORY(state, { categoryId }) {
        
        const index = state.categoryData.findIndex(category => category.id === categoryId)
        state.selectedCategory.category = state.categoryData[index].category
        state.selectedCategory.id = state.categoryData[index].id
        state.selectedCategory.from = state.categoryData[index].from
        state.selectedCategory.to = state.categoryData[index].to
        state.selectedCategory.price = state.categoryData[index].price
        state.selectedCategory.action = state.categoryData[index].action
        state.selectedCategory.day = state.categoryData[index].day       
    },
    SET_CATEGORIES(state, { categories }) {
        state.categoryData = categories
    }
};
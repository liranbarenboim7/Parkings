
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
        state.selectedCategory.Id = state.categoryData[index].id
        state.selectedCategory.from = categoryData[index].from
        state.selectedCategory.to.value = categoryData[index].to
        state.selectedCategory.price.value = categoryData[index].price
        state.selectedCategory.action.value = categoryData[index].action
        state.selectedCategory.day.value = categoryData[index].day       
    }
};

export const Mutations = {


    SET_SELECTED_PARKING(state, { parkingId }) {
        
        const index = state.categoryData.findIndex(category => category.id === categoryId)
        state.selectedCategory.category = state.categoryData[index].category
        state.selectedCategory.id = state.categoryData[index].id
        state.selectedCategory.from = state.categoryData[index].from
        state.selectedCategory.to = state.categoryData[index].to
        state.selectedCategory.price = state.categoryData[index].price
        state.selectedCategory.action = state.categoryData[index].action
        state.selectedCategory.day = state.categoryData[index].day       
    },
    SET_PARKINGS(state, { parkings }) {
        state.parkingsData = parkings
    }
};
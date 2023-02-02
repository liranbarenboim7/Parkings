
export const Actions = {
  async ['SelectCategory']({commit},{selectedCategoryId}){
    commit('SET_SELECTED_CATEGORY', { categoryId: selectedCategoryId });
  }

 
     
};

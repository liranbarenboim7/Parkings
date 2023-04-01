
export const Actions = {
    async ['UpdateLocation']({ commit }, { currLocation }) {
        commit('SET_LOCATION', { location: currLocation });
    },

  

};

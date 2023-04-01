export const Mutations = {


 
    SET_LOCATION(state, { location }) {
        state.currentCoords.latitude = location.latitude
        state.currentCoords.longitude = location.longitude
       
    }
};

export const Mutations = {


    SET_SELECTED_PARKING(state, { parkingId }) {
        
        const index = state.parkingsData.findIndex(parking => parking.id === parkingId)
       // state.selectedParking.category = state.parkingsData[index].category
        state.selectedParking.id = state.parkingsData[index].id
        state.selectedParking.address = state.parkingsData[index].address 
        state.selectedParking.side = state.parkingsData[index].side 
    },
    SET_PARKINGS(state, { parkings }) {
        state.parkingsData = parkings
    }
};
import { db } from '@/firebaseDB'
import {
    collection, onSnapshot,
    addDoc, doc, deleteDoc, updateDoc,
    query, orderBy, limit, setDoc, Firestore,serverTimestamp 
} from "firebase/firestore"
const parkingsCollectionRef = collection(db, 'parkings')
export const Actions = {
    async ['SelectParking']({ commit }, { selectedParkingId }) {
        commit('SET_SELECTED_PARKING', { parkingId: selectedParkingId });
    },

    async ['getParkings']({ commit }, { }) {
        onSnapshot(parkingsCollectionRef, (querySnapshot) => {
            const parkings = []
            querySnapshot.forEach((doc) => {
                const parking = {
                    id: doc.id,
                    address: doc.data().address,
                    side: doc.data().side

                }
                parkings.push(parking)
            })
            commit('SET_PARKINGS', { parkings: parkings })
        })
    
    },

    async ['UpdateParking']({ commit }, { parking }) {
        //upate of firebase db
        const frankDocRef = doc(db, "parkings", parking.id);
        setDoc(frankDocRef, {
            id: parking.id,
            address: parking.address,
            side: parking.side,
            modifiedAt : serverTimestamp()
        })
    },
    async ['AddParking']({ commit }, { parking }) {
        
       await addDoc(parkingsCollectionRef, {
          address: "new parking",
          side: "",
          category: "",
        });

      },
      async ['DeleteParking']({ commit }, { parkingId }) {
        await deleteDoc(doc(parkingsCollectionRef, parkingId));
      }

};

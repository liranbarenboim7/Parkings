import { db } from '@/firebaseDB'
import {
    collection, onSnapshot,
    addDoc, doc, deleteDoc, updateDoc,
    query, orderBy, limit, setDoc, Firestore,serverTimestamp 
} from "firebase/firestore"
const parkingCategoryCollectionRef = collection(db, 'parkingCategory')
export const Actions = {
    // async ['SelectParking']({ commit }, { selectedParkingId }) {
    //     commit('SET_SELECTED_PARKING', { parkingId: selectedParkingId });
    // },

    async ['getParkingCategory']({ commit }, { }) {
        onSnapshot(parkingCategoryCollectionRef, (querySnapshot) => {
            const parkingCategory = []
            querySnapshot.forEach((doc) => {
                const parking = {
                    id: doc.id,
                    parkingId: doc.data().parkingId,
                    categoryId: doc.data().categoryId

                }
                parkingCategory.push(parking)
            })
            commit('SET_PARKINGCATEGORY', { parkingCategory: parkingCategory })
        })
    
    },

 
    async ['AddParkingCategory']({ commit }, { parkingId , categoryId }) {
        
       await addDoc(parkingCategoryCollectionRef, {
          parkingId: parkingId,
          categoryId: "",
          modifiedAt : serverTimestamp(),
          createdAt : serverTimestamp()
        });

      },
      async ['DeleteParkingCategory']({ commit }, { parkingId,categoryId }) {
        await deleteDoc(doc(parkingCategoryCollectionRef, parkingId));
      }

};

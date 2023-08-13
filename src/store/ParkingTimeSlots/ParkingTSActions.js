import { db } from '@/firebaseDB'
import {
    collection, onSnapshot,
    addDoc, doc, deleteDoc, updateDoc,
    query, orderBy, limit, setDoc, Firestore, serverTimestamp, where, getDocs
} from "firebase/firestore"
const parkingTSCollectionRef = collection(db, 'parkingTS')
export const Actions = {


    async ['getParkingTSAll']({ commit }, { }) {
        onSnapshot(parkingTSCollectionRef, (querySnapshot) => {
            const parkingTS = []
            querySnapshot.forEach((doc) => {
                const parking = {
                    id: doc.id,
                    parkingId: doc.data().parkingId,
                    categoryId: doc.data().categoryId

                }
                parkingTS.push(parking)
            })
            commit('SET_PARKINGTS', { parkingTS: parkingTS })
        })

    },
    async ['getParkingTS']({ commit }, { parkingId }) {
        onSnapshot(parkingTSCollectionRef, (querySnapshot) => {
            const parkingTS = []
            querySnapshot.forEach((doc) => {
                const parking = {
                    id: doc.id,
                    parkingId: doc.data().parkingId,
                    categoryId: doc.data().categoryId

                }
                parkingTS.push(parking)
            })
            commit('SET_PARKINGTS', { parkingTS: parkingTS })
        })

    },
    //in javascript  async  function called isConnected , input two keys :parkingId and categoryId .
    // query firestore database collection called parkingCategory for document 
    //which fields  parkingId and categoryId matches input keys returns await result true if document exists else returns false
    //     isConnected =  async (parkingId, categoryId) => {
    //     try {
    //       const db = firebase.firestore();
    //       const parkingCategoryRef = db.collection('parkingCategory');
    //       const doc = await parkingCategoryRef.where('parkingId', '==', parkingId)
    //         .where('categoryId', '==', categoryId)
    //         .get();
    //       return !doc.empty;
    //     } catch (error) {
    //       console.error(error);
    //       return false;
    //     }
    //   }
    async ['IsConnectedArray']({ commit }, { parkingId }) {
        try {
            const q1 = query(parkingTSCollectionRef, where("parkingId", "==", parkingId));
            // const docs = await parkingTSCollectionRef.where('parkingId', '==', parkingId)
            const querySnapshot = await getDocs(q1);
            let parkingTSConnections = []
            querySnapshot.forEach((doc) => {
 
                parkingTSConnections.push(doc.data().categoryId)
            }

            )

            return parkingTSConnections

        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async ['AddParkingTS']({ commit }, { parkingId, categoryId }) {

        await addDoc(parkingTSCollectionRef, {
            parkingId: parkingId,
            categoryId: categoryId,
            modifiedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });

    },
    async ['DeleteparkingTS']({ commit }, { parkingId, categoryId }) {
        try {
            const q1 = query(parkingTSCollectionRef, where("parkingId", "==", parkingId),where("categoryId", "==", categoryId));
            const querySnapshot = await getDocs(q1);
            querySnapshot.forEach((doc1) => {
                 
                 let docref = doc(parkingTSCollectionRef,doc1.id)
                 deleteDoc(docref);
            })
        }
         catch (error) {
            console.error(error);
            return false;
        }
        
    }

};

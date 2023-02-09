import { db } from '@/firebaseDB'
import {
    collection, onSnapshot,
    addDoc, doc, deleteDoc, updateDoc,
    query, orderBy, limit, setDoc, Firestore, serverTimestamp
} from "firebase/firestore"
const parkingCategoryCollectionRef = collection(db, 'parkingcategory')
export const Actions = {


    async ['getParkingCategory']({ commit }, { parkingId }) {
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
    async ['IsConnected']({ commit }, { parkingId, categoryId }) {
        try {
 
            const doc = await parkingCategoryCollectionRef.where('parkingId', '==', parkingId)
                .where('categoryId', '==', categoryId)
                .get();
            return !doc.empty;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async ['AddParkingCategory']({ commit }, { parkingId, categoryId }) {

        await addDoc(parkingCategoryCollectionRef, {
            parkingId: parkingId,
            categoryId: categoryId,
            modifiedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });

    },
    async ['DeleteParkingCategory']({ commit }, { parkingId, categoryId }) {
        try {
 
            const doc = await parkingCategoryCollectionRef.where('parkingId', '==', parkingId)
                .where('categoryId', '==', categoryId)
                .get();
            return !doc.empty;
        } catch (error) {
            console.error(error);
            return false;
        }
        await deleteDoc(doc);
    }

};

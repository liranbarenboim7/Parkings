import { db } from '@/firebaseDB'
import {
    collection, onSnapshot,
    addDoc, doc, deleteDoc, updateDoc,
    query, orderBy, limit, setDoc, Firestore
} from "firebase/firestore"
const categoriesCollectionRef = collection(db, 'categories')
export const Actions = {
    async ['SelectCategory']({ commit }, { selectedCategoryId }) {
        commit('SET_SELECTED_CATEGORY', { categoryId: selectedCategoryId });
    },

    async ['getCategories']({ commit }, { }) {
        onSnapshot(categoriesCollectionRef, (querySnapshot) => {
            const categories = []
            querySnapshot.forEach((doc) => {
                const todo = {
                    id: doc.id,
                    category: doc.data().category,
                    price: doc.data().price,
                    day: doc.data().day,
                    from: doc.data().from,
                    to: doc.data().to,
                    action: doc.data().action
                }
                categories.push(todo)
            })
            commit('SET_CATEGORIES', { categories: categories })
        })
    
    },

    async ['UpdateCategory']({ commit }, { category }) {
        //upate of firebase db
        const frankDocRef = doc(db, "categories", category.id);
        setDoc(frankDocRef, {
            category: category.category,
            from: category.from,
            to: category.to,
            price: category.price,
            action: category.action,
            day: category.day

        })
    }
};

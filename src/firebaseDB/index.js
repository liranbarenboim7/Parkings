import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAnmGiTSp9mwB9ENrnLhlAor-NWP7HtxeI",
  authDomain: "badass-todo-a676c.firebaseapp.com",
  projectId: "badass-todo-a676c",
  storageBucket: "badass-todo-a676c.appspot.com",
  messagingSenderId: "549285843654",
  appId: "1:549285843654:web:9ea29757f39941e374bdc7"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,auth,app
}
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
const prod = true
const firebaseConfig = {
  apiKey: "AIzaSyAnmGiTSp9mwB9ENrnLhlAor-NWP7HtxeI",
  authDomain: "badass-todo-a676c.firebaseapp.com",
  projectId: "badass-todo-a676c",
  storageBucket: "badass-todo-a676c.appspot.com",
  messagingSenderId: "549285843654",
  appId: "1:549285843654:web:9ea29757f39941e374bdc7"
}
const firebaseConfigProd = {
  apiKey: "AIzaSyA1H9p0rjXAqe5DS-oT9lt_sKTLJVqAmVw",
  authDomain: "parking-production-project.firebaseapp.com",
  projectId: "parking-production-project",
  storageBucket: "parking-production-project.appspot.com",
  messagingSenderId: "11809067301",
  appId: "1:11809067301:web:9a69962f01daf930404acc",
  measurementId: "G-KJHF88PNCL"
};

const app = prod?initializeApp(firebaseConfigProd):initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,auth,app
}
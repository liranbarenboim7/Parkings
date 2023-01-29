import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1H9p0rjXAqe5DS-oT9lt_sKTLJVqAmVw",
  authDomain: "parking-production-project.firebaseapp.com",
  projectId: "parking-production-project",
  storageBucket: "parking-production-project.appspot.com",
  messagingSenderId: "11809067301",
  appId: "1:11809067301:web:9a69962f01daf930404acc",
  measurementId: "G-KJHF88PNCL"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {
    db,auth,app
}






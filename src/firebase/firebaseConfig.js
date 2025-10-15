// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- ADD THIS LINE
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkAwRuRwzSI5VnWu9Wh8RmUGhzB1UFGXE",
  authDomain: "citywise-844af.firebaseapp.com",
  projectId: "citywise-844af",
  storageBucket: "citywise-844af.firebasestorage.app",
  messagingSenderId: "537458997767",
  appId: "1:537458997767:web:4e9915f92eee9de32dc8a2",
  measurementId: "G-FSEMDLK88X"
};

const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export the services to use in other files
export { auth, db, storage };
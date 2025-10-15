// src/firebase/auth.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Citizen Sign-Up
export async function signUpCitizen(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Citizen signed up:", user.uid);
    // Save user info in Firestore here
  } catch (error) {
    console.error(error.message);
  }
}

// Citizen Login
export async function loginCitizen(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Citizen logged in:", user.uid);
  } catch (error) {
    console.error(error.message);
  }
}

// Government Official Sign-Up (restricted domain)
export async function signUpOfficial(email, password, name) {
  const allowedDomain = "@gov.in";
  if (!email.endsWith(allowedDomain)) {
    alert("Only government emails are allowed!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Official signed up:", user.uid);
    // Save user info in Firestore here
  } catch (error) {
    console.error(error.message);
  }
}

// Google Sign-In for Citizens
const provider = new GoogleAuthProvider();
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google signed in:", user.uid);
  } catch (error) {
    console.error(error.message);
  }
}

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todo-c3a27.firebaseapp.com",
  projectId: "todo-c3a27",
  storageBucket: "todo-c3a27.firebasestorage.app",
  messagingSenderId: "133940341558",
  appId: "1:133940341558:web:c790f01a7e0d90e593e197",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  doc,
  getDocs,
  setDoc,
};

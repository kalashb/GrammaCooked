// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC-53PJd013CMD0LyZNqfljesiJrzNvqE",
  authDomain: "grammacooking.firebaseapp.com",
  projectId: "grammacooking",
  storageBucket: "grammacooking.appspot.com",
  messagingSenderId: "816370534204",
  appId: "1:816370534204:web:b57676c6ad4794ff038039"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export{ app, firestore, auth, storage };
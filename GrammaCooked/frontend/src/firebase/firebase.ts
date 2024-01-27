// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
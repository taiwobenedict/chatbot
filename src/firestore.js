// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  authDomain: "chatbot-e565c.firebaseapp.com",
  projectId: "chatbot-e565c",
  storageBucket: "chatbot-e565c.appspot.com",
  messagingSenderId: "1055408528908",
  appId: "1:1055408528908:web:f97a4ae4f9255cb7505829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

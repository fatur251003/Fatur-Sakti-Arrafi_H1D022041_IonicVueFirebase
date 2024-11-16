// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCBJoIulYUBN9KgbgiuxQLf5rkmr6TT1fU",
    authDomain: "pemob-10.firebaseapp.com",
    projectId: "pemob-10",
    storageBucket: "pemob-10.firebasestorage.app",
    messagingSenderId: "877832845815",
    appId: "1:877832845815:web:3c0c02e6f69910f56b96f2"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1fbuIpmSDGpJV2lmE_Riv7rXn_7OVSQw",
  authDomain: "react-auth-8080c.firebaseapp.com",
  projectId: "react-auth-8080c",
  storageBucket: "react-auth-8080c.appspot.com",
  messagingSenderId: "912452269688",
  appId: "1:912452269688:web:6f0874cf85fe8a5d6adf8d",
  measurementId: "G-ZDER703Y91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };

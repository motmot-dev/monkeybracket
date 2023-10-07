// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzlr8lYsZwdLNFtGonFnT2Ev1XB2dywho",
  authDomain: "monkeybracket.firebaseapp.com",
  databaseURL: "https://monkeybracket-default-rtdb.firebaseio.com",
  projectId: "monkeybracket",
  storageBucket: "monkeybracket.appspot.com",
  messagingSenderId: "355765733969",
  appId: "1:355765733969:web:e49d467cbca0e41f100670",
  measurementId: "G-H121JL4SMM"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app


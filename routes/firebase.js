// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3D_xlgu84N6tCxbsck2GPznZNbqi0rb8",
  authDomain: "web-trial-35ee1.firebaseapp.com",
  projectId: "web-trial-35ee1",
  storageBucket: "web-trial-35ee1.appspot.com",
  messagingSenderId: "343717021088",
  appId: "1:343717021088:web:319595f686920a9ad7d0c5",
  measurementId: "G-WFTRX0LW8N"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
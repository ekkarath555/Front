import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsfoIWh-lZTjrFPJXnkkquG9m9NloJhXE",
  authDomain: "front-6710a.firebaseapp.com",
  projectId: "front-6710a",
  storageBucket: "front-6710a.appspot.com",
  messagingSenderId: "105690890141",
  appId: "1:105690890141:web:42204f6dac51b65b57b974",
};

// Start FireStore
firebase.initializeApp(firebaseConfig);

// Get FireStore
const db = firebase.firestore();

export {db}

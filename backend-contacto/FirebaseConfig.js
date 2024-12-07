// firebaseConfig.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');


const FirebaseConfig = {
  apiKey: "AIzaSyBO5LLpxj9My-DJI_Hx_xv6_8GK_uYNoN8",
  authDomain: "proyect-739c4.firebaseapp.com",
  projectId: "proyect-739c4",
  storageBucket: "proyect-739c4.firebasestorage.app",
  messagingSenderId: "403862655872",
  appId: "1:403862655872:web:04671f2cc4423a7fcae765",
  measurementId: "G-E3VYTL2LZC"
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

module.exports = { db };
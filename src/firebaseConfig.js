// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAylAOFbz75IAyNnftaCOCxj6iDCxDFUhs",
    authDomain: "crud-node-js-12f33.firebaseapp.com",
    projectId: "crud-node-js-12f33",
    storageBucket: "crud-node-js-12f33.appspot.com",
    messagingSenderId: "725015834824",
    appId: "1:725015834824:web:1371cef3e935c1fd3d75fd",
    measurementId: "G-2KQ5QTP7NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, collection, addDoc, getDocs, doc, updateDoc, deleteDoc };

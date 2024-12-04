//import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBLK3BAAeiHJb6qDvWTozt8-F9F92XS58Y",
  authDomain: "photh-island.firebaseapp.com",
  projectId: "photh-island",
  storageBucket: "photh-island.firebasestorage.app",
  messagingSenderId: "427663637751",
  appId: "1:427663637751:web:0c83a21e3bb4af1fa1e7f2",
  measurementId: "G-WX2YBQW9X4",
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
// export const storage = firebase.storage();

const app = initializeApp(firebaseConfig);

// firebase 서비스 초기화
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

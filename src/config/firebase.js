import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-9-bY326xHwfDU-x_ygUqaTDNzxD4Y6U",
  authDomain: "scoreboard-app-14012024.firebaseapp.com",
  projectId: "scoreboard-app-14012024",
  storageBucket: "scoreboard-app-14012024.appspot.com",
  messagingSenderId: "754915355073",
  appId: "1:754915355073:web:da6461d1a2df76a8b2a740",
  measurementId: "G-074TM7Y0JY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

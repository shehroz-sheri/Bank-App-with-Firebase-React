import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBVYXM6ahVCKS8wHk8rcrOvptQnWdvwMMs",
    authDomain: "banking-app-83c91.firebaseapp.com",
    projectId: "banking-app-83c91",
    storageBucket: "banking-app-83c91.appspot.com",
    messagingSenderId: "1063015754295",
    appId: "1:1063015754295:web:96f6277fdcbee7b6b4adb2"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
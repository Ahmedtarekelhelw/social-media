import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "socialmedia-faec7.firebaseapp.com",
  projectId: "socialmedia-faec7",
  storageBucket: "socialmedia-faec7.appspot.com",
  messagingSenderId: "890636366127",
  appId: process.env.REACT_APP_FIREBASE_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

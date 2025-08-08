

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const api_key = import.meta.env.API_KEY_FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyBX9EFD_XvF13vWRis-VzTDKs0zHkD9P-c",
  authDomain: "fir-react-app-b249c.firebaseapp.com",
  projectId: "fir-react-app-b249c",
  storageBucket: "fir-react-app-b249c.firebasestorage.app",
  messagingSenderId: "155842318578",
  appId: "1:155842318578:web:8da5bfb251d3dae02a006b"
};

initializeApp(firebaseConfig);
const db = getFirestore();

export {db}
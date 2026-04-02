import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT03DP2yiC3yVoIrH0h3uQA2tA81Cj46k",
  authDomain: "iot-ranger.firebaseapp.com",
  projectId: "iot-ranger",
  storageBucket: "iot-ranger.firebasestorage.app",
  messagingSenderId: "602096581096",
  appId: "1:602096581096:web:833821207937bf071d4c5d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
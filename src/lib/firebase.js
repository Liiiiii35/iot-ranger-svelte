import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDT03DP2yiC3yVoIrH0h3uQA2tA81Cj46k",
//   authDomain: "iot-ranger.firebaseapp.com",
//   projectId: "iot-ranger",
//   storageBucket: "iot-ranger.firebasestorage.app",
//   messagingSenderId: "602096581096",
//   appId: "1:602096581096:web:833821207937bf071d4c5d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA25cDshaUWQ69kk9QNtuySwsb9dlY441s",
  authDomain: "iot-rangers.firebaseapp.com",
  projectId: "iot-rangers",
  storageBucket: "iot-rangers.firebasestorage.app",
  messagingSenderId: "422773939803",
  appId: "1:422773939803:web:2f4d56a6e27a1fc0bca97e",
  measurementId: "G-PXQPL7TJYE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
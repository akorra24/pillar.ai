import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL-IdHwF70A-QfkVT1f-hrnFfcE-vTfDk",
  authDomain: "pillar-data.firebaseapp.com",
  projectId: "pillar-data",
  storageBucket: "pillar-data.appspot.com",
  messagingSenderId: "681447102479",
  appId: "1:681447102479:web:7a999b26ce107a2f5c2b7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();

export { auth, google, facebook };

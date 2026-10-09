
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


//  firebase all object key, id's
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotesai-bb3d9.firebaseapp.com",
  projectId: "authexamnotesai-bb3d9",
  storageBucket: "authexamnotesai-bb3d9.firebasestorage.app",
  messagingSenderId: "274664261983",
  appId: "1:274664261983:web:64eb733539b9132b114eea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}
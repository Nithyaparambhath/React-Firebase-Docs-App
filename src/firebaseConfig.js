import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBmOilp83HkJyNh5ipElbm7B9lfZFeew9E",
  authDomain: "docsapp-1a689.firebaseapp.com",
  projectId: "docsapp-1a689",
  storageBucket: "docsapp-1a689.appspot.com",
  messagingSenderId: "714612232994",
  appId: "1:714612232994:web:a84439e05708e27cb64b7b"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)




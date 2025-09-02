import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // Add storageBucket, messagingSenderId, appId if needed
};

const clientApp = initializeApp(firebaseConfig);
const clientAuth = getAuth(clientApp);  // Fixed: was getFirestore
const clientDb = getFirestore(clientApp);  // Fixed: was getAuth

export { clientApp, clientDb, clientAuth };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const _firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // Add storageBucket, messagingSenderId, appId if needed
};

const _clientApp = initializeApp(_firebaseConfig);
const _clientAuth = getAuth(_clientApp);
const _clientDb = getFirestore(_clientApp);

export { _clientApp as clientApp, _clientDb as clientDb, _clientAuth as clientAuth };

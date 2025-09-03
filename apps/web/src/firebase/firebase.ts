// apps/web/src/firebase/firebase.ts

import { getApps, initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const existingApps = getApps();
let app: FirebaseApp;
if (!existingApps.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = existingApps[0]!; // Non-null assertion since we checked length
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);






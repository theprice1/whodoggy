// packages/shared/src/firebase/firebase.ts
import { type FirebaseApp, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";

let analytics: any = null;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZOPGI64GyGSfDe_s3ZBRWaKy3mC_k4Yw",
  authDomain: "whodoggy-35625.firebaseapp.com",
  projectId: "whodoggy-35625",
  storageBucket: "whodoggy-35625.firebasestorage.app",
  messagingSenderId: "319189797874",
  appId: "1:319189797874:web:6b15c4ec29a0bc52e6b96b",
  measurementId: "G-B15T1MX485",
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Core services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Web-only analytics
if (typeof window !== "undefined" && "document" in window) {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  });
}

export { app, auth, db, analytics };

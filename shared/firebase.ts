// shared/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZOPGI64GyGSfDe_s3ZBRWaKy3mC_k4Yw",
  authDomain: "whodoggy-35625.firebaseapp.com",
  projectId: "whodoggy-35625",
  storageBucket: "whodoggy-35625.firebasestorage.app",
  messagingSenderId: "319189797874",
  appId: "1:319189797874:web:6b15c4ec29a0bc52e6b96b",
  measurementId: "G-B15T1MX485",
};

// ✅ Initialize core Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🌐 Optional: Initialize Analytics on Web Only
let analytics: any = null;

if (typeof window !== "undefined" && "document" in window) {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  });
}

// ✅ Export everything you need
export { app, auth, db, analytics };

// shared/firebase.ts

// Firebase core and services
import { getAuth, getFirestore, initializeApp } from "../../";
import type { Analytics } from "firebase/analytics";

// Optional: analytics (only on web)
let analytics: Analytics | null = null;

// ✅ Your actual Firebase config
const _firebaseConfig = {
	apiKey: "AIzaSyCZOPGI64GyGSfDe_s3ZBRWaKy3mC_k4Yw",
	authDomain: "whodoggy-35625.firebaseapp.com",
	projectId: "whodoggy-35625",
	storageBucket: "whodoggy-35625.firebasestorage.app",
	messagingSenderId: "319189797874",
	appId: "1:319189797874:web:6b15c4ec29a0bc52e6b96b",
	measurementId: "G-B15T1MX485",
};

// 🔥 Initialize Firebase
const _app = initializeApp(firebaseConfig);

// 📦 Initialize services
const _auth = getAuth(app);
const _db = getFirestore(app);

// 🌐 Optional: Analytics (only loads on web)
if (typeof window !== "undefined" && "document" in window) {
	import("firebase/analytics").then(({ getAnalytics }) => {
		analytics = getAnalytics(app);
		console.log("Firebase Analytics initialized");
	});
}

// 🚀 Export everything you need
export { type app, type auth, type db, analytics };
// This file initializes Firebase with the provided configuration and exports the necessary services.
// It includes Firebase Authentication, Firestore, and optional Analytics for web applications.

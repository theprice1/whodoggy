// packages/shared/src/firebase/firebase.ts
import { type FirebaseApp, initializeApp } from "...";
import { type Auth, getAuth } from "...";
import { type Firestore, getFirestore } from "...";
import type { Analytics } from "firebase/analytics";

let analytics: Analytics | null = null;

// Firebase configuration
const _firebaseConfig = {
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

// Environment-safe browser detection
const _isBrowser = (() => {
	try {
		return (
			typeof globalThis !== "undefined" &&
			"window" in globalThis &&
			"document" in globalThis
		);
	} catch {
		return false;
	}
})();

// Web-only analytics with safe environment detection
if (isBrowser) {
	import("firebase/analytics")
		.then(({ getAnalytics }) => {
			try {
				analytics = getAnalytics(app);
				console.log("Firebase Analytics initialized");
			} catch (error) {
				console.warn("Failed to initialize Firebase Analytics:", error);
			}
		})
		.catch((error) => {
			console.warn("Failed to load Firebase Analytics module:", error);
		});
}

export { app, auth, db, analytics };

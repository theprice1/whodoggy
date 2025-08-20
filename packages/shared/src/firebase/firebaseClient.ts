import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { firebaseConfig } from './firebase.config.js'; // keep .js extension for ESM

// Detect if running in development (e.g., React Native or Expo)
declare const __DEV__: boolean;

// Initialize Firebase App
const clientApp: FirebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const clientDb: Firestore = getFirestore(clientApp);
const clientAuth: Auth = getAuth(clientApp);

// Enable offline persistence (optional, catches errors if unsupported)
enableIndexedDbPersistence(clientDb).catch((err) => {
  console.warn("Offline persistence unavailable:", err);
});

// Connect to local emulator if in development
const isDev = typeof __DEV__ !== 'undefined' && __DEV__;
if (isDev) {
  connectFirestoreEmulator(clientDb, 'localhost', 8080);
}

export { clientApp, clientDb, clientAuth };

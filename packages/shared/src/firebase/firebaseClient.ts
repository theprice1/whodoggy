import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { firebaseConfig } from './firebase.config';  // no extension here

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("Offline persistence unavailable", err);
});

// Use `declare` only in a .d.ts file, so instead use this to avoid TS errors:
const isDev = typeof __DEV__ !== 'undefined' && __DEV__;

if (isDev) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { app, db, auth };

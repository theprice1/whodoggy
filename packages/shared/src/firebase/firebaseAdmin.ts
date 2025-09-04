// Firebase Admin SDK
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from '../../../../backend/firebase/serviceAccountKey.json';

// Initialize app only once
const app = getApps().length === 0 ? initializeApp({ credential: cert(serviceAccount) }) : undefined;

// Exports
export const adminAuth = getAuth();
export const adminDb = getFirestore();

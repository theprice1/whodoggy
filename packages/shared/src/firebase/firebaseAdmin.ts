import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let app: any;
let adminAuth: any;
let adminDb: any;

function initializeFirebase() {
  if (app) return; // Already initialized

  const credentialsJson = process.env.FIREBASE_ADMIN_CREDENTIALS_JSON;

  if (!credentialsJson) {
    throw new Error("FIREBASE_ADMIN_CREDENTIALS_JSON environment variable is not set. Make sure FIREBASE_ADMIN_CREDENTIALS_JSON is properly set in your .env file");
  }

  try {
    const serviceAccount = JSON.parse(credentialsJson);

    app = initializeApp({
      credential: cert(serviceAccount),
    });

    adminAuth = getAuth(app);
    adminDb = getFirestore(app);

    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Firebase initialization error:", errorMessage);
    throw error;
  }
}

// Lazy getters that initialize on first access
export function getAdminAuth() {
  initializeFirebase();
  return adminAuth;
}

export function getAdminDb() {
  initializeFirebase();
  return adminDb;
}

export function getApp() {
  initializeFirebase();
  return app;
}

// For backward compatibility
export { getAdminAuth as adminAuth, getAdminDb as adminDb, getApp as app };

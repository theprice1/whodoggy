import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

// Parse service account from environment
const serviceAccount = (() => {
  try {
    return JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON ?? '{}');
  } catch (err) {
    console.error('Failed to parse FIREBASE_ADMIN_CREDENTIALS_JSON:', err);
    return {};
  }
})();

// Initialize app (singleton pattern)
const app: App = getApps().length
  ? getApps()[0]
  : initializeApp({
    credential: cert(serviceAccount),
  });

// Initialize Firestore
const adminDb: Firestore = getFirestore(app);

// Initialize Auth
const adminAuth: Auth = getAuth(app);

// Export all needed objects
export { app, adminDb, adminAuth };

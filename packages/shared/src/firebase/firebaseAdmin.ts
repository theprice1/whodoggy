import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

const serviceAccount = (() => {
  try {
    return JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON ?? '{}');
  } catch (err) {
    console.error('Failed to parse FIREBASE_ADMIN_CREDENTIALS_JSON:', err);
    return {};
  }
})();

const app: App = getApps().length
  ? getApps()[0]
  : initializeApp({
    credential: cert(serviceAccount),
  });

const adminDb: Firestore = getFirestore(app);

export { app, adminDb };

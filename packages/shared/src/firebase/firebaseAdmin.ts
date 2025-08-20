import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON as string);

const app: App = getApps().length
  ? getApps()[0]
  : initializeApp({
    credential: cert(serviceAccount),
  });

const adminDb: Firestore = getFirestore(app);
const adminAuth: Auth = getAuth(app);

export { app, adminDb, adminAuth };

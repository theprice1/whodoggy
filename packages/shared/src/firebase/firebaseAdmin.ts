import * as dotenv from "dotenv";
import { type App, cert, getApps, initializeApp } from "firebase-admin/app";
import { type Auth, getAuth } from "firebase-admin/auth";
import { type Firestore, getFirestore } from "firebase-admin/firestore";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON as string);

// Get existing apps or initialize new one
const existingApps = getApps();
const app: App = existingApps.length > 0 && existingApps[0]
  ? existingApps[0]
  : initializeApp({
    credential: cert(serviceAccount),
  });

const adminDb: Firestore = getFirestore(app);
const adminAuth: Auth = getAuth(app);

export { app, adminDb, adminAuth };

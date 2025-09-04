import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json";

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

export { app, adminAuth, adminDb };

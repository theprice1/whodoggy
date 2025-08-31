// Update your src/firebase/firebaseAdmin.ts file with this version:

import admin from "firebase-admin";
import type { Auth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    // Base64 encoded approach (more reliable)
    const base64Credentials = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    const jsonString = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(jsonString);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // JSON string approach (fallback)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  } else {
    throw new Error("Missing Firebase credentials. Set either FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_SERVICE_ACCOUNT_KEY");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Explicit type annotation to satisfy TS
export const adminAuth: Auth = admin.auth();
export const adminFirestore = admin.firestore();

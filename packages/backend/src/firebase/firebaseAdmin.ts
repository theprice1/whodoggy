import admin from 'firebase-admin';

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable');
  }

  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();

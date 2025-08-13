import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = (() => {
    try {
        return JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON ?? '{}');
    }
    catch (err) {
        console.error('Failed to parse FIREBASE_ADMIN_CREDENTIALS_JSON:', err);
        return {};
    }
})();
const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
    });
const adminDb = getFirestore(app);
export { app, adminDb };
//# sourceMappingURL=firebaseAdmin.js.map
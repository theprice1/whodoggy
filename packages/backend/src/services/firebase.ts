import admin from 'firebase-admin';
import serviceAccount from '../../firebase-service-account/service-account-file.json';

export function initializeFirebase() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export { admin };

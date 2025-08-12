import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import { pool } from '../../packages/backend/src/db.js';

dotenv.config();

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509_CERT_URL,
} = process.env;

if (
  !FIREBASE_PROJECT_ID ||
  !FIREBASE_PRIVATE_KEY_ID ||
  !FIREBASE_PRIVATE_KEY ||
  !FIREBASE_CLIENT_EMAIL ||
  !FIREBASE_CLIENT_ID
) {
  throw new Error('Missing required Firebase environment variables');
}

// Create a partial credentials object **without** 'type'
const firebaseCredentials = {
  projectId: FIREBASE_PROJECT_ID,
  privateKeyId: FIREBASE_PRIVATE_KEY_ID,
  privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: FIREBASE_CLIENT_EMAIL,
  clientId: FIREBASE_CLIENT_ID,
  clientX509CertUrl: FIREBASE_CLIENT_X509_CERT_URL,
};

// Initialize Firebase app with credentials
initializeApp({
  credential: cert(firebaseCredentials),
});

const firestore = getFirestore();

async function syncDogs() {
  try {
    const snapshot = await firestore.collection('dogs').get();

    for (const doc of snapshot.docs) {
      const dogData = doc.data();

      await pool.query(
        `
        INSERT INTO dogs (id, name, microchip_id, breed, owner_id, registry_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          microchip_id = EXCLUDED.microchip_id,
          breed = EXCLUDED.breed,
          owner_id = EXCLUDED.owner_id,
          registry_id = EXCLUDED.registry_id
        `,
        [
          dogData.id,
          dogData.name,
          dogData.microchip_id,
          dogData.breed,
          dogData.owner_id,
          dogData.registry_id,
        ]
      );
    }

    console.log('Firebase to PostgreSQL sync complete.');
  } catch (error) {
    console.error('Error syncing data:', error);
  } finally {
    await pool.end();
  }
}

syncDogs();

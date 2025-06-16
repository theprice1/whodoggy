import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('mock_data/dogs.json', 'utf-8'));

initializeApp({
  credential: cert(require('../firebase-creds.json')),
});
const db = getFirestore();

async function uploadData() {
  const batch = db.batch();
  data.forEach((entry: any) => {
    const ref = db.collection('dogs').doc(entry.microchipId);
    batch.set(ref, entry);
  });
  await batch.commit();
  console.log(`✅ Uploaded ${data.length} records to Firestore`);
}

uploadData();
uploadData().catch((error) => {
  console.error('Error uploading data:', error);
});     
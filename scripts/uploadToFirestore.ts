import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

// Define a TypeScript interface for dog records
interface DogRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  ownerName: string;
  contact: string;
  registeredAt: string;
  registryName: string;
  vaccinated: boolean;
  notes: string;
  lastCheckup: string;
}

// Parse CLI args for data file and collection name
const args = process.argv.slice(2);
const dataFileArg = args[0] || '../mock_data/dogs.json';
const collectionName = args[1] || 'dogs';

const dataFilePath = path.resolve(__dirname, dataFileArg);

// Read mock data JSON file with type safety
let data: DogRecord[];
try {
  data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
} catch (err) {
  console.error(`❌ Failed to read or parse data file: ${dataFilePath}`);
  process.exit(1);
}

// Path to your Firebase service account key JSON file
const serviceAccountPath = path.resolve(__dirname, '../firebase-creds.json');

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccountPath),
});

const db = getFirestore();

async function uploadData() {
  try {
    const batch = db.batch();
    const batchSize = 500; // Firestore batch limit
    let batchCounter = 0;

    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      const docRef = db.collection(collectionName).doc(entry.microchipId);
      batch.set(docRef, entry);
      batchCounter++;

      // Commit batch every 500 writes or at the end
      if (batchCounter === batchSize || i === data.length - 1) {
        await batch.commit();
        console.log(`✅ Uploaded batch of ${batchCounter} records (${i + 1}/${data.length})`);
        batchCounter = 0;
      }
    }

    console.log(`🎉 Successfully uploaded ${data.length} records to Firestore collection '${collectionName}'.`);
  } catch (error) {
    console.error('❌ Error uploading data:', error);
    process.exit(1);
  }
}

uploadData();






























;
import { getFirestore } from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Load mock data from disk
const DATA_PATH = path.resolve(__dirname, '../mock_data/dogs.json');
const data: any[] = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

// Initialize Firebase Admin SDK with service account
const serviceAccount: ServiceAccount = require(path.resolve(__dirname, '../firebase-creds.json'));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function uploadData() {
  try {
    const batch = db.batch();

    data.forEach((entry) => {
      const ref = db.collection('dogs').doc(entry.microchipId);
      batch.set(ref, entry);
    });

    await batch.commit();
    console.log(`✅ Uploaded ${data.length} records to Firestore`);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

uploadData();

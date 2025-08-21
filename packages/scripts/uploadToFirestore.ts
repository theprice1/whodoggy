import fs from "fs";
import path from "path";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Define DogRecord interface
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
// Default to dogs.json inside packages/backend/mock_data folder
const dataFileArg = args[0] || "dogs.json";
const collectionName = args[1] || "dogs";

// Build path to mock data inside backend package folder
const dataFilePath = path.resolve(__dirname, "../packages/backend/mock_data", dataFileArg);

// Read mock data JSON file
let data: DogRecord[];
try {
  data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
} catch (err) {
  console.error(`❌ Failed to read or parse data file: ${dataFilePath}`, err);
  process.exit(1);
}

// Path to your Firebase service account JSON
const serviceAccountPath = path.resolve(
  __dirname,
  "../packages/backend/firebase-service-account/service-account-file.json",
);

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccountPath),
});

const db = getFirestore();

async function uploadData() {
  try {
    const batchSize = 500;
    let batch = db.batch();
    let batchCounter = 0;

    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      const docRef = db.collection(collectionName).doc(entry.microchipId);
      batch.set(docRef, entry);
      batchCounter++;

      if (batchCounter === batchSize || i === data.length - 1) {
        await batch.commit();
        batch = db.batch();
        batchCounter = 0;
      }
    }

    console.log(`✅ Uploaded ${data.length} records to Firestore collection "${collectionName}".`);
  } catch (error) {
    console.error("❌ Error uploading data to Firestore:", error);
    process.exit(1);
  }
}

uploadData();

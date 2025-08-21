import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

export function initializeFirebase() {
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!serviceAccountPath) {
    throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS in .env file.");
  }

  const absolutePath = path.resolve(__dirname, "../../", serviceAccountPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Service account file not found at path: ${absolutePath}`);
  }

  const serviceAccount = require(absolutePath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("[Firebase] Initialized successfully.");
}

export default admin;

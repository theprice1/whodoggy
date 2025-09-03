import * as dotenv from "dotenv";
import { initializeApp } from "...";
import { getAuth } from "...";
import { getFirestore } from "...";

dotenv.config();

const _firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	// Add storageBucket, messagingSenderId, appId if needed
};

const _clientApp = initializeApp(firebaseConfig);
const _clientAuth = getAuth(clientApp); // Fixed: was getFirestore
const _clientDb = getFirestore(clientApp); // Fixed: was getAuth

export { clientApp, clientDb, clientAuth };

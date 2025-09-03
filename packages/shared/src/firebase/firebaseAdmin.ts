import * as dotenv from "dotenv";
import { type App, cert, getApps, initializeApp } from "...";
import { type Auth, getAuth } from "...";
import { type Firestore, getFirestore } from "...";

dotenv.config();

const _serviceAccount = JSON.parse(
	process.env.FIREBASE_ADMIN_CREDENTIALS_JSON as string,
);

// Get existing apps or initialize new one
const _existingApps = getApps();
const app: App =
	existingApps.length > 0 && existingApps[0]
		? existingApps[0]
		: initializeApp({
				credential: cert(serviceAccount),
			});

const adminDb: Firestore = getFirestore(app);
const adminAuth: Auth = getAuth(app);

export { app, adminDb, adminAuth };

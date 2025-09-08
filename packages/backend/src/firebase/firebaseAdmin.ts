import admin from "firebase-admin";

// Initialize Firebase Admin with JSON credentials
try {
  if (!process.env.FIREBASE_ADMIN_CREDENTIALS_JSON) {
    throw new Error(
      "FIREBASE_ADMIN_CREDENTIALS_JSON environment variable is not set",
    );
  }

  const _serviceAccount = JSON.parse(
    process.env.FIREBASE_ADMIN_CREDENTIALS_JSON,
  );

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(_serviceAccount),
    });
    console.log("Firebase Admin initialized successfully");
  }
} catch (error: unknown) {
  const _errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";
  console.error("Firebase initialization error:", _errorMessage);  // Fixed: removed *
  console.error(
    "Make sure FIREBASE_ADMIN_CREDENTIALS_JSON is properly set in your .env file",
  );
  // Don't kill the server, just log the error
}

export default admin;

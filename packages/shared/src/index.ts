// Export OpenAPI client

// Firebase Admin SDK exports
export {
	adminAuth,
	adminDb,
	app as adminApp,
} from "./firebase/firebaseAdmin.js";
// Optionally export everything else from client SDK
export * from "./firebase/firebaseClient.js";

// Firebase Client SDK exports
export { clientApp, clientAuth, clientDb } from "./firebase/firebaseClient.js";
export * from "./openapi/openapi.js";

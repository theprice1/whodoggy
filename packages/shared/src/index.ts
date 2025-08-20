// Export OpenAPI client
export * from './openapi/openapi.js';

// Firebase Admin SDK exports
export { app as adminApp, adminDb } from './firebase/firebaseAdmin.js';

// Firebase Client SDK exports
export { clientApp, clientAuth, clientDb } from './firebase/firebaseClient.js';

// Optionally export everything else from client SDK
export * from './firebase/firebaseClient.js';

export * from './openapi.js';

// From firebaseAdmin, rename `app` to `adminApp` to avoid conflict
export { app as adminApp, /* other exports */ } from './firebase/firebaseAdmin.js';

// From firebaseClient, rename `app` to `clientApp` and export others normally
export { app as clientApp, auth, db /* other exports */ } from './firebase/firebaseClient.js';

// Export firebase.ts normally (assuming no conflicts)
export * from './firebase/firebase.js';

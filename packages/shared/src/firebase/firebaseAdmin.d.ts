import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';

declare const app: App;
declare const adminDb: Firestore;

export { app, adminDb };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = exports.app = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var firebase_config_1 = require("./firebase.config"); // no extension here
var app = !(0, app_1.getApps)().length ? (0, app_1.initializeApp)(firebase_config_1.firebaseConfig) : (0, app_1.getApps)()[0];
exports.app = app;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
// Enable offline persistence
(0, firestore_1.enableIndexedDbPersistence)(db).catch(function (err) {
    console.warn("Offline persistence unavailable", err);
});
var isDev = typeof __DEV__ !== 'undefined' && __DEV__;
if (isDev) {
    (0, firestore_1.connectFirestoreEmulator)(db, 'localhost', 8080);
}

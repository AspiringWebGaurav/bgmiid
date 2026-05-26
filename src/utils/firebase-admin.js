import admin from 'firebase-admin';

export const isFirebaseConfigured = !!process.env.FIREBASE_SERVICE_ACCOUNT || !!process.env.GOOGLE_APPLICATION_CREDENTIALS || !!process.env.FIREBASE_PROJECT_ID;

if (!admin.apps.length) {
  try {
    // Attempt to parse service account from environment variables if present
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
    let serviceAccount;

    if (serviceAccountStr) {
      serviceAccount = JSON.parse(serviceAccountStr);
    } else {
      console.warn("[Firebase] Service account missing. Skipping Firebase initialization for local dev.");
    }

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://bgmiidservices.firebaseio.com"
      });
    } else if (isFirebaseConfigured) {
      // Initialize with application default credentials if available
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error.message);
  }
}

export const db = isFirebaseConfigured ? admin.firestore() : null;
export const adminAuth = isFirebaseConfigured ? admin.auth() : null;
export default admin;

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhJNxRhCVCtSRe3ldo1WwxTOd-S--i5eA",
  authDomain: "bgmiidservices.firebaseapp.com",
  projectId: "bgmiidservices",
  storageBucket: "bgmiidservices.firebasestorage.app",
  messagingSenderId: "114325698624",
  appId: "1:114325698624:web:5a71d00768e9bc411587a5",
  measurementId: "G-PD8V4CMRBX"
};

// Initialize Firebase (singleton pattern to avoid re-initializing in SSR/HMR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics (only supported in browser environments)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjYs11y2VDQHNfKgWLSk2JQmonL8sYV5I",
  authDomain: "giteth.firebaseapp.com",
  projectId: "giteth",
  storageBucket: "giteth.firebasestorage.app",
  messagingSenderId: "712209758878",
  appId: "1:712209758878:web:39578698d393a0e2ab598f",
  measurementId: "G-JND3TX75SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);

// GitHub Provider
export const githubProvider = new GithubAuthProvider();

// GitHub Sign-In
export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user; // Returns the authenticated user
  } catch (error) {
    console.error("GitHub Sign-In Error:", error);
    throw error;
  }
};

// Sign-Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};
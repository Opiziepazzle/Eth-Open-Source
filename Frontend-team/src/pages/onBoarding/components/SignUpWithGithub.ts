import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    // Access token
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // User info
    const user = result.user;
    console.log("GitHub Access Token:", token);
    console.log("User Info:", user);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during GitHub Sign-In:", error.message);
    }
  }
};



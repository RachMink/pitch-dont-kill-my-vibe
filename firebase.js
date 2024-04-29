// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtBQ3VBk_3ae49keL7Qyqsb5ssbkWeUJE",
  authDomain: "pitch-dont-kill-my-vibe.firebaseapp.com",
  projectId: "pitch-dont-kill-my-vibe",
  storageBucket: "pitch-dont-kill-my-vibe.appspot.com",
  messagingSenderId: "1087785377973",
  appId: "1:1087785377973:web:0df79428e81862ca2b5efc",
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Signup function
export const handleSignup = async (email, password, displayName, userType) => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods && signInMethods.length > 0) {
      // User already exists, throw error
      throw new Error("User already exists");
    } else {
      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user's display name
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        userType: userType,
      });

      return user;
    }
  } catch (error) {
    throw error;
  }
};

// Login function
export const handleLogin = async (email, password) => {
  const auth = getAuth(firebaseApp);
  try {
    // Sign in user with email and password
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export default firebaseApp;

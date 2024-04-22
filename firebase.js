// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCtBQ3VBk_3ae49keL7Qyqsb5ssbkWeUJE",
  authDomain: "pitch-dont-kill-my-vibe.firebaseapp.com",
  projectId: "pitch-dont-kill-my-vibe",
  storageBucket: "pitch-dont-kill-my-vibe.appspot.com",
  messagingSenderId: "1087785377973",
  appId: "1:1087785377973:web:0df79428e81862ca2b5efc",
};

let firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

export default firebaseApp;

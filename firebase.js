// firebase.js

import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
 
// Firebase config from Firebase Console

const firebaseConfig = {

  apiKey: "your-api-key",

  authDomain: "your-auth-domain",

  projectId: "your-project-id",

  storageBucket: "your-storage-bucket",

  messagingSenderId: "your-messaging-sender-id",

  appId: "your-app-id"

};
 
// Initialize Firebase

const app = initializeApp(firebaseConfig);
 
// Firebase Authentication

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
 
// Google sign-in

const signInWithGoogle = async () => {

  try {

    const result = await signInWithPopup(auth, provider);

    // Get the user's details

    const user = result.user;

    return user;

  } catch (error) {

    console.error(error);

  }

};
 
// Sign out

const logOut = async () => {

  try {

    await signOut(auth);

  } catch (error) {

    console.error(error);

  }

};
 
export { signInWithGoogle, logOut };

 
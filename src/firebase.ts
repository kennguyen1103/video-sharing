import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DEV;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId,
  appId: `1:${messagingSenderId}:web:${appId}`,
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;

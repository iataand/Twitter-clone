import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL:
    "https://twitter-clone-developmen-44311-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "gs://twitter-clone-developmen-44311.appspot.com",
});

export const auth = app.auth();
export const database = firebase.database();
export const storage = firebase.storage();
export default app;

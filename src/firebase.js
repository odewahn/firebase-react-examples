import firebase from "firebase/compat/app";
import firestore from "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyAkBsf8iED8hHkZWuhedcwQ0qzHkG3h6xc",
  authDomain: "basic-react-test.firebaseapp.com",
  projectId: "basic-react-test",
  storageBucket: "basic-react-test.appspot.com",
  messagingSenderId: "1022356201014",
  appId: "1:1022356201014:web:e57457ec8978f154104297",
  measurementId: "G-2G7VBGMF3T",
};

firebase.initializeApp(config);

const db = firebase.firestore();

const puzzlesRef = db.collection("puzzles");
const profileRef = db.collection("profile");

export { puzzlesRef, profileRef };

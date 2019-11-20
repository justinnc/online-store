import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAClL2SoZLdKmT95nRxUW2gfSZX8c8hB5M",
  authDomain: "online-storex.firebaseapp.com",
  databaseURL: "https://online-storex.firebaseio.com",
  projectId: "online-storex",
  storageBucket: "online-storex.appspot.com",
  messagingSenderId: "1071350093259",
  appId: "1:1071350093259:web:4102eb2727140342bc124e",
  measurementId: "G-XZ07MS1VCC"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

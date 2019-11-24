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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log("userAuth", userAuth);
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log("snapShot", snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import Auth = firebase.auth.Auth
import Firestore = firebase.firestore.Firestore
import FieldValue = firebase.firestore.FieldValue
import CollectionReference = firebase.firestore.CollectionReference
import DocumentReference = firebase.firestore.DocumentReference
import DocumentSnapshot = firebase.firestore.DocumentSnapshot

const firebaseConfig = {
    apiKey: "AIzaSyB11gqP2AicJPmv1ABFjwGiOr6xCM--huw",
    authDomain: "tweeter-dfa01.firebaseapp.com",
    databaseURL: "https://tweeter-dfa01.firebaseio.com",
    projectId: "tweeter-dfa01",
    storageBucket: "tweeter-dfa01.appspot.com",
    messagingSenderId: "149840259429",
    appId: "1:149840259429:web:542929c80b04be1eecd98c",
}

firebase.initializeApp(firebaseConfig)

export function getFirebaseAuth(): Auth {
    return firebase.auth()
}

export function getFirestore(): Firestore {
    return firebase.firestore()
}

export {
    Firestore,
    Auth as FirebaseAuth,
    FieldValue,
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
}

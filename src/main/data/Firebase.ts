import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB11gqP2AicJPmv1ABFjwGiOr6xCM--huw",
    authDomain: "tweeter-dfa01.firebaseapp.com",
    databaseURL: "https://tweeter-dfa01.firebaseio.com",
    projectId: "tweeter-dfa01",
    storageBucket: "tweeter-dfa01.appspot.com",
    messagingSenderId: "149840259429",
    appId: "1:149840259429:web:542929c80b04be1eecd98c"
}

initializeApp(firebaseConfig)

export type FirebaseAuth = auth.Auth
export type Firestore = firestore.Firestore

export function getFirebaseAuth(): FirebaseAuth {
    return auth()
}

export function getFirestore() : Firestore {
    return firestore()
}

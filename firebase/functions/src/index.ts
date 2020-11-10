import * as functions from 'firebase-functions'
import {Change} from 'firebase-functions'
import * as admin from "firebase-admin"
import DocumentData = admin.firestore.DocumentData
import DocumentSnapshot = admin.firestore.DocumentSnapshot

const app = admin.initializeApp()
const db = app.firestore()

export const updateName = functions.firestore
    .document("/users/{userId}")
    .onUpdate(async (change, context) => {
        if (nameIsChanged(change))
            await updateTweetsByUser()

        async function updateTweetsByUser() {
            const snapshot = await getTweetsByUserId(context.params.userId)
            const updates = snapshot.docs.map(doc => updateNameInDoc(doc, change.after.data().name))
            return Promise.all(updates)
        }

        function updateNameInDoc(doc: DocumentSnapshot, name: string) {
            return doc.ref.update("author.name", name)
        }

        function getTweetsByUserId(userId: string) {
            return db.collection("tweets")
                .where("author.id", "==", userId).get()
        }

        function nameIsChanged(change: Change<DocumentData>) {
            return change.before.data().name != change.after.data().name
        }
    })

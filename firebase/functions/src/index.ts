import * as functions from 'firebase-functions'
import {Change} from 'firebase-functions'
import * as admin from "firebase-admin"
import {diff, equals} from "./ArrayUtil"
import DocumentData = admin.firestore.DocumentData
import DocumentSnapshot = admin.firestore.DocumentSnapshot
import FieldValue = admin.firestore.FieldValue

const app = admin.initializeApp()
const db = app.firestore()

export const updateName = functions
    .runWith({ memory: "2GB" })
    .region("europe-west1")
    .firestore
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

export const updateFollowers = functions
    .runWith({ memory: "2GB" })
    .region("europe-west1")
    .firestore
    .document("/users/{userId}")
    .onUpdate(async (change, context) => {
        const oldFollowing: string[] = change.before.data().following
        const following: string[] = change.after.data().following

        if (followingIsChanged())
            return addOrRemoveFollower()

        async function addFollower(id: string) {
            return db.doc(`/users/${id}/`).update("followers", FieldValue.arrayUnion(context.params.userId))
        }

        async function removeFollower(id: string) {
            return db.doc(`/users/${id}/`).update("followers", FieldValue.arrayRemove(context.params.userId))
        }

        async function addOrRemoveFollower() {
            if (following.length > oldFollowing.length)
                return addFollower(diff(following, oldFollowing)[0])

            return removeFollower(diff(oldFollowing, following)[0])
        }

        function followingIsChanged() {
            return !equals(following, oldFollowing)
        }
    })

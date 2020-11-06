import {CollectionReference, Firestore} from "@/data/Firebase"
import {toPlainObject} from "@/shared/ObjectUtil"
import * as firebase from "@firebase/rules-unit-testing"

const appConfig = {projectId: "tweeter-dfa01"}

export function getTestFirestore(userId: string): Firestore {
    const app = firebase.initializeTestApp({...appConfig, auth: {uid: userId}})
    return app.firestore() as unknown as Firestore
}

export function getAdminFirestore(): Firestore {
    const app = firebase.initializeAdminApp(appConfig)
    return app.firestore() as unknown as Firestore
}

export async function deleteAllDocs(collection: CollectionReference) {
    const snapshot = await collection.get()
    for (const doc of snapshot.docs) {
        await doc.ref.delete()
    }
}

export async function addData(collection: CollectionReference, data: object[]) {
    for (const object of data) {
        await collection.add(toPlainObject(object))
    }
}

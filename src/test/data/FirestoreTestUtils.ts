import {CollectionReference, Firestore} from "@/data/Firebase"
import {toPlainObject} from "@/shared/ObjectUtil"
import {clearFirestoreData, initializeAdminApp, initializeTestApp} from "@firebase/rules-unit-testing"

export const appConfig = {projectId: "tweeter-dfa01"}

export function getTestFirestore(userId: string): Firestore {
    const app = initializeTestApp({...appConfig, auth: {uid: userId}})
    return app.firestore() as unknown as Firestore
}

export function getAdminFirestore(): Firestore {
    const app = initializeAdminApp(appConfig)
    return app.firestore() as unknown as Firestore
}

export function clearData() {
    return clearFirestoreData(appConfig)
}

export async function addData(collection: CollectionReference, data: object[]) {
    for (const object of data) {
        await collection.add(toPlainObject(object))
    }
}

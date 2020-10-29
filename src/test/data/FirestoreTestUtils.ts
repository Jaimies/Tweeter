import {CollectionReference, Firestore, getFirestore} from "@/data/Firebase";
import {toPlainObject} from "@/shared/ObjectUtil";

export function getTestFirestore(): Firestore {
    const db = getFirestore()
    db.useEmulator("localhost", 8000)
    return db
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

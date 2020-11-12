import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"
import {deserializeUser} from "./util/Serialization"
import {clone} from "@/shared/ObjectUtil"
import {UserChange} from "@/domain/model/UserChange"
import {CollectionReference, DocumentSnapshot, FieldValue, Firestore} from "@/data/Firebase"
import {IllegalArgumentException} from "@/shared/IllegalArgumentException"
import {ListChange} from "@/domain/model/ListChange"
import {Observable} from "rxjs"
import {doc} from "rxfire/firestore"
import {map} from "rxjs/operators"
import {DbUser, mapUserToDb} from "@/data/model/DbUser"

export class UserRepositoryImpl implements UserRepository {
    private usersCollection: CollectionReference

    constructor(private db: Firestore) {
        this.usersCollection = this.db.collection("users")
    }

    async getUsers(): Promise<User[]> {
        const snapshot = await this.usersCollection.get()
        return snapshot.docs.map(doc => deserializeUser(doc.id, doc.data() as DbUser))
    }

    async findUserByUsername(username: string): Promise<User | undefined> {
        const snapshot = await this.getDocumentByField("username_lowercase", username.toLowerCase())
        return toUser(snapshot)
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        const snapshot = await this.getDocumentByField("email", email)
        return toUser(snapshot)
    }

    findUserById(id: string): Observable<User | undefined> {
        return doc(this.usersCollection.doc(id)).pipe(
            map(toUser)
        )
    }

    addUser(userId: string, user: User): Promise<void> {
        const doc = this.usersCollection.doc(userId)
        const dbUser = mapUserToDb(user)
        return doc.set(dbUser).then(() => {})
    }

    async updateUser(id: string, change: UserChange) {
        const doc = await this.usersCollection.doc(id).get()

        if (!doc.exists)
            throw new IllegalArgumentException("unable to update user that does not exist")

        return doc.ref.set(applyUserChange(change), {merge: true})
    }

    private async getDocumentByField(field: string, value: string): Promise<DocumentSnapshot | undefined> {
        const query = this.usersCollection.where(field, "==", value).limit(1)
        const snapshot = await query.get()
        return snapshot.docs[0]
    }
}

function applyUserChange(change: UserChange): object {
    if (change.following) return clone(change, {following: toFieldValue(change.following)})
    return change
}

function toFieldValue<T>(change: ListChange<T>) {
    if (change instanceof ListChange.Add) return FieldValue.arrayUnion(change.value)
    return FieldValue.arrayRemove(change.value)
}

function toUser(snapshot: DocumentSnapshot | undefined) {
    if (!snapshot?.exists) return undefined
    return deserializeUser(snapshot.id, snapshot.data() as DbUser)
}

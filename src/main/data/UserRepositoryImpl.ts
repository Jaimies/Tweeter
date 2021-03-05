import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"
import {deserializeUser} from "./util/Serialization"
import {UserChange} from "@/domain/model/UserChange"
import {CollectionReference, DocumentSnapshot, FieldValue, Firestore} from "@/data/Firebase"
import {IllegalArgumentException} from "@/shared/IllegalArgumentException"
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
        const snapshot = await this.getDocumentByField("email", email.toLowerCase())
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

        return doc.ref.set(change, {merge: true})
    }

    async followUser(id: string, followerId: string) {
        return this.usersCollection.doc(followerId).update("following", FieldValue.arrayUnion(id))
    }

    async unfollowUser(id: string, followerId: string) {
        return this.usersCollection.doc(followerId).update("following", FieldValue.arrayRemove(id))
    }

    private async getDocumentByField(field: string, value: string): Promise<DocumentSnapshot | undefined> {
        const query = this.usersCollection.where(field, "==", value).limit(1)
        const snapshot = await query.get()
        return snapshot.docs[0]
    }
}

function toUser(snapshot: DocumentSnapshot | undefined) {
    if (!snapshot?.exists) return undefined
    return deserializeUser(snapshot.id, snapshot.data() as DbUser)
}

import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"
import {deserializeUser} from "./util/Serialization"
import {clone, toPlainObject} from "@/shared/ObjectUtil"
import {UserChange} from "@/domain/model/UserChange"
import {CollectionReference, FieldValue, Firestore} from "@/data/Firebase"
import {IllegalArgumentException} from "@/shared/IllegalArgumentException"
import {ListChange} from "@/domain/model/ListChange"

export class UserRepositoryImpl implements UserRepository {
    private usersCollection: CollectionReference

    constructor(private db: Firestore) {
        this.usersCollection = this.db.collection("users")
    }

    async getUsers(): Promise<User[]> {
        const snapshot = await this.usersCollection.get()
        return snapshot.docs.map(doc => deserializeUser(doc.id, doc.data()))
    }

    async findUserByUsername(username: string): Promise<User | undefined> {
        const doc = await this.getUserByUsername(username)
        if (doc == undefined) return undefined
        return deserializeUser(doc.id, doc.data())
    }

    addUser(userId: string, user: User): Promise<void> {
        const doc = this.usersCollection.doc(userId)
        const {id, ...userWithoutId} = toPlainObject(user)
        return doc.set(userWithoutId).then(() => {})
    }

    async updateUser(id: string, change: UserChange) {
        const doc = await this.usersCollection.doc(id).get()

        if (!doc.exists)
            throw new IllegalArgumentException("unable to update user that does not exist")

        return doc.ref.set(applyUserChange(change), {merge: true})
    }

    private async getUserByUsername(username: string) {
        const snapshot = await this.usersCollection
            .where("username", "==", username)
            .limit(1)
            .get()

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

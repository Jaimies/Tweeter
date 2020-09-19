import {AuthRepository} from "../domain/repository/AuthRepository"
import {User} from "../domain/model/User"
import {Storage} from "./Storage"
import {UserEntry} from "./UserEntry"

function createUserWithId(id: string | null): User | null {
    if (id == null) return null
    return new User(id, id)
}

export class AuthRepositoryImpl implements AuthRepository {
    private readonly users: UserEntry[]
    user: User | null

    constructor(private storage: Storage) {
        this.user = createUserWithId(this.storage.get("userId", ""))
        this.users = this.storage.get("users", []).map(UserEntry.fromPlainObject)
    }

    login(credential: string, password: string) {
        if (!this.credentialsAreValid(credential, password))
            return false

        this.storage.set("userId", credential)
        return true
    }

    signUp(email: string, username: string, password: string) {
        this.users.push(new UserEntry(username, password))
        this.persistUsers()
    }

    private persistUsers() {
        this.storage.set("users", [...this.users])
    }

    private credentialsAreValid(credential: string, password: string) {
        return this.users.some(user => {
            return user.id == credential && user.password == password
        })
    }
}
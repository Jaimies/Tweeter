import {AuthRepository} from "../domain/repository/AuthRepository"
import {User} from "../domain/model/User"
import {Storage} from "./Storage"
import {UserEntry} from "./UserEntry"
import {deserializeUserEntry} from "./util/Serialization"

export class AuthRepositoryImpl implements AuthRepository {
    private readonly userEntries: UserEntry[]

    constructor(private storage: Storage) {
        this.userEntries = this.storage.get("users", []).map(deserializeUserEntry)
    }

    get user() {
        return this.findUserById(this.storage.get("userId", ""))
    }

    login(credential: string, password: string) {
        if (!this.credentialsAreValid(credential, password))
            return false

        this.storage.set("userId", credential)
        return true
    }

    signUp(user: User, password: string) {
        this.userEntries.push(new UserEntry(user, password))
        this.persistUsers()
    }

    private persistUsers() {
        this.storage.set("users", this.userEntries)
    }

    private credentialsAreValid(credential: string, password: string): boolean {
        const userEntry = this.findUserEntryById(credential)
        return userEntry != null && userEntry.password == password
    }

    private findUserEntryById(id: string): UserEntry | undefined {
        return this.userEntries.find(entry => entry.user.id == id)
    }

    private findUserById(id: string): User | undefined {
        return this.findUserEntryById(id)?.user
    }
}
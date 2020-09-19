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
        return this.findUserByCredential(this.storage.get("userId", ""))
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
        const userEntry = this.findUserEntryByCredential(credential)
        return userEntry != null && userEntry.password == password
    }

    private findUserEntryByCredential(credential: string): UserEntry | undefined {
        return this.userEntries.find(entry => {
            return entry.user.id == credential || entry.user.email == credential
        })
    }

    private findUserByCredential(credential: string): User | undefined {
        return this.findUserEntryByCredential(credential)?.user
    }
}
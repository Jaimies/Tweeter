import {AuthRepository} from "../domain/repository/AuthRepository"
import {Storage} from "./Storage"
import {UserEntry} from "./UserEntry"

export class AuthRepositoryImpl implements AuthRepository {
    private readonly userEntries: UserEntry[]

    constructor(private storage: Storage) {
        this.userEntries = this.storage.get("userEntries", [])
    }

    get userId() {
        return this.storage.get("userId", undefined)
    }

    login(credential: string, password: string) {
        if (!this.credentialsAreValid(credential, password))
            return false

        const userEntry = this.findUserEntryByCredential(credential)
        this.storage.set("userId", userEntry!.id)
        return true
    }

    signUp(id: string, email: string, password: string) {
        this.userEntries.push(new  UserEntry(id, email, password))
        this.persistUsers()
    }

    private persistUsers() {
        this.storage.set("userEntries", this.userEntries)
    }

    private credentialsAreValid(credential: string, password: string): boolean {
        const userEntry = this.findUserEntryByCredential(credential)
        return userEntry != null && userEntry.password == password
    }

    private findUserEntryByCredential(credential: string): UserEntry | undefined {
        return this.userEntries.find(entry => {
            return entry.id == credential || entry.email == credential
        })
    }
}

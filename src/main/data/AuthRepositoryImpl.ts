import {AuthRepository} from "../domain/repository/AuthRepository"
import {Storage} from "./Storage"
import {UserEntry} from "./UserEntry"
import {IllegalArgumentException} from "../shared/IllegalArgumentException"

const CREDENTIALS_TAKEN_ERROR = "Cannot sign up: username or email is already taken"
const INVALID_CREDENTIALS_ERROR = "Credentials are invalid"

export class AuthRepositoryImpl implements AuthRepository {
    private readonly userEntries: UserEntry[]

    constructor(private storage: Storage) {
        this.userEntries = this.storage.get("userEntries", [])
    }

    get userId() {
        return this.storage.get("userId", undefined)
    }

    login(credential: string, password: string) {
        if (!this.areCredentialsValid(credential, password))
            throw new IllegalArgumentException(INVALID_CREDENTIALS_ERROR)

        const userEntry = this.findUserEntryByCredential(credential)
        this.storage.set("userId", userEntry!.id)
        return true
    }

    signUp(id: string, email: string, password: string) {
        if (this.credentialsAreTaken(id, email))
            throw new IllegalArgumentException(CREDENTIALS_TAKEN_ERROR)

        this.userEntries.push(new UserEntry(id, email, password))
        this.persistUsers()
    }

    areCredentialsValid(credential: string, password: string): boolean {
        const userEntry = this.findUserEntryByCredential(credential)
        return userEntry != null && userEntry.password == password
    }

    private persistUsers() {
        this.storage.set("userEntries", this.userEntries)
    }

    private credentialsAreTaken(id: string, email: string) {
        return this.userEntries.some(user => user.id == id || user.email == email)
    }

    private findUserEntryByCredential(credential: string): UserEntry | undefined {
        return this.userEntries.find(entry => {
            return entry.id == credential || entry.email == credential
        })
    }
}

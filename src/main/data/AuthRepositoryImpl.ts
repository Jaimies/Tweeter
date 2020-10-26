import {AuthRepository} from "@/domain/repository/AuthRepository"
import {Storage} from "./Storage"
import {UserEntry} from "./UserEntry"
import {IllegalArgumentException} from "@/shared/IllegalArgumentException"

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

    login(email: string, password: string) {
        if (!this.areCredentialsValid(email, password))
            throw new IllegalArgumentException(INVALID_CREDENTIALS_ERROR)

        const userEntry = this.findUserEntryByEmail(credential)
        this.storage.set("userId", userEntry!.id)
        return true
    }

    signUp(email: string, password: string) {
        if (this.emailIsTaken(email))
            throw new IllegalArgumentException(CREDENTIALS_TAKEN_ERROR)

        this.userEntries.push(new UserEntry(email, password))
        this.persistUsers()
    }

    logout() {
        this.storage.set("userId", null)
    }

    areCredentialsValid(email: string, password: string): boolean {
        const userEntry = this.findUserEntryByEmail(email)
        return userEntry != null && userEntry.password == password
    }

    private persistUsers() {
        this.storage.set("userEntries", this.userEntries)
    }

    private emailIsTaken(email: string) {
        return this.userEntries.some(user => user.email == email)
    }

    private findUserEntryByEmail(email: string): UserEntry | undefined {
        return this.userEntries.find(entry => entry.email == email)
    }
}

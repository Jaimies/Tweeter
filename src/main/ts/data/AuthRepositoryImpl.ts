import {AuthRepository} from "../domain/repository/AuthRepository"
import {User} from "../domain/model/User"

const fakeUser = new User("fakeuser", "Fake User")

function credentialsAreValid(credential: string, password: string) {
    return credential == fakeUser.id && password == fakeUser.id
}

export class AuthRepositoryImpl implements AuthRepository {
    user: User | null

    constructor() {
        const isSignedIn = localStorage.getItem("isSignedIn") == "true"
        this.user = isSignedIn ? fakeUser : null
    }

    login(credential: string, password: string) {
        if (!credentialsAreValid(credential, password))
            return false

        localStorage.setItem("isSignedIn", "true")
        return true
    }
}
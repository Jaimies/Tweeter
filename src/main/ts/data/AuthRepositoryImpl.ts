import {AuthRepository} from "../domain/repository/AuthRepository"
import {User} from "../domain/model/User"

const fakeUser = new User("fakeuser", "Fake User")

export class AuthRepositoryImpl implements AuthRepository {
    user: User | null

    constructor() {
        const isSignedIn = localStorage.getItem("isSignedIn") == "true"
        this.user = isSignedIn ? fakeUser : null
    }

    signIn() {
        localStorage.setItem("isSignedIn", "true")
    }
}
import {AuthRepository} from "../domain/repository/AuthRepository"
import {User} from "../domain/model/User"

const fakeUser = new User("fakeuser", "Fake User")
const users = [{id: "fakeuser", password: "fakeuser"}]

function credentialsAreValid(credential: string, password: string) {
    return users.some(user => user.id == credential && user.password == password)
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

    signUp(email: string, username: string, password: string) {
        users.push({id: username, password: password})
    }
}
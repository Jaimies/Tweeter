import {AuthRepository} from "../domain/repository/AuthRepository"
import {User} from "../domain/model/User"

const users = [{id: "fakeuser", password: "fakeuser"}]

function credentialsAreValid(credential: string, password: string) {
    return users.some(user => user.id == credential && user.password == password)
}

function createUserWithId(id: string | null): User | null {
    if (id == null) return null
    return new User(id, id)
}

export class AuthRepositoryImpl implements AuthRepository {
    user: User | null

    constructor() {
        this.user = createUserWithId(localStorage.getItem("userId"))
    }

    login(credential: string, password: string) {
        if (!credentialsAreValid(credential, password))
            return false

        localStorage.setItem("userId", credential)
        return true
    }

    signUp(email: string, username: string, password: string) {
        users.push({id: username, password: password})
    }
}
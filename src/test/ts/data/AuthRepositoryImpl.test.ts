import {AuthRepositoryImpl} from "../../../main/ts/data/AuthRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {User} from "../../../main/ts/domain/model/User"
import {UserEntry} from "../../../main/ts/data/UserEntry"
import {AuthRepository} from "../../../main/ts/domain/repository/AuthRepository"

const user = new User("username", "User's name", "email@gmail.com")
const userEntry = new UserEntry(user, "password")

let authRepository: AuthRepository

function initializeAuthRepository(userId: string = "", userEntries: UserEntry[] = [userEntry]) {
    const storage = new FakeStorage({
        userId: userId,
        users: userEntries
    })

    authRepository = new AuthRepositoryImpl(storage)
}

it("initializes with a user", () => {
    initializeAuthRepository(user.id)
    expect(authRepository.user).toEqual(user)
})

it("initializes without a user", () => {
    initializeAuthRepository("")
    expect(authRepository.user).toBe(undefined)
})

it("logs in with username", () => {
    initializeAuthRepository("")
    authRepository.login("username", "password")
    expect(authRepository.user).toEqual(user)
})

it("logs in with email", () => {
    initializeAuthRepository("")
    authRepository.login("email@gmail.com", "password")
    expect(authRepository.user).toEqual(user)
})

it("doesn't log in if credentials don't match", () => {
    initializeAuthRepository("")
    authRepository.login("username", "wrongPassword")
    expect(authRepository.user).toBe(undefined)
})

it("signs up", () => {
    initializeAuthRepository("", [])
    authRepository.signUp(user, "password")
    authRepository.login("username", "password")
    expect(authRepository.user).toEqual(user)
})
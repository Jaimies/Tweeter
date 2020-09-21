import {AuthRepositoryImpl} from "../../main/data/AuthRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {UserEntry} from "../../main/data/UserEntry"
import {AuthRepository} from "../../main/domain/repository/AuthRepository"

const userEntry = new UserEntry("testUser", "user@gmail.com", "password")

let authRepository: AuthRepository

function initializeAuthRepository(userId: string = "", userEntries: UserEntry[] = [userEntry]) {
    const storage = new FakeStorage({userId, userEntries})
    authRepository = new AuthRepositoryImpl(storage)
}

it("initializes with a user", () => {
    initializeAuthRepository(userEntry.id)
    expect(authRepository.userId).toBe(userEntry.id)
})

it("initializes without a user", () => {
    initializeAuthRepository("")
    expect(authRepository.userId).toBe(undefined)
})

it("logs in with username", () => {
    initializeAuthRepository("")
    authRepository.login(userEntry.id, userEntry.password)
    expect(authRepository.userId).toEqual(userEntry.id)
})

it("logs in with email", () => {
    initializeAuthRepository("")
    authRepository.login(userEntry.email, userEntry.password)
    expect(authRepository.userId).toEqual(userEntry.id)
})

it("doesn't log in if credentials don't match", () => {
    initializeAuthRepository("")
    authRepository.login("username", "wrongPassword")
    expect(authRepository.userId).toBe(undefined)
})

it("signs up", () => {
    initializeAuthRepository("", [])
    authRepository.signUp(userEntry.id, userEntry.email, userEntry.password)
    authRepository.login(userEntry.id, userEntry.password)
    expect(authRepository.userId).toEqual(userEntry.id)
})

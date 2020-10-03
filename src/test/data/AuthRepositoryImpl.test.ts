import {AuthRepositoryImpl} from "../../main/data/AuthRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {UserEntry} from "../../main/data/UserEntry"
import {AuthRepository} from "../../main/domain/repository/AuthRepository"
import {testUserEntry} from "../testData"

let authRepository: AuthRepository
const {email, id, password} = testUserEntry

function initializeAuthRepository(userId: string = "", userEntries: UserEntry[] = [testUserEntry]) {
    const storage = new FakeStorage({userId, userEntries})
    authRepository = new AuthRepositoryImpl(storage)
}

describe("get user id from storage", () => {
    it("initializes with a user", () => {
        initializeAuthRepository(id)
        expect(authRepository.userId).toBe(id)
    })

    it("initializes without a user", () => {
        initializeAuthRepository("")
        expect(authRepository.userId).toBe(undefined)
    })
})

describe("login", () => {
    it("logs in with username", () => {
        initializeAuthRepository("")
        authRepository.login(id, password)
        expect(authRepository.userId).toEqual(id)
    })

    it("logs in with email", () => {
        initializeAuthRepository("")
        authRepository.login(email, password)
        expect(authRepository.userId).toEqual(id)
    })

    it("doesn't log in if credentials don't match", () => {
        initializeAuthRepository("")
        authRepository.login("username", "wrongPassword")
        expect(authRepository.userId).toBe(undefined)
    })
})

describe("sign up", () => {
    it("signs up", () => {
        initializeAuthRepository("", [])
        authRepository.signUp(id, email, password)
        authRepository.login(id, password)
        expect(authRepository.userId).toEqual(id)
    })
})

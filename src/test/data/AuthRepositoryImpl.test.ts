import {AuthRepositoryImpl} from "../../main/data/AuthRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {AuthRepository} from "../../main/domain/repository/AuthRepository"
import {createTestUserEntry} from "../testData"
import {Storage} from "../../main/data/Storage"

let authRepository: AuthRepository
let storage: Storage
const [user, anotherUser] = [createTestUserEntry(), createTestUserEntry()]

beforeEach(() => {
    storage = new FakeStorage({userEntries: [user]})
    authRepository = new AuthRepositoryImpl(storage)
})

describe("login", () => {
    it("logs in with username", () => {
         const success = authRepository.login(user.id, user.password)
        expect(success).toBe(true)
        expect(authRepository.userId).toEqual(user.id)
    })

    it("logs in with email", () => {
        const success = authRepository.login(user.email, user.password)
        expect(success).toBe(true)
        expect(authRepository.userId).toEqual(user.id)
    })

    it("doesn't log in if credentials don't match", () => {
        const success = authRepository.login("username", "wrongPassword")
        expect(success).toBe(false)
        expect(authRepository.userId).toBe(undefined)
    })
})

describe("sign up", () => {
    it("signs up", () => {
        authRepository.signUp(anotherUser.id, anotherUser.email, anotherUser.password)
        authRepository.login(anotherUser.id, anotherUser.password)
        expect(authRepository.userId).toEqual(anotherUser.id)
    })
})

it("persists data", () => {
    authRepository.login(user.id, user.password)
    const newAuthRepository = new AuthRepositoryImpl(storage)
    expect(newAuthRepository.userId).toBe(user.id)
})

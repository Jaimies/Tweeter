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
        authRepository.login(user.id, user.password)
        expect(authRepository.userId).toEqual(user.id)
    })

    it("logs in with email", () => {
        authRepository.login(user.email, user.password)
        expect(authRepository.userId).toEqual(user.id)
    })

    it("doesn't log in if credentials don't match", () => {
        authRepository.login("username", "wrongPassword")
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

describe("persists data", () => {
    it("initializes with a user", () => {
        authRepository.login(user.id, user.password)
        const newAuthRepository = new AuthRepositoryImpl(storage)
        expect(newAuthRepository.userId).toBe(user.id)
    })

    it("initializes without a user", () => {
        expect(authRepository.userId).toBe(undefined)
    })
})

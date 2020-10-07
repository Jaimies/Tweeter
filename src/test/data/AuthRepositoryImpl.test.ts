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
        expect(() => {
            authRepository.login("username", "wrongPassword")
        }).toThrow()
    })
})

it("areCredentialsValid()", () => {
    expect(authRepository.areCredentialsValid(user.id, user.password)).toBe(true)
    expect(authRepository.areCredentialsValid(user.email, user.password)).toBe(true)
    expect(authRepository.areCredentialsValid(user.email, "wrongpassword")).toBe(false)
    expect(authRepository.areCredentialsValid("anotherEmail@gmail.com", user.password)).toBe(false)
})

describe("sign up", () => {
    it("signs up", () => {
        authRepository.signUp(anotherUser.id, anotherUser.email, anotherUser.password)
        authRepository.login(anotherUser.id, anotherUser.password)
        expect(authRepository.userId).toEqual(anotherUser.id)
    })

    it("throws when trying to sign up with a username that is already taken", () => {
        expect(() => {
            authRepository.signUp(user.id, "anotherEmail@gmail.com", "password")
        }).toThrow()
    })

    it("throws when trying sign up with an email that is already taken", () => {
        expect(() => {
            authRepository.signUp("newid", user.email, "password")
        }).toThrow()
    })
})

it("persists data", () => {
    authRepository.login(user.id, user.password)
    const newAuthRepository = new AuthRepositoryImpl(storage)
    expect(newAuthRepository.userId).toBe(user.id)
})

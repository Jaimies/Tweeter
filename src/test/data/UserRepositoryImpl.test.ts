import {UserRepositoryImpl} from "@/data/UserRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {UserRepository} from "@/domain/repository/UserRepository"
import {createTestUser} from "../testData"
import {Storage} from "@/data/Storage"

const [user, anotherUser] = [createTestUser(), createTestUser()]

let userRepository: UserRepository
let storage: Storage

beforeEach(() => {
    storage = new FakeStorage({users: [user]})
    userRepository = new UserRepositoryImpl(storage)
})

it("addUser()", () => {
    userRepository.addUser(anotherUser)
    expect(userRepository.getUsers()).toEqual([user, anotherUser])
})

describe("findUserById()", () => {
    it("returns the needed user", () => {
        expect(userRepository.findUserById(user.id)).toEqual(user)
    })

    it("returns undefined if there is no user with such id", () => {
        expect(userRepository.findUserById("12341234")).toBe(undefined)
    })
})

describe("updateUser()", () => {
    it("updates name", () => {
        const updatedUser = userRepository.updateUser(user.id, {name: "New name"})
        expect(updatedUser.name).toBe("New name")
        expect(userRepository.findUserById(user.id)!.name).toBe("New name")
    })

    it("throws if user is not found", () => {
        expect(() => {
            userRepository.updateUser("otherId", {})
        }).toThrow()
    })
})

it("persists data", () => {
    const newUserRepository = new UserRepositoryImpl(storage)
    expect(newUserRepository.getUsers()).toEqual([user])
})

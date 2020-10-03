import {UserRepositoryImpl} from "../../main/data/UserRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {UserRepository} from "../../main/domain/repository/UserRepository"
import {createTestUser} from "../testData"
import {Storage} from "../../main/data/Storage"

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
    it("allows to change name", () => {
        const updatedUser = {...user, name: "New Name"}
        userRepository.updateUser(updatedUser)
        expect(userRepository.findUserById(user.id)).toEqual(updatedUser)
    })

    it("doesn't allow to change id", () => {
        const updatedUser = {...user, id: "newuserid"}
        expect(() => {
            userRepository.updateUser(updatedUser)
        }).toThrow()
    })
})

it("persists data", () => {
    const newUserRepository = new UserRepositoryImpl(storage)
    expect(newUserRepository.getUsers()).toEqual([user])
})

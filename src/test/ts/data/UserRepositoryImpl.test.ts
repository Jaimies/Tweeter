import {UserRepositoryImpl} from "../../../main/ts/data/UserRepositoryImpl"
import {FakeStorage} from "./FakeStorage"
import {UserRepository} from "../../../main/ts/domain/repository/UserRepository"
import {User} from "../../../main/ts/domain/model/User"

const testUser = new User("testuser", "Test User", "user@gmail.com")
let userRepository: UserRepository

function initializeUserRepository(users: User[]) {
    const storage = new FakeStorage({users})
    userRepository = new UserRepositoryImpl(storage)
}

it("initializes with no users", () => {
    initializeUserRepository([])
    expect(userRepository.getUsers()).toEqual([])
})

it("initializes with some users", () => {
    initializeUserRepository([testUser])
    expect(userRepository.getUsers()).toEqual([testUser])
})

it("adds a user", () => {
    initializeUserRepository([])
    userRepository.addUser(testUser)
    expect(userRepository.getUsers()).toEqual([testUser])
})

it("gets user by id", () => {
    initializeUserRepository([testUser])
    expect(userRepository.findUserById(testUser.id)).toEqual(testUser)
})

it("returns undefined when trying to get a user by non-existent id", () => {
    initializeUserRepository([testUser])
    expect(userRepository.findUserById("12341234")).toBe(undefined)
})

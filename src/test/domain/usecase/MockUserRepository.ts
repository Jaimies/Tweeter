import {UserRepository} from "@/domain/repository/UserRepository"
import {testUser} from "../../testData"

export class MockUserRepository implements UserRepository {
    getUsers = async () => []
    findUserByUsername = async () => testUser
    findUserById = async () => testUser
    addUser = jest.fn()
    updateUser = jest.fn()
}

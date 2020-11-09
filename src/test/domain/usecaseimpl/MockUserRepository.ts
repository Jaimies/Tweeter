import {UserRepository} from "@/domain/repository/UserRepository"
import {testUser} from "../../testData"
import {of} from "rxjs"

export class MockUserRepository implements UserRepository {
    getUsers = async () => []
    findUserByEmail = async () => testUser
    findUserByUsername = async () => testUser
    findUserById = () => of(testUser)
    addUser = jest.fn()
    updateUser = jest.fn()
}

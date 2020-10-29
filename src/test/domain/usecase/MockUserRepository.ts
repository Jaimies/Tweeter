import {UserRepository} from "@/domain/repository/UserRepository"

export class MockUserRepository implements UserRepository {
    getUsers = async () => []
    findUserByUsername = async () => undefined
    addUser = async () => {}
    updateUser = jest.fn()
}

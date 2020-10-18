import {UserRepository} from "@/domain/repository/UserRepository"

export class MockUserRepository implements UserRepository {
    addUser= () => {}
    findUserById = () => undefined
    getUsers = () => []
    updateUser = jest.fn()
}

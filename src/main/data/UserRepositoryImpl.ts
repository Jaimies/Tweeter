import {UserRepository} from "../domain/repository/UserRepository"
import {User} from "../domain/model/User"
import {Storage} from "./Storage"
import {IllegalArgumentException} from "../shared/IllegalArgumentException"
import {deserializeUser} from "./util/Serialization"

export class UserRepositoryImpl implements UserRepository {
    private readonly users: User[]

    constructor(private storage: Storage) {
        this.users = this.storage.get("users", []).map(deserializeUser)
    }

    getUsers(): User[] {
        return this.users
    }

    findUserById(id: string): User | undefined {
        return this.getUsers().find(user => user.id == id)
    }

    addUser(user: User) {
        this.users.push(user)
        this.persistData()
    }

    updateUser(updatedUser: User) {
        const userIndex = this.users.findIndex(user => user.id == updatedUser.id)

        if (userIndex < 0)
            throw new IllegalArgumentException(`User with given id does not exist: ${updatedUser.id}`)

        this.users[userIndex] = updatedUser
        this.persistData()
    }

    private persistData() {
        this.storage.set("users", this.users)
    }
}

import {UserRepository} from "../domain/repository/UserRepository"
import {User} from "../domain/model/User"
import {Storage} from "./Storage"

export class UserRepositoryImpl implements UserRepository {
    private readonly users: User[]

    constructor(private storage: Storage) {
        this.users = this.storage.get("users", [])
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

    private persistData() {
        this.storage.set("users", this.users)
    }
}

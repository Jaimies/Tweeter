import {UserRepository} from "../domain/repository/UserRepository"
import {User} from "../domain/model/User"
import {Storage} from "./Storage"

export class UserRepositoryImpl implements UserRepository {
    constructor(private storage: Storage) {}

    getUsers(): User[] {
        return this.storage.get("users", [])
    }

    findUserById(id: string): User| undefined {
        return this.getUsers().find(user => user.id == id)
    }

    addUser(user: User) {
        const newUsers = this.getUsers().concat(user)
        this.storage.set("users", newUsers)
    }
}

import {UserRepository, UserChange} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"
import {Storage} from "./Storage"
import {IllegalArgumentException} from "@/shared/IllegalArgumentException"
import {deserializeUser} from "./util/Serialization"
import {clone} from "@/shared/ObjectUtil"

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

    updateUser(id: string, change: UserChange): User {
        const index = this.getUserIndexById(id)
        const updatedUser = clone(this.users[index], change)
        this.users[index] = updatedUser
        this.persistData()
        return updatedUser
    }

    private getUserIndexById(id: string): number {
        const index = this.users.findIndex(user => user.id == id)

        if (index < 0)
            throw new IllegalArgumentException(`User with given id does not exist: ${id}`)

        return index
    }

    private persistData() {
        this.storage.set("users", this.users)
    }
}

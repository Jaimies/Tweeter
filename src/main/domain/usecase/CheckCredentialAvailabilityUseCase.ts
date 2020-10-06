import {UserRepository} from "../repository/UserRepository"
import {User} from "../model/User"

export class CheckCredentialAvailabilityUseCase {
    constructor(private userRepository: UserRepository) {}

    isEmailAvailable(email: string): boolean {
        return this.isUserAvailable(user => user.email == email)
    }

    isUserIdAvailable(id: string): boolean {
        return this.isUserAvailable(user => user.id == id)
    }

    private isUserAvailable(predicate: (user: User) => boolean) {
        return !this.userRepository.getUsers().some(predicate)
    }
}

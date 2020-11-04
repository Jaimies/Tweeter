import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {GetUsersUseCase} from "@/domain/usecase/user/GetUsersUseCase"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"

export class GetUsersUseCaseImpl implements GetUsersUseCase {
    constructor(
        private usersRepository: UserRepository,
        private authRepository: AuthRepository,
    ) {}

    async run(): Promise<User[]> {
        const usersPromise = this.usersRepository.getUsers()
        const currentUserIdPromise = getValue(this.authRepository.userId)
        const [users, currentUserId] = await Promise.all([usersPromise, currentUserIdPromise])
        return users.filter(user => user.id != currentUserId)
    }
}

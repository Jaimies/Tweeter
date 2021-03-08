import {GetFollowersUseCase} from "@/domain/usecase/follow/GetFollowersUseCase"
import {User} from "@/domain/model/User"
import {UserRepository} from "@/domain/repository/UserRepository"
import {first} from "rxjs/operators"

export class GetFollowersUseCaseImpl implements GetFollowersUseCase {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async getFollowersByUsername(username: string): Promise<User[]> {
        const user = await this.userRepository.findUserByUsername(username)
        return this.getUsersByIds(user!.followers)
    }

    async getFollowingByUsername(username: string): Promise<User[]> {
        const user = await this.userRepository.findUserByUsername(username)
        return this.getUsersByIds(user!.following)
    }

    private getUsersByIds(ids: string[]): Promise<User[]> {
        const promises = ids.map(id => {
            return this.getUserById(id)
        })

        return Promise.all(promises)
    }

    private getUserById(id: string): Promise<User> {
        return this.userRepository.findUserById(id).pipe(first()).toPromise() as Promise<User>
    }
}

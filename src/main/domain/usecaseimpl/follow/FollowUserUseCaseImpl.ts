import {ListChange} from "@/domain/model/ListChange"
import {FollowUserUseCase} from "@/domain/usecase/follow/FollowUserUseCase"
import {FollowingUpdater} from "@/domain/usecaseimpl/follow/FollowingUpdater"

const AUTH_REQUIRED = "Authentication is required to follow a user."

export class FollowUserUseCaseImpl implements FollowUserUseCase {
    constructor(
        private followingUpdater: FollowingUpdater,
    ) {}

    run(userId: string) {
        return this.followingUpdater.run(new ListChange.Add(userId), AUTH_REQUIRED)
    }
}
